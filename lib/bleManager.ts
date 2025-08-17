// lib/bleManager.ts
import { PermissionsAndroid, Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

// Creamos una única instancia del BleManager que usaremos en toda la app
export const bleManager = new BleManager();

// Esta función es específica para Android 12 (API 31) y superior
// Pide los nuevos permisos de Bluetooth que son obligatorios
const requestAndroid31Permissions = async () => {
  const bluetoothScanPermission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    {
      title: 'Permiso de Escaneo',
      message: 'Esta app necesita permiso para escanear dispositivos Bluetooth',
      buttonPositive: 'Aceptar',
    },
  );
  const bluetoothConnectPermission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    {
      title: 'Permiso de Conexión',
      message: 'Esta app necesita permiso para conectarse a dispositivos Bluetooth',
      buttonPositive: 'Aceptar',
    },
  );
  const fineLocationPermission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Permiso de Ubicación',
      message: 'Esta app necesita permiso de ubicación para encontrar dispositivos Bluetooth',
      buttonPositive: 'Aceptar',
    },
  );

  return (
    bluetoothScanPermission === 'granted' &&
    bluetoothConnectPermission === 'granted' &&
    fineLocationPermission === 'granted'
  );
};


// Función principal que exportaremos para pedir permisos
export const requestBluetoothPermission = async () => {
    if (Platform.OS === 'android') {
        if (Platform.Version >= 31) {
            // Si es Android 12 o más nuevo, usamos la nueva función
            return await requestAndroid31Permissions();
        } else {
            // Para versiones viejas de Android, solo se necesita el permiso de ubicación
            const locationPermission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Permiso de Ubicación',
                    message: 'Esta app necesita permiso de ubicación para encontrar dispositivos Bluetooth',
                    buttonPositive: 'Aceptar',
                },
            );
            return locationPermission === 'granted';
        }
    } else {
        // En iOS los permisos se manejan de forma diferente y la librería lo hace más automático
        return true;
    }
}