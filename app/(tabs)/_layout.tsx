import {Tabs} from "expo-router";
import { Ionicons } from '@expo/vector-icons';


export default () => {
    return(
        <Tabs>

            <Tabs.Screen name= "Home" options={{ headerShown: false,
              tabBarIcon: ({color, size}) => (
                <Ionicons name= "home" color={color} size={size}/> ),}} />

            <Tabs.Screen name= "View" options={{ headerShown: false,
              tabBarIcon: ({color, size}) => (
                <Ionicons name= "apps" color={color} size={size}/> ),}} />

            <Tabs.Screen name= "Teach" options={{ headerShown: false,
             tabBarIcon: ({color, size}) => (
                <Ionicons name= "earth" color={color} size={size}/> ),}} />

            <Tabs.Screen name= "Chat" options={{ headerShown: false,
             tabBarIcon: ({color, size}) => (
                <Ionicons name= "chatbubble-outline" color={color} size={size}/> ),}} />

            <Tabs.Screen name= "Profile" options={{ headerShown: false,
              tabBarIcon: ({color, size}) => (
                <Ionicons name= "person" color={color} size={size}/> ),}} />
                
        </Tabs>
    );
};
