// app/(auth)/register.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from 'react-native';

// --- Reutilizamos nuestros componentes de formulario ---
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
type SectionTitleProps = { title: string };
const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
    <View style={styles.sectionTitleContainer}><Text style={styles.sectionTitle}>{title}</Text></View>
);

export default function RegisterScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [vehicleColor, setVehicleColor] = useState('');
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');

  const onRegisterPress = () => {
    // La lógica de registro con Firebase irá aquí
    Alert.alert('Registrando...', 'El formulario de registro está listo.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Crear Cuenta</Text>
        <Text style={styles.subtitle}>Completa tus datos para empezar</Text>

        <SectionTitle title="Datos Personales (Obligatorio)" />
        <FormInput label="Nombre" value={firstName} onChangeText={setFirstName} />
        <FormInput label="Apellido" value={lastName} onChangeText={setLastName} />
        <FormInput label="Teléfono" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <FormInput label="Correo Electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize='none' />
        <FormInput label="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
        
        <SectionTitle title="Información del Vehículo (Obligatorio)" />
        <FormInput label="Color" value={vehicleColor} onChangeText={setVehicleColor} />
        <FormInput label="Marca / Modelo" value={vehicleBrand} onChangeText={setVehicleBrand} />
        <FormInput label="Patente" value={vehiclePlate} onChangeText={setVehiclePlate} />

        <TouchableOpacity style={styles.registerButton} onPress={onRegisterPress}>
          <Text style={styles.registerButtonText}>Crear Cuenta y Continuar</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Ya tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.linkText}> Inicia Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
    },
    sectionTitleContainer: {
        backgroundColor: '#FFF0F5',
        padding: 12,
        marginTop: 8,
        marginBottom: 16,
        width: '100%',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#C12F6E',
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 12,
        fontSize: 16,
    },
    registerButton: {
        width: '100%',
        backgroundColor: '#C12F6E',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
    },
    registerButtonText: {
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