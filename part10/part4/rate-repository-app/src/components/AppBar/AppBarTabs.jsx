import { Pressable, Text, StyleSheet, ScrollView } from 'react-native';
import theme from '../../theme';
import { useNavigate } from 'react-router-native';
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
  const { userData } = useUser(true);
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <ScrollView horizontal>
      <Pressable onPress={() => navigate('/')}>
        <Text style={styles.text}>Repositories</Text>
      </Pressable>
      {userData ? (
        <>
          <Pressable onPress={() => navigate('/review')}>
            <Text style={styles.text}>Create a review</Text>
          </Pressable>
          <Pressable onPress={() => navigate('/my-reviews')}>
            <Text style={styles.text}>My Reviews</Text>
          </Pressable>
          <Pressable onPress={() => signOut()}>
            <Text style={styles.text}>Sign Out</Text>
          </Pressable>
        </>
        )
      :
      (
        <>
          <Pressable onPress={() => navigate('/sign-in')}>
            <Text style={styles.text}>Sign In</Text>
          </Pressable>
          <Pressable onPress={() => navigate('/sign-up')}>
            <Text style={styles.text}>Sign Up</Text>
          </Pressable>
        </>
      )}
    </ScrollView>
  );
};

export default AppBarTabs;