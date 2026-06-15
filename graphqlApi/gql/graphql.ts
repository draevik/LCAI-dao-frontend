/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimalVP: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Text: { input: any; output: any; }
};

/** ContractAbi caches verified contract ABIs to avoid repeated third-party API calls */
export type ContractAbi = {
  _indexer: Scalars['String']['output'];
  /** ABI as JSON string */
  abi: Scalars['Text']['output'];
  /** Contract address (checksummed) */
  contract_address: Scalars['String']['output'];
  /** Timestamp when ABI was fetched */
  created: Scalars['Int']['output'];
  /** Unique identifier (network_id:contract_address) */
  id: Scalars['String']['output'];
  /** Network/chain ID */
  network_id: Scalars['Int']['output'];
  /** Timestamp when ABI was last verified/updated */
  updated: Scalars['Int']['output'];
};

export type ContractAbi_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  abi_contains?: InputMaybe<Scalars['String']['input']>;
  abi_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  abi_not_contains?: InputMaybe<Scalars['String']['input']>;
  abi_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_address?: InputMaybe<Scalars['String']['input']>;
  contract_address_contains?: InputMaybe<Scalars['String']['input']>;
  contract_address_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_address_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contract_address_not?: InputMaybe<Scalars['String']['input']>;
  contract_address_not_contains?: InputMaybe<Scalars['String']['input']>;
  contract_address_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_address_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  created_not?: InputMaybe<Scalars['Int']['input']>;
  created_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  network_id?: InputMaybe<Scalars['Int']['input']>;
  network_id_gt?: InputMaybe<Scalars['Int']['input']>;
  network_id_gte?: InputMaybe<Scalars['Int']['input']>;
  network_id_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  network_id_lt?: InputMaybe<Scalars['Int']['input']>;
  network_id_lte?: InputMaybe<Scalars['Int']['input']>;
  network_id_not?: InputMaybe<Scalars['Int']['input']>;
  network_id_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  updated?: InputMaybe<Scalars['Int']['input']>;
  updated_gt?: InputMaybe<Scalars['Int']['input']>;
  updated_gte?: InputMaybe<Scalars['Int']['input']>;
  updated_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  updated_lt?: InputMaybe<Scalars['Int']['input']>;
  updated_lte?: InputMaybe<Scalars['Int']['input']>;
  updated_not?: InputMaybe<Scalars['Int']['input']>;
  updated_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type ContractAbi_OrderBy =
  | '_indexer'
  | 'abi'
  | 'contract_address'
  | 'created'
  | 'id'
  | 'network_id'
  | 'updated';

/** Delegate represents a user who has received voting power through delegation */
export type Delegate = {
  _indexer: Scalars['String']['output'];
  /** Timestamp when this delegate first received delegation */
  created: Scalars['Int']['output'];
  /** Number of unique delegators who have delegated to this delegate */
  delegator_count: Scalars['Int']['output'];
  /** Unique identifier for the delegate (space_id + delegate_address) */
  id: Scalars['String']['output'];
  /** Space this delegate belongs to */
  space: Space;
  /** Timestamp when this delegate's voting power was last updated */
  updated: Scalars['Int']['output'];
  /** User who is the delegate */
  user: User;
  /** Total voting power delegated to this delegate */
  voting_power: Scalars['BigDecimalVP']['output'];
  /** Parsed voting power as float */
  voting_power_parsed: Scalars['Float']['output'];
};

export type Delegate_Space_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  created_not?: InputMaybe<Scalars['Int']['input']>;
  created_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  delegate_count?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_gt?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_gte?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  delegate_count_lt?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_lte?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_not?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  execution_address?: InputMaybe<Scalars['String']['input']>;
  execution_address_contains?: InputMaybe<Scalars['String']['input']>;
  execution_address_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  execution_address_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  execution_address_not?: InputMaybe<Scalars['String']['input']>;
  execution_address_not_contains?: InputMaybe<Scalars['String']['input']>;
  execution_address_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  execution_address_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposal_count?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposal_count_lt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_lte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposal_threshold?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  proposal_threshold_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  proposer_count?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_gt?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_gte?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposer_count_lt?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_lte?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_not?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  quorum?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  quorum_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  timelock_delay?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timelock_delay_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_not?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  total_supply?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  total_supply_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  tx?: InputMaybe<Scalars['String']['input']>;
  tx_contains?: InputMaybe<Scalars['String']['input']>;
  tx_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tx_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tx_not?: InputMaybe<Scalars['String']['input']>;
  tx_not_contains?: InputMaybe<Scalars['String']['input']>;
  tx_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tx_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  vote_count?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  vote_count_lt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_lte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voter_count?: InputMaybe<Scalars['Int']['input']>;
  voter_count_gt?: InputMaybe<Scalars['Int']['input']>;
  voter_count_gte?: InputMaybe<Scalars['Int']['input']>;
  voter_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voter_count_lt?: InputMaybe<Scalars['Int']['input']>;
  voter_count_lte?: InputMaybe<Scalars['Int']['input']>;
  voter_count_not?: InputMaybe<Scalars['Int']['input']>;
  voter_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_delay?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_gt?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_gte?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_delay_lt?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_lte?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_not?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_period?: InputMaybe<Scalars['Int']['input']>;
  voting_period_gt?: InputMaybe<Scalars['Int']['input']>;
  voting_period_gte?: InputMaybe<Scalars['Int']['input']>;
  voting_period_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_period_lt?: InputMaybe<Scalars['Int']['input']>;
  voting_period_lte?: InputMaybe<Scalars['Int']['input']>;
  voting_period_not?: InputMaybe<Scalars['Int']['input']>;
  voting_period_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type Delegate_User_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  avatar_url_contains?: InputMaybe<Scalars['String']['input']>;
  avatar_url_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  avatar_url_not_contains?: InputMaybe<Scalars['String']['input']>;
  avatar_url_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  bio_contains?: InputMaybe<Scalars['String']['input']>;
  bio_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  bio_not_contains?: InputMaybe<Scalars['String']['input']>;
  bio_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  created_not?: InputMaybe<Scalars['Int']['input']>;
  created_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  discord_contains?: InputMaybe<Scalars['String']['input']>;
  discord_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  discord_not_contains?: InputMaybe<Scalars['String']['input']>;
  discord_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  display_name_contains?: InputMaybe<Scalars['String']['input']>;
  display_name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  display_name_not_contains?: InputMaybe<Scalars['String']['input']>;
  display_name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  github_contains?: InputMaybe<Scalars['String']['input']>;
  github_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  github_not_contains?: InputMaybe<Scalars['String']['input']>;
  github_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposal_count?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposal_count_lt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_lte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  statement_contains?: InputMaybe<Scalars['String']['input']>;
  statement_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  statement_not_contains?: InputMaybe<Scalars['String']['input']>;
  statement_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  twitter_contains?: InputMaybe<Scalars['String']['input']>;
  twitter_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  twitter_not_contains?: InputMaybe<Scalars['String']['input']>;
  twitter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  updated?: InputMaybe<Scalars['Int']['input']>;
  updated_gt?: InputMaybe<Scalars['Int']['input']>;
  updated_gte?: InputMaybe<Scalars['Int']['input']>;
  updated_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  updated_lt?: InputMaybe<Scalars['Int']['input']>;
  updated_lte?: InputMaybe<Scalars['Int']['input']>;
  updated_not?: InputMaybe<Scalars['Int']['input']>;
  updated_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  vote_count?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  vote_count_lt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_lte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  website_contains?: InputMaybe<Scalars['String']['input']>;
  website_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  website_not_contains?: InputMaybe<Scalars['String']['input']>;
  website_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
};

export type Delegate_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  created_not?: InputMaybe<Scalars['Int']['input']>;
  created_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  delegator_count?: InputMaybe<Scalars['Int']['input']>;
  delegator_count_gt?: InputMaybe<Scalars['Int']['input']>;
  delegator_count_gte?: InputMaybe<Scalars['Int']['input']>;
  delegator_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  delegator_count_lt?: InputMaybe<Scalars['Int']['input']>;
  delegator_count_lte?: InputMaybe<Scalars['Int']['input']>;
  delegator_count_not?: InputMaybe<Scalars['Int']['input']>;
  delegator_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  space?: InputMaybe<Scalars['String']['input']>;
  space_?: InputMaybe<Delegate_Space_Filter>;
  space_contains?: InputMaybe<Scalars['String']['input']>;
  space_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  space_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  space_not?: InputMaybe<Scalars['String']['input']>;
  space_not_contains?: InputMaybe<Scalars['String']['input']>;
  space_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  space_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  updated?: InputMaybe<Scalars['Int']['input']>;
  updated_gt?: InputMaybe<Scalars['Int']['input']>;
  updated_gte?: InputMaybe<Scalars['Int']['input']>;
  updated_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  updated_lt?: InputMaybe<Scalars['Int']['input']>;
  updated_lte?: InputMaybe<Scalars['Int']['input']>;
  updated_not?: InputMaybe<Scalars['Int']['input']>;
  updated_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<Delegate_User_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  voting_power?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  voting_power_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  voting_power_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  voting_power_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  voting_power_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  voting_power_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  voting_power_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  voting_power_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  voting_power_parsed?: InputMaybe<Scalars['Float']['input']>;
  voting_power_parsed_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  voting_power_parsed_not?: InputMaybe<Scalars['Float']['input']>;
  voting_power_parsed_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type Delegate_OrderBy =
  | '_indexer'
  | 'created'
  | 'delegator_count'
  | 'id'
  | 'space'
  | 'updated'
  | 'user'
  | 'voting_power'
  | 'voting_power_parsed';

/** Delegation represents an active delegation relationship from delegator to delegate */
export type Delegation = {
  _indexer: Scalars['String']['output'];
  /** Timestamp when this delegation was created/updated */
  created: Scalars['Int']['output'];
  /** Address of the delegate receiving voting power */
  delegate: Scalars['String']['output'];
  /** User who is delegating their voting power */
  delegator: User;
  /** Unique identifier for the delegation (space_id + delegator_address) */
  id: Scalars['String']['output'];
  /** Space this delegation belongs to */
  space: Space;
  /** Transaction hash of the delegation */
  tx: Scalars['String']['output'];
};

export type Delegation_Space_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  created_not?: InputMaybe<Scalars['Int']['input']>;
  created_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  delegate_count?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_gt?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_gte?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  delegate_count_lt?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_lte?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_not?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  execution_address?: InputMaybe<Scalars['String']['input']>;
  execution_address_contains?: InputMaybe<Scalars['String']['input']>;
  execution_address_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  execution_address_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  execution_address_not?: InputMaybe<Scalars['String']['input']>;
  execution_address_not_contains?: InputMaybe<Scalars['String']['input']>;
  execution_address_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  execution_address_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposal_count?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposal_count_lt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_lte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposal_threshold?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  proposal_threshold_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  proposer_count?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_gt?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_gte?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposer_count_lt?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_lte?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_not?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  quorum?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  quorum_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  timelock_delay?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timelock_delay_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_not?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  total_supply?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  total_supply_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  tx?: InputMaybe<Scalars['String']['input']>;
  tx_contains?: InputMaybe<Scalars['String']['input']>;
  tx_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tx_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tx_not?: InputMaybe<Scalars['String']['input']>;
  tx_not_contains?: InputMaybe<Scalars['String']['input']>;
  tx_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tx_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  vote_count?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  vote_count_lt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_lte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voter_count?: InputMaybe<Scalars['Int']['input']>;
  voter_count_gt?: InputMaybe<Scalars['Int']['input']>;
  voter_count_gte?: InputMaybe<Scalars['Int']['input']>;
  voter_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voter_count_lt?: InputMaybe<Scalars['Int']['input']>;
  voter_count_lte?: InputMaybe<Scalars['Int']['input']>;
  voter_count_not?: InputMaybe<Scalars['Int']['input']>;
  voter_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_delay?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_gt?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_gte?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_delay_lt?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_lte?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_not?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_period?: InputMaybe<Scalars['Int']['input']>;
  voting_period_gt?: InputMaybe<Scalars['Int']['input']>;
  voting_period_gte?: InputMaybe<Scalars['Int']['input']>;
  voting_period_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_period_lt?: InputMaybe<Scalars['Int']['input']>;
  voting_period_lte?: InputMaybe<Scalars['Int']['input']>;
  voting_period_not?: InputMaybe<Scalars['Int']['input']>;
  voting_period_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type Delegation_User_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  avatar_url_contains?: InputMaybe<Scalars['String']['input']>;
  avatar_url_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  avatar_url_not_contains?: InputMaybe<Scalars['String']['input']>;
  avatar_url_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  bio_contains?: InputMaybe<Scalars['String']['input']>;
  bio_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  bio_not_contains?: InputMaybe<Scalars['String']['input']>;
  bio_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  created_not?: InputMaybe<Scalars['Int']['input']>;
  created_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  discord_contains?: InputMaybe<Scalars['String']['input']>;
  discord_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  discord_not_contains?: InputMaybe<Scalars['String']['input']>;
  discord_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  display_name_contains?: InputMaybe<Scalars['String']['input']>;
  display_name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  display_name_not_contains?: InputMaybe<Scalars['String']['input']>;
  display_name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  github_contains?: InputMaybe<Scalars['String']['input']>;
  github_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  github_not_contains?: InputMaybe<Scalars['String']['input']>;
  github_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposal_count?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposal_count_lt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_lte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  statement_contains?: InputMaybe<Scalars['String']['input']>;
  statement_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  statement_not_contains?: InputMaybe<Scalars['String']['input']>;
  statement_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  twitter_contains?: InputMaybe<Scalars['String']['input']>;
  twitter_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  twitter_not_contains?: InputMaybe<Scalars['String']['input']>;
  twitter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  updated?: InputMaybe<Scalars['Int']['input']>;
  updated_gt?: InputMaybe<Scalars['Int']['input']>;
  updated_gte?: InputMaybe<Scalars['Int']['input']>;
  updated_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  updated_lt?: InputMaybe<Scalars['Int']['input']>;
  updated_lte?: InputMaybe<Scalars['Int']['input']>;
  updated_not?: InputMaybe<Scalars['Int']['input']>;
  updated_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  vote_count?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  vote_count_lt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_lte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  website_contains?: InputMaybe<Scalars['String']['input']>;
  website_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  website_not_contains?: InputMaybe<Scalars['String']['input']>;
  website_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
};

export type Delegation_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  created_not?: InputMaybe<Scalars['Int']['input']>;
  created_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  delegate?: InputMaybe<Scalars['String']['input']>;
  delegate_contains?: InputMaybe<Scalars['String']['input']>;
  delegate_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  delegate_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  delegate_not?: InputMaybe<Scalars['String']['input']>;
  delegate_not_contains?: InputMaybe<Scalars['String']['input']>;
  delegate_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  delegate_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  delegator?: InputMaybe<Scalars['String']['input']>;
  delegator_?: InputMaybe<Delegation_User_Filter>;
  delegator_contains?: InputMaybe<Scalars['String']['input']>;
  delegator_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  delegator_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  delegator_not?: InputMaybe<Scalars['String']['input']>;
  delegator_not_contains?: InputMaybe<Scalars['String']['input']>;
  delegator_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  delegator_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  space?: InputMaybe<Scalars['String']['input']>;
  space_?: InputMaybe<Delegation_Space_Filter>;
  space_contains?: InputMaybe<Scalars['String']['input']>;
  space_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  space_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  space_not?: InputMaybe<Scalars['String']['input']>;
  space_not_contains?: InputMaybe<Scalars['String']['input']>;
  space_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  space_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tx?: InputMaybe<Scalars['String']['input']>;
  tx_contains?: InputMaybe<Scalars['String']['input']>;
  tx_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tx_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tx_not?: InputMaybe<Scalars['String']['input']>;
  tx_not_contains?: InputMaybe<Scalars['String']['input']>;
  tx_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tx_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Delegation_OrderBy =
  | '_indexer'
  | 'created'
  | 'delegate'
  | 'delegator'
  | 'id'
  | 'space'
  | 'tx';

/** Leaderboard tracks user participation statistics within a space */
export type Leaderboard = {
  _indexer: Scalars['String']['output'];
  /** Unique identifier for the leaderboard entry */
  id: Scalars['String']['output'];
  /** Number of proposals created by user in this space */
  proposal_count: Scalars['Int']['output'];
  /** Space this leaderboard entry belongs to */
  space: Space;
  /** User being tracked */
  user: User;
  /** Number of votes cast by user in this space */
  vote_count: Scalars['Int']['output'];
};

export type Leaderboard_Space_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  created_not?: InputMaybe<Scalars['Int']['input']>;
  created_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  delegate_count?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_gt?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_gte?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  delegate_count_lt?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_lte?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_not?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  execution_address?: InputMaybe<Scalars['String']['input']>;
  execution_address_contains?: InputMaybe<Scalars['String']['input']>;
  execution_address_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  execution_address_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  execution_address_not?: InputMaybe<Scalars['String']['input']>;
  execution_address_not_contains?: InputMaybe<Scalars['String']['input']>;
  execution_address_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  execution_address_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposal_count?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposal_count_lt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_lte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposal_threshold?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  proposal_threshold_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  proposer_count?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_gt?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_gte?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposer_count_lt?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_lte?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_not?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  quorum?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  quorum_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  timelock_delay?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timelock_delay_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_not?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  total_supply?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  total_supply_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  tx?: InputMaybe<Scalars['String']['input']>;
  tx_contains?: InputMaybe<Scalars['String']['input']>;
  tx_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tx_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tx_not?: InputMaybe<Scalars['String']['input']>;
  tx_not_contains?: InputMaybe<Scalars['String']['input']>;
  tx_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tx_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  vote_count?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  vote_count_lt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_lte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voter_count?: InputMaybe<Scalars['Int']['input']>;
  voter_count_gt?: InputMaybe<Scalars['Int']['input']>;
  voter_count_gte?: InputMaybe<Scalars['Int']['input']>;
  voter_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voter_count_lt?: InputMaybe<Scalars['Int']['input']>;
  voter_count_lte?: InputMaybe<Scalars['Int']['input']>;
  voter_count_not?: InputMaybe<Scalars['Int']['input']>;
  voter_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_delay?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_gt?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_gte?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_delay_lt?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_lte?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_not?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_period?: InputMaybe<Scalars['Int']['input']>;
  voting_period_gt?: InputMaybe<Scalars['Int']['input']>;
  voting_period_gte?: InputMaybe<Scalars['Int']['input']>;
  voting_period_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_period_lt?: InputMaybe<Scalars['Int']['input']>;
  voting_period_lte?: InputMaybe<Scalars['Int']['input']>;
  voting_period_not?: InputMaybe<Scalars['Int']['input']>;
  voting_period_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type Leaderboard_User_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  avatar_url_contains?: InputMaybe<Scalars['String']['input']>;
  avatar_url_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  avatar_url_not_contains?: InputMaybe<Scalars['String']['input']>;
  avatar_url_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  bio_contains?: InputMaybe<Scalars['String']['input']>;
  bio_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  bio_not_contains?: InputMaybe<Scalars['String']['input']>;
  bio_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  created_not?: InputMaybe<Scalars['Int']['input']>;
  created_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  discord_contains?: InputMaybe<Scalars['String']['input']>;
  discord_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  discord_not_contains?: InputMaybe<Scalars['String']['input']>;
  discord_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  display_name_contains?: InputMaybe<Scalars['String']['input']>;
  display_name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  display_name_not_contains?: InputMaybe<Scalars['String']['input']>;
  display_name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  github_contains?: InputMaybe<Scalars['String']['input']>;
  github_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  github_not_contains?: InputMaybe<Scalars['String']['input']>;
  github_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposal_count?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposal_count_lt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_lte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  statement_contains?: InputMaybe<Scalars['String']['input']>;
  statement_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  statement_not_contains?: InputMaybe<Scalars['String']['input']>;
  statement_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  twitter_contains?: InputMaybe<Scalars['String']['input']>;
  twitter_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  twitter_not_contains?: InputMaybe<Scalars['String']['input']>;
  twitter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  updated?: InputMaybe<Scalars['Int']['input']>;
  updated_gt?: InputMaybe<Scalars['Int']['input']>;
  updated_gte?: InputMaybe<Scalars['Int']['input']>;
  updated_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  updated_lt?: InputMaybe<Scalars['Int']['input']>;
  updated_lte?: InputMaybe<Scalars['Int']['input']>;
  updated_not?: InputMaybe<Scalars['Int']['input']>;
  updated_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  vote_count?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  vote_count_lt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_lte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  website_contains?: InputMaybe<Scalars['String']['input']>;
  website_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  website_not_contains?: InputMaybe<Scalars['String']['input']>;
  website_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
};

export type Leaderboard_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposal_count?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposal_count_lt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_lte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  space?: InputMaybe<Scalars['String']['input']>;
  space_?: InputMaybe<Leaderboard_Space_Filter>;
  space_contains?: InputMaybe<Scalars['String']['input']>;
  space_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  space_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  space_not?: InputMaybe<Scalars['String']['input']>;
  space_not_contains?: InputMaybe<Scalars['String']['input']>;
  space_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  space_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<Leaderboard_User_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  vote_count?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  vote_count_lt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_lte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type Leaderboard_OrderBy =
  | '_indexer'
  | 'id'
  | 'proposal_count'
  | 'space'
  | 'user'
  | 'vote_count';

export type OrderDirection =
  | 'asc'
  | 'desc';

