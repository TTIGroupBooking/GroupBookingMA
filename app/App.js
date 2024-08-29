import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './(tabs)/Home/index.tsx'; 
import ProfileScreen from './(tabs)/Profile/index.tsx'; 
import Teach from './(tabs)/Teach/index.tsx'; 
import ViewScreen from './(tabs)/View/index.tsx'; 
import LoginScreen from './Login/index.tsx'; 
import RegistrationForm from './Login/RegistrationForm.tsx'; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Teach" component={Teach} />
        <Stack.Screen name="View" component={ViewScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegistrationForm" element={RegistrationForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;