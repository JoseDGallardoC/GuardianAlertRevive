// components/DeviceCard.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Definimos el "molde" de los datos que recibirá este componente
export type Device = {
  id: string;
  alias: string;
  macAddress: string;
  temperatureF: number;
  humidity: number;
  battery: number;
  lastUpdate: Date;
  flag: string;
};

// Creamos un tipo para las props del componente
type DeviceCardProps = {
  device: Device;
};

// Lógica para obtener el ícono de la batería según el porcentaje
const getBatteryIcon = (batteryLevel: number) => {
  if (batteryLevel > 90) return '🔋'; // Emoji como placeholder
  if (batteryLevel > 60) return '🔋';
  if (batteryLevel > 40) return '🔋';
  if (batteryLevel > 20) return '🪫';
  return '🔌'; // Batería muy baja
};

// Lógica para obtener el estado del bebé según el flag
const getBabyStatus = (flag: string) => {
    switch (flag) {
        case '00':
            return { text: 'Asiento Vacío', icon: '🟢' };
        case '04':
            return { text: 'Bebé a Bordo', icon: '👶' };
        default:
            return { text: '¡ALERTA!', icon: '🔴' };
    }
};

export const DeviceCard: React.FC<DeviceCardProps> = ({ device }) => {
  // Lógica para determinar si está conectado (menos de 30 segundos)
  const isConnected = (new Date().getTime() - device.lastUpdate.getTime()) < 30000;
  const connectionStatus = isConnected ? 'Conectado' : 'Desconectado';
  
  // Aquí asumimos preferencia por Celsius
  const temperatureC = Math.round((device.temperatureF - 32) * 5 / 9);

  const babyStatus = getBabyStatus(device.flag);

  return (
    <View style={styles.card}>
      {/* Sección Superior: Nombre y Estado */}
      <View style={styles.header}>
        <Text style={styles.deviceName}>{device.alias}</Text>
        <Text style={[styles.connectionStatus, { color: isConnected ? 'green' : 'gray' }]}>
          {connectionStatus}
        </Text>
      </View>

      {/* Sección Media: Datos del Sensor */}
      <View style={styles.dataRow}>
        <View style={styles.dataItem}>
          <Text style={styles.dataLabel}>Temperatura</Text>
          <Text style={styles.dataValue}>{temperatureC}°C</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.dataLabel}>Humedad</Text>
          <Text style={styles.dataValue}>{device.humidity}%</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.dataLabel}>Batería</Text>
          <Text style={styles.dataValue}>{getBatteryIcon(device.battery)} {device.battery}%</Text>
        </View>
      </View>

      {/* Sección Inferior: Estado del Bebé */}
      <View style={styles.statusRow}>
        <Text style={styles.statusIcon}>{babyStatus.icon}</Text>
        <Text style={styles.statusText}>{babyStatus.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    deviceName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    connectionStatus: {
        fontSize: 14,
        fontWeight: '500',
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    dataItem: {
        alignItems: 'center',
    },
    dataLabel: {
        fontSize: 12,
        color: '#888',
    },
    dataValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginTop: 4,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
    },
    statusIcon: {
        fontSize: 24,
        marginRight: 8,
    },
    statusText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});