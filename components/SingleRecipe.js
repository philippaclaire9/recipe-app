import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Image,
  Linking,
} from 'react-native';

const SingleRecipe = ({ navigation, route }) => {
  const { image, readyInMinutes, servings, sourceUrl, title } =
    route.params.recipe;

  let imageURL = image;
  const firstSection = imageURL.slice(0, 4);
  if (firstSection !== 'http') {
    imageURL = `https://spoonacular.com/recipeImages/${image}`;
  }

  // const [words, setWords] = useState(['apple', 'banana', 'egg']);
  // const deleteWords = () => {
  //   const newWords = words.slice(1);
  //   setWords(newWords);
  // };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image
        style={styles.image}
        source={{
          uri: imageURL,
        }}
        alt={title}
      />
      {readyInMinutes && <Text>Ready in {readyInMinutes} minutes </Text>}
      {servings && <Text>Serves {servings}</Text>}
      <Text onPress={() => Linking.openURL(sourceUrl)}>Recipe here</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderColor: 'blue',
    borderWidth: 3,
  },
});

export default SingleRecipe;
