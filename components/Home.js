import React from 'react';
import { View, Text } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import HomeElement from './elements/HomeElement';

function Home({route, navigation}) {
  const {testList} = route.params;
  const [tests, setTests] = React.useState([]);

  React.useEffect(() => {
    setTests(testList);
  }, []);

  const renderItem = ({item}) => (
    <HomeElement
      backgroundColor={'#ffffff'}
      title={item.name}
      text={item.description}
      lvl={item.level}
      colorText={'#000000'}
      onPress={() => navigation.navigate(item.name)}
    />
  );

  return (
    <>
      <View style={{flex: 1, margin: 20}}>
        <FlatList data={tests} renderItem={renderItem} />
      </View>

      <View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: 'black',
            marginLeft: 30,
            marginRight: 30,
            marginBottom: 30,
            backgroundColor: 'white'
          }}
          onPress={() => navigation.navigate('Results')}>
          <Text style={{fontSize: 20, fontFamily: 'Lora-Bold', textAlign: 'center', color: 'black', margin:10}}>
            Check results!
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default Home;