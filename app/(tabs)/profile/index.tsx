import {View, Text} from 'react-native'
import React from 'react'
import axios from 'axios'
import {useRouter} from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const profile = ( navigation ) => {
  console.log(navigation)
    const getCookies = async () => {
        const response = await axios.post("http://localhost:5000/checkCookies");
          if (response.data =="0") {
            console.log('go to login')
           // navigationToTeach()
          } 
          else {
            return response.data;
          }
      }
      const handleEditCourse = (groupid: number) => {
        
      };
    
      const handleDeleteCourse = (thisGroupId: number) => {
        const yessure = confirm("Are you sure?");
        console.log(yessure);
        if (yessure) {
          fetch(`http://localhost:5000/deleteTeach?userID=${thisGroupId}`);
        }
      };
    
    return(
        <View>
            <Text>Profile</Text>
        </View>
    );
};

export default profile