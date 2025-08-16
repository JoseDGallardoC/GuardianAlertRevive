// app/(settings)/profile.tsx
import React, { useState } from 'react';
// Importamos los tipos que necesitamos de react-native
import { ScrollView, StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

// --- 1. DEFINIMOS LOS TIPOS PARA LAS PROPS DE FormInput ---
type FormInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
} & TextInputProps; // <-- Esto permite pasar cualquier otra prop de un TextInput (como keyboardType)

// --- 2. DEFINIMOS LOS TIPOS PARA LAS PROPS DE SectionTitle ---
type SectionTitleProps = {
  title: string;
};

// --- Componente reutilizable para nuestros campos de formulario (Ahora con tipos) ---
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

// --- Componente para los Títulos de Sección (Ahora con tipos) ---
const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
    <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
    </View>
);

export default function ProfileScreen() {
  // El resto del código de la pantalla no cambia...
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [firstLastName, setFirstLastName] = useState('');
  const [secondLastName, setSecondLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [carSeatName, setCarSeatName] = useState('');

  const [vehicle1Color, setVehicle1Color] = useState('');
  const [vehicle1Brand, setVehicle1Brand] = useState('');
  const [vehicle1Plate, setVehicle1Plate] = useState('');
  const [tweetVehicle1, setTweetVehicle1] = useState(true);

  const [vehicle2Color, setVehicle2Color] = useState('');
  const [vehicle2Brand, setVehicle2Brand] = useState('');
  const [vehicle2Plate, setVehicle2Plate] = useState('');
  const [tweetVehicle2, setTweetVehicle2] = useState(true);
  
  const handleSave = () => {
    alert('Guardando perfil...');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.formTitle}>Datos Personales</Text>
      <FormInput label="Primer Nombre" value={firstName} onChangeText={setFirstName} />
      <FormInput label="Segundo Nombre" value={middleName} onChangeText={setMiddleName} />
      <FormInput label="Primer Apellido" value={firstLastName} onChangeText={setFirstLastName} />
      <FormInput label="Segundo Apellido" value={secondLastName} onChangeText={setSecondLastName} />
      <FormInput label="Teléfono Principal" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <FormInput label="Email Principal" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <FormInput label="Nombre Asiento de Auto" value={carSeatName} onChangeText={setCarSeatName} />

      <SectionTitle title="Información del Vehículo 1" />
      <FormInput label="Color" value={vehicle1Color} onChangeText={setVehicle1Color} />
      <FormInput label="Marca" value={vehicle1Brand} onChangeText={setVehicle1Brand} />
      <FormInput label="Patente" value={vehicle1Plate} onChangeText={setVehicle1Plate} />
      
      <Text style={styles.radioLabel}>¿Habilitar Tweet de Alerta?</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity style={[styles.radioButton, tweetVehicle1 && styles.radioButtonActive]} onPress={() => setTweetVehicle1(true)}>
          <Text style={[styles.radioText, tweetVehicle1 && styles.radioTextActive]}>Sí</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.radioButton, !tweetVehicle1 && styles.radioButtonActive]} onPress={() => setTweetVehicle1(false)}>
          <Text style={[styles.radioText, !tweetVehicle1 && styles.radioTextActive]}>No</Text>
        </TouchableOpacity>
      </View>

      <SectionTitle title="Información del Vehículo 2" />
      <FormInput label="Color" value={vehicle2Color} onChangeText={setVehicle2Color} />
      <FormInput label="Marca" value={vehicle2Brand} onChangeText={setVehicle2Brand} />
      <FormInput label="Patente" value={vehicle2Plate} onChangeText={setVehicle2Plate} />

      <Text style={styles.radioLabel}>¿Habilitar Tweet de Alerta?</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity style={[styles.radioButton, tweetVehicle2 && styles.radioButtonActive]} onPress={() => setTweetVehicle2(true)}>
          <Text style={[styles.radioText, tweetVehicle2 && styles.radioTextActive]}>Sí</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.radioButton, !tweetVehicle2 && styles.radioButtonActive]} onPress={() => setTweetVehicle2(false)}>
          <Text style={[styles.radioText, !tweetVehicle2 && styles.radioTextActive]}>No</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar Perfil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Los estilos se mantienen igual
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
  radioLabel: {
    fontSize: 16,
    color: '#C12F6E',
    marginTop: 10,
    marginLeft: 8
  },
  radioGroup: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 16,
    marginLeft: 8
  },
  radioButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C12F6E',
    marginRight: 10,
  },
  radioButtonActive: {
    backgroundColor: '#C12F6E',
  },
  radioText: {
    color: '#C12F6E',
  },
  radioTextActive: {
    color: '#fff',
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