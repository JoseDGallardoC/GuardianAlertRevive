// components/dashboard/DeviceCard.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type Device = {
  id: string;
  alias: string;
  macAddress: string;
  temperatureC: number;
  humidity: number; // Valor crudo 0-255
  battery: number;    // Valor crudo 0-255
  lastUpdate: Date;
  flag: string;
};

type DeviceCardProps = {
  device: Device;
};

// --- FÓRMULA DE BATERÍA TRADUCIDA DEL SMALI ---
const convertBattery = (rawValue: number): number => {
  let percentage = 0;
  // Esta es la fórmula matemática que encontramos en Utils.smali
  if (rawValue > 62) {
    percentage = rawValue * 2.4242 - 125.45;
  } else {
    percentage = rawValue * 0.7109 - 23.204;
  }
  // Nos aseguramos de que el resultado esté entre 0 y 100
  if (percentage < 0) return 0;
  if (percentage > 100) return 100;
  return Math.round(percentage);
};

const getBatteryIcon = (batteryLevel: number) => {
  if (batteryLevel > 80) return '🔋';
  if (batteryLevel > 20) return '🪫';
  return '🔌';
};

// --- MAPA DE FLAGS ACTUALIZADO ---
const getBabyStatus = (flag: string) => {
    switch (flag.toLowerCase()) {
        case '00': return { text: 'Asiento Vacío', icon: '🟢' };
        case '01': return { text: 'Bebé a Bordo', icon: '👶' };
        case '04': return { text: 'Cable Desconectado', icon: '⚠️' };
        default: return { text: '¡ALERTA!', icon: '🔴' };
    }
};

export const DeviceCard: React.FC<DeviceCardProps> = ({ device }) => {
  const isConnected = (new Date().getTime() - device.lastUpdate.getTime()) < 30000;
  const connectionStatus = isConnected ? 'Conectado' : 'Desconectado';
  
  const babyStatus = getBabyStatus(device.flag);

  // --- APLICAMOS LAS NUEVAS REGLAS ---
  const formattedBattery = convertBattery(device.battery);
  const formattedHumidity = device.humidity > 100 ? 'N/A' : `${device.humidity}%`;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.deviceName}>{device.alias}</Text>
        <Text style={[styles.connectionStatus, { color: isConnected ? 'green' : 'gray' }]}>
          {connectionStatus}
        </Text>
      </View>

      <View style={styles.dataRow}>
        <View style={styles.dataItem}>
          <Text style={styles.dataLabel}>Temperatura</Text>
          <Text style={styles.dataValue}>{device.temperatureC}°C</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.dataLabel}>Humedad</Text>
          <Text style={styles.dataValue}>{formattedHumidity}</Text>
        </View>
        <View style={styles.dataItem}>
          <Text style={styles.dataLabel}>Batería</Text>
          <Text style={styles.dataValue}>{getBatteryIcon(formattedBattery)} {formattedBattery}%</Text>
        </View>
      </View>

      <View style={styles.statusRow}>
        <Text style={styles.statusIcon}>{babyStatus.icon}</Text>
        <Text style={styles.statusText}>{babyStatus.text}</Text>
      </View>
    </View>
  );
};

// ... (Los estilos se mantienen igual)
const styles = StyleSheet.create({
    card: { backgroundColor: '#ffffff', borderRadius: 12, padding: 16, marginHorizontal: 16, marginBottom: 12, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3 },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    deviceName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    connectionStatus: { fontSize: 14, fontWeight: '500' },
    dataRow: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#eee' },
    dataItem: { alignItems: 'center' },
    dataLabel: { fontSize: 12, color: '#888' },
    dataValue: { fontSize: 16, fontWeight: '600', color: '#333', marginTop: 4 },
    statusRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 12 },
    statusIcon: { fontSize: 24, marginRight: 8 },
    statusText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
});