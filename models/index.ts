export type Proposal = {
  id: string;
  link: string;
  proposal_id: string;
  author: User;
  execution_hash: string;
  metadata: ProposalMetadataItem;
  start_time: number;
  start_block_number: number | null;
  end_time: number;
  end_block_number: number | null;
  snapshot: number;
  execution_time: number;
  timelock_delay: number | null;
  vp_decimals: number;
  scores_1: string;
  scores_1_parsed: number;
  scores_2: string;
  scores_2_parsed: number;
  scores_3: string;
  scores_3_parsed: number;
  scores_total: string;
  quorum: string;
  scores_total_parsed: number;
  created: number;
  edited: number | null;
  tx: string;
  execution_tx: string | null;
  vote_count: number;
  execution_ready: boolean;
  execution_settled: boolean;
  cancelled: boolean;
  _indexer: string;
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

export type Vote = {
  id: string;
  voter: User;
  proposal: Proposal;
  choice: number;
  vp: string;
  vp_parsed: number;
  metadata: VoteMetadataItem;
  created: number;
  tx: string;
};

export type VoteMetadataItem = {
  id: string;
  reason: string;
};

export type User = {
  id: string;
  proposal_count: number;
  vote_count: number;
  created: number;
  proposals: Proposal[];
  votes: Vote[];
};

export type Leaderboard = {
  id: string;
  user: User;
  proposal_count: number;
  vote_count: number;
};

export type Execution = {
  _type: "raw";
  _form: {
    recipient: `0x${string}`;
  };
  to: `0x${string}`;
  data: `0x${string}`;
  value: string;
  salt: string;
};
