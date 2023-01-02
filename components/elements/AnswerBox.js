import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';

const AnswerBox = props => {
  const answer = props.answerss;

  const correctAnswer = props.click;
  const mapAnswer = answer.map((anstab, index) => (
    <TouchableOpacity
      key={index}
      style={{
        backgroundColor: "lightgray",
        margin: 5,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1,
        borderRadius: 5
      }}
      onPress={() => {
        {
          correctAnswer(anstab.isCorrect);
        }
      }}>
      <Text style={{fontSize: 15, fontFamily: 'Lato-Regular', color: 'black', textAlign: 'center'}}>
        {anstab.content}
      </Text>
    </TouchableOpacity>
  ));
  return <View style={styles.answerBox}>{mapAnswer}</View>;
};

const styles = StyleSheet.create({
  answerBox: {
    display: 'flex',
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 25,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
});

export default AnswerBox;