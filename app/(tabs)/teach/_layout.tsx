import {Stack} from 'expo-router';

const StackLayout = ()=> {
    return(
        <Stack>
            <Stack.Screen name='index'
            options={{
                headerTitle: "Teach Classes",
                headerShown: false
            }} />
        </Stack>
    );
};

export default StackLayout;