import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from './FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const CustomerHomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products: ', error);
    }
  };

  const addToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
  };

  const navigateToCart = () => {
    navigation.navigate('Cart', { cartItems });
  };

  const navigateToProductDetails = (item) => {
    navigation.navigate('ProductDetails', { item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Customer Home Screen</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            {item.image && (
              <TouchableOpacity onPress={() => navigateToProductDetails(item)}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
              </TouchableOpacity>
            )}
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <Text style={styles.productType}>{item.type}</Text>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.viewCartButton} onPress={navigateToCart}>
        <Text style={styles.viewCartButtonText}>View Cart</Text>
      </TouchableOpacity>
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
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
  },
  productImage: {
    width: '100%',
    height: 200,
    marginBottom: 8,
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
    marginBottom: 8,
  },
  productType: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
  },
  addToCartButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewCartButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  viewCartButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomerHomeScreen;
