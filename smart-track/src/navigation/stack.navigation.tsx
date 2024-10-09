import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthorScreen from '../screens/author.screen';
import {NavigationContainer} from '@react-navigation/native';
import DashboardScreen from '../screens/dashboard.screen';

const Stack = createNativeStackNavigator();

export default function StackNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          orientation: 'portrait',
          headerStyle: {
            backgroundColor: '#492a60',
          },
          headerTintColor: 'white',
          headerTitle: 'Smart Track',
        }}>
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Author"
          component={AuthorScreen}
          options={{headerTitle: 'Author Screen'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
