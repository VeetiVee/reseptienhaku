import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [apis, setApis] = useState([]);

  const getApis = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
    .then(response => response.json())
    .then(data => setApis(data.meals))
    .catch(error => {
      Alert.alert('Error', error); 
    });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
        placeholder='keyword'
        onChangeText={ text => setKeyword(text)}
        />
      <Button onPress={getApis} title="Find"/>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) =>
      <View>
        <Text style={{fontSize:18, fontWeight: "bold"}}>{item.strMeal}</Text>
        <Image source={{uri: item.strMealThumb }} style={{height:100, width:100}}/>
      </View>}
        data={apis} /> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
