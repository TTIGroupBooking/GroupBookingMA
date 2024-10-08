import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { Cookies } from '@react-native-cookies/cookies'
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userFound, setUserFound] = useState(true)
    const navigation = useNavigation();
    const router = useRouter();
    const navigationToTeach = () =>{router.push('./RegistrationForm')}
    const navigationToHome = () =>{router.push('../Home')}
    const handleSubmit = async () => {
        console.log('here')
        try {
            const data = {"email": email, "password": password}
            const response = await axios.post("http://localhost:5000/login", data)
            console.log('1')
            if (response.data===0){
                setUserFound(false);
                console.log('2')
            }
            else {
                console.log('43')
            console.log(response.data)
            console.log('wow')
            AsyncStorage.setItem("@userId", response.data[0])
            AsyncStorage.setItem("@userName", response.data[1])
            console.log('wee')
            navigationToHome()
            }
        }
        catch (error) {
            console.error(error)
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Login</Text>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Password:</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={navigationToTeach}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <View>
                {!userFound && <Text>Incorrect user name or password</Text>}
            </View>
            <Text></Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default LoginForm