import React from 'react';
import { View, Text, Alert, ActivityIndicator, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import AnswerBox from './elements/AnswerBox';
import Question from './elements/Question';
import { openDatabase } from 'react-native-sqlite-storage';

function Test({route, navigation}) {
  const {id} = route.params;
  const db = openDatabase({name: 'Quiz.db', createFromLocation: 1});
  let _ = require('lodash');
  const [isLoading, setLoading] = React.useState(true);
  const [test, setTest] = React.useState([]);
  const [start, setStart] = React.useState(false);
  const [testDB, setTestDB] = React.useState([]);

  const getTestFromDatabase = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT quiz_data FROM quiz where id=?',
        [id],
        (tx, results) => {
          setTestDB(JSON.parse(results.rows.item(0).quiz_data));
          setTest(JSON.parse(results.rows.item(0).quiz_data));
          setQuest(_.shuffle(JSON.parse(results.rows.item(0).quiz_data).tasks));
        },
      );
    });
  };

  const saveDatainDB = data => {
    console.log(typeof data);
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO quiz (id, quiz_data) VALUES (?,?)',
        [id, data],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Saved!');
          } else console.log('Save Failed');
        },
      );
    });
  };

  const getTest = async () => {
    let link = 'https://tgryl.pl/quiz/test/';
    link += id;
    try {
      const response = await fetch(link);
      const json = await response.json();
      saveDatainDB(JSON.stringify(json));
    } catch (e) {
      console.log(e);
    } finally {
      getTestFromDatabase();
      setLoading(false);
    }
  };
  const [text, onChangeText] = React.useState(null);
  const [questions, setQuest] = React.useState([{question: null, answers: []}]);

  const [currentIndex, setIndex] = React.useState(0);
  const [currentQuestion, setQuestion] = React.useState(
    questions[currentIndex],
  );
  const [currentPoints, setPoints] = React.useState(0);

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setIndex(currentIndex + 1);
      setQuestion(questions[currentIndex + 1]);
    } else {
      sendResult();
      navigation.navigate('Results');
      Alert.alert('Points: ' + currentPoints + '/' + questions.length);
    }
  };

  const checkAnswer = answer => {
    if (answer === true) {
      setPoints(currentPoints + 1);
    }
    nextQuestion();
  };

  React.useEffect(() => {
    getTest();
    getTestFromDatabase();
    console.log(id);
  }, []);

  const sendResult = async () => {
    try {
      await fetch('http://tgryl.pl/quiz/result', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nick: text,
          score: currentPoints,
          total: test.tasks.length,
          type: test.name,
        }),
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          {!start ? (
            <View style={{flexDirection: 'column'}}>
              <TextInput
                style={{borderWidth: 1, margin: 20, padding: 10}}
                onChangeText={onChangeText}
                value={text}
                placeholder="Nick"></TextInput>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                  margin: 20,
                  marginTop: 20,
                  backgroundColor: 'white'
                }}
                onPress={() => {
                  setQuestion(questions[currentIndex]);
                  setStart(true);
                }}>
                <Text
                  style={{fontSize: 20, fontFamily: 'Lora-Bold', textAlign: 'center', color: 'black', margin: 10}}>
                  Start Quiz!
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View>{console.log(questions)}</View>
              <Question
                Question={currentQuestion.question}
                numberQuestion={currentIndex + 1}
                allQuestionNumber={questions.length}
                duration={currentQuestion.duration}
              />
              <AnswerBox
                answerss={_.shuffle(currentQuestion.answers)}
                click={checkAnswer}
              />
            </>
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'gray',
    margin: '8%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25
  },
});

export default Test;