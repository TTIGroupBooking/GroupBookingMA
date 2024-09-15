import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./(tabs)/Home/index.tsx";
import Profile from "./(tabs)/Profile/index.tsx";
import Teach from "./(tabs)/Teach/index.tsx";
import Learn from "./(tabs)/Learn/index.tsx";
import Login from "./Login/index.tsx";
import RegistrationForm from "./Login/RegistrationForm.tsx";

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Profile" component={Profile} />
				<Stack.Screen name="Teach" component={Teach} />
				<Stack.Screen name="Learn" component={Learn} />
				<Stack.Screen name="LoginScreen" component={Login} />
				<Stack.Screen name="RegistrationForm" element={RegistrationForm} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;