/** Proposal represents a governance proposal within a space */
export type Proposal = {
  _indexer: Scalars['String']['output'];
  /** User who created the proposal */
  author: User;
  /** Whether proposal has been cancelled */
  cancelled: Scalars['Boolean']['output'];
  /** Timestamp when proposal was created */
  created: Scalars['Int']['output'];
  /** Timestamp when proposal was last edited (optional) */
  edited: Maybe<Scalars['Int']['output']>;
  /** Minimum block number when voting can end (only defined on EVM) */
  end_block_number: Maybe<Scalars['Int']['output']>;
  /** Minimum timestamp when voting can end */
  end_time: Scalars['Int']['output'];
  /** Whether proposal has been fully executed on-chain */
  executed: Scalars['Boolean']['output'];
  /** Hash for tracking proposal execution */
  execution_hash: Scalars['String']['output'];
  /** Whether proposal has been queued in the timelock and is ready for execution */
  execution_ready: Scalars['Boolean']['output'];
  /** Timestamp when proposal can be executed (null until queued) */
  execution_time: Maybe<Scalars['Int']['output']>;
  /** Transaction hash of proposal execution (optional) */
  execution_tx: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the proposal */
  id: Scalars['String']['output'];
  /** Proposal metadata containing title, body, and choices */
  metadata: Maybe<ProposalMetadataItem>;
  /** ID of the proposal within the space */
  proposal_id: Scalars['String']['output'];
  /** Proposal threshold snapshot at proposal creation */
  proposal_threshold: Scalars['BigDecimalVP']['output'];
  /** Minimum voting power required for execution */
  quorum: Scalars['BigDecimalVP']['output'];
  /** Voting power for choice 1 */
  scores_1: Scalars['BigDecimalVP']['output'];
  /** Parsed voting power for choice 1 as float */
  scores_1_parsed: Scalars['Float']['output'];
  /** Voting power for choice 2 */
  scores_2: Scalars['BigDecimalVP']['output'];
  /** Parsed voting power for choice 2 as float */
  scores_2_parsed: Scalars['Float']['output'];
  /** Voting power for choice 3 */
  scores_3: Scalars['BigDecimalVP']['output'];
  /** Parsed voting power for choice 3 as float */
  scores_3_parsed: Scalars['Float']['output'];
  /** Total voting power cast */
  scores_total: Scalars['BigDecimalVP']['output'];
  /** Parsed total voting power as float */
  scores_total_parsed: Scalars['Float']['output'];
  /** Timepoint used for voting power calculation (blocks on EVM, seconds on Starknet) */
  snapshot: Scalars['Int']['output'];
  /** Space this proposal belongs to */
  space: Space;
  /** When voting starts (only defined on EVM) */
  start_block_number: Maybe<Scalars['Int']['output']>;
  /** Timestamp when proposal starts */
  start_time: Scalars['Int']['output'];
  /** Delay in blocks before timelock execution */
  timelock_delay: Scalars['BigInt']['output'];
  /** Transaction hash of proposal creation */
  tx: Scalars['String']['output'];
  /** Number of votes cast on this proposal */
  vote_count: Scalars['Int']['output'];
  /** Voting delay snapshot at proposal creation (blocks on EVM, seconds on Starknet) */
  voting_delay: Scalars['Int']['output'];
  /** Voting period snapshot at proposal creation (blocks on EVM, seconds on Starknet) */
  voting_period: Scalars['Int']['output'];
  /** Number of decimal places for voting power display */
  vp_decimals: Scalars['Int']['output'];
};

/** Metadata for a proposal containing display content and voting options */
export type ProposalMetadataItem = {
  _indexer: Scalars['String']['output'];
  /** Main body text of the proposal */
  body: Maybe<Scalars['Text']['output']>;
  /** Array of voting choices (e.g., ['For', 'Against', 'Abstain']) */
  choices: Array<Scalars['String']['output']>;
  /** Link to discussion forum or thread */
  discussion: Maybe<Scalars['Text']['output']>;
  /** Execution details and parameters */
  execution: Maybe<Scalars['Text']['output']>;
  /** Unique identifier for the metadata item */
  id: Scalars['String']['output'];
  /** Array of label tags for categorization */
  labels: Array<Scalars['String']['output']>;
  /** Tenderly bundled simulation results as JSON array */
  simulation: Maybe<Scalars['Text']['output']>;
  /** Title of the proposal */
  title: Maybe<Scalars['Text']['output']>;
};

export type ProposalMetadataItem_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  body_contains?: InputMaybe<Scalars['String']['input']>;
  body_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  body_not_contains?: InputMaybe<Scalars['String']['input']>;
  body_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  discussion_contains?: InputMaybe<Scalars['String']['input']>;
  discussion_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  discussion_not_contains?: InputMaybe<Scalars['String']['input']>;
  discussion_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  execution_contains?: InputMaybe<Scalars['String']['input']>;
  execution_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  execution_not_contains?: InputMaybe<Scalars['String']['input']>;
  execution_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  simulation_contains?: InputMaybe<Scalars['String']['input']>;
  simulation_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  simulation_not_contains?: InputMaybe<Scalars['String']['input']>;
  simulation_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
};

export type ProposalMetadataItem_OrderBy =
  | '_indexer'
  | 'body'
  | 'discussion'
  | 'execution'
  | 'id'
  | 'simulation'
  | 'title';

export type Proposal_ProposalMetadataItem_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  body_contains?: InputMaybe<Scalars['String']['input']>;
  body_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  body_not_contains?: InputMaybe<Scalars['String']['input']>;
  body_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  discussion_contains?: InputMaybe<Scalars['String']['input']>;
  discussion_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  discussion_not_contains?: InputMaybe<Scalars['String']['input']>;
  discussion_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  execution_contains?: InputMaybe<Scalars['String']['input']>;
  execution_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  execution_not_contains?: InputMaybe<Scalars['String']['input']>;
  execution_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  simulation_contains?: InputMaybe<Scalars['String']['input']>;
  simulation_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  simulation_not_contains?: InputMaybe<Scalars['String']['input']>;
  simulation_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
};

export type Proposal_Space_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  created_not?: InputMaybe<Scalars['Int']['input']>;
  created_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  delegate_count?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_gt?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_gte?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  delegate_count_lt?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_lte?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_not?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  execution_address?: InputMaybe<Scalars['String']['input']>;
  execution_address_contains?: InputMaybe<Scalars['String']['input']>;
  execution_address_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  execution_address_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  execution_address_not?: InputMaybe<Scalars['String']['input']>;
  execution_address_not_contains?: InputMaybe<Scalars['String']['input']>;
  execution_address_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  execution_address_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposal_count?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposal_count_lt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_lte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposal_threshold?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  proposal_threshold_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  proposer_count?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_gt?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_gte?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposer_count_lt?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_lte?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_not?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  quorum?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  quorum_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  timelock_delay?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timelock_delay_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_not?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  total_supply?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  total_supply_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  tx?: InputMaybe<Scalars['String']['input']>;
  tx_contains?: InputMaybe<Scalars['String']['input']>;
  tx_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tx_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tx_not?: InputMaybe<Scalars['String']['input']>;
  tx_not_contains?: InputMaybe<Scalars['String']['input']>;
  tx_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tx_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  vote_count?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  vote_count_lt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_lte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voter_count?: InputMaybe<Scalars['Int']['input']>;
  voter_count_gt?: InputMaybe<Scalars['Int']['input']>;
  voter_count_gte?: InputMaybe<Scalars['Int']['input']>;
  voter_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voter_count_lt?: InputMaybe<Scalars['Int']['input']>;
  voter_count_lte?: InputMaybe<Scalars['Int']['input']>;
  voter_count_not?: InputMaybe<Scalars['Int']['input']>;
  voter_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_delay?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_gt?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_gte?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_delay_lt?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_lte?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_not?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_period?: InputMaybe<Scalars['Int']['input']>;
  voting_period_gt?: InputMaybe<Scalars['Int']['input']>;
  voting_period_gte?: InputMaybe<Scalars['Int']['input']>;
  voting_period_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_period_lt?: InputMaybe<Scalars['Int']['input']>;
  voting_period_lte?: InputMaybe<Scalars['Int']['input']>;
  voting_period_not?: InputMaybe<Scalars['Int']['input']>;
  voting_period_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type Proposal_User_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  avatar_url_contains?: InputMaybe<Scalars['String']['input']>;
  avatar_url_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  avatar_url_not_contains?: InputMaybe<Scalars['String']['input']>;
  avatar_url_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  bio_contains?: InputMaybe<Scalars['String']['input']>;
  bio_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  bio_not_contains?: InputMaybe<Scalars['String']['input']>;
  bio_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  created_not?: InputMaybe<Scalars['Int']['input']>;
  created_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  discord_contains?: InputMaybe<Scalars['String']['input']>;
  discord_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  discord_not_contains?: InputMaybe<Scalars['String']['input']>;
  discord_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  display_name_contains?: InputMaybe<Scalars['String']['input']>;
  display_name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  display_name_not_contains?: InputMaybe<Scalars['String']['input']>;
  display_name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  github_contains?: InputMaybe<Scalars['String']['input']>;
  github_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  github_not_contains?: InputMaybe<Scalars['String']['input']>;
  github_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposal_count?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposal_count_lt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_lte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  statement_contains?: InputMaybe<Scalars['String']['input']>;
  statement_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  statement_not_contains?: InputMaybe<Scalars['String']['input']>;
  statement_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  twitter_contains?: InputMaybe<Scalars['String']['input']>;
  twitter_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  twitter_not_contains?: InputMaybe<Scalars['String']['input']>;
  twitter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  updated?: InputMaybe<Scalars['Int']['input']>;
  updated_gt?: InputMaybe<Scalars['Int']['input']>;
  updated_gte?: InputMaybe<Scalars['Int']['input']>;
  updated_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  updated_lt?: InputMaybe<Scalars['Int']['input']>;
  updated_lte?: InputMaybe<Scalars['Int']['input']>;
  updated_not?: InputMaybe<Scalars['Int']['input']>;
  updated_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  vote_count?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  vote_count_lt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_lte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  website_contains?: InputMaybe<Scalars['String']['input']>;
  website_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  website_not_contains?: InputMaybe<Scalars['String']['input']>;
  website_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
};

