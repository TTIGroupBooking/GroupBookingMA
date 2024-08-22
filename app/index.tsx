import { Text, View, Image, TouchableOpacity, ScrollView, Platform, StyleSheet, Alert } from "react-native";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HelloWave } from '@/components/HelloWave';

export default function HomeScreen() {

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/images.jpg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">We are Happy to have you here!</ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">We would love to have you book a class with us! </ThemedText>
        </ThemedText>
      </ThemedView>
      <View style={styles.container}>
        <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert ('TouchableOpacity button pressed')}>
          <Text style={styles.buttonText}>View Classes</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert ('TouchableOpacity button pressed')}>
          <Text style={styles.buttonText}>Book Classes</Text>
        </TouchableOpacity>
      </View>
        <ThemedView style={styles.stepContainer}>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Learn More About Us </ThemedText>
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">**Skillshare** is an online learning platform that offers a wide range of courses across various creative and professional fields. It connects learners with experts and practitioners through video classes, interactive projects, and community feedback. Whether you want to improve your design skills, explore photography, or delve into business strategies, Skillshare provides accessible, flexible learning opportunities tailored to individual needs and interests. The platform encourages hands-on learning and collaboration, fostering a vibrant community of learners and teachers worldwide. </ThemedText>
        </ThemedText>
        </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 250,
    width: 400,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
});


