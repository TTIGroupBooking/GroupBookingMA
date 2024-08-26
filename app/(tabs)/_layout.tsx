import {Tabs} from "expo-router";
import { Ionicons } from '@expo/vector-icons';


export default () => {
    return(
        <Tabs>

            <Tabs.Screen name= "home" options={{ headerShown: false,
              tabBarIcon: ({color, size}) => (
                <Ionicons name= "home" color={color} size={size}/> ),}} />

            <Tabs.Screen name= "view" options={{ headerShown: false,
              tabBarIcon: ({color, size}) => (
                <Ionicons name= "apps" color={color} size={size}/> ),}} />

            <Tabs.Screen name= "teach" options={{ headerShown: false,
             tabBarIcon: ({color, size}) => (
                <Ionicons name= "earth" color={color} size={size}/> ),}} />

            <Tabs.Screen name= "profile" options={{ headerShown: false,
              tabBarIcon: ({color, size}) => (
                <Ionicons name= "person" color={color} size={size}/> ),}} />
                
        </Tabs>
    );
};
