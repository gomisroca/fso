import { View, StyleSheet, Text, Pressable, Alert } from 'react-native';
import theme from '../../theme';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';
import useDeleteReview from '../../hooks/useDeleteReview';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: theme.borderRadius,
    marginBottom: 10,
  },
  header: {
    gap: 10,
    flexDirection: 'row',
  },
  rating: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: theme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  ratingText: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.accent,
  },
  headerTextContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
  },
  subtitle: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.muted,
  },
  textContainer: {
    paddingVertical: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
    paddingVertical: 10,
  },
  linkButton: {
    backgroundColor: theme.colors.accent,
    padding: 10,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    padding: 10,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  }
});

const UserReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [removeReview] = useDeleteReview();

  const remove = async() => {
    await removeReview({ id: review.id });
    await refetch();
  }

  const removeAlert = () => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'CANCEL',
        style: 'cancel',
      },
      {
        text: 'DELETE',
        onPress: () => {
          remove();
        },
        style: 'destructive',
      }
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>{review.repository.fullName}</Text>
          <Text style={styles.subtitle}>{format(review.createdAt, 'dd.MM.yyyy')}</Text>
          <View style={styles.textContainer}>
            <Text>{review.text}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => navigate(`/repository/${review.repositoryId}`)}>	
          <View style={styles.linkButton}>
            <Text style={styles.buttonText}>View repository</Text>
          </View>
        </Pressable>
        <Pressable onPress={removeAlert}>
          <View style={styles.deleteButton}>
            <Text style={styles.buttonText}>Delete review</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

export default UserReviewItem;