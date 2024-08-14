import { Pressable, Text, StyleSheet, ScrollView } from 'react-native';
import theme from '../../theme';
import { Link } from 'react-router-native';
import useUser from '../../hooks/useUser';
import useAuthStorage from '../../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  text: {
    padding: 20,
    fontSize: theme.fontSizes.heading,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeights.bold,
  }
});

const AppBarTabs = () => {
  const user = useUser();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <ScrollView horizontal>
      <Pressable onPress={() => console.log('Pressed')}>
        <Link to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
      </Pressable>
      {user ? (
        <Pressable onPress={() => signOut()}>
          <Text style={styles.text}>Sign Out</Text>
        </Pressable>)
      :
      (<Pressable>
          <Link to="/sign-in">
            <Text style={styles.text}>Sign In</Text>
          </Link>
        </Pressable>
      )}
    </ScrollView>
  );
};

export default AppBarTabs;