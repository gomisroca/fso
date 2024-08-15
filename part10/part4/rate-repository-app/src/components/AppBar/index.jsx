import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../theme';
import AppBarTabs from './AppBarTabs';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: theme.colors.secondary
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTabs />
    </View>
  );
};

export default AppBar;