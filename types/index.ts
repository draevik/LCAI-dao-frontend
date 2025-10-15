import { ApiProposal, ApiVote } from "@/graphqlApi/types";
import { AbiFunction } from "viem";

export type AbiObjectType = {
  type: string;
  stateMutability: string;
  name: string;
  inputs: {
    internalType: "address" | "uint256" | "string" | "bytes";
    type: string;
    name: string;
  }[];
  outputs: {
    internalType: "address" | "uint256" | "string" | "bytes";
    type: string;
    name: string;
  }[];
};

export type AbiType = AbiObjectType[];

export type Address = `0x${string}`;

export type ReadContractItemTypeAbi = AbiObjectType & {
  type: "function";
  stateMutability: "view";
};

export type WriteContractItemTypeAbi = AbiObjectType & {
  type: "function";
  stateMutability: "payable" | "nonpayable";
};

export type ContractItemType = {
  id: string;
  name: string;
  chainId: number;
  address: Address;
  abi: AbiType;
};

export type ContractAction = {
  id: string;
  type: "send" | "contract";
  target: `0x${string}`;
  abiOption?: string;
  abi?: AbiFunction[];
  method?: string;
  value?: string;
  args?: Record<string, string>;
};

export type BaseTransaction = {
  to: `0x${string}`;
  data: `0x${string}`;
  value: string;
  salt: string;
};

export type RawTransaction = BaseTransaction & {
  _type: "raw";
  _form: {
    recipient: `0x${string}`;
  };
};

export type PaginationOpts = { limit: number; skip?: number };

export type ProposalsFilter = {
  state?: "any" | "active" | "pending" | "closed";
  labels?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & Record<string, any>;

export type Proposal = ApiProposal & {
  author: {
    id: string;
  };
  choices: string[];
  labels: string[];
  scores: [number, number, number];
  title: string;
  body: string;
  discussion: string;
  executions: RawTransaction[];
  state: number;
  quorum_parsed: number;
};

export type ProposalMetadataItem = {
  id: string;
  title: string;
  body: string;
  discussion: string;
  execution: string;
  choices: string[];
  labels: string[];
};

export type Vote = ApiVote;

export type Leaderboard = {
  id: string;
  user: User;
  proposal_count: number;
  vote_count: number;
};

export type User = {
  id: string;
  created: number | null;
};

export type UserActivity = {
  id: string;
  name?: string;
  proposal_count: number;
  vote_count: number;
};
