import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { db } from './FirebaseConfig';
import { collection, getDocs, where } from 'firebase/firestore';

const OrderDetails = ({ route, navigation }) => {

  const { orderId } = route.params;
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'orderDetails'), where('orderId', '==', orderId));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrderDetails(data);
    } catch (error) {
      console.error('Error fetching order details: ', error);
    }
  };

  const handleDonePress = () => {
   
  alert('Your Order Successful!!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Details</Text>
      <Text>Order ID: {orderId}</Text>
      <Text>Card Info: {orderDetails.length > 0 ? orderDetails[0].cardInfo : ''}</Text>
      <Text>Products:</Text>
      <FlatList
        data={orderDetails.length > 0 ? orderDetails[0].products : []}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - ${item.price}</Text>
          </View>
        )}
      />
      <Button title="Done" onPress={handleDonePress} />
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
});

export default OrderDetails;
