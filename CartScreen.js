import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CartScreen = ({ route, navigation }) => {
  const { cartItems } = route.params;
  const [totalBill, setTotalBill] = useState(0);

  const calculateTotalBill = () => {
    const bill = cartItems.reduce((total, item) => total + item.price, 0);
    setTotalBill(bill);
    navigation.navigate('CustomerOrder', { cartItems, totalBill: bill });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItemContainer}>
            <View style={styles.productInfoContainer}>
              {item.image && <Image source={{ uri: item.image }} style={styles.productImage} />}
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
                <Text style={styles.productType}>{item.type}</Text>
              </View>
            </View>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${totalBill}</Text>
      </View>
      <Button title="Checkout" onPress={calculateTotalBill} />
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
  cartItemContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
  },
  productInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
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
  totalContainer: {
    marginTop: 16,
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
