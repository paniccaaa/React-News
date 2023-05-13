import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { FullPost } from './FullPost';
import { Home } from './Home';
const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen name="FullPost" component={FullPost} options={{title: 'React News'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
