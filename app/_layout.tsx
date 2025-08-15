// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      {/* Oculta el encabezado por defecto para nuestras pantallas */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ title: 'Panel Principal' }}/>
    </Stack>
  );
}