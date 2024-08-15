import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import RepositoryItem from "../RepositoryList/RepositoryItem";
import theme from "../../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  link: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  }
});

const RepositoryInfo = ({ repository }) => {
  const goToRepository = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <RepositoryItem item={repository} />
      <Pressable onPress={() => goToRepository(repository.url)}>
        <View style={styles.link}>
          <Text style={styles.linkText}>Open in GitHub</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default RepositoryInfo