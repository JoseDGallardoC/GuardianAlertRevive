// app/(settings)/logs.tsx
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

// --- Definimos el "molde" para una entrada del historial ---
type Log = {
  id: string;
  type: 'ALERTA' | 'CONEXION' | 'BATERIA' | 'INFO';
  message: string;
  timestamp: Date;
};

// --- Datos de ejemplo para la lista ---
const mockLogs: Log[] = [
  { id: '1', type: 'ALERTA', message: 'Alerta de bebé olvidado activada para "Sensor Silla 1"', timestamp: new Date(Date.now() - 3600000) },
  { id: '2', type: 'CONEXION', message: '"Sensor Coche" se ha conectado.', timestamp: new Date(Date.now() - 2 * 3600000) },
  { id: '3', type: 'BATERIA', message: 'Batería baja (15%) en "Sensor Coche".', timestamp: new Date(Date.now() - 3 * 3600000) },
  { id: '4', type: 'INFO', message: 'Contacto de emergencia "Mamá" actualizado.', timestamp: new Date(Date.now() - 5 * 3600000) },
  { id: '5', type: 'CONEXION', message: '"Sensor Silla 1" se ha desconectado.', timestamp: new Date(Date.now() - 8 * 3600000) },
  { id: '6', type: 'ALERTA', message: 'Alerta de temperatura alta (40°C) en "Sensor Coche".', timestamp: new Date(Date.now() - 12 * 3600000) },
];

// --- Componente para mostrar un solo evento en la lista ---
const LogItem: React.FC<{ item: Log }> = ({ item }) => {
  const getLogIcon = () => {
    switch (item.type) {
      case 'ALERTA': return '🔴';
      case 'CONEXION': return '🔗';
      case 'BATERIA': return '🔋';
      case 'INFO': return 'ℹ️';
      default: return '➡️';
    }
  };

  return (
    <View style={styles.logItem}>
      <Text style={styles.logIcon}>{getLogIcon()}</Text>
      <View style={styles.logTextContainer}>
        <Text style={styles.logMessage}>{item.message}</Text>
        <Text style={styles.logTimestamp}>{item.timestamp.toLocaleString('es-CL')}</Text>
      </View>
    </View>
  );
};

export default function LogsScreen() {
  return (
    <FlatList
      style={styles.container}
      data={mockLogs}
      renderItem={({ item }) => <LogItem item={item} />}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={<Text style={styles.title}>Registro de Actividad</Text>}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  logItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  logIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  logTextContainer: {
    flex: 1,
  },
  logMessage: {
    fontSize: 16,
    color: '#333',
  },
  logTimestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});