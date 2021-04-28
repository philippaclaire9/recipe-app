import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Image,
} from 'react-native';

const SingleRecipe = ({ navigation, route }) => {
  const {
    image,
    readyInMinutes,
    servings,
    sourceUrl,
    title,
  } = route.params.recipe;
  const [words, setWords] = useState(['apple', 'banana', 'egg']);
  const deleteWords = () => {
    const newWords = words.slice(1);
    setWords(newWords);
  };
  return (
    <View>
      <Text>{title}</Text>

      {/* {words.map((word, index) => {
        return <Text key={index}>{word}</Text>;
      })} */}
      {/* <TouchableHighlight onPress={deleteWords}>
        <View>
          <Text>Delete Words</Text>
        </View>
      </TouchableHighlight> */}
      {/* <Image source={sourceUrl} /> */}
    </View>
  );
};

export default SingleRecipe;
