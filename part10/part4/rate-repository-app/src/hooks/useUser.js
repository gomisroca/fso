import { GET_USER_INFO } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useUser = (includeReviews = false) => {
  const { data, error, loading, refetch } = useQuery(GET_USER_INFO , {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network'
  });

  if (loading) {
    return { loading: true };
  }
  if (error) {
    console.log(error);
    return null;
  }

  return { userData: data?.me, refetch };
};

export default useUser;