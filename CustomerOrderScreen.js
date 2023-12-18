import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from './FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const CustomerOrderScreen = ({ route }) => {
  const { cartItems, totalBill } = route.params;
  const [fakeCardInfo, setFakeCardInfo] = useState('');
  const navigation = useNavigation();

  const placeOrder = async () => {
    try {
    
      const orderRef = await addDoc(collection(db, 'orders'), {
        customerId: 'CUSTOMER_ID',
        orderDate: new Date(),
        totalAmount: totalBill,
        status: 'pending',
      });

   await addDoc(collection(db, 'orderDetails'), {
        orderId: orderRef.id,
        cardInfo: fakeCardInfo,
        products: cartItems.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
        })),
      });

     

      setFakeCardInfo('');
      navigation.navigate('OrderDetails', { orderId: orderRef.id });
    } catch (error) {
      console.error('Error placing order: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Summary</Text>
     
      <Text>Total Bill: {totalBill}</Text>
      <Text>Items:</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - ${item.price}</Text>
          </View>
        )}
      />
    
      <TextInput
        style={styles.input}
        placeholder="Fake Card Info"
        value={fakeCardInfo}
        onChangeText={(text) => setFakeCardInfo(text)}
      />
     
      <Button title="Place Order" onPress={placeOrder} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default CustomerOrderScreen;
