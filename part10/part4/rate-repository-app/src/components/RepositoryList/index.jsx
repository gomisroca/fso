import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import theme from '../../theme';
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

class RepositoryListContainer extends React.Component {
  
  renderHeader = () => {
    const { order, setOrder, setSearch } = this.props;

    return (
      <>
        <TextInput placeholder="🔍 Search" style={{ padding: 10 }} onChange={e => setSearch(e.nativeEvent.text)} />
        <Picker
        selectedValue={order}
        onValueChange={(value) => setOrder(value)}>
          <Picker.Item label="Latest" value="latest" />
          <Picker.Item label="Highest Rated" value="highest" />
          <Picker.Item label="Lowest Rated" value="lowest" />
        </Picker>
      </>
    )
  }
  render() {
    const { repositories, onEndReach } = this.props;
    const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

    return (
      <View style={styles.container}>
        <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({item}) => <RepositoryItem item={item} />}
          keyExtractor={item => item.id}
          ListHeaderComponent={this.renderHeader}
          ListHeaderComponentStyle={{ width: '100%', backgroundColor: 'white', borderRadius: theme.borderRadius, marginBottom: 10  }}
          onEndReached={onEndReach}
        />
      </View>
    );
  }
}

const RepositoryList = () => {
  const [ order, setOrder ] = useState('latest');
  const [ search, setSearch ] = useState('');
  const [searchKeyword] = useDebounce(search, 500);

  let orderBy;
  let orderDirection;
  switch(order){
    case 'latest':
      orderBy = 'CREATED_AT';
      orderDirection = 'DESC'; 
      break;
    case 'highest':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'DESC';
      break;
    case 'lowest':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'ASC';
      break;
  }
  const { repositories, fetchMore } = useRepositories(orderBy, orderDirection, searchKeyword, 10);

  const onEndReach = () => {
    fetchMore();
  };

  return <RepositoryListContainer repositories={repositories} order={order} setOrder={setOrder} setSearch={setSearch} onEndReach={onEndReach} />;
};

export default RepositoryList;