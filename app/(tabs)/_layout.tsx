import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#5F47F2', // Your active icon color
                tabBarInactiveTintColor: '#999999', // Your inactive icon color
                tabBarStyle: {
                    backgroundColor: '#f3f3f3', // Background color of the tab bar
                    borderTopColor: '#CCCCCC', // Border color on the top of the tab bar
                },
                tabBarLabelStyle: {
                    fontSize: 12, // Size of the label text
                },
            }}
        >
            <Tabs.Screen name="Home" options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="home" size={size} color={color} />
                ),
            }} />
            <Tabs.Screen name="Learn" options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome name="list-alt" size={size} color={color} />
                ),
            }} />
            <Tabs.Screen name="Teach" options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="earth" color={color} size={size} />
                ),
            }} />
            <Tabs.Screen name="Chat" options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="chatbubble-outline" color={color} size={size} />
                ),
            }} />
            <Tabs.Screen name="Profile" options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="user" size={size} color={color} />
                ),
            }} />
        </Tabs>
    );
};
