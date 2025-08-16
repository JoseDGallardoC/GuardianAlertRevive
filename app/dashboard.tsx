// app/dashboard.tsx
import { useRouter } from 'expo-router'; // <- 1. IMPORTA el hook de navegación
import React from 'react';
import { FlatList, Image, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Device, DeviceCard } from '../components/dashboard/DeviceCard';

export type { Device };

const mockDevices: Device[] = [
  { 
    id: '1', 
    alias: 'Sensor Silla 1', 
    macAddress: 'AA:BB:CC:11:22:33',
    temperatureF: 75,
    humidity: 45,
    battery: 95,
    lastUpdate: new Date(),
    flag: '04',
  },
  { 
    id: '2', 
    alias: 'Sensor Cuna', 
    macAddress: 'DD:EE:FF:44:55:66',
    temperatureF: 68,
    humidity: 50,
    battery: 80,
    lastUpdate: new Date(Date.now() - 60000),
    flag: '00',
  },
  { 
    id: '3', 
    alias: 'Sensor Coche', 
    macAddress: 'GG:HH:II:77:88:99',
    temperatureF: 100,
    humidity: 30,
    battery: 15,
    lastUpdate: new Date(),
    flag: '08',
  },
];

export default function DashboardScreen() {
  const router = useRouter(); // <- 2. INICIALIZA el router

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={['#C12F6E', '#83234E']}
        style={styles.header}
      >
        <View style={styles.topBar}>
          {/* --- 3. CONECTA el botón de configuración --- */}
          <TouchableOpacity onPress={() => router.push('/settings')}>
            <Image source={require('../assets/images/ic_settings_menu_white.png')} style={styles.icon} />
          </TouchableOpacity>
          {/* --- 4. CONECTA el botón de soporte --- */}
          <TouchableOpacity onPress={() => router.push('/support')}>
            <Image source={require('../assets/images/help.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/ic_launch_animation_4.png')} style={styles.logo} />
        </View>
      </LinearGradient>

      <FlatList
        data={mockDevices}
        renderItem={({ item }) => <DeviceCard device={item} />}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
      />
    </View>
  );
}

// ... (Los estilos se mantienen igual, no es necesario copiarlos de nuevo)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        height: 240,
    },
    topBar: {
        height: 56,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 30,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 120,
        resizeMode: 'contain',
    },
    list: {
        flex: 1,
    },
});