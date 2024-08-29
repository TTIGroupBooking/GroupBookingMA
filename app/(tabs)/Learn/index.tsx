import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, Button } from 'react-native';
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

  // Fetch courses data from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getCourses');
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
        const response = await axios.post("http//localhost:5000/bookclass", )
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
        <View style={styles.button}>
          <Button title = "Book this class" onPress={() => handleBooking(item.group_id, item.user_id)}/>
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
    <FlatList
      data={courses}
      renderItem={renderItem}
      keyExtractor={(item) => item.group_id.toString()}  // Ensure the key is unique and valid
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={ItemSeperator}
    />
  );
}

// Define styles for the component
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#F5F5F5',  // Light gray background
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#003366',  // Dark blue text for titles
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
    color: 'rgba(0,0,139,0.7)',
    width: 150,  // Adjust width as needed
  },
  fieldValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 139, 1)',
  },
  seperator: {
    height: 5,
    backgroundColor: '#4169E1',
    marginVertical: 8,
  },
  button: {
    width:150,
    alignItems: 'center',
  }
});

export default CoursesList;

