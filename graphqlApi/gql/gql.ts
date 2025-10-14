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
    "\n  fragment voteFields on Vote {\n    id\n    voter {\n      id\n    }\n    metadata {\n      reason\n    }\n    vp\n    vp_parsed\n    proposal\n    choice\n    created\n    tx\n  }\n\n  fragment proposalFields on Proposal {\n    id\n    proposal_id\n    author {\n      id\n    }\n    quorum\n    execution_hash\n    metadata {\n      id\n      title\n      body\n      discussion\n      execution\n      choices\n      labels\n    }\n    start_time\n    start_block_number\n    end_time\n    end_block_number\n    snapshot\n    vp_decimals\n    scores_1\n    scores_2\n    scores_3\n    scores_total\n    scores_1_parsed\n    scores_2_parsed\n    scores_3_parsed\n    scores_total_parsed\n    execution_time\n    created\n    edited\n    tx\n    execution_tx\n    vote_count\n    execution_ready\n    executed\n    execution_settled\n    cancelled\n  }\n": typeof types.VoteFieldsFragmentDoc,
    "\n  query Proposal($id: String!) {\n    proposal(id: $id) {\n      ...proposalFields\n    }\n  }\n": typeof types.ProposalDocument,
    "\n  query Proposals($first: Int!, $skip: Int!, $where: Proposal_filter) {\n    proposals(\n      first: $first\n      skip: $skip\n      where: $where\n      orderBy: created\n      orderDirection: desc\n    ) {\n      ...proposalFields\n    }\n  }\n": typeof types.ProposalsDocument,
    "\n  query Votes(\n    $indexer: String!\n    $first: Int!\n    $skip: Int!\n    $orderBy: Vote_orderBy!\n    $orderDirection: OrderDirection!\n    $where: Vote_filter\n  ) {\n    votes(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      where: $where\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      ...voteFields\n    }\n  }\n": typeof types.VotesDocument,
    "\n  query UserVotes(\n    $indexer: String!\n    $first: Int\n    $skip: Int\n    $voter: String\n  ) {\n    votes(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      where: { voter: $voter }\n    ) {\n      ...voteFields\n    }\n  }\n": typeof types.UserVotesDocument,
    "\n  query User($indexer: String!, $id: String!) {\n    user(indexer: $indexer, id: $id) {\n      id\n      proposal_count\n      vote_count\n      created\n    }\n  }\n": typeof types.UserDocument,
    "\n  query Leaderboard(\n    $indexer: String!\n    $first: Int!\n    $skip: Int!\n    $orderBy: Leaderboard_orderBy\n    $orderDirection: OrderDirection!\n    $where: Leaderboard_filter\n  ) {\n    leaderboards(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      where: $where\n    ) {\n      id\n      user {\n        id\n        created\n      }\n      proposal_count\n      vote_count\n    }\n  }\n": typeof types.LeaderboardDocument,
    "\n  query _Metadata($indexer: String!) {\n    _metadata(indexer: $indexer, id: \"last_indexed_block\") {\n      value\n    }\n  }\n": typeof types._MetadataDocument,
};
const documents: Documents = {
    "\n  fragment voteFields on Vote {\n    id\n    voter {\n      id\n    }\n    metadata {\n      reason\n    }\n    vp\n    vp_parsed\n    proposal\n    choice\n    created\n    tx\n  }\n\n  fragment proposalFields on Proposal {\n    id\n    proposal_id\n    author {\n      id\n    }\n    quorum\n    execution_hash\n    metadata {\n      id\n      title\n      body\n      discussion\n      execution\n      choices\n      labels\n    }\n    start_time\n    start_block_number\n    end_time\n    end_block_number\n    snapshot\n    vp_decimals\n    scores_1\n    scores_2\n    scores_3\n    scores_total\n    scores_1_parsed\n    scores_2_parsed\n    scores_3_parsed\n    scores_total_parsed\n    execution_time\n    created\n    edited\n    tx\n    execution_tx\n    vote_count\n    execution_ready\n    executed\n    execution_settled\n    cancelled\n  }\n": types.VoteFieldsFragmentDoc,
    "\n  query Proposal($id: String!) {\n    proposal(id: $id) {\n      ...proposalFields\n    }\n  }\n": types.ProposalDocument,
    "\n  query Proposals($first: Int!, $skip: Int!, $where: Proposal_filter) {\n    proposals(\n      first: $first\n      skip: $skip\n      where: $where\n      orderBy: created\n      orderDirection: desc\n    ) {\n      ...proposalFields\n    }\n  }\n": types.ProposalsDocument,
    "\n  query Votes(\n    $indexer: String!\n    $first: Int!\n    $skip: Int!\n    $orderBy: Vote_orderBy!\n    $orderDirection: OrderDirection!\n    $where: Vote_filter\n  ) {\n    votes(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      where: $where\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n    ) {\n      ...voteFields\n    }\n  }\n": types.VotesDocument,
    "\n  query UserVotes(\n    $indexer: String!\n    $first: Int\n    $skip: Int\n    $voter: String\n  ) {\n    votes(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      where: { voter: $voter }\n    ) {\n      ...voteFields\n    }\n  }\n": types.UserVotesDocument,
    "\n  query User($indexer: String!, $id: String!) {\n    user(indexer: $indexer, id: $id) {\n      id\n      proposal_count\n      vote_count\n      created\n    }\n  }\n": types.UserDocument,
    "\n  query Leaderboard(\n    $indexer: String!\n    $first: Int!\n    $skip: Int!\n    $orderBy: Leaderboard_orderBy\n    $orderDirection: OrderDirection!\n    $where: Leaderboard_filter\n  ) {\n    leaderboards(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      where: $where\n    ) {\n      id\n      user {\n        id\n        created\n      }\n      proposal_count\n      vote_count\n    }\n  }\n": types.LeaderboardDocument,
    "\n  query _Metadata($indexer: String!) {\n    _metadata(indexer: $indexer, id: \"last_indexed_block\") {\n      value\n    }\n  }\n": types._MetadataDocument,
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
export function gql(source: "\n  fragment voteFields on Vote {\n    id\n    voter {\n      id\n    }\n    metadata {\n      reason\n    }\n    vp\n    vp_parsed\n    proposal\n    choice\n    created\n    tx\n  }\n\n  fragment proposalFields on Proposal {\n    id\n    proposal_id\n    author {\n      id\n    }\n    quorum\n    execution_hash\n    metadata {\n      id\n      title\n      body\n      discussion\n      execution\n      choices\n      labels\n    }\n    start_time\n    start_block_number\n    end_time\n    end_block_number\n    snapshot\n    vp_decimals\n    scores_1\n    scores_2\n    scores_3\n    scores_total\n    scores_1_parsed\n    scores_2_parsed\n    scores_3_parsed\n    scores_total_parsed\n    execution_time\n    created\n    edited\n    tx\n    execution_tx\n    vote_count\n    execution_ready\n    executed\n    execution_settled\n    cancelled\n  }\n"): (typeof documents)["\n  fragment voteFields on Vote {\n    id\n    voter {\n      id\n    }\n    metadata {\n      reason\n    }\n    vp\n    vp_parsed\n    proposal\n    choice\n    created\n    tx\n  }\n\n  fragment proposalFields on Proposal {\n    id\n    proposal_id\n    author {\n      id\n    }\n    quorum\n    execution_hash\n    metadata {\n      id\n      title\n      body\n      discussion\n      execution\n      choices\n      labels\n    }\n    start_time\n    start_block_number\n    end_time\n    end_block_number\n    snapshot\n    vp_decimals\n    scores_1\n    scores_2\n    scores_3\n    scores_total\n    scores_1_parsed\n    scores_2_parsed\n    scores_3_parsed\n    scores_total_parsed\n    execution_time\n    created\n    edited\n    tx\n    execution_tx\n    vote_count\n    execution_ready\n    executed\n    execution_settled\n    cancelled\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Proposal($id: String!) {\n    proposal(id: $id) {\n      ...proposalFields\n    }\n  }\n"): (typeof documents)["\n  query Proposal($id: String!) {\n    proposal(id: $id) {\n      ...proposalFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Proposals($first: Int!, $skip: Int!, $where: Proposal_filter) {\n    proposals(\n      first: $first\n      skip: $skip\n      where: $where\n      orderBy: created\n      orderDirection: desc\n    ) {\n      ...proposalFields\n    }\n  }\n"): (typeof documents)["\n  query Proposals($first: Int!, $skip: Int!, $where: Proposal_filter) {\n    proposals(\n      first: $first\n      skip: $skip\n      where: $where\n      orderBy: created\n      orderDirection: desc\n    ) {\n      ...proposalFields\n    }\n  }\n"];
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
export function gql(source: "\n  query User($indexer: String!, $id: String!) {\n    user(indexer: $indexer, id: $id) {\n      id\n      proposal_count\n      vote_count\n      created\n    }\n  }\n"): (typeof documents)["\n  query User($indexer: String!, $id: String!) {\n    user(indexer: $indexer, id: $id) {\n      id\n      proposal_count\n      vote_count\n      created\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Leaderboard(\n    $indexer: String!\n    $first: Int!\n    $skip: Int!\n    $orderBy: Leaderboard_orderBy\n    $orderDirection: OrderDirection!\n    $where: Leaderboard_filter\n  ) {\n    leaderboards(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      where: $where\n    ) {\n      id\n      user {\n        id\n        created\n      }\n      proposal_count\n      vote_count\n    }\n  }\n"): (typeof documents)["\n  query Leaderboard(\n    $indexer: String!\n    $first: Int!\n    $skip: Int!\n    $orderBy: Leaderboard_orderBy\n    $orderDirection: OrderDirection!\n    $where: Leaderboard_filter\n  ) {\n    leaderboards(\n      indexer: $indexer\n      first: $first\n      skip: $skip\n      orderBy: $orderBy\n      orderDirection: $orderDirection\n      where: $where\n    ) {\n      id\n      user {\n        id\n        created\n      }\n      proposal_count\n      vote_count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query _Metadata($indexer: String!) {\n    _metadata(indexer: $indexer, id: \"last_indexed_block\") {\n      value\n    }\n  }\n"): (typeof documents)["\n  query _Metadata($indexer: String!) {\n    _metadata(indexer: $indexer, id: \"last_indexed_block\") {\n      value\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;