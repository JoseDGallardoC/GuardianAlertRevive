// app/(settings)/contactEdit.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
// --- 1. IMPORTAMOS TODAS LAS FUNCIONES QUE USAREMOS DE LA DB ---
import { addContact, getContactById, updateContact } from '../../lib/database';

// --- DEFINIMOS LOS TIPOS PARA LAS PROPS ---
type FormInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
} & TextInputProps;

// --- Componente reutilizable para nuestros campos de formulario ---
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

export default function ContactEditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEditing = !!id;

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState(''); // No lo guardaremos, pero lo mantenemos por si lo quieres usar
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // --- 2. useEffect AHORA CARGA DATOS REALES SI ESTAMOS EDITANDO ---
  useEffect(() => {
    if (isEditing) {
      const contactId = parseInt(id, 10);
      const loadContactData = async () => {
        try {
          const contact = await getContactById(contactId);
          if (contact) {
            setFirstName(contact.firstName);
            setLastName(contact.lastName || '');
            setPhone(contact.phone);
            setEmail(contact.email || '');
          }
        } catch (error) {
          Alert.alert("Error", "No se pudieron cargar los datos del contacto.");
        }
      };
      loadContactData();
    }
  }, [id, isEditing]);

  // --- 3. handleSave AHORA PUEDE AÑADIR O ACTUALIZAR ---
  const handleSave = async () => {
    if (!firstName.trim() || !phone.trim()) {
      Alert.alert("Campos requeridos", "Por favor, ingresa al menos un nombre y un teléfono.");
      return;
    }

    try {
      if (isEditing) {
        // Lógica para ACTUALIZAR
        await updateContact(parseInt(id, 10), firstName, lastName, phone, email);
      } else {
        // Lógica para AÑADIR
        await addContact(firstName, lastName, phone, email);
      }
      
      Alert.alert('Éxito', 'El contacto ha sido guardado.', [
        { text: 'OK', onPress: () => router.back() }
      ]);

    } catch (error) {
      console.error("Error al guardar el contacto:", error);
      Alert.alert("Error", "No se pudo guardar el contacto.");
    }
  };
  
  const handleDelete = () => {
    Alert.alert('Confirmar', '¿Estás seguro de que quieres eliminar este contacto?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => router.back() }
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity style={styles.photoButton} onPress={() => alert('Abrir selector de imágenes')}>
        <Image 
          source={require('../../assets/images/ic_add_contact_magenta.png')}
          style={styles.photoIcon}
        />
      </TouchableOpacity>
      <Text style={styles.photoText}>Añadir Foto</Text>

      <View style={styles.form}>
        <FormInput label="Primer Nombre" value={firstName} onChangeText={setFirstName} />
        <FormInput label="Segundo Nombre" value={middleName} onChangeText={setMiddleName} />
        <FormInput label="Apellido" value={lastName} onChangeText={setLastName} />
        <FormInput label="Teléfono" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <FormInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      </View>

      <View style={styles.actionsContainer}>
        {isEditing && (
            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>Eliminar Contacto</Text>
            </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 32,
    paddingVertical: 20,
    alignItems: 'center',
  },
  photoButton: {
    width: 105,
    height: 105,
    borderRadius: 52.5,
    backgroundColor: '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#C12F6E',
    borderStyle: 'dashed',
  },
  photoIcon: {
    width: 50,
    height: 50,
  },
  photoText: {
    marginTop: 8,
    color: '#C12F6E',
    fontSize: 14,
  },
  form: {
    width: '100%',
    marginTop: 32,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#D1A6B9',
    paddingVertical: 10,
    fontSize: 16,
  },
  actionsContainer: {
    width: '100%',
    marginTop: 32,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#C12F6E',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E53935',
  },
  deleteButtonText: {
    color: '#E53935',
    fontSize: 16,
    fontWeight: 'bold',
  },
});