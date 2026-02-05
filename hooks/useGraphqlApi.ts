import { createApi } from "@/graphqlApi";
import { useMemo } from "react";

const API_ENDPOINT =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";

export default function useGraphqlApi() {
  return useMemo(() => createApi(`${API_ENDPOINT}/graphql`), []);
}
