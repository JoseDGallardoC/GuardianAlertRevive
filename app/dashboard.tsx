// app/dashboard.tsx
import { Buffer } from 'buffer';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { State } from 'react-native-ble-plx';
import LinearGradient from 'react-native-linear-gradient';
import { DeviceCard, Device as GardienDevice } from '../components/dashboard/DeviceCard';
import { triggerSmsAlert } from '../lib/alertManager';
import { bleManager, requestBluetoothPermission } from '../lib/bleManager';

export default function DashboardScreen() {
  const router = useRouter();
  
  const [status, setStatus] = useState("Iniciando...");
  const [gardienDevice, setGardienDevice] = useState<GardienDevice | null>(null);
  
  const lastKnownFlag = useRef<string | null>(null);
  // --- AQUÍ ESTÁ LA CORRECCIÓN ---
  // Cambiamos NodeJS.Timeout a 'number'
  const disconnectionTimer = useRef<number | null>(null);

  const scanForDevices = useCallback(async () => {
    const permissionsGranted = await requestBluetoothPermission();
    
    if (permissionsGranted) {
      setStatus(`Buscando a Gardien...`);
      bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
        if (error || !scannedDevice) return;
        
        if (scannedDevice.name === 'CSTSM' && scannedDevice.rawScanRecord) {
          const buffer = Buffer.from(scannedDevice.rawScanRecord, 'base64');
          if (buffer.length >= 11) {
            const humidity = buffer.readUInt8(7);
            const flagHex = buffer.readUInt8(8).toString(16).padStart(2, '0');
            const temperatureC = buffer.readUInt8(9);
            const battery = buffer.readUInt8(10);
            
              const gardienData: GardienDevice = {
                id: scannedDevice.id, alias: 'Gardien Sensor', macAddress: scannedDevice.id,
                temperatureC: temperatureC, humidity: humidity, battery: battery,
                lastUpdate: new Date(), flag: flagHex,
              };
              setGardienDevice(gardienData);
          }
        }
      });
    } else {
      setStatus("Permisos denegados.");
    }
  }, []);

  useEffect(() => {
    const subscription = bleManager.onStateChange((state) => {
      if (state === State.PoweredOn) {
        scanForDevices();
      } else {
        setStatus("Bluetooth está apagado.");
        setGardienDevice(null);
      }
    }, true);

    return () => {
      subscription.remove();
      bleManager.stopDeviceScan();
      if (disconnectionTimer.current) {
        clearTimeout(disconnectionTimer.current);
      }
    };
  }, [scanForDevices]);

  useEffect(() => {
    if (!gardienDevice) {
      if (disconnectionTimer.current) clearTimeout(disconnectionTimer.current);
      return;
    }

    lastKnownFlag.current = gardienDevice.flag.toLowerCase();
    
    if (disconnectionTimer.current) {
      clearTimeout(disconnectionTimer.current);
    }

    // setTimeout devuelve un 'number' en React Native
    disconnectionTimer.current = setTimeout(() => {
      console.log("¡Han pasado 15 segundos sin señal!");
      if (lastKnownFlag.current === '01') {
        console.log("Último estado fue 'Bebé a Bordo'. ¡LANZANDO ALERTA SMS!");
        triggerSmsAlert();
      } else {
        console.log("Último estado fue 'Asiento Vacío'. No se necesita alerta.");
      }
    }, 15000);

  }, [gardienDevice]);

  const devicesArray = gardienDevice ? [gardienDevice] : [];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#C12F6E', '#83234E']} style={styles.header}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.push('/(settings)/settings')}>
            <Image source={require('../assets/images/ic_settings_menu_white.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/support')}>
            <Image source={require('../assets/images/help.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/ic_launch_animation_4.png')} style={styles.logo} />
        </View>
      </LinearGradient>

      <FlatList
        data={devicesArray}
        renderItem={({ item }) => <DeviceCard device={item} />}
        keyExtractor={item => item.id}
        style={styles.list}
        ListEmptyComponent={<Text style={styles.statusText}>{status}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f0f0' },
    header: { height: 240 },
    topBar: { height: 56, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 30 },
    icon: { width: 24, height: 24, resizeMode: 'contain' },
    logoContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    logo: { height: 120, resizeMode: 'contain' },
    list: { flex: 1 },
    statusText: { padding: 40, textAlign: 'center', fontSize: 16, color: '#666' },
});