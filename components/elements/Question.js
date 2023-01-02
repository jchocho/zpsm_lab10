import React from 'react';
import { Text, View } from 'react-native';

const Question = props => {
  return (
    <>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 30,
        }}>
        <Text style={{color: 'black', fontSize: 20, fontFamily: 'Lato-Regular'}}>
          Question {props.numberQuestion} of {props.allQuestionNumber}
        </Text>
        <Text style={{color: 'black', fontSize: 20, fontFamily: 'Lato-Regular'}}>Time: {props.duration} sec</Text>
      </View>
      <View
        style={{justifyContent: 'center', alignItems: 'center', margin: 25}}>
        <Text style={{color: 'black', fontSize: 20, fontFamily: 'Lato-Bold', textAlign: 'center'}}>{props.Question} </Text>
      </View>
    </>
  );
};

export default Question;