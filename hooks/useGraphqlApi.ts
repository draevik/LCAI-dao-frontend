import { createApi } from "@/graphqlApi";
import { useMemo } from "react";

export default function useGraphqlApi() {
  return useMemo(
    () =>
      createApi(
        process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000/graphql"
      ),
    []
  );
}
