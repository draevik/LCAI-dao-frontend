/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASIC_CHOICES, ProposalState } from "@/lib/constents";
import {
  Delegate,
  Delegation,
  PaginationOpts,
  Proposal,
  ProposalsFilter,
  RawTransaction,
  SpaceStats,
  Vote,
  User,
} from "@/types";
import { ApiProposal } from "./types";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import {
  DELEGATES_QUERY,
  DELEGATE_QUERY,
  LAST_INDEXED_BLOCK_QUERY,
  PROPOSAL_QUERY,
  PROPOSALS_QUERY,
  SPACE_QUERY,
  USER_DELEGATION_QUERY,
  USER_QUERY,
  USER_VOTES_QUERY,
  VOTES_QUERY,
} from "./queries";
import { clone } from "@/lib/utils";
import { formatUnits } from "viem";

const getProposalState = (proposal: ApiProposal, current: number) => {
  const quorum = BigInt(proposal.quorum);
  const scoresFor = BigInt(proposal.scores_1);
  const scoresAgainst = BigInt(proposal.scores_2);
  const scoresAbstain = BigInt(proposal.scores_3);
  const currentQuorum = scoresFor + scoresAbstain;

  if (proposal.executed)
    return proposal.execution_settled
      ? ProposalState.Executed
      : ProposalState.Queued;

  if (proposal.end_time <= current) {
    if (currentQuorum < quorum) return ProposalState.Defeated;
    return scoresFor > scoresAgainst
      ? ProposalState.Succeeded
      : ProposalState.Defeated;
  }

  if (proposal.cancelled) return ProposalState.Canceled;

  if (proposal.start_time > current) return ProposalState.Pending;

  return ProposalState.Active;
};

function formatExecution(execution: string): RawTransaction[] {
  if (execution === "") return [];

  try {
    const result = JSON.parse(execution);

    return Array.isArray(result) ? result : [];
  } catch {
    console.log("Failed to parse execution");
    return [];
  }
}

function formatProposal(proposal: ApiProposal, current: number): Proposal {
  const state = getProposalState(proposal, current);

  return {
    ...proposal,
    author: {
      id: proposal.author.id,
    },
    choices: proposal.metadata?.choices ?? BASIC_CHOICES,
    labels: proposal.metadata?.labels ?? [],
    scores: [
      proposal.scores_1_parsed,
      proposal.scores_2_parsed,
      proposal.scores_3_parsed,
    ],
    title: proposal.metadata?.title ?? `Proposal #${proposal.proposal_id}`,
    body: proposal.metadata?.body ?? "",
    discussion: proposal.metadata?.discussion ?? "",
    executions: formatExecution(proposal.metadata?.execution),
    execution_settled: proposal.execution_settled,
    state,
    quorum_parsed: +formatUnits(proposal.quorum, proposal.vp_decimals),
  };
}

