// app/onboarding.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PagerView from 'react-native-pager-view';


const { width } = Dimensions.get('window');

const OnboardingScreen = () => {
  const router = useRouter();

  // La función ahora es 'async' para poder usar AsyncStorage
const handleFinishOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      router.replace('/login');
    } catch (e) {
      console.error("Falló al guardar el estado del onboarding.", e);
      router.replace('/login');
    }
};

  return (
    <SafeAreaView style={styles.container}>
      <PagerView style={styles.pagerView} initialPage={0}>
        {/* --- Diapositiva 1 --- */}
        <View style={styles.page} key="1">
          <Image source={require('../assets/images/ic_launch_animation_4.png')} style={styles.image} />
          <Text style={styles.title}>Bienvenido a Gardien Alert</Text>
          <Text style={styles.description}>
            Tu asistente inteligente para la seguridad de los más pequeños en el vehículo.
          </Text>
        </View>
        
        {/* --- Diapositiva 2 --- */}
        <View style={styles.page} key="2">
          <Image source={require('../assets/images/ic_history_white.png')} style={[styles.image, { tintColor: '#C12F6E' }]} />
          <Text style={styles.title}>Detección y Alertas Inteligentes</Text>
          <Text style={styles.description}>
            Gardien detecta si tu bebé está en su asiento y te avisa si te alejas del vehículo, previniendo olvidos.
          </Text>
        </View>
        
        {/* --- Diapositiva 3 --- */}
        <View style={styles.page} key="3">
          <Image source={require('../assets/images/ic_emergency_contact_white.png')} style={[styles.image, { tintColor: '#C12F6E' }]} />
          <Text style={styles.title}>Avisa a tus Seres Queridos</Text>
          <Text style={styles.description}>
            En caso de una alerta, la app puede enviar un SMS a tus contactos de emergencia.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleFinishOnboarding}>
            <Text style={styles.buttonText}>Comenzar</Text>
          </TouchableOpacity>
        </View>
      </PagerView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#C12F6E',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 60,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;