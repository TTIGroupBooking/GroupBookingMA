import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';

const Home = () => {
  const router = useRouter();
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchCookies = async () => {
      try {
        const response = await axios.post("http://localhost:5000/checkCookies");
        if (response.data == "0") {
          router.push('../Login');
        } else {
          console.log(response.data)
          const data = response.data
          const Name = data[1]
          setUserID(data[0])
          setUserName(Name);
        }
      } catch (error) {
        console.error('Error fetching cookies:', error);
      }
    };

    fetchCookies();
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <Image 
        source={{ uri: 'https://media.istockphoto.com/id/1410336912/photo/happy-teacher-and-schoolgirl-giving-high-five-during-class-at-school.jpg?s=612x612&w=0&k=20&c=waX0PDd_PLqbyY6yBkIj-AL_7RD0J0hzjLHi1S7f8Eo=' }}
        style={{ width: 350, height: 200 }}
      />
      <Text style={styles.text}>LEARNIX</Text>
      <Text style={styles.text}>Welcome {userID ? userName : 'Guest'}</Text>
      <Text>Learn New Skills from Experts Worldwide</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 30,
    color: '#000',
  },
});

export default Home;