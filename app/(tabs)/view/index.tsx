import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

// Define a TypeScript interface for the course data
interface Course {
  id: number;
  name: string;
  startDate: string;
  weeks: number;
  timesPerWeek: number;
  maxParticipants: number;
  minParticipants: number;
  description: string;
  preferredDay: string;
  preferredTime: string;
  price: string;
  status: string;
}

function CoursesList() {
  // State variables for data, loading, and error
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch courses data from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/groupbooking/courses');
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Render a single course item
  const renderItem = ({ item }: { item: Course }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemText}>Start Date: {item.startDate}</Text>
      <Text style={styles.itemText}>Weeks: {item.weeks}</Text>
      <Text style={styles.itemText}>Times Per Week: {item.timesPerWeek}</Text>
      <Text style={styles.itemText}>Min Participants: {item.minParticipants}</Text>
      <Text style={styles.itemText}>Max Participants: {item.maxParticipants}</Text>
      <Text style={styles.itemText}>Description: {item.description}</Text>
      <Text style={styles.itemText}>Preferred Day: {item.preferredDay}</Text>
      <Text style={styles.itemText}>Preferred Time: {item.preferredTime}</Text>
      <Text style={styles.itemText}>Price: ${item.price}</Text>
      <Text style={styles.itemText}>Status: {item.status}</Text>
    </View>
  );

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
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
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
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemText: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default CoursesList;




// import {View, Text} from 'react-native'
// import React from 'react'

// const view = () => {
//     return(
//         <View>
//             <Text>View</Text>
//         </View>
//     );
// };

// export default view