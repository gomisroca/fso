import { View, StyleSheet } from 'react-native';
import theme from '../../../theme';
import Header from './Header';
import Counts from './Counts';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    borderColor: theme.colors.secondary,
    backgroundColor: 'white'
  },
});

const RepositoryItem = ({item}) => {
  return (
    <View style={styles.container}>
      <Header item={item} />
      <Counts item={item} />
    </View>
  );
};

export default RepositoryItem;