/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASIC_CHOICES, ProposalState } from "@/lib/constents";
import {
  PaginationOpts,
  Proposal,
  ProposalsFilter,
  RawTransaction,
  Vote,
  User,
} from "@/types";
import { ApiProposal } from "./types";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import {
  LAST_INDEXED_BLOCK_QUERY,
  PROPOSAL_QUERY,
  PROPOSALS_QUERY,
  USER_QUERY,
  USER_VOTES_QUERY,
  VOTES_QUERY,
} from "./queries";
import { clone } from "@/lib/utils";

const getProposalState = (proposal: ApiProposal, current: number) => {
  const quorum = 1e9 * (4 / 100);
  // const quorum = BigInt(proposal.quorum);
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
    // TODO: quorum
    quorum: 1e9 * (4 / 100),
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
        variables: {
          indexer: "lcai",
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
        variables: { indexer: "lcai", voter, first: limit, skip },
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
          variables: { indexer: "lcai", id },
        }),
      ]);

      return data?.user ?? null;
    },
    async loadLastIndexedBlock(): Promise<number | null> {
      const { data } = await apollo.query({
        query: LAST_INDEXED_BLOCK_QUERY,
        variables: { indexer: "lcai" },
      });
      return data?._metadata?.value ? Number(data._metadata.value) : null;
    },
  };
}
