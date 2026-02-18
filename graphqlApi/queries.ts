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
      simulation
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
  query Proposals(
    $first: Int!
    $skip: Int!
    $where: Proposal_filter
    $orderBy: Proposal_orderBy
    $orderDirection: OrderDirection
  ) {
    proposals(
      first: $first
      skip: $skip
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
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
      updated
      display_name
      bio
      statement
      avatar_url
      twitter
      discord
      github
      website
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

gql(`
  fragment delegateFields on Delegate {
    id
    user {
      id
      proposal_count
      vote_count
      created
      updated
      display_name
      bio
      statement
      avatar_url
      twitter
      discord
      github
      website
    }
    voting_power
    voting_power_parsed
    delegator_count
    created
    updated
  }
`);

export const DELEGATES_QUERY = gql(`
  query Delegates(
    $indexer: String!
    $first: Int!
    $skip: Int!
    $orderBy: Delegate_orderBy!
    $orderDirection: OrderDirection!
    $where: Delegate_filter
  ) {
    delegates(
      indexer: $indexer
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      ...delegateFields
    }
  }
`);

export const DELEGATE_QUERY = gql(`
  query Delegate($indexer: String!, $id: String!) {
    delegate(indexer: $indexer, id: $id) {
      ...delegateFields
    }
  }
`);

export const USER_DELEGATION_QUERY = gql(`
  query UserDelegation($indexer: String!, $id: String!) {
    delegation(indexer: $indexer, id: $id) {
      id
      delegator {
        id
      }
      delegate
      created
      tx
    }
  }
`);

gql(`
  fragment treasuryTransactionFields on TreasuryTransaction {
    id
    type
    token
    token_symbol
    token_decimals
    amount
    amount_parsed
    from_address
    to_address
    created
    tx
  }
`);

export const TREASURY_TRANSACTIONS_QUERY = gql(`
  query TreasuryTransactions(
    $first: Int!
    $skip: Int!
    $orderBy: TreasuryTransaction_orderBy
    $orderDirection: OrderDirection
  ) {
    treasurytransactions(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      ...treasuryTransactionFields
    }
  }
`);

export const SPACE_QUERY = gql(`
  query Space($indexer: String!, $id: String!) {
    space(indexer: $indexer, id: $id) {
      id
      name
      symbol
      decimals
      token
      proposal_count
      vote_count
      proposer_count
      voter_count
      delegate_count
      quorum
      proposal_threshold
      voting_delay
      timelock_delay
      created
    }
  }
`);
