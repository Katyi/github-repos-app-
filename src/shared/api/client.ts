import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Create the http link
const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

// Generate and set the header with the auth details
const authLink = setContext((_, { headers }) => {
  // get the authentication token from env variables if it exists
  const token = process.env.REACT_APP_GITHUB_TOKEN;

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

// Generate your client with the authLink and httpLink
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});