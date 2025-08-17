// app/(auth)/login.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPress = () => {
    // La lógica de Firebase irá aquí
    Alert.alert('Inicio de Sesión', `Email: ${email}, Contraseña: ${password}`);
  };

  const onGooglePress = () => {
    // La lógica de Firebase para Google Sign-In irá aquí
    Alert.alert('Inicio de Sesión con Google', 'Iniciando...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* 1. Logo */}
        <Image
          source={require('../../assets/images/ic_launch_animation_4.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Gardien Alert</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

        {/* 2. Botón de Google */}
        <TouchableOpacity style={styles.googleButton} onPress={onGooglePress}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }} 
            style={styles.googleIcon} 
          />
          <Text style={styles.googleButtonText}>Continuar con Google</Text>
        </TouchableOpacity>

        <Text style={styles.separator}>o</Text>

        {/* 3. Formulario Clásico */}
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        {/* 4. Enlace a Registro */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>¿No tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text style={styles.linkText}> Regístrate aquí</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  separator: {
    marginVertical: 24,
    color: '#ccc',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#C12F6E',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  linkText: {
    fontSize: 14,
    color: '#C12F6E',
    fontWeight: 'bold',
  },
});