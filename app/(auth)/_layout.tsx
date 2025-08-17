// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  // Ocultamos el header para las pantallas de login/registro
  return <Stack screenOptions={{ headerShown: false }} />;
}