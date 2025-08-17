// lib/database.ts
import * as SQLite from 'expo-sqlite';
// El tipo correcto para el resultado de un INSERT/UPDATE es SQLiteRunResult
import { SQLiteRunResult } from 'expo-sqlite';

const db = SQLite.openDatabaseSync('gardien.db');

export type Contact = {
  id: number;
  firstName: string;
  lastName: string | null;
  phone: string;
  email: string | null;
};

export type Profile = {
  id: number; // Siempre habrá un solo perfil, con id = 1
  firstName: string;
  middleName: string | null;
  firstLastName: string;
  secondLastName: string | null;
  phone: string;
  email: string;
  carSeatName: string | null;
  vehicle1Color: string | null;
  vehicle1Brand: string | null;
  vehicle1Plate: string | null;
  // Añadiremos más campos a futuro si es necesario
};

export const initDB = async (): Promise<void> => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY NOT NULL,
        firstName TEXT NOT NULL,
        lastName TEXT,
        phone TEXT NOT NULL,
        email TEXT
      );

      -- --- NUEVO: CREAMOS LA TABLA DE PERFIL ---
      CREATE TABLE IF NOT EXISTS profile (
        id INTEGER PRIMARY KEY NOT NULL,
        firstName TEXT,
        middleName TEXT,
        firstLastName TEXT,
        secondLastName TEXT,
        phone TEXT,
        email TEXT,
        carSeatName TEXT,
        vehicle1Color TEXT,
        vehicle1Brand TEXT,
        vehicle1Plate TEXT
      );
    `);
    console.log("Base de datos inicializada con éxito (con tabla de perfil).");
  } catch (error) {
    console.error("Error inicializando la base de datos", error);
    throw error;
  }
};

export const getContacts = async (): Promise<Contact[]> => {
  try {
    const allRows = await db.getAllAsync<Contact>('SELECT * FROM contacts ORDER BY firstName ASC');
    return allRows;
  } catch (error) {
    console.error("Error obteniendo contactos", error);
    throw error;
  }
};

// --- CORRECCIÓN APLICADA AQUÍ ---
export const addContact = async (firstName: string, lastName: string | null, phone: string, email: string | null): Promise<SQLiteRunResult> => {
  try {
    const result = await db.runAsync(
      'INSERT INTO contacts (firstName, lastName, phone, email) VALUES (?, ?, ?, ?)',
      [firstName, lastName, phone, email]
    );
    console.log("Contacto añadido con ID:", result.lastInsertRowId);
    return result;
  } catch (error) {
    console.error("Error añadiendo contacto", error);
    throw error;
  }
};

export const updateContact = async (id: number, firstName: string, lastName: string | null, phone: string, email: string | null): Promise<SQLiteRunResult> => {
  try {
    const result = await db.runAsync(
      'UPDATE contacts SET firstName = ?, lastName = ?, phone = ?, email = ? WHERE id = ?',
      [firstName, lastName, phone, email, id]
    );
    console.log("Contacto actualizado con éxito:", result.changes);
    return result;
  } catch (error) {
    console.error("Error actualizando contacto", error);
    throw error;
  }
};

// Eliminar un contacto
export const deleteContact = async (id: number): Promise<SQLiteRunResult> => {
  try {
    const result = await db.runAsync('DELETE FROM contacts WHERE id = ?', [id]);
    console.log("Contacto eliminado con éxito:", result.changes);
    return result;
  } catch (error) {
    console.error("Error eliminando contacto", error);
    throw error;
  }
};

export const getContactById = async (id: number): Promise<Contact | null> => {
  try {
    const result = await db.getFirstAsync<Contact>('SELECT * FROM contacts WHERE id = ?', [id]);
    return result;
  } catch (error) {
    console.error(`Error obteniendo contacto con id ${id}`, error);
    throw error;
  }
};

// Obtener el perfil del usuario (siempre será el de id = 1)
export const getProfile = async (): Promise<Profile | null> => {
  try {
    const result = await db.getFirstAsync<Profile>('SELECT * FROM profile WHERE id = 1');
    return result;
  } catch (error) {
    console.error("Error obteniendo el perfil", error);
    throw error;
  }
};

// Guardar o actualizar el perfil del usuario
export const saveProfile = async (profileData: Omit<Profile, 'id'>): Promise<SQLiteRunResult> => {
  try {
    // Usamos "INSERT OR REPLACE" que es un atajo de SQLite.
    // Si la fila con id=1 no existe, la crea. Si ya existe, la actualiza.
    const result = await db.runAsync(
      `INSERT OR REPLACE INTO profile (id, firstName, middleName, firstLastName, secondLastName, phone, email, carSeatName, vehicle1Color, vehicle1Brand, vehicle1Plate) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        1, // El ID siempre es 1
        profileData.firstName ?? null,
        profileData.middleName ?? null,
        profileData.firstLastName ?? null,
        profileData.secondLastName ?? null,
        profileData.phone ?? null,
        profileData.email ?? null,
        profileData.carSeatName ?? null,
        profileData.vehicle1Color ?? null,
        profileData.vehicle1Brand ?? null,
        profileData.vehicle1Plate ?? null,
      ]
    );
    console.log("Perfil guardado/actualizado con éxito.");
    return result;
  } catch (error) {
    console.error("Error guardando el perfil", error);
    throw error;
  }
};