export type Proposal_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  author?: InputMaybe<Scalars['String']['input']>;
  author_?: InputMaybe<Proposal_User_Filter>;
  author_contains?: InputMaybe<Scalars['String']['input']>;
  author_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  author_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  author_not?: InputMaybe<Scalars['String']['input']>;
  author_not_contains?: InputMaybe<Scalars['String']['input']>;
  author_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  author_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  cancelled?: InputMaybe<Scalars['Boolean']['input']>;
  cancelled_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  cancelled_not?: InputMaybe<Scalars['Boolean']['input']>;
  cancelled_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  created_not?: InputMaybe<Scalars['Int']['input']>;
  created_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  edited?: InputMaybe<Scalars['Int']['input']>;
  edited_gt?: InputMaybe<Scalars['Int']['input']>;
  edited_gte?: InputMaybe<Scalars['Int']['input']>;
  edited_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  edited_lt?: InputMaybe<Scalars['Int']['input']>;
  edited_lte?: InputMaybe<Scalars['Int']['input']>;
  edited_not?: InputMaybe<Scalars['Int']['input']>;
  edited_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  end_block_number?: InputMaybe<Scalars['Int']['input']>;
  end_block_number_gt?: InputMaybe<Scalars['Int']['input']>;
  end_block_number_gte?: InputMaybe<Scalars['Int']['input']>;
  end_block_number_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  end_block_number_lt?: InputMaybe<Scalars['Int']['input']>;
  end_block_number_lte?: InputMaybe<Scalars['Int']['input']>;
  end_block_number_not?: InputMaybe<Scalars['Int']['input']>;
  end_block_number_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  end_time?: InputMaybe<Scalars['Int']['input']>;
  end_time_gt?: InputMaybe<Scalars['Int']['input']>;
  end_time_gte?: InputMaybe<Scalars['Int']['input']>;
  end_time_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  end_time_lt?: InputMaybe<Scalars['Int']['input']>;
  end_time_lte?: InputMaybe<Scalars['Int']['input']>;
  end_time_not?: InputMaybe<Scalars['Int']['input']>;
  end_time_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  executed?: InputMaybe<Scalars['Boolean']['input']>;
  executed_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  executed_not?: InputMaybe<Scalars['Boolean']['input']>;
  executed_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  execution_hash?: InputMaybe<Scalars['String']['input']>;
  execution_hash_contains?: InputMaybe<Scalars['String']['input']>;
  execution_hash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  execution_hash_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  execution_hash_not?: InputMaybe<Scalars['String']['input']>;
  execution_hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  execution_hash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  execution_hash_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  execution_ready?: InputMaybe<Scalars['Boolean']['input']>;
  execution_ready_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  execution_ready_not?: InputMaybe<Scalars['Boolean']['input']>;
  execution_ready_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  execution_time?: InputMaybe<Scalars['Int']['input']>;
  execution_time_gt?: InputMaybe<Scalars['Int']['input']>;
  execution_time_gte?: InputMaybe<Scalars['Int']['input']>;
  execution_time_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  execution_time_lt?: InputMaybe<Scalars['Int']['input']>;
  execution_time_lte?: InputMaybe<Scalars['Int']['input']>;
  execution_time_not?: InputMaybe<Scalars['Int']['input']>;
  execution_time_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  execution_tx?: InputMaybe<Scalars['String']['input']>;
  execution_tx_contains?: InputMaybe<Scalars['String']['input']>;
  execution_tx_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  execution_tx_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  execution_tx_not?: InputMaybe<Scalars['String']['input']>;
  execution_tx_not_contains?: InputMaybe<Scalars['String']['input']>;
  execution_tx_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  execution_tx_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  metadata?: InputMaybe<Scalars['String']['input']>;
  metadata_?: InputMaybe<Proposal_ProposalMetadataItem_Filter>;
  metadata_contains?: InputMaybe<Scalars['String']['input']>;
  metadata_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  metadata_not?: InputMaybe<Scalars['String']['input']>;
  metadata_not_contains?: InputMaybe<Scalars['String']['input']>;
  metadata_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposal_id?: InputMaybe<Scalars['String']['input']>;
  proposal_id_contains?: InputMaybe<Scalars['String']['input']>;
  proposal_id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposal_id_not?: InputMaybe<Scalars['String']['input']>;
  proposal_id_not_contains?: InputMaybe<Scalars['String']['input']>;
  proposal_id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposal_threshold?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  proposal_threshold_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  quorum?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  quorum_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  scores_1?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_1_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_1_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_1_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  scores_1_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_1_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_1_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_1_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  scores_1_parsed?: InputMaybe<Scalars['Float']['input']>;
  scores_1_parsed_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  scores_1_parsed_not?: InputMaybe<Scalars['Float']['input']>;
  scores_1_parsed_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  scores_2?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_2_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_2_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_2_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  scores_2_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_2_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_2_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_2_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  scores_2_parsed?: InputMaybe<Scalars['Float']['input']>;
  scores_2_parsed_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  scores_2_parsed_not?: InputMaybe<Scalars['Float']['input']>;
  scores_2_parsed_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  scores_3?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_3_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_3_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_3_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  scores_3_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_3_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_3_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_3_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  scores_3_parsed?: InputMaybe<Scalars['Float']['input']>;
  scores_3_parsed_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  scores_3_parsed_not?: InputMaybe<Scalars['Float']['input']>;
  scores_3_parsed_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  scores_total?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_total_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_total_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_total_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  scores_total_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_total_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_total_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  scores_total_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  scores_total_parsed?: InputMaybe<Scalars['Float']['input']>;
  scores_total_parsed_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  scores_total_parsed_not?: InputMaybe<Scalars['Float']['input']>;
  scores_total_parsed_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  snapshot?: InputMaybe<Scalars['Int']['input']>;
  snapshot_gt?: InputMaybe<Scalars['Int']['input']>;
  snapshot_gte?: InputMaybe<Scalars['Int']['input']>;
  snapshot_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  snapshot_lt?: InputMaybe<Scalars['Int']['input']>;
  snapshot_lte?: InputMaybe<Scalars['Int']['input']>;
  snapshot_not?: InputMaybe<Scalars['Int']['input']>;
  snapshot_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  space?: InputMaybe<Scalars['String']['input']>;
  space_?: InputMaybe<Proposal_Space_Filter>;
  space_contains?: InputMaybe<Scalars['String']['input']>;
  space_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  space_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  space_not?: InputMaybe<Scalars['String']['input']>;
  space_not_contains?: InputMaybe<Scalars['String']['input']>;
  space_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  space_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  start_block_number?: InputMaybe<Scalars['Int']['input']>;
  start_block_number_gt?: InputMaybe<Scalars['Int']['input']>;
  start_block_number_gte?: InputMaybe<Scalars['Int']['input']>;
  start_block_number_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  start_block_number_lt?: InputMaybe<Scalars['Int']['input']>;
  start_block_number_lte?: InputMaybe<Scalars['Int']['input']>;
  start_block_number_not?: InputMaybe<Scalars['Int']['input']>;
  start_block_number_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  start_time?: InputMaybe<Scalars['Int']['input']>;
  start_time_gt?: InputMaybe<Scalars['Int']['input']>;
  start_time_gte?: InputMaybe<Scalars['Int']['input']>;
  start_time_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  start_time_lt?: InputMaybe<Scalars['Int']['input']>;
  start_time_lte?: InputMaybe<Scalars['Int']['input']>;
  start_time_not?: InputMaybe<Scalars['Int']['input']>;
  start_time_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  timelock_delay?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timelock_delay_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_not?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  tx?: InputMaybe<Scalars['String']['input']>;
  tx_contains?: InputMaybe<Scalars['String']['input']>;
  tx_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tx_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tx_not?: InputMaybe<Scalars['String']['input']>;
  tx_not_contains?: InputMaybe<Scalars['String']['input']>;
  tx_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tx_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  vote_count?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  vote_count_lt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_lte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_delay?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_gt?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_gte?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_delay_lt?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_lte?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_not?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_period?: InputMaybe<Scalars['Int']['input']>;
  voting_period_gt?: InputMaybe<Scalars['Int']['input']>;
  voting_period_gte?: InputMaybe<Scalars['Int']['input']>;
  voting_period_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_period_lt?: InputMaybe<Scalars['Int']['input']>;
  voting_period_lte?: InputMaybe<Scalars['Int']['input']>;
  voting_period_not?: InputMaybe<Scalars['Int']['input']>;
  voting_period_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  vp_decimals?: InputMaybe<Scalars['Int']['input']>;
  vp_decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  vp_decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  vp_decimals_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  vp_decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  vp_decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  vp_decimals_not?: InputMaybe<Scalars['Int']['input']>;
  vp_decimals_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type Proposal_OrderBy =
  | '_indexer'
  | 'author'
  | 'cancelled'
  | 'created'
  | 'edited'
  | 'end_block_number'
  | 'end_time'
  | 'executed'
  | 'execution_hash'
  | 'execution_ready'
  | 'execution_time'
  | 'execution_tx'
  | 'id'
  | 'metadata'
  | 'proposal_id'
  | 'proposal_threshold'
  | 'quorum'
  | 'scores_1'
  | 'scores_1_parsed'
  | 'scores_2'
  | 'scores_2_parsed'
  | 'scores_3'
  | 'scores_3_parsed'
  | 'scores_total'
  | 'scores_total_parsed'
  | 'snapshot'
  | 'space'
  | 'start_block_number'
  | 'start_time'
  | 'timelock_delay'
  | 'tx'
  | 'vote_count'
  | 'voting_delay'
  | 'voting_period'
  | 'vp_decimals';

export type Query = {
  _checkpoint: Maybe<_Checkpoint>;
  _checkpoints: Array<_Checkpoint>;
  _metadata: Maybe<_Metadata>;
  _metadatas: Array<_Metadata>;
  contractabi: Maybe<ContractAbi>;
  contractabis: Array<ContractAbi>;
  delegate: Maybe<Delegate>;
  delegates: Array<Delegate>;
  delegation: Maybe<Delegation>;
  delegations: Array<Delegation>;
  leaderboard: Maybe<Leaderboard>;
  leaderboards: Array<Leaderboard>;
  proposal: Maybe<Proposal>;
  proposalmetadataitem: Maybe<ProposalMetadataItem>;
  proposalmetadataitems: Array<ProposalMetadataItem>;
  proposals: Array<Proposal>;
  space: Maybe<Space>;
  spaces: Array<Space>;
  treasurytransaction: Maybe<TreasuryTransaction>;
  treasurytransactions: Array<TreasuryTransaction>;
  user: Maybe<User>;
  users: Array<User>;
  vote: Maybe<Vote>;
  votemetadataitem: Maybe<VoteMetadataItem>;
  votemetadataitems: Array<VoteMetadataItem>;
  votes: Array<Vote>;
};


export type Query_CheckpointArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  indexer?: InputMaybe<Scalars['String']['input']>;
};


export type Query_CheckpointsArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  indexer?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<_Checkpoint_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<_Checkpoint_Filter>;
};


export type Query_MetadataArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  indexer?: InputMaybe<Scalars['String']['input']>;
};


export type Query_MetadatasArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  indexer?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<_Metadata_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<_Metadata_Filter>;
};


export type QueryContractabiArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  indexer?: InputMaybe<Scalars['String']['input']>;
};


export type QueryContractabisArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  indexer?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<ContractAbi_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ContractAbi_Filter>;
};


export type QueryDelegateArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  indexer?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDelegatesArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  indexer?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Delegate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Delegate_Filter>;
};


export type QueryDelegationArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  indexer?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDelegationsArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  indexer?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Delegation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Delegation_Filter>;
};


export type QueryLeaderboardArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  indexer?: InputMaybe<Scalars['String']['input']>;
};


export type QueryLeaderboardsArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  indexer?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Leaderboard_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Leaderboard_Filter>;
};


export type QueryProposalArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  indexer?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProposalmetadataitemArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  indexer?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProposalmetadataitemsArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  indexer?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<ProposalMetadataItem_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProposalMetadataItem_Filter>;
};


export type QueryProposalsArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  indexer?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Proposal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Proposal_Filter>;
};


export type QuerySpaceArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  indexer?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySpacesArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  indexer?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Space_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Space_Filter>;
};


export type QueryTreasurytransactionArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  indexer?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTreasurytransactionsArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  indexer?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<TreasuryTransaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TreasuryTransaction_Filter>;
};


export type QueryUserArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  indexer?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUsersArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  indexer?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<User_Filter>;
};


export type QueryVoteArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  indexer?: InputMaybe<Scalars['String']['input']>;
};


export type QueryVotemetadataitemArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  indexer?: InputMaybe<Scalars['String']['input']>;
};


export type QueryVotemetadataitemsArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  indexer?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<VoteMetadataItem_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<VoteMetadataItem_Filter>;
};


export type QueryVotesArgs = {
  block?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  indexer?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Vote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Vote_Filter>;
};

