import { GET_REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepository = (id, first) => {
  const { loading, data, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    variables: { id, first },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if(!canFetchMore){
      return;
    }

    fetchMore({
      variables: {
        id, 
        first,
        after: data.repository.reviews.pageInfo.endCursor
      }
    })
  }

  return { 
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result
  }
};

export default useRepository;