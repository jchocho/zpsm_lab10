import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const HomeElement = props => {
  return (
    <TouchableOpacity
      style={[
        {backgroundColor: props.backgroundColor},
        {borderWidth: 1},
        {margin: 10},
        {padding: 10}
      ]}
      onPress={props.onPress}>
      <Text style={[{fontSize: 20}, {fontFamily: 'Lato-Bold'}, {color: props.colorText}, {marginBottom: 10}]}>
        {props.title}
      </Text>
      <Text style={[{color: props.colorText}, {fontFamily: 'Lora-MediumItalic'}, {marginBottom: 10}]}>Poziom: {props.lvl}</Text>
      <Text style={[{fontSize: 15}, {fontFamily: 'Lato-Regular'}, {color: props.colorText}]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};
export default HomeElement;