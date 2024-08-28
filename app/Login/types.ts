// types.ts

import { StackNavigationProp } from '@react-navigation/stack';

// Define the parameter list for your stack navigator
export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
};

// Define the type for navigation prop in Login screen
export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

// Define the type for navigation prop in Registration screen
export type RegistrationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Registration'>;
