import React from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Rules({navigation}) {
  const setData = async () => {
    try {
      await AsyncStorage.setItem('@RulesKey', '1');
      console.log('zmiana na 1');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          padding: 20,
          marginTop: 20
        }}>
        <Text style={{color: 'black', fontSize: 30, textAlign: 'center'}}>
          Rules of the game
        </Text>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            padding: 10
          }}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              padding: 10,
              marginTop: 50,
              marginBottom: 50
            }}>
            <Text style={{color: 'black', fontSize: 20, textAlign: 'justify'}}>
            Choose one of the available quizzes and answer the given questions. When you finish, you will see your score along with the scores of others.
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: 'black',
            margin: 20,
            marginTop: 30,
            backgroundColor: 'white'
          }}
          onPress={() => {
            setData();
            navigation.navigate('Home Page');
          }}>
          <Text style={{fontSize: 20, textAlign: 'center', color: 'black', margin:10}}>
            Accept
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default Rules;