import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './FirebaseConfig';
import * as ImagePicker from 'expo-image-picker';

const AddProductScreen = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productType, setProductType] = useState('');
  const [image, setImage] = useState(null);

  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const addProduct = async () => {
    try {
      const newProduct = {
        name: productName,
        price: parseFloat(productPrice),
        type: productType,
        image: image, 
      };

      const docRef = await addDoc(collection(db, 'products'), newProduct);
      console.log('Product added with ID: ', docRef.id);

      navigation.navigate("SellerHome");
    } catch (error) {
      console.error('Error adding product: ', error);
      
    }
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Pick Image" onPress={pickImage} />
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={(text) => setProductName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Price"
        value={productPrice}
        onChangeText={(text) => setProductPrice(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Product Type"
        value={productType}
        onChangeText={(text) => setProductType(text)}
      />
      <Button title="Add Product" onPress={addProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: '100%',
  },
});

export default AddProductScreen;
