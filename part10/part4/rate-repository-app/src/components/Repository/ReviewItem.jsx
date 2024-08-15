import { View, StyleSheet, Text } from 'react-native';
import theme from '../../theme';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: theme.borderRadius,
    marginBottom: 10,
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
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.headerTextContainer}>
        <Text style={styles.title}>{review.user.username}</Text>
        <Text style={styles.subtitle}>{format(review.createdAt, 'dd.MM.yyyy')}</Text>
        <View style={styles.textContainer}>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  )
}

export default ReviewItem;