import { AUTHENTICATE } from '../graphql/mutations';
import { useApolloClient, useMutation } from '@apollo/client';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [authenticate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    authenticate({ variables: { username, password } })
    const token = result.data.authenticate.accessToken;
    authStorage.setAccessToken(token);
    apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;