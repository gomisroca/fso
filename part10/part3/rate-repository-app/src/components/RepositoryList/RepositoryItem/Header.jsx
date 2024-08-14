import {Text, Image, View, StyleSheet } from 'react-native';
import theme from '../../../theme';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  avatar: {
    marginTop: 5,
    width: 50,
    height: 50,
    borderRadius: 10,
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
  languageContainer: {
    flexDirection: 'row',	
  },
  language: {
    flexGrow: 0,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 4,
    backgroundColor: theme.colors.accent,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.textSecondary,
  }
});

const RepositoryItemHeader = ({item}) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={{uri: item.ownerAvatarUrl}} style={styles.avatar} />
      <View style={styles.headerTextContainer}>
        <Text style={styles.title}>{item.fullName}</Text>
        <Text style={styles.subtitle}>{item.description}</Text>
        <View style={styles.languageContainer}>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItemHeader;