import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { db } from './FirebaseConfig';
import { collection, getDocs, updateDoc, doc, where } from 'firebase/firestore';
// import OrderDetails from './OrderDetails';

const SellerOrderScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
     
      const querySnapshot = await getDocs(collection(db, 'orders'), where('status', '==', 'pending'));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders: ', error);
    }
  };

//   const completeOrder = async (orderId) => {
//     try {
//       // Update the order status to 'completed' in the database
//       await updateDoc(doc(db, 'orders', orderId), {
//         status: 'completed',
//       });
//     //   navigation.navigate('OrderDetails', { orderId });
//     } catch (error) {
//       console.error('Error completing order: ', error);
//     }
//   };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pending Orders</Text>
      {/* <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        //   <OrderDetails
        //     order={item}
        //     onPress={() => completeOrder(item.id)}
        //     buttonText="Complete Order"
        //   />
        )} */}
    {/* /> */}
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

export default SellerOrderScreen;
