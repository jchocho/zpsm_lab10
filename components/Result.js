import React from 'react';
import { StyleSheet, RefreshControl, View, Text, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function Result() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const [isLoading, setLoading] = React.useState(true);
  const [results, setResult] = React.useState([]);

  const getResults = async () => {
    try {
      const response = await fetch('https://tgryl.pl/quiz/results?last=5');
      const json = await response.json();
      setResult(json);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getResults();
  }, []);

  const Item = item => (
    <View style={{flexDirection: 'row'}}>
      <Text style={styles.tableRow}>{item.nick}</Text>
      <Text style={styles.tableRow}>
        {item.score}/{item.total}
      </Text>
      <Text style={styles.tableRow}>{item.type}</Text>
      <Text style={styles.tableRow}>{item.createdOn}</Text>
    </View>
  );

  const renderItem = ({item}) => (
    <Item
      nick={item.nick}
      score={item.score}
      total={item.total}
      type={item.type}
      createdOn={item.createdOn}
    />
  );

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View
          style={{
            padding: 20
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.tableTitle}>Nick</Text>
            <Text style={styles.tableTitle}>Point</Text>
            <Text style={styles.tableTitle}>Type</Text>
            <Text style={styles.tableTitle}>Date</Text>
          </View>
          <FlatList
            data={results}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: 'center'
  },
  tableTitle: {
    flex: 1,
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#CCCCCC',
    justifyContent: 'center',
    fontSize: 15,
    color: 'black',
    fontFamily: 'Lato-BoldItalic'
  },
  tableRow: {
    flex: 1,
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#FFFFFF',
    fontSize: 15,
    color: 'black',
    fontFamily: 'Lato-Regular'
  }
});

export default Result;