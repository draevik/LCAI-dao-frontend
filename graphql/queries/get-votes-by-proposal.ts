import { Vote } from "@/models";
import { gql, TypedDocumentNode } from "@apollo/client";

export const GET_VOTES_BY_PROPOSAL: TypedDocumentNode<{
  votes: Vote[];
}> = gql`
  query ($proposalId: String!) {
    votes(where: { proposal: $proposalId }) {
      id
      voter {
        id
      }
      proposal
      choice
      vp
      vp_parsed
      metadata {
        reason
      }
      created
      tx
    }
  }
`;
