// app/index.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Initializing = () => {
  const router = useRouter();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const hasCompleted = await AsyncStorage.getItem('hasCompletedOnboarding');
        
        if (hasCompleted) {
          router.replace('/login');
        } else {
          router.replace('/onboarding');
        }
      } catch (e) {
        console.error("Falló al revisar el estado del onboarding.", e);
        router.replace('/onboarding');
      }
    };
    checkOnboardingStatus();
  }, []);

  return (
    <LinearGradient colors={['#C12F6E', '#83234E']} style={styles.container}>
      <ActivityIndicator size="large" color="#FFFFFF" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Initializing;