// app/(settings)/devices.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- Definimos el "molde" para un dispositivo configurado ---
type ConfiguredDevice = {
  id: string;
  name: string;
  macAddress: string;
};

// --- Datos de ejemplo para la lista ---
const mockConfiguredDevices: ConfiguredDevice[] = [
  { id: '1', name: 'Sensor Silla de Auto', macAddress: 'AA:BB:CC:11:22:33' },
  { id: '2', name: 'Sensor Cuna', macAddress: 'DD:EE:FF:44:55:66' },
];

// --- Componente para mostrar un solo dispositivo en la lista ---
const ConfiguredDeviceItem: React.FC<{ device: ConfiguredDevice }> = ({ device }) => (
  <View style={styles.deviceItem}>
    <View style={styles.deviceInfo}>
      <Text style={styles.deviceName}>{device.name}</Text>
      <Text style={styles.deviceMac}>{device.macAddress}</Text>
    </View>
    <View style={styles.deviceActions}>
      <TouchableOpacity onPress={() => alert(`Renombrar ${device.name}`)}>
        <Text style={styles.actionText}>Renombrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert(`Eliminar ${device.name}`)}>
        <Text style={[styles.actionText, { color: '#E53935' }]}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function DevicesScreen() {
  const router = useRouter();

  const handleAddNewDevice = () => {
    // En el futuro, esto nos llevará a la pantalla de escaneo Bluetooth
    alert('Iniciando búsqueda de nuevos dispositivos...');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddNewDevice}>
        <Text style={styles.addButtonText}>+ Añadir Nuevo Dispositivo</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Dispositivos Vinculados</Text>
      
      {/* --- Contenedor donde generamos la lista dinámicamente --- */}
      <View style={styles.devicesList}>
        {mockConfiguredDevices.map(device => (
          <ConfiguredDeviceItem key={device.id} device={device} />
        ))}
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
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  devicesList: {
    // Contenedor dinámico
  },
  deviceItem: {
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
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: '600',
  },
  deviceMac: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
    fontFamily: 'monospace', // Buena práctica para direcciones MAC
  },
  deviceActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: '#C12F6E',
    fontWeight: 'bold',
    marginLeft: 16,
  },
  addButton: {
    backgroundColor: '#C12F6E',
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 24,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});