// app/(settings)/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

export default function SettingsLayout() {
  return (
    <Stack>
      {/* ... tu configuración de 'profile' se mantiene igual ... */}
      <Stack.Screen name="profile" options={{ title: 'Perfil de Usuario' }} />

      <Stack.Screen
        name="contactEdit"
        options={({ route }) => ({
          // --- AQUÍ ESTÁ LA CORRECCIÓN ---
          // Le decimos a TypeScript que params puede tener un 'id' de tipo string
          title: (route.params as { id?: string })?.id ? 'Editar Contacto' : 'Añadir Contacto',
          headerRight: () => (
            <TouchableOpacity onPress={() => alert('Guardando desde el header...')}>
              <Image
                source={require('../../assets/images/ic_save_white.png')}
                style={{ width: 24, height: 24, marginRight: 15, tintColor: '#C12F6E' }}
              />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="dayCareSchedule"
        options={{
          title: 'Horario de Guardería',
          headerRight: () => (
            <TouchableOpacity onPress={() => alert('Guardando horario...')}>
              <Image
                source={require('../../assets/images/ic_save_white.png')}
                style={{ width: 24, height: 24, marginRight: 15, tintColor: '#C12F6E' }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}