export function createApi(uri: string) {
  const httpLink = new HttpLink({ uri });

  const apollo = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return {
    apiUrl: uri,
    loadProposalVotes: async (
      proposal: Proposal,
      { limit, skip = 0 }: PaginationOpts,
      filter: "any" | "for" | "against" | "abstain" = "any",
      sortBy: "vp-desc" | "vp-asc" | "created-desc" | "created-asc" = "vp-desc"
    ): Promise<Vote[]> => {
      const filters: Record<string, any> = {};
      if (filter === "for") {
        filters.choice = 1;
      } else if (filter === "against") {
        filters.choice = 2;
      } else if (filter === "abstain") {
        filters.choice = 3;
      }

      const [orderBy, orderDirection] = sortBy.split("-") as [
        "vp" | "created",
        "desc" | "asc"
      ];

      const { data } = await apollo.query({
        query: VOTES_QUERY,
        fetchPolicy: "network-only",
        variables: {
          indexer: "mainnet",
          first: limit,
          skip,
          orderBy,
          orderDirection,
          where: {
            proposal: proposal.proposal_id,
            ...filters,
          },
        },
      });

      return data?.votes || [];
    },
    loadUserVotes: async (
      voter: string,
      { limit, skip = 0 }: PaginationOpts
    ): Promise<{ [key: string]: Vote }> => {
      const { data } = await apollo.query({
        query: USER_VOTES_QUERY,
        variables: { indexer: "mainnet", voter, first: limit, skip },
      });

      return Object.fromEntries(
        data?.votes?.map((vote) => [vote.proposal, vote]) || []
      );
    },
    loadProposals: async (
      spaceIds: string[],
      { limit, skip = 0 }: PaginationOpts,
      current: number,
      filters?: ProposalsFilter,
      searchQuery = ""
    ): Promise<Proposal[]> => {
      const _filters: ProposalsFilter = clone(filters || {});

      const metadataFilters: Record<string, any> = {};
      if (searchQuery) metadataFilters.title_contains_nocase = searchQuery;

      const state = _filters.state;

      if (state === "active") {
        _filters.start_lte = current;
        _filters.max_end_gte = current;
      } else if (state === "pending") {
        _filters.start_gt = current;
      } else if (state === "closed") {
        _filters.max_end_lt = current;
      }

      delete _filters.state;

      if (_filters.labels?.length) {
        metadataFilters.labels_contains = _filters.labels;
      }

      delete _filters.labels;

      const { data } = await apollo.query({
        query: PROPOSALS_QUERY,
        variables: {
          first: limit,
          skip,
          where: {
            cancelled: false,
            metadata_: Object.keys(metadataFilters).length
              ? metadataFilters
              : undefined,
            ..._filters,
          },
        },
      });

      return (
        data?.proposals.map((proposal) => formatProposal(proposal, current)) ||
        []
      );
    },
    loadProposal: async (
      proposalId: string,
      current: number
    ): Promise<Proposal | null> => {
      const [{ data }] = await Promise.all([
        apollo.query({
          query: PROPOSAL_QUERY,
          variables: { id: `${proposalId}` },
        }),
      ]);

      if (!data?.proposal) return null;

      return formatProposal(data.proposal, current);
    },
    loadUser: async (id: string): Promise<User | null> => {
      const [{ data }] = await Promise.all([
        apollo.query({
          query: USER_QUERY,
          variables: { indexer: "mainnet", id },
        }),
      ]);

      return data?.user ?? null;
    },
    async loadLastIndexedBlock(): Promise<number | null> {
      const { data } = await apollo.query({
        query: LAST_INDEXED_BLOCK_QUERY,
        variables: { indexer: "mainnet" },
      });
      return data?._metadata?.value ? Number(data._metadata.value) : null;
    },
    loadDelegates: async (
      spaceId: string,
      { limit, skip = 0 }: PaginationOpts,
      sortBy:
        | "voting_power-desc"
        | "voting_power-asc"
        | "delegator_count-desc"
        | "delegator_count-asc"
        | "created-desc"
        | "created-asc" = "voting_power-desc"
    ): Promise<Delegate[]> => {
      const [orderBy, orderDirection] = sortBy.split("-") as [
        "voting_power" | "delegator_count" | "created",
        "desc" | "asc"
      ];

      const { data } = await apollo.query({
        query: DELEGATES_QUERY,
        fetchPolicy: "network-only",
        variables: {
          indexer: "mainnet",
          first: limit,
          skip,
          orderBy,
          orderDirection,
          where: {
            space: spaceId,
          },
        },
      });

      return (
        data?.delegates?.map((delegate: any) => ({
          id: delegate.id,
          address: delegate.user.id,
          votingPower: delegate.voting_power,
          votingPowerParsed: delegate.voting_power_parsed,
          delegatorCount: delegate.delegator_count,
          proposalCount: delegate.user.proposal_count,
          voteCount: delegate.user.vote_count,
          created: delegate.created,
          updated: delegate.updated,
        })) || []
      );
    },
    loadDelegate: async (
      spaceId: string,
      delegateAddress: string
    ): Promise<Delegate | null> => {
      const delegateId = `${spaceId}/${delegateAddress}`;
      const { data } = await apollo.query({
        query: DELEGATE_QUERY,
        variables: { indexer: "mainnet", id: delegateId },
      });

      if (!data?.delegate) return null;

      const delegate = data.delegate;
      return {
        id: delegate.id,
        address: delegate.user.id,
        votingPower: delegate.voting_power,
        votingPowerParsed: delegate.voting_power_parsed,
        delegatorCount: delegate.delegator_count,
        proposalCount: delegate.user.proposal_count,
        voteCount: delegate.user.vote_count,
        created: delegate.created,
        updated: delegate.updated,
      };
    },
    loadUserDelegation: async (
      spaceId: string,
      userAddress: string
    ): Promise<Delegation | null> => {
      const delegationId = `${spaceId}/${userAddress}`;
      const { data } = await apollo.query({
        query: USER_DELEGATION_QUERY,
        fetchPolicy: "network-only",
        variables: { indexer: "mainnet", id: delegationId },
      });

      if (!data?.delegation) return null;

      const delegation = data.delegation;
      return {
        id: delegation.id,
        delegator: delegation.delegator.id,
        delegate: delegation.delegate,
        created: delegation.created,
        tx: delegation.tx,
      };
    },
    loadSpaceStats: async (spaceId: string): Promise<SpaceStats | null> => {
      const { data } = await apollo.query({
        query: SPACE_QUERY,
        fetchPolicy: "network-only",
        variables: { indexer: "mainnet", id: spaceId },
      });

      if (!data?.space) return null;

      const space = data.space;
      return {
        id: space.id,
        name: space.name,
        symbol: space.symbol,
        decimals: space.decimals,
        token: space.token,
        proposalCount: space.proposal_count,
        voteCount: space.vote_count,
        proposerCount: space.proposer_count,
        voterCount: space.voter_count,
        delegateCount: space.delegate_count,
        quorum: space.quorum,
        proposalThreshold: space.proposal_threshold,
        votingDelay: space.voting_delay,
        timelockDelay: space.timelock_delay,
        created: space.created,
      };
    },
  };
}
