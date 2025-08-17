// lib/alertManager.ts
import * as SMS from 'expo-sms';
import { getContacts, getProfile } from './database'; // <-- 1. IMPORTAMOS getProfile

export const triggerSmsAlert = async () => {
  console.log("Iniciando protocolo de alerta por SMS...");

  const isAvailable = await SMS.isAvailableAsync();
  if (!isAvailable) {
    alert("Tu dispositivo no parece ser capaz de enviar SMS.");
    return;
  }

  try {
    // 2. OBTENEMOS LOS DATOS DE LA BASE DE DATOS
    const contacts = await getContacts();
    const profile = await getProfile();

    if (contacts.length === 0) {
      alert("No hay contactos de emergencia configurados para enviar la alerta.");
      return;
    }

    const phoneNumbers = contacts.map(contact => contact.phone);

    // --- 3. CONSTRUIMOS EL MENSAJE INTELIGENTE ---
    let message = "ALERTA DE SEGURIDAD GARDIEN: Se ha detectado un bebé en el asiento del vehículo. Por favor, verifique inmediatamente.";

    // Si tenemos datos del perfil, añadimos la información del auto
    if (profile && profile.vehicle1Brand && profile.vehicle1Color && profile.vehicle1Plate) {
      message += `\n\nInfo del vehículo: ${profile.vehicle1Brand}, color ${profile.vehicle1Color}, patente ${profile.vehicle1Plate}.`;
    }

    const { result } = await SMS.sendSMSAsync(
      phoneNumbers,
      message
    );

    console.log("Resultado del envío de SMS:", result);

  } catch (error) {
    console.error("Error al intentar enviar el SMS:", error);
    alert("Hubo un error al preparar el mensaje de alerta.");
  }
};