/** Space represents a DAO or governance organization on Snapshot X */
export type Space = {
  _indexer: Scalars['String']['output'];
  /** Timestamp when the space was created */
  created: Scalars['Int']['output'];
  /** Number of decimal places for the token */
  decimals: Scalars['Int']['output'];
  /** Number of unique delegates in this space */
  delegate_count: Scalars['Int']['output'];
  /** Contract address of the execution strategy */
  execution_address: Scalars['String']['output'];
  /** Unique identifier for the space */
  id: Scalars['String']['output'];
  /** Display name of the space */
  name: Scalars['String']['output'];
  /** Total number of proposals created in this space */
  proposal_count: Scalars['Int']['output'];
  /** Minimum voting power required to create a proposal */
  proposal_threshold: Scalars['BigDecimalVP']['output'];
  /** All proposals belonging to this space */
  proposals: Array<Proposal>;
  /** Number of unique proposers in this space */
  proposer_count: Scalars['Int']['output'];
  /** Minimum voting power required for execution */
  quorum: Scalars['BigDecimalVP']['output'];
  /** Token symbol (e.g., 'UNI', 'AAVE') */
  symbol: Scalars['String']['output'];
  /** Delay in blocks before timelock execution can proceed */
  timelock_delay: Scalars['BigInt']['output'];
  /** Token contract address (optional) */
  token: Maybe<Scalars['String']['output']>;
  /** Total supply of the token */
  total_supply: Scalars['BigDecimalVP']['output'];
  /** Transaction hash of space creation */
  tx: Scalars['String']['output'];
  /** Total number of votes cast in this space */
  vote_count: Scalars['Int']['output'];
  /** Number of unique voters in this space */
  voter_count: Scalars['Int']['output'];
  /** Delay before voting starts after proposal creation (blocks on EVM, seconds on Starknet) */
  voting_delay: Scalars['Int']['output'];
  /** Voting duration for proposals (blocks on EVM, seconds on Starknet) */
  voting_period: Scalars['Int']['output'];
};

export type Space_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  created_not?: InputMaybe<Scalars['Int']['input']>;
  created_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  delegate_count?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_gt?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_gte?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  delegate_count_lt?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_lte?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_not?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  execution_address?: InputMaybe<Scalars['String']['input']>;
  execution_address_contains?: InputMaybe<Scalars['String']['input']>;
  execution_address_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  execution_address_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  execution_address_not?: InputMaybe<Scalars['String']['input']>;
  execution_address_not_contains?: InputMaybe<Scalars['String']['input']>;
  execution_address_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  execution_address_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposal_count?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposal_count_lt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_lte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposal_threshold?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  proposal_threshold_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  proposer_count?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_gt?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_gte?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposer_count_lt?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_lte?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_not?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  quorum?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  quorum_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  timelock_delay?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timelock_delay_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_not?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  total_supply?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  total_supply_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  tx?: InputMaybe<Scalars['String']['input']>;
  tx_contains?: InputMaybe<Scalars['String']['input']>;
  tx_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tx_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tx_not?: InputMaybe<Scalars['String']['input']>;
  tx_not_contains?: InputMaybe<Scalars['String']['input']>;
  tx_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tx_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  vote_count?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  vote_count_lt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_lte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voter_count?: InputMaybe<Scalars['Int']['input']>;
  voter_count_gt?: InputMaybe<Scalars['Int']['input']>;
  voter_count_gte?: InputMaybe<Scalars['Int']['input']>;
  voter_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voter_count_lt?: InputMaybe<Scalars['Int']['input']>;
  voter_count_lte?: InputMaybe<Scalars['Int']['input']>;
  voter_count_not?: InputMaybe<Scalars['Int']['input']>;
  voter_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_delay?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_gt?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_gte?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_delay_lt?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_lte?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_not?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_period?: InputMaybe<Scalars['Int']['input']>;
  voting_period_gt?: InputMaybe<Scalars['Int']['input']>;
  voting_period_gte?: InputMaybe<Scalars['Int']['input']>;
  voting_period_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_period_lt?: InputMaybe<Scalars['Int']['input']>;
  voting_period_lte?: InputMaybe<Scalars['Int']['input']>;
  voting_period_not?: InputMaybe<Scalars['Int']['input']>;
  voting_period_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type Space_OrderBy =
  | '_indexer'
  | 'created'
  | 'decimals'
  | 'delegate_count'
  | 'execution_address'
  | 'id'
  | 'name'
  | 'proposal_count'
  | 'proposal_threshold'
  | 'proposer_count'
  | 'quorum'
  | 'symbol'
  | 'timelock_delay'
  | 'token'
  | 'total_supply'
  | 'tx'
  | 'vote_count'
  | 'voter_count'
  | 'voting_delay'
  | 'voting_period';

/** TreasuryTransaction represents an inflow or outflow from the DAO treasury */
export type TreasuryTransaction = {
  _indexer: Scalars['String']['output'];
  /** Amount transferred (raw) */
  amount: Scalars['BigDecimalVP']['output'];
  /** Amount parsed as float */
  amount_parsed: Scalars['Float']['output'];
  /** Timestamp */
  created: Scalars['Int']['output'];
  /** Sender address */
  from_address: Scalars['String']['output'];
  /** Unique identifier (tx_hash/log_index) */
  id: Scalars['String']['output'];
  /** Recipient address */
  to_address: Scalars['String']['output'];
  /** Token address (zero address for ETH) */
  token: Scalars['String']['output'];
  /** Token decimals */
  token_decimals: Scalars['Int']['output'];
  /** Token symbol */
  token_symbol: Scalars['String']['output'];
  /** Transaction hash */
  tx: Scalars['String']['output'];
  /** Transaction type: deposit_erc20, transfer_erc20, transfer_eth */
  type: Scalars['String']['output'];
};

export type TreasuryTransaction_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  amount?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  amount_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  amount_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  amount_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  amount_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  amount_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  amount_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  amount_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  amount_parsed?: InputMaybe<Scalars['Float']['input']>;
  amount_parsed_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  amount_parsed_not?: InputMaybe<Scalars['Float']['input']>;
  amount_parsed_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  created_not?: InputMaybe<Scalars['Int']['input']>;
  created_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  from_address?: InputMaybe<Scalars['String']['input']>;
  from_address_contains?: InputMaybe<Scalars['String']['input']>;
  from_address_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_address_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  from_address_not?: InputMaybe<Scalars['String']['input']>;
  from_address_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_address_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_address_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  to_address?: InputMaybe<Scalars['String']['input']>;
  to_address_contains?: InputMaybe<Scalars['String']['input']>;
  to_address_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_address_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  to_address_not?: InputMaybe<Scalars['String']['input']>;
  to_address_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_address_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_address_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_decimals?: InputMaybe<Scalars['Int']['input']>;
  token_decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  token_decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  token_decimals_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  token_decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  token_decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  token_decimals_not?: InputMaybe<Scalars['Int']['input']>;
  token_decimals_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  token_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token_symbol?: InputMaybe<Scalars['String']['input']>;
  token_symbol_contains?: InputMaybe<Scalars['String']['input']>;
  token_symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_symbol_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token_symbol_not?: InputMaybe<Scalars['String']['input']>;
  token_symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_symbol_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tx?: InputMaybe<Scalars['String']['input']>;
  tx_contains?: InputMaybe<Scalars['String']['input']>;
  tx_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tx_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tx_not?: InputMaybe<Scalars['String']['input']>;
  tx_not_contains?: InputMaybe<Scalars['String']['input']>;
  tx_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tx_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type?: InputMaybe<Scalars['String']['input']>;
  type_contains?: InputMaybe<Scalars['String']['input']>;
  type_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  type_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type_not?: InputMaybe<Scalars['String']['input']>;
  type_not_contains?: InputMaybe<Scalars['String']['input']>;
  type_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  type_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type TreasuryTransaction_OrderBy =
  | '_indexer'
  | 'amount'
  | 'amount_parsed'
  | 'created'
  | 'from_address'
  | 'id'
  | 'to_address'
  | 'token'
  | 'token_decimals'
  | 'token_symbol'
  | 'tx'
  | 'type';

/**
 * User represents a governance participant (voter or proposer).
 * Includes optional profile fields (display name, bio, statement, social links).
 */
export type User = {
  _indexer: Scalars['String']['output'];
  /** Avatar URL */
  avatar_url: Maybe<Scalars['Text']['output']>;
  /** Short bio */
  bio: Maybe<Scalars['Text']['output']>;
  /** Timestamp when user first interacted */
  created: Scalars['Int']['output'];
  /** Discord username */
  discord: Maybe<Scalars['Text']['output']>;
  /** Display name */
  display_name: Maybe<Scalars['Text']['output']>;
  /** GitHub username */
  github: Maybe<Scalars['Text']['output']>;
  /** Unique identifier for the user (wallet address) */
  id: Scalars['String']['output'];
  /** Number of proposals created by this user */
  proposal_count: Scalars['Int']['output'];
  /** All proposals created by this user */
  proposals: Array<Proposal>;
  /** Full delegate statement (markdown) */
  statement: Maybe<Scalars['Text']['output']>;
  /** Twitter/X handle */
  twitter: Maybe<Scalars['Text']['output']>;
  /** Timestamp when profile was last updated */
  updated: Scalars['Int']['output'];
  /** Number of votes cast by this user */
  vote_count: Scalars['Int']['output'];
  /** All votes cast by this user */
  votes: Array<Vote>;
  /** Website URL */
  website: Maybe<Scalars['Text']['output']>;
};

export type User_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  avatar_url_contains?: InputMaybe<Scalars['String']['input']>;
  avatar_url_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  avatar_url_not_contains?: InputMaybe<Scalars['String']['input']>;
  avatar_url_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  bio_contains?: InputMaybe<Scalars['String']['input']>;
  bio_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  bio_not_contains?: InputMaybe<Scalars['String']['input']>;
  bio_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  created_not?: InputMaybe<Scalars['Int']['input']>;
  created_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  discord_contains?: InputMaybe<Scalars['String']['input']>;
  discord_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  discord_not_contains?: InputMaybe<Scalars['String']['input']>;
  discord_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  display_name_contains?: InputMaybe<Scalars['String']['input']>;
  display_name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  display_name_not_contains?: InputMaybe<Scalars['String']['input']>;
  display_name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  github_contains?: InputMaybe<Scalars['String']['input']>;
  github_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  github_not_contains?: InputMaybe<Scalars['String']['input']>;
  github_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposal_count?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposal_count_lt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_lte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  statement_contains?: InputMaybe<Scalars['String']['input']>;
  statement_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  statement_not_contains?: InputMaybe<Scalars['String']['input']>;
  statement_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  twitter_contains?: InputMaybe<Scalars['String']['input']>;
  twitter_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  twitter_not_contains?: InputMaybe<Scalars['String']['input']>;
  twitter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  updated?: InputMaybe<Scalars['Int']['input']>;
  updated_gt?: InputMaybe<Scalars['Int']['input']>;
  updated_gte?: InputMaybe<Scalars['Int']['input']>;
  updated_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  updated_lt?: InputMaybe<Scalars['Int']['input']>;
  updated_lte?: InputMaybe<Scalars['Int']['input']>;
  updated_not?: InputMaybe<Scalars['Int']['input']>;
  updated_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  vote_count?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  vote_count_lt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_lte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  website_contains?: InputMaybe<Scalars['String']['input']>;
  website_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  website_not_contains?: InputMaybe<Scalars['String']['input']>;
  website_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
};

