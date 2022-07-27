import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_STRAPI_GRAPHQL,
});

const authLink = setContext((_, { headers }) =>
// return the headers to the context so httpLink can read them
  ({
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
  }));

const apolloConnection = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloConnection;
