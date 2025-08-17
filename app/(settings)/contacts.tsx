// app/(settings)/contacts.tsx
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// --- 1. IMPORTAMOS TODAS LAS FUNCIONES DE LA DB ---
import { Contact, deleteContact, getContacts } from '../../lib/database';

// --- 2. ACTUALIZAMOS ContactItem PARA RECIBIR onDelete ---
const ContactItem: React.FC<{
  contact: Contact;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}> = ({ contact, onEdit, onDelete }) => (
  <View style={styles.contactItem}>
    <TouchableOpacity style={styles.contactInfo} onPress={() => onEdit(contact.id)}>
      <Text style={styles.contactName}>{contact.firstName} {contact.lastName || ''}</Text>
      <Text style={styles.contactPhone}>{contact.phone}</Text>
    </TouchableOpacity>
    <View style={styles.contactActions}>
      <TouchableOpacity onPress={() => onDelete(contact.id)}>
        <Text style={[styles.actionText, { color: '#E53935' }]}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function ContactsScreen() {
  const router = useRouter();
  const [isSetupFlow, setIsSetupFlow] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

  // --- 3. CREAMOS UNA FUNCIÓN REUTILIZABLE PARA CARGAR CONTACTOS ---
  const loadContacts = useCallback(async () => {
    try {
      const storedContacts = await getContacts();
      setContacts(storedContacts);
    } catch (error) {
      console.error("Error al cargar los contactos:", error);
      Alert.alert("Error", "No se pudieron cargar los contactos.");
    }
  }, []);

  // useFocusEffect ahora solo llama a nuestra función de carga
  useFocusEffect(
    useCallback(() => {
      loadContacts();
    }, [loadContacts])
  );

  // --- 4. CREAMOS LA FUNCIÓN PARA MANEJAR LA ELIMINACIÓN ---
  const handleDeleteContact = (id: number) => {
    Alert.alert(
      "Eliminar Contacto",
      "¿Estás seguro de que quieres eliminar este contacto? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteContact(id);
              // Volvemos a cargar la lista para que se refleje el cambio
              loadContacts();
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el contacto.");
            }
          },
        },
      ]
    );
  };

  const handleEditContact = (id: number) => {
    router.push({ pathname: '/(settings)/contactEdit', params: { id: id.toString() } });
  };

  const handleAddContact = () => {
    router.push('/(settings)/contactEdit');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Estos son tus contactos de emergencia. Recibirán una alerta SMS.</Text>

      <View style={styles.contactsList}>
        {/* --- 5. PASAMOS LA NUEVA FUNCIÓN handleDeleteContact AL COMPONENTE --- */}
        {contacts.map(contact => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onEdit={handleEditContact}
            onDelete={handleDeleteContact}
          />
        ))}

        {contacts.length < 6 && (
          <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
            <Text style={styles.addButtonText}>+ Añadir Nuevo Contacto</Text>
          </TouchableOpacity>
        )}
      </View>

      {isSetupFlow && (
        <TouchableOpacity style={styles.continueButton} onPress={() => router.back()}>
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 24,
  },
  title: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  contactsList: {
    // Contenedor dinámico
  },
  contactItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
  },
  contactPhone: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  contactActions: {
    // Contenedor para los botones de acción
  },
  actionText: {
    color: '#C12F6E',
    fontWeight: 'bold',
    marginLeft: 16,
  },
  addButton: {
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  addButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#C12F6E',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 24,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});