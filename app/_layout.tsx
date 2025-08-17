// app/_layout.tsx
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { initDB } from '../lib/database';

export default function RootLayout() {
  useEffect(() => {
    initDB()
      .then(() => console.log("Base de datos inicializada"))
      .catch(err => console.error("Error al inicializar la base de datos:", err));
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Las pantallas principales que SÍ tienen header visible
          se configuran en sus propios layouts de grupo */}
      <Stack.Screen name="dashboard" options={{
          headerShown: true,
          title: 'Panel Principal' 
      }} />
      <Stack.Screen name="support" options={{
          headerShown: true,
          title: 'Soporte y Ayuda'
      }} />
      
      {/* Los grupos no necesitan header aquí */}
      <Stack.Screen name="(settings)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}