export type User_OrderBy =
  | '_indexer'
  | 'avatar_url'
  | 'bio'
  | 'created'
  | 'discord'
  | 'display_name'
  | 'github'
  | 'id'
  | 'proposal_count'
  | 'statement'
  | 'twitter'
  | 'updated'
  | 'vote_count'
  | 'website';

/** Vote represents a user's vote on a specific proposal */
export type Vote = {
  _indexer: Scalars['String']['output'];
  /** Voting choice (1, 2, 3, etc.) */
  choice: Scalars['Int']['output'];
  /** Timestamp when vote was cast */
  created: Scalars['Int']['output'];
  /** Unique identifier for the vote */
  id: Scalars['String']['output'];
  /** Vote metadata containing optional reason */
  metadata: Maybe<VoteMetadataItem>;
  /** ID of the proposal being voted on */
  proposal: Scalars['String']['output'];
  /** Space where the vote was cast */
  space: Space;
  /** Transaction hash of the vote */
  tx: Scalars['String']['output'];
  /** User who cast the vote */
  voter: User;
  /** Voting power used for this vote */
  vp: Scalars['BigDecimalVP']['output'];
  /** Parsed voting power as float */
  vp_parsed: Scalars['Float']['output'];
};

/** Metadata for a vote containing optional reasoning */
export type VoteMetadataItem = {
  _indexer: Scalars['String']['output'];
  /** Unique identifier for the metadata item */
  id: Scalars['String']['output'];
  /** Optional reason provided by the voter */
  reason: Scalars['Text']['output'];
};

export type VoteMetadataItem_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  reason_contains?: InputMaybe<Scalars['String']['input']>;
  reason_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  reason_not_contains?: InputMaybe<Scalars['String']['input']>;
  reason_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
};

export type VoteMetadataItem_OrderBy =
  | '_indexer'
  | 'id'
  | 'reason';

export type Vote_Space_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  created_not?: InputMaybe<Scalars['Int']['input']>;
  created_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  delegate_count?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_gt?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_gte?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  delegate_count_lt?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_lte?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_not?: InputMaybe<Scalars['Int']['input']>;
  delegate_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  execution_address?: InputMaybe<Scalars['String']['input']>;
  execution_address_contains?: InputMaybe<Scalars['String']['input']>;
  execution_address_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  execution_address_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  execution_address_not?: InputMaybe<Scalars['String']['input']>;
  execution_address_not_contains?: InputMaybe<Scalars['String']['input']>;
  execution_address_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  execution_address_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposal_count?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposal_count_lt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_lte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposal_threshold?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  proposal_threshold_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  proposal_threshold_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  proposer_count?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_gt?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_gte?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposer_count_lt?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_lte?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_not?: InputMaybe<Scalars['Int']['input']>;
  proposer_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  quorum?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  quorum_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  quorum_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  timelock_delay?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timelock_delay_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_not?: InputMaybe<Scalars['BigInt']['input']>;
  timelock_delay_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  total_supply?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  total_supply_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  total_supply_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  tx?: InputMaybe<Scalars['String']['input']>;
  tx_contains?: InputMaybe<Scalars['String']['input']>;
  tx_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tx_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tx_not?: InputMaybe<Scalars['String']['input']>;
  tx_not_contains?: InputMaybe<Scalars['String']['input']>;
  tx_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tx_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  vote_count?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  vote_count_lt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_lte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voter_count?: InputMaybe<Scalars['Int']['input']>;
  voter_count_gt?: InputMaybe<Scalars['Int']['input']>;
  voter_count_gte?: InputMaybe<Scalars['Int']['input']>;
  voter_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voter_count_lt?: InputMaybe<Scalars['Int']['input']>;
  voter_count_lte?: InputMaybe<Scalars['Int']['input']>;
  voter_count_not?: InputMaybe<Scalars['Int']['input']>;
  voter_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_delay?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_gt?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_gte?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_delay_lt?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_lte?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_not?: InputMaybe<Scalars['Int']['input']>;
  voting_delay_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_period?: InputMaybe<Scalars['Int']['input']>;
  voting_period_gt?: InputMaybe<Scalars['Int']['input']>;
  voting_period_gte?: InputMaybe<Scalars['Int']['input']>;
  voting_period_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  voting_period_lt?: InputMaybe<Scalars['Int']['input']>;
  voting_period_lte?: InputMaybe<Scalars['Int']['input']>;
  voting_period_not?: InputMaybe<Scalars['Int']['input']>;
  voting_period_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type Vote_User_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  avatar_url_contains?: InputMaybe<Scalars['String']['input']>;
  avatar_url_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  avatar_url_not_contains?: InputMaybe<Scalars['String']['input']>;
  avatar_url_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  bio_contains?: InputMaybe<Scalars['String']['input']>;
  bio_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  bio_not_contains?: InputMaybe<Scalars['String']['input']>;
  bio_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  created_not?: InputMaybe<Scalars['Int']['input']>;
  created_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  discord_contains?: InputMaybe<Scalars['String']['input']>;
  discord_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  discord_not_contains?: InputMaybe<Scalars['String']['input']>;
  discord_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  display_name_contains?: InputMaybe<Scalars['String']['input']>;
  display_name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  display_name_not_contains?: InputMaybe<Scalars['String']['input']>;
  display_name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  github_contains?: InputMaybe<Scalars['String']['input']>;
  github_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  github_not_contains?: InputMaybe<Scalars['String']['input']>;
  github_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposal_count?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_gte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  proposal_count_lt?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_lte?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not?: InputMaybe<Scalars['Int']['input']>;
  proposal_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  statement_contains?: InputMaybe<Scalars['String']['input']>;
  statement_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  statement_not_contains?: InputMaybe<Scalars['String']['input']>;
  statement_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  twitter_contains?: InputMaybe<Scalars['String']['input']>;
  twitter_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  twitter_not_contains?: InputMaybe<Scalars['String']['input']>;
  twitter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  updated?: InputMaybe<Scalars['Int']['input']>;
  updated_gt?: InputMaybe<Scalars['Int']['input']>;
  updated_gte?: InputMaybe<Scalars['Int']['input']>;
  updated_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  updated_lt?: InputMaybe<Scalars['Int']['input']>;
  updated_lte?: InputMaybe<Scalars['Int']['input']>;
  updated_not?: InputMaybe<Scalars['Int']['input']>;
  updated_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  vote_count?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_gte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  vote_count_lt?: InputMaybe<Scalars['Int']['input']>;
  vote_count_lte?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not?: InputMaybe<Scalars['Int']['input']>;
  vote_count_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  website_contains?: InputMaybe<Scalars['String']['input']>;
  website_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  website_not_contains?: InputMaybe<Scalars['String']['input']>;
  website_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
};

export type Vote_VoteMetadataItem_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  reason_contains?: InputMaybe<Scalars['String']['input']>;
  reason_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  reason_not_contains?: InputMaybe<Scalars['String']['input']>;
  reason_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
};

