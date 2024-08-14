import {Text, View, StyleSheet } from 'react-native';
import theme from '../../../theme';
import { formatNumber } from '../../../utils';

const styles = StyleSheet.create({
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

const Count = ({countName, countAmount}) => {
  return (
    <View style={styles.countContainer}>
      <Text style={styles.count}>{formatNumber(countAmount)}</Text>
      <Text>{countName}</Text>
    </View>
  );
};

export default Count;