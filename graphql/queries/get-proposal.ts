import { gql, TypedDocumentNode } from "@apollo/client";
import { Proposal } from "@/models";

export const GET_PROPOSAL: TypedDocumentNode<{
  proposal: Proposal;
}> = gql`
  query ($id: String!) {
    proposal(id: $id) {
      id
      link
      proposal_id
      author {
        id
      }
      execution_hash
      metadata {
        title
        body
        choices
      }
      start_time
      start_block_number
      end_time
      end_block_number
      snapshot
      execution_time
      timelock_delay
      vp_decimals
      scores_1
      scores_1_parsed
      scores_2
      scores_2_parsed
      scores_3
      scores_3_parsed
      scores_total
      quorum
      scores_total_parsed
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
  }
`;
