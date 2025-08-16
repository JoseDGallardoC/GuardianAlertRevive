// app/settings.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// El componente SettingsButton no cambia, así que lo omito por brevedad...
type SettingsButtonProps = {
  iconSource: any;
  label: string;
  onPress: () => void;
};

const SettingsButton: React.FC<SettingsButtonProps> = ({ iconSource, label, onPress }) => (
  <TouchableOpacity style={styles.gridButtonContainer} onPress={onPress}>
    <View style={styles.iconWrapper}>
      <Image source={iconSource} style={styles.icon} />
    </View>
    <Text style={styles.buttonLabel}>{label}</Text>
  </TouchableOpacity>
);


export default function SettingsScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.gridContainer}>
        <View style={styles.row}>
          <SettingsButton
            label="Perfil"
            iconSource={require('../../assets/images/ic_profile_white.png')}
            onPress={() => router.push('/profile')} // <--- ACTUALIZADO
          />
          <SettingsButton
            label="Contactos"
            iconSource={require('../../assets/images/ic_emergency_contact_white.png')}
            onPress={() => router.push('/contacts')} // <--- ACTUALIZADO
          />
        </View>
        
        <View style={styles.row}>
          <SettingsButton
            label="Dispositivos"
            iconSource={require('../../assets/images/ic_alert_connection_device_white.png')}
            onPress={() => router.push('/devices')} // <--- ACTUALIZADO
          />
          <SettingsButton
            label="Historial"
            iconSource={require('../../assets/images/ic_history_white.png')}
            onPress={() => router.push('/logs')} // <--- ACTUALIZADO
          />
        </View>
      </View>

      <TouchableOpacity style={styles.fullWidthButton} onPress={() => router.push('/dayCareSchedule')}> 
        <Text style={styles.fullWidthButtonText}>Horario de Guardería</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ... Los estilos se mantienen igual
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5', 
  },
  gridContainer: {
    paddingHorizontal: 48,
    paddingTop: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  gridButtonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  iconWrapper: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: '#C12F6E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  icon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  buttonLabel: {
    fontSize: 14,
    color: '#C12F6E',
    fontWeight: '600',
  },
  fullWidthButton: {
    backgroundColor: '#C12F6E',
    borderRadius: 8,
    paddingVertical: 14,
    marginHorizontal: 48,
    marginTop: 16,
    marginBottom: 32, // Añadido un margen inferior para que no quede pegado
    alignItems: 'center',
    elevation: 2,
  },
  fullWidthButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});