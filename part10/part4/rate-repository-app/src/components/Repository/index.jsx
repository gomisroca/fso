import { View, FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../../hooks/useRepository';
import ReviewItem from './ReviewItem';
import RepositoryInfo from './RepositoryInfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  }
});

const Repository = () => {
  // Gets the id of the repository from the route params
  const { id } = useParams();
  // Gets the repository from database using the repository hook
  const {repository, fetchMore} = useRepository(id, 10);
 
  // If the repository is not found (could be loading or error state during db fetch), return null
  if (!repository) return null;
  const reviews = repository
    ? repository.reviews.edges.map(edge => edge.node) 
    : null

  const onEndReach = () => {
    fetchMore()
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        onEndReached={onEndReach}
      />
    </View>
  );
};

export default Repository;