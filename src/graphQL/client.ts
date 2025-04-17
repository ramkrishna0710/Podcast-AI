import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Platform } from 'react-native';
import { mmkvStorage } from '../state/storage';


// const httpLink = createHttpLink({
//   uri:
//     Platform.OS === 'android'
//       ? 'http://192.168.1.4:3000/api/graphql'
//       : 'http://10.0.2.2:3000/api/graphql',
// });

const httpLink = createHttpLink({
  uri: 'https://podcast-ai-server-production.up.railway.app/api/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = mmkvStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});