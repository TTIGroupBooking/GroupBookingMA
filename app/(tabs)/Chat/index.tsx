import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.chatContent}
        enableOnAndroid={true}
        extraHeight={Platform.OS === 'ios' ? 90 : 110} // Adjust for keyboard
      >
        <ScrollView style={styles.chatContainer}>
          {chatHistory.map((chat, index) => (
            <View key={index} style={styles.chatBubble}>
              {chat.user ? <Text style={styles.userText}>User: {chat.user}</Text> : null}
              {chat.bot ? <Text style={styles.botText}>Bot: {chat.bot}</Text> : null}
            </View>
          ))}
        </ScrollView>
      </KeyboardAwareScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message"
          onSubmitEditing={handleSubmitEditing}
          placeholderTextColor="#888"
        />
        <Button title="Send" onPress={sendMessage} color="#5F47F2" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  chatContainer: {
    flex: 1,
    padding: 20,
  },
  chatContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  chatBubble: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userText: {
    color: '#333333',
    fontSize: 16,
    marginBottom: 5,
  },
  botText: {
    color: '#5F47F2',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    flex: 1,
    borderRadius: 25,
    backgroundColor: '#fff',
    marginRight: 10,
  },
});

export default ChatBot;