export type Vote_Filter = {
  _indexer?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _indexer_not?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  choice?: InputMaybe<Scalars['Int']['input']>;
  choice_gt?: InputMaybe<Scalars['Int']['input']>;
  choice_gte?: InputMaybe<Scalars['Int']['input']>;
  choice_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  choice_lt?: InputMaybe<Scalars['Int']['input']>;
  choice_lte?: InputMaybe<Scalars['Int']['input']>;
  choice_not?: InputMaybe<Scalars['Int']['input']>;
  choice_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  created_not?: InputMaybe<Scalars['Int']['input']>;
  created_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  metadata?: InputMaybe<Scalars['String']['input']>;
  metadata_?: InputMaybe<Vote_VoteMetadataItem_Filter>;
  metadata_contains?: InputMaybe<Scalars['String']['input']>;
  metadata_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  metadata_not?: InputMaybe<Scalars['String']['input']>;
  metadata_not_contains?: InputMaybe<Scalars['String']['input']>;
  metadata_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  metadata_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposal?: InputMaybe<Scalars['String']['input']>;
  proposal_contains?: InputMaybe<Scalars['String']['input']>;
  proposal_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposal_not?: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains?: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  space?: InputMaybe<Scalars['String']['input']>;
  space_?: InputMaybe<Vote_Space_Filter>;
  space_contains?: InputMaybe<Scalars['String']['input']>;
  space_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  space_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  space_not?: InputMaybe<Scalars['String']['input']>;
  space_not_contains?: InputMaybe<Scalars['String']['input']>;
  space_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  space_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tx?: InputMaybe<Scalars['String']['input']>;
  tx_contains?: InputMaybe<Scalars['String']['input']>;
  tx_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tx_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tx_not?: InputMaybe<Scalars['String']['input']>;
  tx_not_contains?: InputMaybe<Scalars['String']['input']>;
  tx_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  tx_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  voter?: InputMaybe<Scalars['String']['input']>;
  voter_?: InputMaybe<Vote_User_Filter>;
  voter_contains?: InputMaybe<Scalars['String']['input']>;
  voter_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  voter_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  voter_not?: InputMaybe<Scalars['String']['input']>;
  voter_not_contains?: InputMaybe<Scalars['String']['input']>;
  voter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  voter_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  vp?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  vp_gt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  vp_gte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  vp_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  vp_lt?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  vp_lte?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  vp_not?: InputMaybe<Scalars['BigDecimalVP']['input']>;
  vp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigDecimalVP']['input']>>>;
  vp_parsed?: InputMaybe<Scalars['Float']['input']>;
  vp_parsed_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  vp_parsed_not?: InputMaybe<Scalars['Float']['input']>;
  vp_parsed_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type Vote_OrderBy =
  | '_indexer'
  | 'choice'
  | 'created'
  | 'id'
  | 'metadata'
  | 'proposal'
  | 'space'
  | 'tx'
  | 'voter'
  | 'vp'
  | 'vp_parsed';

/** Contract and Block where its event is found. */
export type _Checkpoint = {
  block_number: Scalars['Int']['output'];
  contract_address: Scalars['String']['output'];
  /** id computed as last 5 bytes of sha256(contract+block) */
  id: Scalars['ID']['output'];
  indexer: Scalars['String']['output'];
};

export type _Checkpoint_Filter = {
  block_number?: InputMaybe<Scalars['Int']['input']>;
  block_number_gt?: InputMaybe<Scalars['Int']['input']>;
  block_number_gte?: InputMaybe<Scalars['Int']['input']>;
  block_number_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  block_number_lt?: InputMaybe<Scalars['Int']['input']>;
  block_number_lte?: InputMaybe<Scalars['Int']['input']>;
  block_number_not?: InputMaybe<Scalars['Int']['input']>;
  block_number_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  contract_address?: InputMaybe<Scalars['String']['input']>;
  contract_address_contains?: InputMaybe<Scalars['String']['input']>;
  contract_address_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_address_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contract_address_not?: InputMaybe<Scalars['String']['input']>;
  contract_address_not_contains?: InputMaybe<Scalars['String']['input']>;
  contract_address_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contract_address_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  indexer?: InputMaybe<Scalars['String']['input']>;
  indexer_contains?: InputMaybe<Scalars['String']['input']>;
  indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  indexer_not?: InputMaybe<Scalars['String']['input']>;
  indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type _Checkpoint_OrderBy =
  | 'block_number'
  | 'contract_address'
  | 'id'
  | 'indexer';

/** Core metadata values used internally by Checkpoint */
export type _Metadata = {
  /** example: last_indexed_block */
  id: Scalars['ID']['output'];
  indexer: Scalars['String']['output'];
  value: Maybe<Scalars['String']['output']>;
};

export type _Metadata_Filter = {
  id?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  indexer?: InputMaybe<Scalars['String']['input']>;
  indexer_contains?: InputMaybe<Scalars['String']['input']>;
  indexer_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  indexer_not?: InputMaybe<Scalars['String']['input']>;
  indexer_not_contains?: InputMaybe<Scalars['String']['input']>;
  indexer_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  indexer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  value?: InputMaybe<Scalars['String']['input']>;
  value_contains?: InputMaybe<Scalars['String']['input']>;
  value_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  value_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  value_not?: InputMaybe<Scalars['String']['input']>;
  value_not_contains?: InputMaybe<Scalars['String']['input']>;
  value_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  value_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type _Metadata_OrderBy =
  | 'id'
  | 'indexer'
  | 'value';

export type VoteFieldsFragment = { id: string, vp: any, vp_parsed: number, proposal: string, choice: number, created: number, tx: string, voter: { id: string }, metadata: { reason: any } | null };

export type ProposalFieldsFragment = { id: string, proposal_id: string, quorum: any, timelock_delay: any, execution_hash: string, start_time: number, start_block_number: number | null, end_time: number, end_block_number: number | null, snapshot: number, voting_delay: number, voting_period: number, proposal_threshold: any, vp_decimals: number, scores_1: any, scores_2: any, scores_3: any, scores_total: any, scores_1_parsed: number, scores_2_parsed: number, scores_3_parsed: number, scores_total_parsed: number, execution_time: number | null, created: number, edited: number | null, tx: string, execution_tx: string | null, vote_count: number, execution_ready: boolean, executed: boolean, cancelled: boolean, _indexer: string, author: { id: string }, metadata: { id: string, title: any | null, body: any | null, discussion: any | null, execution: any | null, simulation: any | null, choices: Array<string>, labels: Array<string> } | null };

export type ProposalQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ProposalQuery = { proposal: { id: string, proposal_id: string, quorum: any, timelock_delay: any, execution_hash: string, start_time: number, start_block_number: number | null, end_time: number, end_block_number: number | null, snapshot: number, voting_delay: number, voting_period: number, proposal_threshold: any, vp_decimals: number, scores_1: any, scores_2: any, scores_3: any, scores_total: any, scores_1_parsed: number, scores_2_parsed: number, scores_3_parsed: number, scores_total_parsed: number, execution_time: number | null, created: number, edited: number | null, tx: string, execution_tx: string | null, vote_count: number, execution_ready: boolean, executed: boolean, cancelled: boolean, _indexer: string, author: { id: string }, metadata: { id: string, title: any | null, body: any | null, discussion: any | null, execution: any | null, simulation: any | null, choices: Array<string>, labels: Array<string> } | null } | null };

export type ProposalsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  where?: InputMaybe<Proposal_Filter>;
  orderBy?: InputMaybe<Proposal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type ProposalsQuery = { proposals: Array<{ id: string, proposal_id: string, quorum: any, timelock_delay: any, execution_hash: string, start_time: number, start_block_number: number | null, end_time: number, end_block_number: number | null, snapshot: number, voting_delay: number, voting_period: number, proposal_threshold: any, vp_decimals: number, scores_1: any, scores_2: any, scores_3: any, scores_total: any, scores_1_parsed: number, scores_2_parsed: number, scores_3_parsed: number, scores_total_parsed: number, execution_time: number | null, created: number, edited: number | null, tx: string, execution_tx: string | null, vote_count: number, execution_ready: boolean, executed: boolean, cancelled: boolean, _indexer: string, author: { id: string }, metadata: { id: string, title: any | null, body: any | null, discussion: any | null, execution: any | null, simulation: any | null, choices: Array<string>, labels: Array<string> } | null }> };

export type VotesQueryVariables = Exact<{
  indexer: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  orderBy: Vote_OrderBy;
  orderDirection: OrderDirection;
  where?: InputMaybe<Vote_Filter>;
}>;


export type VotesQuery = { votes: Array<{ id: string, vp: any, vp_parsed: number, proposal: string, choice: number, created: number, tx: string, voter: { id: string }, metadata: { reason: any } | null }> };

export type UserVotesQueryVariables = Exact<{
  indexer: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  voter?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserVotesQuery = { votes: Array<{ id: string, vp: any, vp_parsed: number, proposal: string, choice: number, created: number, tx: string, voter: { id: string }, metadata: { reason: any } | null }> };

export type UserQueryVariables = Exact<{
  indexer: Scalars['String']['input'];
  id: Scalars['String']['input'];
}>;


export type UserQuery = { user: { id: string, proposal_count: number, vote_count: number, created: number, updated: number, display_name: any | null, bio: any | null, statement: any | null, avatar_url: any | null, twitter: any | null, discord: any | null, github: any | null, website: any | null } | null };

export type LeaderboardQueryVariables = Exact<{
  indexer: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  orderBy?: InputMaybe<Leaderboard_OrderBy>;
  orderDirection: OrderDirection;
  where?: InputMaybe<Leaderboard_Filter>;
}>;


export type LeaderboardQuery = { leaderboards: Array<{ id: string, proposal_count: number, vote_count: number, user: { id: string, created: number } }> };

export type _MetadataQueryVariables = Exact<{
  indexer: Scalars['String']['input'];
}>;


export type _MetadataQuery = { _metadata: { value: string | null } | null };

export type DelegateFieldsFragment = { id: string, voting_power: any, voting_power_parsed: number, delegator_count: number, created: number, updated: number, user: { id: string, proposal_count: number, vote_count: number, created: number, updated: number, display_name: any | null, bio: any | null, statement: any | null, avatar_url: any | null, twitter: any | null, discord: any | null, github: any | null, website: any | null } };

export type DelegatesQueryVariables = Exact<{
  indexer: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  orderBy: Delegate_OrderBy;
  orderDirection: OrderDirection;
  where?: InputMaybe<Delegate_Filter>;
}>;


export type DelegatesQuery = { delegates: Array<{ id: string, voting_power: any, voting_power_parsed: number, delegator_count: number, created: number, updated: number, user: { id: string, proposal_count: number, vote_count: number, created: number, updated: number, display_name: any | null, bio: any | null, statement: any | null, avatar_url: any | null, twitter: any | null, discord: any | null, github: any | null, website: any | null } }> };

export type DelegateQueryVariables = Exact<{
  indexer: Scalars['String']['input'];
  id: Scalars['String']['input'];
}>;


export type DelegateQuery = { delegate: { id: string, voting_power: any, voting_power_parsed: number, delegator_count: number, created: number, updated: number, user: { id: string, proposal_count: number, vote_count: number, created: number, updated: number, display_name: any | null, bio: any | null, statement: any | null, avatar_url: any | null, twitter: any | null, discord: any | null, github: any | null, website: any | null } } | null };

export type UserDelegationQueryVariables = Exact<{
  indexer: Scalars['String']['input'];
  id: Scalars['String']['input'];
}>;


export type UserDelegationQuery = { delegation: { id: string, delegate: string, created: number, tx: string, delegator: { id: string } } | null };

export type TreasuryTransactionFieldsFragment = { id: string, type: string, token: string, token_symbol: string, token_decimals: number, amount: any, amount_parsed: number, from_address: string, to_address: string, created: number, tx: string };

export type TreasuryTransactionsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  orderBy?: InputMaybe<TreasuryTransaction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
}>;


export type TreasuryTransactionsQuery = { treasurytransactions: Array<{ id: string, type: string, token: string, token_symbol: string, token_decimals: number, amount: any, amount_parsed: number, from_address: string, to_address: string, created: number, tx: string }> };

export type SpaceQueryVariables = Exact<{
  indexer: Scalars['String']['input'];
  id: Scalars['String']['input'];
}>;


export type SpaceQuery = { space: { id: string, name: string, symbol: string, decimals: number, token: string | null, total_supply: any, proposal_count: number, vote_count: number, proposer_count: number, voter_count: number, delegate_count: number, quorum: any, proposal_threshold: any, voting_delay: number, voting_period: number, timelock_delay: any, created: number } | null };

export const VoteFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"voteFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vote"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"voter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vp"}},{"kind":"Field","name":{"kind":"Name","value":"vp_parsed"}},{"kind":"Field","name":{"kind":"Name","value":"proposal"}},{"kind":"Field","name":{"kind":"Name","value":"choice"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"tx"}}]}}]} as unknown as DocumentNode<VoteFieldsFragment, unknown>;
export const ProposalFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"proposalFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Proposal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"proposal_id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quorum"}},{"kind":"Field","name":{"kind":"Name","value":"timelock_delay"}},{"kind":"Field","name":{"kind":"Name","value":"execution_hash"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"discussion"}},{"kind":"Field","name":{"kind":"Name","value":"execution"}},{"kind":"Field","name":{"kind":"Name","value":"simulation"}},{"kind":"Field","name":{"kind":"Name","value":"choices"}},{"kind":"Field","name":{"kind":"Name","value":"labels"}}]}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"start_block_number"}},{"kind":"Field","name":{"kind":"Name","value":"end_time"}},{"kind":"Field","name":{"kind":"Name","value":"end_block_number"}},{"kind":"Field","name":{"kind":"Name","value":"snapshot"}},{"kind":"Field","name":{"kind":"Name","value":"voting_delay"}},{"kind":"Field","name":{"kind":"Name","value":"voting_period"}},{"kind":"Field","name":{"kind":"Name","value":"proposal_threshold"}},{"kind":"Field","name":{"kind":"Name","value":"vp_decimals"}},{"kind":"Field","name":{"kind":"Name","value":"scores_1"}},{"kind":"Field","name":{"kind":"Name","value":"scores_2"}},{"kind":"Field","name":{"kind":"Name","value":"scores_3"}},{"kind":"Field","name":{"kind":"Name","value":"scores_total"}},{"kind":"Field","name":{"kind":"Name","value":"scores_1_parsed"}},{"kind":"Field","name":{"kind":"Name","value":"scores_2_parsed"}},{"kind":"Field","name":{"kind":"Name","value":"scores_3_parsed"}},{"kind":"Field","name":{"kind":"Name","value":"scores_total_parsed"}},{"kind":"Field","name":{"kind":"Name","value":"execution_time"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"edited"}},{"kind":"Field","name":{"kind":"Name","value":"tx"}},{"kind":"Field","name":{"kind":"Name","value":"execution_tx"}},{"kind":"Field","name":{"kind":"Name","value":"vote_count"}},{"kind":"Field","name":{"kind":"Name","value":"execution_ready"}},{"kind":"Field","name":{"kind":"Name","value":"executed"}},{"kind":"Field","name":{"kind":"Name","value":"cancelled"}},{"kind":"Field","name":{"kind":"Name","value":"_indexer"}}]}}]} as unknown as DocumentNode<ProposalFieldsFragment, unknown>;
export const DelegateFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"delegateFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Delegate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"proposal_count"}},{"kind":"Field","name":{"kind":"Name","value":"vote_count"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}},{"kind":"Field","name":{"kind":"Name","value":"discord"}},{"kind":"Field","name":{"kind":"Name","value":"github"}},{"kind":"Field","name":{"kind":"Name","value":"website"}}]}},{"kind":"Field","name":{"kind":"Name","value":"voting_power"}},{"kind":"Field","name":{"kind":"Name","value":"voting_power_parsed"}},{"kind":"Field","name":{"kind":"Name","value":"delegator_count"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}}]}}]} as unknown as DocumentNode<DelegateFieldsFragment, unknown>;
export const TreasuryTransactionFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"treasuryTransactionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TreasuryTransaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"token_symbol"}},{"kind":"Field","name":{"kind":"Name","value":"token_decimals"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"amount_parsed"}},{"kind":"Field","name":{"kind":"Name","value":"from_address"}},{"kind":"Field","name":{"kind":"Name","value":"to_address"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"tx"}}]}}]} as unknown as DocumentNode<TreasuryTransactionFieldsFragment, unknown>;
export const ProposalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Proposal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proposal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"proposalFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"proposalFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Proposal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"proposal_id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quorum"}},{"kind":"Field","name":{"kind":"Name","value":"timelock_delay"}},{"kind":"Field","name":{"kind":"Name","value":"execution_hash"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"discussion"}},{"kind":"Field","name":{"kind":"Name","value":"execution"}},{"kind":"Field","name":{"kind":"Name","value":"simulation"}},{"kind":"Field","name":{"kind":"Name","value":"choices"}},{"kind":"Field","name":{"kind":"Name","value":"labels"}}]}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"start_block_number"}},{"kind":"Field","name":{"kind":"Name","value":"end_time"}},{"kind":"Field","name":{"kind":"Name","value":"end_block_number"}},{"kind":"Field","name":{"kind":"Name","value":"snapshot"}},{"kind":"Field","name":{"kind":"Name","value":"voting_delay"}},{"kind":"Field","name":{"kind":"Name","value":"voting_period"}},{"kind":"Field","name":{"kind":"Name","value":"proposal_threshold"}},{"kind":"Field","name":{"kind":"Name","value":"vp_decimals"}},{"kind":"Field","name":{"kind":"Name","value":"scores_1"}},{"kind":"Field","name":{"kind":"Name","value":"scores_2"}},{"kind":"Field","name":{"kind":"Name","value":"scores_3"}},{"kind":"Field","name":{"kind":"Name","value":"scores_total"}},{"kind":"Field","name":{"kind":"Name","value":"scores_1_parsed"}},{"kind":"Field","name":{"kind":"Name","value":"scores_2_parsed"}},{"kind":"Field","name":{"kind":"Name","value":"scores_3_parsed"}},{"kind":"Field","name":{"kind":"Name","value":"scores_total_parsed"}},{"kind":"Field","name":{"kind":"Name","value":"execution_time"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"edited"}},{"kind":"Field","name":{"kind":"Name","value":"tx"}},{"kind":"Field","name":{"kind":"Name","value":"execution_tx"}},{"kind":"Field","name":{"kind":"Name","value":"vote_count"}},{"kind":"Field","name":{"kind":"Name","value":"execution_ready"}},{"kind":"Field","name":{"kind":"Name","value":"executed"}},{"kind":"Field","name":{"kind":"Name","value":"cancelled"}},{"kind":"Field","name":{"kind":"Name","value":"_indexer"}}]}}]} as unknown as DocumentNode<ProposalQuery, ProposalQueryVariables>;
export const ProposalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Proposals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Proposal_filter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Proposal_orderBy"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proposals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"proposalFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"proposalFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Proposal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"proposal_id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quorum"}},{"kind":"Field","name":{"kind":"Name","value":"timelock_delay"}},{"kind":"Field","name":{"kind":"Name","value":"execution_hash"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"discussion"}},{"kind":"Field","name":{"kind":"Name","value":"execution"}},{"kind":"Field","name":{"kind":"Name","value":"simulation"}},{"kind":"Field","name":{"kind":"Name","value":"choices"}},{"kind":"Field","name":{"kind":"Name","value":"labels"}}]}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"start_block_number"}},{"kind":"Field","name":{"kind":"Name","value":"end_time"}},{"kind":"Field","name":{"kind":"Name","value":"end_block_number"}},{"kind":"Field","name":{"kind":"Name","value":"snapshot"}},{"kind":"Field","name":{"kind":"Name","value":"voting_delay"}},{"kind":"Field","name":{"kind":"Name","value":"voting_period"}},{"kind":"Field","name":{"kind":"Name","value":"proposal_threshold"}},{"kind":"Field","name":{"kind":"Name","value":"vp_decimals"}},{"kind":"Field","name":{"kind":"Name","value":"scores_1"}},{"kind":"Field","name":{"kind":"Name","value":"scores_2"}},{"kind":"Field","name":{"kind":"Name","value":"scores_3"}},{"kind":"Field","name":{"kind":"Name","value":"scores_total"}},{"kind":"Field","name":{"kind":"Name","value":"scores_1_parsed"}},{"kind":"Field","name":{"kind":"Name","value":"scores_2_parsed"}},{"kind":"Field","name":{"kind":"Name","value":"scores_3_parsed"}},{"kind":"Field","name":{"kind":"Name","value":"scores_total_parsed"}},{"kind":"Field","name":{"kind":"Name","value":"execution_time"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"edited"}},{"kind":"Field","name":{"kind":"Name","value":"tx"}},{"kind":"Field","name":{"kind":"Name","value":"execution_tx"}},{"kind":"Field","name":{"kind":"Name","value":"vote_count"}},{"kind":"Field","name":{"kind":"Name","value":"execution_ready"}},{"kind":"Field","name":{"kind":"Name","value":"executed"}},{"kind":"Field","name":{"kind":"Name","value":"cancelled"}},{"kind":"Field","name":{"kind":"Name","value":"_indexer"}}]}}]} as unknown as DocumentNode<ProposalsQuery, ProposalsQueryVariables>;
export const VotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Votes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"indexer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Vote_orderBy"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Vote_filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"votes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"indexer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"indexer"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"voteFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"voteFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vote"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"voter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vp"}},{"kind":"Field","name":{"kind":"Name","value":"vp_parsed"}},{"kind":"Field","name":{"kind":"Name","value":"proposal"}},{"kind":"Field","name":{"kind":"Name","value":"choice"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"tx"}}]}}]} as unknown as DocumentNode<VotesQuery, VotesQueryVariables>;
export const UserVotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserVotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"indexer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"voter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"votes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"indexer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"indexer"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"voter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"voter"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"voteFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"voteFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vote"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"voter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vp"}},{"kind":"Field","name":{"kind":"Name","value":"vp_parsed"}},{"kind":"Field","name":{"kind":"Name","value":"proposal"}},{"kind":"Field","name":{"kind":"Name","value":"choice"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"tx"}}]}}]} as unknown as DocumentNode<UserVotesQuery, UserVotesQueryVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"indexer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"indexer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"indexer"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"proposal_count"}},{"kind":"Field","name":{"kind":"Name","value":"vote_count"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}},{"kind":"Field","name":{"kind":"Name","value":"discord"}},{"kind":"Field","name":{"kind":"Name","value":"github"}},{"kind":"Field","name":{"kind":"Name","value":"website"}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const LeaderboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Leaderboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"indexer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Leaderboard_orderBy"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Leaderboard_filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaderboards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"indexer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"indexer"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created"}}]}},{"kind":"Field","name":{"kind":"Name","value":"proposal_count"}},{"kind":"Field","name":{"kind":"Name","value":"vote_count"}}]}}]}}]} as unknown as DocumentNode<LeaderboardQuery, LeaderboardQueryVariables>;
export const _MetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"_Metadata"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"indexer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_metadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"indexer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"indexer"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"StringValue","value":"last_indexed_block","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<_MetadataQuery, _MetadataQueryVariables>;
export const DelegatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Delegates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"indexer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Delegate_orderBy"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Delegate_filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delegates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"indexer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"indexer"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"delegateFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"delegateFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Delegate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"proposal_count"}},{"kind":"Field","name":{"kind":"Name","value":"vote_count"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}},{"kind":"Field","name":{"kind":"Name","value":"discord"}},{"kind":"Field","name":{"kind":"Name","value":"github"}},{"kind":"Field","name":{"kind":"Name","value":"website"}}]}},{"kind":"Field","name":{"kind":"Name","value":"voting_power"}},{"kind":"Field","name":{"kind":"Name","value":"voting_power_parsed"}},{"kind":"Field","name":{"kind":"Name","value":"delegator_count"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}}]}}]} as unknown as DocumentNode<DelegatesQuery, DelegatesQueryVariables>;
export const DelegateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Delegate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"indexer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delegate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"indexer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"indexer"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"delegateFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"delegateFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Delegate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"proposal_count"}},{"kind":"Field","name":{"kind":"Name","value":"vote_count"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"statement"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}},{"kind":"Field","name":{"kind":"Name","value":"discord"}},{"kind":"Field","name":{"kind":"Name","value":"github"}},{"kind":"Field","name":{"kind":"Name","value":"website"}}]}},{"kind":"Field","name":{"kind":"Name","value":"voting_power"}},{"kind":"Field","name":{"kind":"Name","value":"voting_power_parsed"}},{"kind":"Field","name":{"kind":"Name","value":"delegator_count"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}}]}}]} as unknown as DocumentNode<DelegateQuery, DelegateQueryVariables>;
export const UserDelegationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserDelegation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"indexer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delegation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"indexer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"indexer"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"delegator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"delegate"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"tx"}}]}}]}}]} as unknown as DocumentNode<UserDelegationQuery, UserDelegationQueryVariables>;
export const TreasuryTransactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TreasuryTransactions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TreasuryTransaction_orderBy"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"treasurytransactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"treasuryTransactionFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"treasuryTransactionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TreasuryTransaction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"token_symbol"}},{"kind":"Field","name":{"kind":"Name","value":"token_decimals"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"amount_parsed"}},{"kind":"Field","name":{"kind":"Name","value":"from_address"}},{"kind":"Field","name":{"kind":"Name","value":"to_address"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"tx"}}]}}]} as unknown as DocumentNode<TreasuryTransactionsQuery, TreasuryTransactionsQueryVariables>;
export const SpaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Space"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"indexer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"space"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"indexer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"indexer"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"total_supply"}},{"kind":"Field","name":{"kind":"Name","value":"proposal_count"}},{"kind":"Field","name":{"kind":"Name","value":"vote_count"}},{"kind":"Field","name":{"kind":"Name","value":"proposer_count"}},{"kind":"Field","name":{"kind":"Name","value":"voter_count"}},{"kind":"Field","name":{"kind":"Name","value":"delegate_count"}},{"kind":"Field","name":{"kind":"Name","value":"quorum"}},{"kind":"Field","name":{"kind":"Name","value":"proposal_threshold"}},{"kind":"Field","name":{"kind":"Name","value":"voting_delay"}},{"kind":"Field","name":{"kind":"Name","value":"voting_period"}},{"kind":"Field","name":{"kind":"Name","value":"timelock_delay"}},{"kind":"Field","name":{"kind":"Name","value":"created"}}]}}]}}]} as unknown as DocumentNode<SpaceQuery, SpaceQueryVariables>;