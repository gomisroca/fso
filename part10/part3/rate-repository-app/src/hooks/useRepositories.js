import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });
  if (loading) {
    return null;
  }
  if (error) {
    console.log(error);
    return null;
  }
  if(data) {
    return data.repositories;
  }
};

export default useRepositories;