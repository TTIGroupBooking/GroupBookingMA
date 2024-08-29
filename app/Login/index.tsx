import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userInfo, setUserInfo] = useState([])
    const navigation = useNavigation();
    console.log("navigation logged here, ", navigation);
    const router = useRouter();
    const navigationToTeach = () => {router.push('./RegistrationForm')}
    const navigationToHome = () => {router.push('../Home')};
    const handleSubmit = async () => {
        try {
            const data = {"email": email, "password": password}
            const response = await axios.post("http://localhost:5000/login", data)
            setUserInfo(response.data)
            navigationToHome()
        }
        catch (error) {
            console.error(error)
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode="contain"/>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5F47F2',
        justifyContent: 'center',
        padding: 24,
    },
    logo: {
        width: 150, 
        height: 150,
        alignSelf: 'center',
        marginTop: 20, 
        marginBottom: 50, 
    },
    heading: {
        fontSize: 25,
        color: '#FFFFFF',
        fontFamily: 'Proxima Nova',
        textAlign: 'center',
        marginBottom: 24,
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 5,
        fontFamily: 'Noto Sans',
    },
    input: {
        height: 40,
        fontSize: 13,
        color: '#333333',
        borderRadius: 15,
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
    },
    button: {
        backgroundColor: '#D2EA57',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginVertical: 10,
    },
    registerButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Proxima Nova',
    },
});

export default LoginForm