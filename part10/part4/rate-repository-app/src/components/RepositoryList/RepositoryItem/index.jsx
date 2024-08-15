import { View, StyleSheet, Pressable } from 'react-native';
import theme from '../../../theme';
import Header from './Header';
import Counts from './Counts';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    borderColor: theme.colors.secondary,
    backgroundColor: 'white'
  },
});

const RepositoryItem = ({item}) => {
  const navigate = useNavigate();
  
  return (
    <View testID="repositoryItem" style={styles.container}>
      
      <Pressable onPress={() => navigate(`/repository/${item.id}`)}>	
        <Header item={item} />
        <Counts item={item} />
      </Pressable>
    </View>
  );
};

export default RepositoryItem;