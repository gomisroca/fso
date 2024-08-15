import { View, StyleSheet } from 'react-native';
import theme from '../../../theme';
import Count from './Count';

const styles = StyleSheet.create({
  countsContainer: {
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  countContainer: {
    flexDirection: 'column',
    gap: 5,
    alignItems: 'center',
  },
  count: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  }
});

const RepositoryItemCounts = ({item}) => {
  return (
    <View style={styles.countsContainer}>
      <Count countName="Stars" countAmount={item.stargazersCount} />
      <Count countName="Forks" countAmount={item.forksCount} />
      <Count countName="Reviews" countAmount={item.reviewCount} />
      <Count countName="Rating" countAmount={item.ratingAverage} />
    </View>
  );
};

export default RepositoryItemCounts;