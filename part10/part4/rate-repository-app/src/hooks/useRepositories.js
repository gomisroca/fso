import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, searchKeyword, first) => {
  const { loading, data, fetchMore, ...result } = useQuery(GET_REPOSITORIES, 
    {
      fetchPolicy: 'cache-and-network',
      variables: { orderBy, orderDirection, searchKeyword, first },
    },
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if(!canFetchMore){
      return;
    }

    fetchMore(
      {
      variables: { 
        orderBy, 
        orderDirection, 
        searchKeyword, 
        first, 
        after: data.repositories.pageInfo.endCursor  
      },
    })
  }

  return { 
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};


export default useRepositories;