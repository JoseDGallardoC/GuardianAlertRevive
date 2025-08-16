// app/(settings)/dayCareSchedule.tsx
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

// --- Molde para el estado de cada día ---
type DaySchedule = {
  enabled: boolean;
  time: string;
};

// --- Objeto de estado inicial ---
const initialSchedule = {
    monday: { enabled: true, time: '09:00 AM' },
    tuesday: { enabled: true, time: '09:00 AM' },
    wednesday: { enabled: true, time: '09:00 AM' },
    thursday: { enabled: true, time: '09:00 AM' },
    friday: { enabled: true, time: '09:00 AM' },
    saturday: { enabled: false, time: '10:30 AM' },
    sunday: { enabled: false, time: '10:30 AM' },
};

// --- 1. CREAMOS UN TIPO ESPECÍFICO PARA LAS CLAVES ---
// 'keyof typeof' crea un tipo que es una unión de todas las claves del objeto
type DayKey = keyof typeof initialSchedule; // Resultado: "monday" | "tuesday" | ...

// Componente reutilizable para cada fila de la semana
const DayScheduleRow: React.FC<{
  dayName: string;
  schedule: DaySchedule;
  onToggle: (value: boolean) => void;
  onTimePress: () => void;
}> = ({ dayName, schedule, onToggle, onTimePress }) => (
  <View style={styles.dayRow}>
    <Text style={styles.dayName}>{dayName}</Text>
    <TouchableOpacity onPress={onTimePress}>
      <Text style={styles.timeText}>{schedule.time}</Text>
    </TouchableOpacity>
    <Switch
      trackColor={{ false: '#767577', true: '#C12F6E' }}
      thumbColor={schedule.enabled ? '#f4f3f4' : '#f4f3f4'}
      onValueChange={onToggle}
      value={schedule.enabled}
    />
  </View>
);

export default function DayCareScheduleScreen() {
  const [isScheduleEnabled, setIsScheduleEnabled] = useState(false);
  const [schedule, setSchedule] = useState(initialSchedule);

  // Ahora la función sabe que 'day' es de tipo DayKey
  const updateDay = (day: DayKey, newValues: Partial<DaySchedule>) => {
    setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], ...newValues },
    }));
  };
  
  // --- 2. APLICAMOS EL TIPO AL ARRAY ---
  // Ahora TypeScript sabe que la propiedad 'key' no es cualquier string.
  const daysOfWeek: { key: DayKey, name: string }[] = [
    { key: 'monday', name: 'Lunes' },
    { key: 'tuesday', name: 'Martes' },
    { key: 'wednesday', name: 'Miércoles' },
    { key: 'thursday', name: 'Jueves' },
    { key: 'friday', name: 'Viernes' },
    { key: 'saturday', name: 'Sábado' },
    { key: 'sunday', name: 'Domingo' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.masterSwitchContainer}>
        <Text style={styles.masterSwitchLabel}>Activar Horario de Guardería</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isScheduleEnabled ? '#f4f3f4' : '#f4f3f4'}
          onValueChange={setIsScheduleEnabled}
          value={isScheduleEnabled}
        />
      </View>

      {isScheduleEnabled && (
        <View style={styles.weekContainer}>
          {daysOfWeek.map(({ key, name }) => (
            <DayScheduleRow
              key={key}
              dayName={name}
              schedule={schedule[key]} // <-- AHORA ESTO ES VÁLIDO Y SEGURO
              onToggle={value => updateDay(key, { enabled: value })}
              onTimePress={() => alert(`Abriendo selector de hora para ${name}...`)}
            />
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Guardar Horario</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Los estilos se mantienen igual
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        padding: 24,
    },
    masterSwitchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 16,
        borderRadius: 10,
    },
    masterSwitchLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    weekContainer: {
        marginTop: 24,
    },
    dayRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    dayName: {
        fontSize: 16,
        flex: 1,
    },
    timeText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#C12F6E',
        marginHorizontal: 16,
    },
    saveButton: {
        backgroundColor: '#C12F6E',
        borderRadius: 8,
        paddingVertical: 14,
        marginTop: 32,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});