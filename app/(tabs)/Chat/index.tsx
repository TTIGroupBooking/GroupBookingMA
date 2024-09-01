import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ChatBot = () => {
  type ChatEntry = {
    user: string;
    bot: string;
  };

  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);

  // Add a default message when the component mounts
  useEffect(() => {
    setChatHistory([{ user: '', bot: "How can I help you today?" }]);
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return; // Avoid sending empty messages
    try {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setChatHistory(prevHistory => [...prevHistory, { user: message, bot: data.response }]);
      setMessage('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle the submit event when the user presses Enter
  const handleSubmitEditing = () => {
    sendMessage();
  };

  return (
     <KeyboardAwareScrollView>
        <SafeAreaView style={styles.container}>
      <ScrollView style={styles.chatContainer} contentContainerStyle={styles.chatContent}>
        {chatHistory.map((chat, index) => (
          <View key={index} style={styles.chatBubble}>
            {chat.user ? <Text>User: {chat.user}</Text> : null}
            {chat.bot ? <Text>Bot: {chat.bot}</Text> : null}
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message"
          onSubmitEditing={handleSubmitEditing} // Handle Enter key press
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  chatContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  chatBubble: {
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    flex: 1,
    borderRadius: 5,
  },
});

export default ChatBot;


