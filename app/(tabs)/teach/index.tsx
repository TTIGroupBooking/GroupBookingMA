import { Alert, View, Text, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React, { useState } from 'react';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

function NewGroup() {
  const navigation = useNavigation();

  // State variables for each form field
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [weeks, setWeeks] = useState('');
  const [timesPerWeek, setTimesPerWeek] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [minParticipants, setMinParticipants] = useState('');
  const [description, setDescription] = useState('');
  const [preferredDay, setPreferredDay] = useState('Monday');
  const [preferredTime, setPreferredTime] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('Not Active Yet');

  const handleSubmit = async () => {
    const formData = {
      name,
      startDate,
      weeks,
      timesPerWeek,
      maxParticipants,
      minParticipants,
      description,
      preferredDay,
      preferredTime,
      status,
      price
    };

    try {
      console.log("Form data being sent:", formData);
      const response = await axios.post("http://localhost:5000/add_group", formData);

      navigation.goBack();      
      // Show success alert
      Alert.alert(
        "Success",
        "Group created successfully",
        [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert(
        "Error",
        "Error submitting form",
        [
          { text: 'OK' }
        ]
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView>
      <View style={styles.formContainer}>
        {/* Form fields */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>NewsGroup</Text>
        </View>
        <Text style={styles.header}>Group Registration Form</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Course Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter course name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Start Date:</Text>
          <TextInput
            style={styles.input}
            value={startDate}
            onChangeText={setStartDate}
            placeholder="MM-DD-YY"
          />
        </View>

        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>How Many Weeks:</Text>
            <TextInput
              style={styles.input}
              value={weeks}
              onChangeText={setWeeks}
              placeholder="Enter number of weeks"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>How Many Times a Week:</Text>
            <TextInput
              style={styles.input}
              value={timesPerWeek}
              onChangeText={setTimesPerWeek}
              placeholder="Enter times per week"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Min Participants:</Text>
            <TextInput
              style={styles.input}
              value={minParticipants}
              onChangeText={setMinParticipants}
              placeholder="Min participants"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Max Participants:</Text>
            <TextInput
              style={styles.input}
              value={maxParticipants}
              onChangeText={setMaxParticipants}
              placeholder="Max participants"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.textArea}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter a description"
            multiline
          />
        </View>

        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Preferred Day of the Week:</Text>
            <Picker
              selectedValue={preferredDay}
              style={styles.picker}
              onValueChange={(itemValue) => setPreferredDay(itemValue)}
            >
              <Picker.Item label="Monday" value="Monday" />
              <Picker.Item label="Tuesday" value="Tuesday" />
              <Picker.Item label="Wednesday" value="Wednesday" />
              <Picker.Item label="Thursday" value="Thursday" />
              <Picker.Item label="Friday" value="Friday" />
              <Picker.Item label="Saturday" value="Saturday" />
              <Picker.Item label="Sunday" value="Sunday" />
            </Picker>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Preferred Time of Day:</Text>
            <TextInput
              style={styles.input}
              value={preferredTime}
              onChangeText={setPreferredTime}
              placeholder="HH:MM"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price:</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              placeholder="Enter price"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Status:</Text>
          <Picker
            selectedValue={status}
            style={styles.picker}
            onValueChange={(itemValue) => setStatus(itemValue)}
          >
            <Picker.Item label="Active" value="Active" />
            <Picker.Item label="Not Active Yet" value="Not Active Yet" />
          </Picker>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleSubmit} />
          <Button title="Cancel" onPress={() => navigation.goBack()} color="gray" />
        </View>
      </View>
      </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </ScrollView>
  );
}

// Define styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  formContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 8,
    elevation: 2, // Shadow effect on Android
    shadowColor: '#000', // Shadow effect on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContainer: {
    marginBottom: 125,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 12,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 12,
    height: 75,
    textAlignVertical: 'top',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default NewGroup;

// import {View, Text} from 'react-native'
// import React from 'react'

// const teach = () => {
//     return(
//         <View>
//             <Text>Teach</Text>
//         </View>
//     );
// };

// export default teach