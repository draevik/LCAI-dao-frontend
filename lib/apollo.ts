import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri:
      process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000/graphql",
  }),
  cache: new InMemoryCache(),
});
