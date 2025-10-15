import { gql } from "./gql";

gql(`
  fragment voteFields on Vote {
    id
    voter {
      id
    }
    metadata {
      reason
    }
    vp
    vp_parsed
    proposal
    choice
    created
    tx
  }

  fragment proposalFields on Proposal {
    id
    proposal_id
    author {
      id
    }
    quorum
    timelock_delay
    execution_hash
    metadata {
      id
      title
      body
      discussion
      execution
      choices
      labels
    }
    start_time
    start_block_number
    end_time
    end_block_number
    snapshot
    vp_decimals
    scores_1
    scores_2
    scores_3
    scores_total
    scores_1_parsed
    scores_2_parsed
    scores_3_parsed
    scores_total_parsed
    execution_time
    created
    edited
    tx
    execution_tx
    vote_count
    execution_ready
    executed
    execution_settled
    cancelled
  }
`);

export const PROPOSAL_QUERY = gql(`
  query Proposal($id: String!) {
    proposal(id: $id) {
      ...proposalFields
    }
  }
`);

export const PROPOSALS_QUERY = gql(`
  query Proposals($first: Int!, $skip: Int!, $where: Proposal_filter) {
    proposals(
      first: $first
      skip: $skip
      where: $where
      orderBy: created
      orderDirection: desc
    ) {
      ...proposalFields
    }
  }
`);

export const VOTES_QUERY = gql(`
  query Votes(
    $indexer: String!
    $first: Int!
    $skip: Int!
    $orderBy: Vote_orderBy!
    $orderDirection: OrderDirection!
    $where: Vote_filter
  ) {
    votes(
      indexer: $indexer
      first: $first
      skip: $skip
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      ...voteFields
    }
  }
`);

export const USER_VOTES_QUERY = gql(`
  query UserVotes(
    $indexer: String!
    $first: Int
    $skip: Int
    $voter: String
  ) {
    votes(
      indexer: $indexer
      first: $first
      skip: $skip
      where: { voter: $voter }
    ) {
      ...voteFields
    }
  }
`);

export const USER_QUERY = gql(`
  query User($indexer: String!, $id: String!) {
    user(indexer: $indexer, id: $id) {
      id
      proposal_count
      vote_count
      created
    }
  }
`);

export const LEADERBOARD_QUERY = gql(`
  query Leaderboard(
    $indexer: String!
    $first: Int!
    $skip: Int!
    $orderBy: Leaderboard_orderBy
    $orderDirection: OrderDirection!
    $where: Leaderboard_filter
  ) {
    leaderboards(
      indexer: $indexer
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      user {
        id
        created
      }
      proposal_count
      vote_count
    }
  }
`);

export const LAST_INDEXED_BLOCK_QUERY = gql(`
  query _Metadata($indexer: String!) {
    _metadata(indexer: $indexer, id: "last_indexed_block") {
      value
    }
  }
`);
