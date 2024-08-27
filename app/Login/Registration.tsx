import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const handleChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const navigation = useNavigation();

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleSubmit = async () => {
        // Handle form submission, e.g., send data to an API
     try {
        const response = await axios.post("http://localhost:5000/register",formData);
        console.log(response.data)
        navigation.goBack();
     }
     catch (error) {
        console.error("Error submitted form:", error);
     }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Register</Text>
            <View style={styles.formGroup}>
                <Text style={styles.label}>First Name:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.firstName}
                    onChangeText={(text) => handleChange('firstName', text)}
                    placeholder="Enter your first name"
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Last Name:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.lastName}
                    onChangeText={(text) => handleChange('lastName', text)}
                    placeholder="Enter your last name"
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Phone Number:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.phone}
                    onChangeText={(text) => handleChange('phone', text)}
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.email}
                    onChangeText={(text) => handleChange('email', text)}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Password:</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={!passwordVisible}
                        value={formData.password}
                        onChangeText={(text) => handleChange('password', text)}
                        placeholder="Enter your password"
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Text style={styles.toggleText}>{passwordVisible ? 'Hide' : 'Show'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Confirm Password:</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={!confirmPasswordVisible}
                        value={formData.confirmPassword}
                        onChangeText={(text) => handleChange('confirmPassword', text)}
                        placeholder="Confirm your password"
                    />
                    <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                        <Text style={styles.toggleText}>{confirmPasswordVisible ? 'Hide' : 'Show'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
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
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    toggleText: {
        color: '#007bff',
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default RegistrationForm;