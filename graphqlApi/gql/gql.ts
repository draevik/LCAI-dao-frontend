/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment voteFields on Vote {\n    id\n    voter {\n      id\n    }\n    metadata {\n      reason\n    }\n    vp\n    vp_parsed\n    proposal\n    choice\n    created\n    tx\n  }\n\n  fragment proposalFields on Proposal {\n    id\n    proposal_id\n    author {\n      id\n    }\n    quorum\n    timelock_delay\n    execution_hash\n    metadata {\n      id\n      title\n      body\n      discussion\n      execution\n      simulation\n      choices\n      labels\n    }\n    start_time\n    start_block_number\n    end_time\n    end_block_number\n    snapshot\n    voting_delay\n    voting_period\n    proposal_threshold\n    vp_decimals\n    scores_1\n    scores_2\n    scores_3\n    scores_total\n    scores_1_parsed\n    scores_2_parsed\n    scores_3_parsed\n    scores_total_parsed\n    execution_time\n    created\n    edited\n    tx\n    execution_tx\n    vote_count\n    execution_ready\n    executed\n    cancelled\n    _indexer\n  }\n": typeof types.VoteFieldsFragmentDoc,
    "\n  query Proposal($id: String!) {\n    proposal(id: $id) {\n      ...proposalFields\n    }\n  }\n": typeof types.ProposalDocument,
    "\n  query Proposals(\n    $first: Int!\n    $skip: Int!\n    $where: Proposal_filter\n    $orderBy: Proposal_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    proposals(\n      first: $first\n      skip: $skip\n      where: $where\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      ...proposalFields\n    }\n  }\n": typeof types.ProposalsDocument,
    "\n  query Votes(\n    $indexer: String!\n    $first: Int!\n    $skip: Int!\n    $orderBy: Vote_orderBy!\n    $orderDirection: OrderDirection!\n    $where: Vote_filter\n  ) {\n    votes(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      where: $where\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      ...voteFields\n    }\n  }\n": typeof types.VotesDocument,
    "\n  query UserVotes(\n    $indexer: String!\n    $first: Int\n    $skip: Int\n    $voter: String\n  ) {\n    votes(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      where: { voter: $voter }\n    ) {\n      ...voteFields\n    }\n  }\n": typeof types.UserVotesDocument,
    "\n  query User($indexer: String!, $id: String!) {\n    user(indexer: $indexer, id: $id) {\n      id\n      proposal_count\n      vote_count\n      created\n      updated\n      display_name\n      bio\n      statement\n      avatar_url\n      twitter\n      discord\n      github\n      website\n    }\n  }\n": typeof types.UserDocument,
    "\n  query Leaderboard(\n    $indexer: String!\n    $first: Int!\n    $skip: Int!\n    $orderBy: Leaderboard_orderBy\n    $orderDirection: OrderDirection!\n    $where: Leaderboard_filter\n  ) {\n    leaderboards(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      where: $where\n    ) {\n      id\n      user {\n        id\n        created\n      }\n      proposal_count\n      vote_count\n    }\n  }\n": typeof types.LeaderboardDocument,
    "\n  query _Metadata($indexer: String!) {\n    _metadata(indexer: $indexer, id: \"last_indexed_block\") {\n      value\n    }\n  }\n": typeof types._MetadataDocument,
    "\n  fragment delegateFields on Delegate {\n    id\n    user {\n      id\n      proposal_count\n      vote_count\n      created\n      updated\n      display_name\n      bio\n      statement\n      avatar_url\n      twitter\n      discord\n      github\n      website\n    }\n    voting_power\n    voting_power_parsed\n    delegator_count\n    created\n    updated\n  }\n": typeof types.DelegateFieldsFragmentDoc,
    "\n  query Delegates(\n    $indexer: String!\n    $first: Int!\n    $skip: Int!\n    $orderBy: Delegate_orderBy!\n    $orderDirection: OrderDirection!\n    $where: Delegate_filter\n  ) {\n    delegates(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      where: $where\n    ) {\n      ...delegateFields\n    }\n  }\n": typeof types.DelegatesDocument,
    "\n  query Delegate($indexer: String!, $id: String!) {\n    delegate(indexer: $indexer, id: $id) {\n      ...delegateFields\n    }\n  }\n": typeof types.DelegateDocument,
    "\n  query UserDelegation($indexer: String!, $id: String!) {\n    delegation(indexer: $indexer, id: $id) {\n      id\n      delegator {\n        id\n      }\n      delegate\n      created\n      tx\n    }\n  }\n": typeof types.UserDelegationDocument,
    "\n  fragment treasuryTransactionFields on TreasuryTransaction {\n    id\n    type\n    token\n    token_symbol\n    token_decimals\n    amount\n    amount_parsed\n    from_address\n    to_address\n    created\n    tx\n  }\n": typeof types.TreasuryTransactionFieldsFragmentDoc,
    "\n  query TreasuryTransactions(\n    $first: Int!\n    $skip: Int!\n    $orderBy: TreasuryTransaction_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    treasurytransactions(\n      first: $first\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      ...treasuryTransactionFields\n    }\n  }\n": typeof types.TreasuryTransactionsDocument,
    "\n  query Space($indexer: String!, $id: String!) {\n    space(indexer: $indexer, id: $id) {\n      id\n      name\n      symbol\n      decimals\n      token\n      total_supply\n      proposal_count\n      vote_count\n      proposer_count\n      voter_count\n      delegate_count\n      quorum\n      proposal_threshold\n      voting_delay\n      voting_period\n      timelock_delay\n      created\n    }\n  }\n": typeof types.SpaceDocument,
};
const documents: Documents = {
    "\n  fragment voteFields on Vote {\n    id\n    voter {\n      id\n    }\n    metadata {\n      reason\n    }\n    vp\n    vp_parsed\n    proposal\n    choice\n    created\n    tx\n  }\n\n  fragment proposalFields on Proposal {\n    id\n    proposal_id\n    author {\n      id\n    }\n    quorum\n    timelock_delay\n    execution_hash\n    metadata {\n      id\n      title\n      body\n      discussion\n      execution\n      simulation\n      choices\n      labels\n    }\n    start_time\n    start_block_number\n    end_time\n    end_block_number\n    snapshot\n    voting_delay\n    voting_period\n    proposal_threshold\n    vp_decimals\n    scores_1\n    scores_2\n    scores_3\n    scores_total\n    scores_1_parsed\n    scores_2_parsed\n    scores_3_parsed\n    scores_total_parsed\n    execution_time\n    created\n    edited\n    tx\n    execution_tx\n    vote_count\n    execution_ready\n    executed\n    cancelled\n    _indexer\n  }\n": types.VoteFieldsFragmentDoc,
    "\n  query Proposal($id: String!) {\n    proposal(id: $id) {\n      ...proposalFields\n    }\n  }\n": types.ProposalDocument,
    "\n  query Proposals(\n    $first: Int!\n    $skip: Int!\n    $where: Proposal_filter\n    $orderBy: Proposal_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    proposals(\n      first: $first\n      skip: $skip\n      where: $where\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      ...proposalFields\n    }\n  }\n": types.ProposalsDocument,
    "\n  query Votes(\n    $indexer: String!\n    $first: Int!\n    $skip: Int!\n    $orderBy: Vote_orderBy!\n    $orderDirection: OrderDirection!\n    $where: Vote_filter\n  ) {\n    votes(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      where: $where\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      ...voteFields\n    }\n  }\n": types.VotesDocument,
    "\n  query UserVotes(\n    $indexer: String!\n    $first: Int\n    $skip: Int\n    $voter: String\n  ) {\n    votes(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      where: { voter: $voter }\n    ) {\n      ...voteFields\n    }\n  }\n": types.UserVotesDocument,
    "\n  query User($indexer: String!, $id: String!) {\n    user(indexer: $indexer, id: $id) {\n      id\n      proposal_count\n      vote_count\n      created\n      updated\n      display_name\n      bio\n      statement\n      avatar_url\n      twitter\n      discord\n      github\n      website\n    }\n  }\n": types.UserDocument,
    "\n  query Leaderboard(\n    $indexer: String!\n    $first: Int!\n    $skip: Int!\n    $orderBy: Leaderboard_orderBy\n    $orderDirection: OrderDirection!\n    $where: Leaderboard_filter\n  ) {\n    leaderboards(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      where: $where\n    ) {\n      id\n      user {\n        id\n        created\n      }\n      proposal_count\n      vote_count\n    }\n  }\n": types.LeaderboardDocument,
    "\n  query _Metadata($indexer: String!) {\n    _metadata(indexer: $indexer, id: \"last_indexed_block\") {\n      value\n    }\n  }\n": types._MetadataDocument,
    "\n  fragment delegateFields on Delegate {\n    id\n    user {\n      id\n      proposal_count\n      vote_count\n      created\n      updated\n      display_name\n      bio\n      statement\n      avatar_url\n      twitter\n      discord\n      github\n      website\n    }\n    voting_power\n    voting_power_parsed\n    delegator_count\n    created\n    updated\n  }\n": types.DelegateFieldsFragmentDoc,
    "\n  query Delegates(\n    $indexer: String!\n    $first: Int!\n    $skip: Int!\n    $orderBy: Delegate_orderBy!\n    $orderDirection: OrderDirection!\n    $where: Delegate_filter\n  ) {\n    delegates(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      where: $where\n    ) {\n      ...delegateFields\n    }\n  }\n": types.DelegatesDocument,
    "\n  query Delegate($indexer: String!, $id: String!) {\n    delegate(indexer: $indexer, id: $id) {\n      ...delegateFields\n    }\n  }\n": types.DelegateDocument,
    "\n  query UserDelegation($indexer: String!, $id: String!) {\n    delegation(indexer: $indexer, id: $id) {\n      id\n      delegator {\n        id\n      }\n      delegate\n      created\n      tx\n    }\n  }\n": types.UserDelegationDocument,
    "\n  fragment treasuryTransactionFields on TreasuryTransaction {\n    id\n    type\n    token\n    token_symbol\n    token_decimals\n    amount\n    amount_parsed\n    from_address\n    to_address\n    created\n    tx\n  }\n": types.TreasuryTransactionFieldsFragmentDoc,
    "\n  query TreasuryTransactions(\n    $first: Int!\n    $skip: Int!\n    $orderBy: TreasuryTransaction_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    treasurytransactions(\n      first: $first\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      ...treasuryTransactionFields\n    }\n  }\n": types.TreasuryTransactionsDocument,
    "\n  query Space($indexer: String!, $id: String!) {\n    space(indexer: $indexer, id: $id) {\n      id\n      name\n      symbol\n      decimals\n      token\n      total_supply\n      proposal_count\n      vote_count\n      proposer_count\n      voter_count\n      delegate_count\n      quorum\n      proposal_threshold\n      voting_delay\n      voting_period\n      timelock_delay\n      created\n    }\n  }\n": types.SpaceDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment voteFields on Vote {\n    id\n    voter {\n      id\n    }\n    metadata {\n      reason\n    }\n    vp\n    vp_parsed\n    proposal\n    choice\n    created\n    tx\n  }\n\n  fragment proposalFields on Proposal {\n    id\n    proposal_id\n    author {\n      id\n    }\n    quorum\n    timelock_delay\n    execution_hash\n    metadata {\n      id\n      title\n      body\n      discussion\n      execution\n      simulation\n      choices\n      labels\n    }\n    start_time\n    start_block_number\n    end_time\n    end_block_number\n    snapshot\n    voting_delay\n    voting_period\n    proposal_threshold\n    vp_decimals\n    scores_1\n    scores_2\n    scores_3\n    scores_total\n    scores_1_parsed\n    scores_2_parsed\n    scores_3_parsed\n    scores_total_parsed\n    execution_time\n    created\n    edited\n    tx\n    execution_tx\n    vote_count\n    execution_ready\n    executed\n    cancelled\n    _indexer\n  }\n"): (typeof documents)["\n  fragment voteFields on Vote {\n    id\n    voter {\n      id\n    }\n    metadata {\n      reason\n    }\n    vp\n    vp_parsed\n    proposal\n    choice\n    created\n    tx\n  }\n\n  fragment proposalFields on Proposal {\n    id\n    proposal_id\n    author {\n      id\n    }\n    quorum\n    timelock_delay\n    execution_hash\n    metadata {\n      id\n      title\n      body\n      discussion\n      execution\n      simulation\n      choices\n      labels\n    }\n    start_time\n    start_block_number\n    end_time\n    end_block_number\n    snapshot\n    voting_delay\n    voting_period\n    proposal_threshold\n    vp_decimals\n    scores_1\n    scores_2\n    scores_3\n    scores_total\n    scores_1_parsed\n    scores_2_parsed\n    scores_3_parsed\n    scores_total_parsed\n    execution_time\n    created\n    edited\n    tx\n    execution_tx\n    vote_count\n    execution_ready\n    executed\n    cancelled\n    _indexer\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Proposal($id: String!) {\n    proposal(id: $id) {\n      ...proposalFields\n    }\n  }\n"): (typeof documents)["\n  query Proposal($id: String!) {\n    proposal(id: $id) {\n      ...proposalFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Proposals(\n    $first: Int!\n    $skip: Int!\n    $where: Proposal_filter\n    $orderBy: Proposal_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    proposals(\n      first: $first\n      skip: $skip\n      where: $where\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      ...proposalFields\n    }\n  }\n"): (typeof documents)["\n  query Proposals(\n    $first: Int!\n    $skip: Int!\n    $where: Proposal_filter\n    $orderBy: Proposal_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    proposals(\n      first: $first\n      skip: $skip\n      where: $where\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      ...proposalFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Votes(\n    $indexer: String!\n    $first: Int!\n    $skip: Int!\n    $orderBy: Vote_orderBy!\n    $orderDirection: OrderDirection!\n    $where: Vote_filter\n  ) {\n    votes(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      where: $where\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      ...voteFields\n    }\n  }\n"): (typeof documents)["\n  query Votes(\n    $indexer: String!\n    $first: Int!\n    $skip: Int!\n    $orderBy: Vote_orderBy!\n    $orderDirection: OrderDirection!\n    $where: Vote_filter\n  ) {\n    votes(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      where: $where\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      ...voteFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UserVotes(\n    $indexer: String!\n    $first: Int\n    $skip: Int\n    $voter: String\n  ) {\n    votes(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      where: { voter: $voter }\n    ) {\n      ...voteFields\n    }\n  }\n"): (typeof documents)["\n  query UserVotes(\n    $indexer: String!\n    $first: Int\n    $skip: Int\n    $voter: String\n  ) {\n    votes(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      where: { voter: $voter }\n    ) {\n      ...voteFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query User($indexer: String!, $id: String!) {\n    user(indexer: $indexer, id: $id) {\n      id\n      proposal_count\n      vote_count\n      created\n      updated\n      display_name\n      bio\n      statement\n      avatar_url\n      twitter\n      discord\n      github\n      website\n    }\n  }\n"): (typeof documents)["\n  query User($indexer: String!, $id: String!) {\n    user(indexer: $indexer, id: $id) {\n      id\n      proposal_count\n      vote_count\n      created\n      updated\n      display_name\n      bio\n      statement\n      avatar_url\n      twitter\n      discord\n      github\n      website\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Leaderboard(\n    $indexer: String!\n    $first: Int!\n    $skip: Int!\n    $orderBy: Leaderboard_orderBy\n    $orderDirection: OrderDirection!\n    $where: Leaderboard_filter\n  ) {\n    leaderboards(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      where: $where\n    ) {\n      id\n      user {\n        id\n        created\n      }\n      proposal_count\n      vote_count\n    }\n  }\n"): (typeof documents)["\n  query Leaderboard(\n    $indexer: String!\n    $first: Int!\n    $skip: Int!\n    $orderBy: Leaderboard_orderBy\n    $orderDirection: OrderDirection!\n    $where: Leaderboard_filter\n  ) {\n    leaderboards(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      where: $where\n    ) {\n      id\n      user {\n        id\n        created\n      }\n      proposal_count\n      vote_count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query _Metadata($indexer: String!) {\n    _metadata(indexer: $indexer, id: \"last_indexed_block\") {\n      value\n    }\n  }\n"): (typeof documents)["\n  query _Metadata($indexer: String!) {\n    _metadata(indexer: $indexer, id: \"last_indexed_block\") {\n      value\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment delegateFields on Delegate {\n    id\n    user {\n      id\n      proposal_count\n      vote_count\n      created\n      updated\n      display_name\n      bio\n      statement\n      avatar_url\n      twitter\n      discord\n      github\n      website\n    }\n    voting_power\n    voting_power_parsed\n    delegator_count\n    created\n    updated\n  }\n"): (typeof documents)["\n  fragment delegateFields on Delegate {\n    id\n    user {\n      id\n      proposal_count\n      vote_count\n      created\n      updated\n      display_name\n      bio\n      statement\n      avatar_url\n      twitter\n      discord\n      github\n      website\n    }\n    voting_power\n    voting_power_parsed\n    delegator_count\n    created\n    updated\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Delegates(\n    $indexer: String!\n    $first: Int!\n    $skip: Int!\n    $orderBy: Delegate_orderBy!\n    $orderDirection: OrderDirection!\n    $where: Delegate_filter\n  ) {\n    delegates(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      where: $where\n    ) {\n      ...delegateFields\n    }\n  }\n"): (typeof documents)["\n  query Delegates(\n    $indexer: String!\n    $first: Int!\n    $skip: Int!\n    $orderBy: Delegate_orderBy!\n    $orderDirection: OrderDirection!\n    $where: Delegate_filter\n  ) {\n    delegates(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      where: $where\n    ) {\n      ...delegateFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Delegate($indexer: String!, $id: String!) {\n    delegate(indexer: $indexer, id: $id) {\n      ...delegateFields\n    }\n  }\n"): (typeof documents)["\n  query Delegate($indexer: String!, $id: String!) {\n    delegate(indexer: $indexer, id: $id) {\n      ...delegateFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UserDelegation($indexer: String!, $id: String!) {\n    delegation(indexer: $indexer, id: $id) {\n      id\n      delegator {\n        id\n      }\n      delegate\n      created\n      tx\n    }\n  }\n"): (typeof documents)["\n  query UserDelegation($indexer: String!, $id: String!) {\n    delegation(indexer: $indexer, id: $id) {\n      id\n      delegator {\n        id\n      }\n      delegate\n      created\n      tx\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment treasuryTransactionFields on TreasuryTransaction {\n    id\n    type\n    token\n    token_symbol\n    token_decimals\n    amount\n    amount_parsed\n    from_address\n    to_address\n    created\n    tx\n  }\n"): (typeof documents)["\n  fragment treasuryTransactionFields on TreasuryTransaction {\n    id\n    type\n    token\n    token_symbol\n    token_decimals\n    amount\n    amount_parsed\n    from_address\n    to_address\n    created\n    tx\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TreasuryTransactions(\n    $first: Int!\n    $skip: Int!\n    $orderBy: TreasuryTransaction_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    treasurytransactions(\n      first: $first\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      ...treasuryTransactionFields\n    }\n  }\n"): (typeof documents)["\n  query TreasuryTransactions(\n    $first: Int!\n    $skip: Int!\n    $orderBy: TreasuryTransaction_orderBy\n    $orderDirection: OrderDirection\n  ) {\n    treasurytransactions(\n      first: $first\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      ...treasuryTransactionFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Space($indexer: String!, $id: String!) {\n    space(indexer: $indexer, id: $id) {\n      id\n      name\n      symbol\n      decimals\n      token\n      total_supply\n      proposal_count\n      vote_count\n      proposer_count\n      voter_count\n      delegate_count\n      quorum\n      proposal_threshold\n      voting_delay\n      voting_period\n      timelock_delay\n      created\n    }\n  }\n"): (typeof documents)["\n  query Space($indexer: String!, $id: String!) {\n    space(indexer: $indexer, id: $id) {\n      id\n      name\n      symbol\n      decimals\n      token\n      total_supply\n      proposal_count\n      vote_count\n      proposer_count\n      voter_count\n      delegate_count\n      quorum\n      proposal_threshold\n      voting_delay\n      voting_period\n      timelock_delay\n      created\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;