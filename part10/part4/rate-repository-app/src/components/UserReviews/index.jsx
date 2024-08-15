import { FlatList, StyleSheet, Text, View } from "react-native";
import useUser from "../../hooks/useUser";
import UserReviewItem from "./UserReviewItem";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  }
});

const UserReviews = () => {
  const { loading, error, userData, refetch } = useUser(true);
  if (loading) {
    return <Text>Loading user reviews...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  if (userData){
    const reviews = userData
      ? userData.reviews.edges.map(edge => edge.node) 
      : null;
    return (
      <View style={styles.container}>
        <FlatList
          data={reviews}
          renderItem={({ item }) => <UserReviewItem review={item} refetch={refetch} />}
          keyExtractor={({ id }) => id}
        />
      </View>
    );
  }
};

export default UserReviews;