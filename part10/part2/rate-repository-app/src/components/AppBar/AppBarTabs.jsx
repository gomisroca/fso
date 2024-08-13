import { Pressable, Text, StyleSheet, ScrollView } from 'react-native';
import theme from '../../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  text: {
    padding: 20,
    fontSize: theme.fontSizes.heading,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeights.bold,
  }
});

const AppBarTabs = () => {
  return (
    <ScrollView horizontal>
      <Pressable onPress={() => console.log('Pressed')}>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
      </Pressable>
      <Pressable onPress={() => console.log('Pressed')}>
        <Link to="/sign-in">
          <Text style={styles.text}>Sign In</Text>
        </Link>
      </Pressable>
    </ScrollView>
  );
};

export default AppBarTabs;