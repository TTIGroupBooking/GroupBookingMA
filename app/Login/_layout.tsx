// App.tsx

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './index';
import RegistrationForm from './RegistrationForm';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Registration" component={RegistrationForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;



// // App.js
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import LoginForm from './LoginForm';
// import UserInfo from './UserInfo'; // Ensure this is correct

// const Stack = createStackNavigator();

// export default function App() {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator>
//                 <Stack.Screen name="LoginForm" component={LoginForm} />
//                 <Stack.Screen name="UserInfo" component={UserInfo} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }
