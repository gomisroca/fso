import { CREATE_USER } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const useSignUp = () => {
  const [createUser, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    const { data } = await createUser({ variables: { username, password } });
    console.log(data.createUser);
    return data.createUser;
  };

  return [signUp, result];
};

export default useSignUp;