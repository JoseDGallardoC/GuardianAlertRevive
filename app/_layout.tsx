// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      {/* Oculta el encabezado para nuestra pantalla principal (el splash) */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* Las pantallas existentes y las nuevas */}
      <Stack.Screen name="dashboard" options={{ title: 'Panel Principal' }} />
      <Stack.Screen name="support" options={{ title: 'Soporte y Ayuda' }} />
    </Stack>
  );
}