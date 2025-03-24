import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql", // URL de ton backend GraphQL NestJS
  cache: new InMemoryCache(),
});

export default client;
export { gql };