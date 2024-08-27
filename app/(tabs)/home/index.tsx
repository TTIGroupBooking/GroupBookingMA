import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const Home = () => {

  // const route = useRoute();
  // const {name} = route.params;

    return(
        <SafeAreaView style= {styles.container}>
             <Image source = {{uri:'https://media.istockphoto.com/id/1410336912/photo/happy-teacher-and-schoolgirl-giving-high-five-during-class-at-school.jpg?s=612x612&w=0&k=20&c=waX0PDd_PLqbyY6yBkIj-AL_7RD0J0hzjLHi1S7f8Eo='}}
                style = {{ width: 350, height: 200 }}/>
                <Text style= {styles.text}>LEARNIX</Text>
             <Text style={styles.text}> Welcome {}</Text>
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


export default Home