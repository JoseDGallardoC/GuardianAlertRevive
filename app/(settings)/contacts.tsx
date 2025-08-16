// app/(settings)/contacts.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Contact = {
  id: string;
  name: string;
  phone: string;
};

const mockContacts: Contact[] = [
  { id: '1', name: 'Mamá', phone: '+56 9 1111 2222' },
  { id: '2', name: 'Papá', phone: '+56 9 3333 4444' },
  { id: '3', name: 'Emergencia', phone: '131' },
];

const ContactItem: React.FC<{ contact: Contact; onEdit: (id: string) => void }> = ({ contact, onEdit }) => (
  <View style={styles.contactItem}>
    <TouchableOpacity style={styles.contactInfo} onPress={() => onEdit(contact.id)}>
      <Text style={styles.contactName}>{contact.name}</Text>
      <Text style={styles.contactPhone}>{contact.phone}</Text>
    </TouchableOpacity>
    <View style={styles.contactActions}>
      <TouchableOpacity onPress={() => alert(`Eliminar ${contact.name}`)}>
        <Text style={[styles.actionText, { color: '#E53935' }]}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function ContactsScreen() {
  const router = useRouter();
  // Estado para simular si estamos en el flujo de setup inicial
  const [isSetupFlow, setIsSetupFlow] = useState(false); 

  const handleEditContact = (id: string) => {
    // Navegamos a la pantalla de edición, pasando el ID como parámetro
    router.push({ pathname: '/(settings)/contactEdit', params: { id } });
  };

  const handleAddContact = () => {
    // Navegamos a la misma pantalla, pero sin pasar parámetros
    router.push('/(settings)/contactEdit');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Estos son tus contactos de emergencia. Recibirán una alerta SMS.</Text>
      
      <View style={styles.contactsList}>
        {mockContacts.map(contact => (
          <ContactItem key={contact.id} contact={contact} onEdit={handleEditContact} />
        ))}
        {/* Lógica para mostrar el botón de Añadir dinámicamente */}
        {mockContacts.length < 6 && (
          <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
            <Text style={styles.addButtonText}>+ Añadir Nuevo Contacto</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Lógica para mostrar el botón de Continuar condicionalmente */}
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