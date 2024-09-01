import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const router = useRouter();
  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState("");
  console.log('i am home')
  
  // useEffect(() => {
  //   const fetchCookies = async () => {
  //     try {
  //       const response = await axios.post("http://localhost:5000/checkCookies");
  //       if (response.data == "0") {
  //         router.push('../Login');
  //       } else {
  //         console.log(response.data)
  //         const data = response.data
  //         const Name = data[1]
  //         setUserID(data[0])
  //         setUserName(Name);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching cookies:', error);
  //     }
  //   };

  //   fetchCookies();
  // }, [router]);
useEffect(() => {
  const getCookies = async () => {
    try {
    const id = await AsyncStorage.getItem("@userId");
    const name = await AsyncStorage.getItem("@userName");
    if (id && name) {
      setUserID(id);
      setUserName(name);
    }
    else {
        router.push('../Login');
    }
  } catch (error) {
    console.error("Error retrieving cookies", error)
  }
  };  
  getCookies()
}, [router] );
  
  const classData = [
    { name: 'Web Design', icon: require('../../../assets/icons/webDesignIcon.png') },
    { name: 'Hairstyling Course', icon: require('../../../assets/icons/hairstylingIcon.png') },
    { name: 'Cooking Class', icon: require('../../../assets/icons/cookingIcon.png') },
  ];
console.log('hello')
  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../../assets/images/logo.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
        </View>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../../assets/images/homeImage.png')} 
            style={styles.image}  
            resizeMode="contain"
          />
        </View>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hi {userID ? userName : 'Guest'}!</Text>
          <Text style={styles.subText}>Let's Elevate Your Learning Experience</Text>
        </View>
        <View style={styles.featuredClassesContainer}>
          <Text style={styles.featuredTitle}>Featured Classes</Text>
          <View style={styles.featuredBoxesContainer}>
            {classData.map((item, index) => (
              <View key={index} style={styles.featuredBox}>
                <Image source={item.icon} style={styles.icon} />
                <Text style={styles.boxText}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Welcome to Learnix Pro,
          </Text>
          <Text style={styles.infoText2}>
            the ultimate platform for sharing and expanding your knowledge! Here, you can become part of a vibrant community where you can teach others by creating your own courses or enhance your skills by enrolling in live classes taught by experts. Embrace the joy of learning and growing—knowledge is a powerful asset that stays with you forever. Join us in this journey of continuous improvement and empowerment!
          </Text>
        </View>
        <View style={styles.testimonialsContainer}>
          <Text style={styles.testimonialsTitle}>What Our Students Are Saying</Text>
          <Text style={styles.testimonial}>“Learnix has transformed my learning experience!”</Text>
          <Text style={styles.testimonial2}>“The classes are engaging and fun!”</Text>
          <Text style={styles.testimonial3}>“Learnix makes learning enjoyable and accessible. Highly recommend!”</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#5F47F2',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 175,
    height: 175,
  },
  imageContainer: {
    marginTop: 25,
  },
  image: {
    width: '100%',
    height: 340, 
    resizeMode: 'cover',
  },
  greetingContainer: {
    marginTop: 16,
    padding: 25,
  },
  greetingText: {
    fontSize: 25,
    color: '#D2EA57',
    fontFamily: 'Proxima Nova',
    textAlign: 'left',
  },
  subText: {
    fontSize: 34,
    color: '#FFFFFF',
    marginTop: 8,
    fontFamily: 'Proxima Nova',
    textAlign: 'left',
  },
  featuredClassesContainer: {
    backgroundColor: '#F3F3F3',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    marginHorizontal: -20,
    marginTop: 24,
  },
  featuredTitle: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 10,
  },
  featuredBoxesContainer: {
    flexDirection: 'column',
    position: 'relative',
  },
  featuredBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
  },
  icon: {
    width: 30,
    height: 30,
  },
  boxText: {
    fontSize: 16,
    color: '#333333',
  },
  infoContainer: {
    backgroundColor: '#D2EA57',
    padding: 24,
    marginHorizontal: -20,
  },
  infoText: {
    fontSize: 22,
    color: '#5F47F2',
    paddingTop: 24,
    paddingRight: 24,
    paddingLeft: 24,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  infoText2: {
    fontSize: 15,
    color: '#5F47F2',
    paddingTop: 6,
    paddingRight: 24,
    paddingLeft: 24,
    paddingBottom: 24,
    lineHeight: 24,
  },
  testimonialsContainer: {
    backgroundColor: '#5F47F2',
    padding: 24,
    marginHorizontal: -20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  testimonialContainer: {
    marginHorizontal: -20,
  },
  testimonialsTitle: {
    fontSize: 25,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 25,
    marginTop: 25,
    textAlign: 'center',
  },
  testimonial: {
    marginRight: -20,
    fontSize: 16,
    fontFamily: 'Noto Sans',
    color: '#D2EA57',
    textAlign: 'center',
  },
  testimonial2: {
    padding: 24,
    fontSize: 16,
    fontFamily: 'Noto Sans',
    color: '#CCCCFF',
    textAlign: 'left', 
    marginLeft: -30, 
    paddingLeft: 0,
  },
  testimonial3: {
    padding: 14,
    fontSize: 16,
    fontFamily: 'Noto Sans',
    color: '#F3F3F3',
    textAlign: 'center', 
    marginRight: -30, 
    paddingLeft: 0,
  },
});
export default Home;