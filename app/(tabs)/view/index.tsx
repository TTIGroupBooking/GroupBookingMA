import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';

// Define a TypeScript interface for the course data
interface Course {
  group_id: number;
  user_id: number;
  course_name: string;
  start_date: string;
  Weeks: number;
  timesPerWeek: number;
  Max_Participants: number;
  Min_Participants: number;
  description: string;
  preferred_day: string;
  preferred_time: string;
  Price: string;
  status: string;
}

function CoursesList() {
  // State variables for data, loading, and error
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [idPass, setIDPass] = useState<{groupID: Number; userID: number}[]>([])
  const [bookingStatus, setBookingStatus] = useState('Book this Course')

  // Fetch courses data from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getCourses');
        console.log(response.data)
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleBooking = async (groupID: number, userID: number) => {
      try {
        setIDPass(prevState => [...prevState,{groupID, userID}])
        console.log(groupID)
        console.log(userID)
        console.log(idPass)
        const response = await axios.post("http://localhost:5000/bookClass", idPass)
        setBookingStatus("Booked")
        console.log('hello')
      }
      catch(error) {
        Alert.alert("Error", "Failed ot book the class") 
      }
  };

  // Render a single course item
  const renderItem = ({ item }: { item: Course }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.course_name}</Text>
      <View style={styles.itemDetails}>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldName}>Start Date:</Text>
          <Text style={styles.fieldValue}>{item.start_date}</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldName}>Weeks:</Text>
          <Text style={styles.fieldValue}>{item.Weeks}</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldName}>Times Per Week:</Text>
          <Text style={styles.fieldValue}>{item.timesPerWeek}</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldName}>Min Participants:</Text>
          <Text style={styles.fieldValue}>{item.Min_Participants}</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldName}>Max Participants:</Text>
          <Text style={styles.fieldValue}>{item.Max_Participants}</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldName}>Description:</Text>
          <Text style={styles.fieldValue}>{item.description}</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldName}>Preferred Day:</Text>
          <Text style={styles.fieldValue}>{item.preferred_day}</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldName}>Preferred Time:</Text>
          <Text style={styles.fieldValue}>{item.preferred_time}</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldName}>Price:</Text>
          <Text style={styles.fieldValue}>${item.Price}</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldName}>Status:</Text>
          <Text style={styles.fieldValue}>{item.status}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
          style={styles.button}
          onPress={() => handleBooking(item.group_id, item.user_id)}
          >
            <Text style={styles.buttonText}>{bookingStatus}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

const ItemSeperator =() =>(
  <View style={styles.seperator}/>
)
  // Render the component
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.centered} />;
  }

  if (error) {
    Alert.alert('Error', error);
    return null;
  }

  return (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Become a Pro!</Text>
      <Text style={styles.headerText2}>Start Learning Now.</Text>
    </View>
  
    <FlatList
      data={courses}
      renderItem={renderItem}
      keyExtractor={(item) => item.group_id.toString()}  // Ensure the key is unique and valid
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={ItemSeperator}
    />
    </View>
  );
}

// Define styles for the component
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#F2F2F2',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
  backgroundColor: '#5F47F2',
  },
  headerText:{
    fontSize:25,
    fontWeight: 'bold',
    color: '#D2EA57',
    paddingTop: 20,
    paddingLeft:20,
  },
  headerText2:{
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingBottom: 20,
    paddingLeft:20,
  },
  listContainer: {
    padding: 16,
  },
  card:{
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius:12,
    elevation: 3,
    marginBottom:16,
    shadowColor: '000',
    shadowOffset: {width:0, height:2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',  // Light gray background
    padding: 20,
    borderRadius: 8,
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#867BEC',  // Dark blue text for titles
  },
  itemDetails: {
    marginTop: 8,
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  fieldName: {
    fontSize: 14,
    color: '#555555',
    fontWeight: 'bold',
    width: 150,  // Adjust width as needed
  },
  fieldValue: {
    fontSize: 14,
    color: '#555555',
  },
  seperator: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginVertical: 8,
  },
  button: {
    width:150,
    paddingVertical: 10,
    backgroundColor: '#5F47F2',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 25,
    overflow: 'hidden',
  }
});

export default CoursesList;

