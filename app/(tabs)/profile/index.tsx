import {View, Text} from 'react-native'
import React from 'react'
import axios from 'axios'

const profile = () => {
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
    return(
        <View>
            <Text>Profile</Text>
        </View>
    );
};

export default profile