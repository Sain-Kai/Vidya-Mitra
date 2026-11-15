import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { COLORS } from '../constants/colors';
const Stack = createStackNavigator();
export const RootNavigator = () => {
 return (
 <NavigationContainer>
 <Stack.Navigator
 screenOptions={{
 headerShown: false,
 animationEnabled: true,
 cardStyle: { backgroundColor: COLORS.white },
 }}
 >
 <Stack.Screen name="Home" component={HomeScreen} />
 </Stack.Navigator>
 </NavigationContainer>
 );
};
