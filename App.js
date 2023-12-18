import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SellerHomeScreen from './SellerHomeScreen';
import AddProductScreen from './AddProductScreen';
import CustomerHomeScreen from './CustomerHomeScreen';
import CartScreen from './CartScreen';
import CustomerOrderScreen from './CustomerOrderScreen';
import SellerOrderScreen from './SellerOrderScreen';
import OrderDetails from './OrderDetails';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SellerHome">
        <Stack.Screen name="SellerHome" component={SellerHomeScreen} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="CustomerHome" component={CustomerHomeScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="CustomerOrder" component={CustomerOrderScreen} />
        <Stack.Screen name="SellerOrder" component={SellerOrderScreen} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
