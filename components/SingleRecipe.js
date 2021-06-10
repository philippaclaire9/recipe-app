import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
  Linking,
} from 'react-native';
import { UserContext } from '../contexts/userContext';

const SingleRecipe = ({ navigation, route }) => {
  const { db, user } = useContext(UserContext);

  const { image, readyInMinutes, servings, sourceUrl, title } =
    route.params.recipe;

  let imageURL = image;
  const firstSection = imageURL.slice(0, 4);
  if (firstSection !== 'http') {
    imageURL = `https://spoonacular.com/recipeImages/${image}`;
  }

  const addRecipe = () => {
    const recipeWithId = { ...route.params.recipe, userId: user.userId };
    db.collection('user-recipes')
      .add(recipeWithId)
      .then((docRef) => {
        console.log(docRef);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <TouchableHighlight style={styles.button} onPress={addRecipe}>
        <View>
          <Text>Add to 'My Recipes'</Text>
        </View>
      </TouchableHighlight>
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
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
  },
});

export default SingleRecipe;
