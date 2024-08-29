import { Alert, View, Text, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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

      // Show success alert
      Alert.alert(
        "Success",
        "Group created successfully",
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert(
        "Error",
        "Error submitting form",
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback>
          <KeyboardAwareScrollView>
            <View style={styles.topSection}>
              <Text style={styles.topHeaderText}>Start Your Teaching Journey Now</Text>
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.header}>New Course Registration</Text>

              {/* Form fields */}
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
                <View style={styles.buttonWrapper}>
                  <Button title="Save" onPress={handleSubmit} color="#5F47F2" />
                </View>
                <View style={styles.buttonWrapper}>
                  <Button title="Cancel" onPress={() => navigation.goBack()} color="gray" />
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  topSection: {
    backgroundColor: '#5F47F2',
    padding: 60,
    alignItems: 'center',
    marginBottom: 20,
  },
  topHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fF6F6F6',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#5F47F2',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    color: '#999999',
  },
  textArea: {
    height: 100,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    textAlignVertical: 'top',
    color: '#999999',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  picker: {
    height: 60, // Adjusted height
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    color: '#999999',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});



export default NewGroup;
