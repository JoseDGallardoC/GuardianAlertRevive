// app/(settings)/profile.tsx
import { useNavigation, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
// --- 1. IMPORTAMOS LAS FUNCIONES DE LA BASE DE DATOS ---
import { Profile, getProfile, saveProfile } from '../../lib/database';

// --- Componente reutilizable para nuestros campos de formulario ---
type FormInputProps = { label: string; value: string; onChangeText: (text: string) => void } & TextInputProps;
const FormInput: React.FC<FormInputProps> = ({ label, value, onChangeText, ...props }) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder={label}
      placeholderTextColor="#D1A6B9"
      value={value}
      onChangeText={onChangeText}
      {...props}
    />
  </View>
);

// --- Componente para los Títulos de Sección ---
type SectionTitleProps = { title: string };
const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
    <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
    </View>
);

export default function ProfileScreen() {
  const router = useRouter();
  const navigation = useNavigation(); // Hook para poder modificar el header
  
  // Usamos un solo estado para todo el perfil
  const [profile, setProfile] = useState<Omit<Profile, 'id'>>({
    firstName: '', middleName: null, firstLastName: '', secondLastName: null,
    phone: '', email: '', carSeatName: null, vehicle1Color: null,
    vehicle1Brand: null, vehicle1Plate: null
  });
  
  // --- 2. LÓGICA PARA CARGAR DATOS AL ABRIR LA PANTALLA ---
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedProfile = await getProfile();
        if (storedProfile) {
          setProfile(storedProfile);
        }
      } catch (e) {
        Alert.alert("Error", "No se pudo cargar el perfil.");
      }
    };
    loadProfile();
  }, []);

  // Función para manejar cambios en los inputs
  const handleInputChange = (field: keyof typeof profile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  // --- 3. LÓGICA PARA GUARDAR LOS DATOS ---
  const handleSave = useCallback(async () => {
    if (!profile.firstName || !profile.firstLastName || !profile.phone) {
      Alert.alert("Campos Requeridos", "Por favor, completa al menos Nombre, Apellido y Teléfono.");
      return;
    }
    try {
      await saveProfile(profile);
      Alert.alert("Éxito", "Perfil guardado correctamente.", [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (e) {
      Alert.alert("Error", "No se pudo guardar el perfil.");
    }
  }, [profile, router]);

  // --- 4. LÓGICA PARA HACER FUNCIONAR EL BOTÓN DEL HEADER ---
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSave}>
          <Image 
            source={require('../../assets/images/ic_save_white.png')} 
            style={{ width: 24, height: 24, marginRight: 15, tintColor: '#C12F6E' }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleSave]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.formTitle}>Datos Personales</Text>
      <FormInput label="Primer Nombre" value={profile.firstName} onChangeText={(val) => handleInputChange('firstName', val)} />
      <FormInput label="Segundo Nombre" value={profile.middleName || ''} onChangeText={(val) => handleInputChange('middleName', val)} />
      <FormInput label="Primer Apellido" value={profile.firstLastName} onChangeText={(val) => handleInputChange('firstLastName', val)} />
      <FormInput label="Segundo Apellido" value={profile.secondLastName || ''} onChangeText={(val) => handleInputChange('secondLastName', val)} />
      <FormInput label="Teléfono Principal" value={profile.phone} onChangeText={(val) => handleInputChange('phone', val)} keyboardType="phone-pad" />
      <FormInput label="Email Principal" value={profile.email} onChangeText={(val) => handleInputChange('email', val)} keyboardType="email-address" />
      <FormInput label="Nombre Asiento de Auto" value={profile.carSeatName || ''} onChangeText={(val) => handleInputChange('carSeatName',val)} />

      <SectionTitle title="Información del Vehículo 1" />
      <FormInput label="Color" value={profile.vehicle1Color || ''} onChangeText={(val) => handleInputChange('vehicle1Color', val)} />
      <FormInput label="Marca" value={profile.vehicle1Brand || ''} onChangeText={(val) => handleInputChange('vehicle1Brand', val)} />
      <FormInput label="Patente" value={profile.vehicle1Plate || ''} onChangeText={(val) => handleInputChange('vehicle1Plate', val)} />
      
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar Perfil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 36,
    paddingVertical: 15,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C12F6E',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#D1A6B9',
    paddingVertical: 10,
    fontSize: 16,
  },
  sectionTitleContainer: {
    backgroundColor: '#FFF0F5',
    padding: 12,
    marginTop: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C12F6E',
  },
  saveButton: {
    backgroundColor: '#C12F6E',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 32,
    marginBottom: 32,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});