import { GET_USER_INFO } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useUser = () => {
  const { data, error, loading } = useQuery(GET_USER_INFO);
  if (loading) {
    return null;
  }
  if (error) {
    console.log(error);
    return null;
  }
  if(data) {
    return data.me;
  }
};

export default useUser;