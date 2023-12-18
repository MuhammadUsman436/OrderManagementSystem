import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from './FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const SellerHomeScreen = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProducts();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products: ', error);
    }
  };

  const navigateToAddProduct = () => {
    navigation.navigate('AddProduct');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Seller Home Screen</Text>
      <Button title="Add Product" onPress={navigateToAddProduct} />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            {item.image && <Image source={{ uri: item.image }} style={styles.productImage} />}
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <Text style={styles.productType}>{item.type}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productContainer: {
    marginBottom: 16,
  },
  productImage: {
    width: '100%',
    height: 200,
    marginBottom: 8,
    borderRadius: 12,
    marginTop:20
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
  },
  productType: {
    fontSize: 14,
    color: 'gray',
  },
});

export default SellerHomeScreen;
