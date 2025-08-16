// app/support.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- Componente reutilizable para los botones de la cuadrícula ---
type SupportButtonProps = {
  iconSource: any;
  label: string;
  onPress: () => void;
};

const SupportButton: React.FC<SupportButtonProps> = ({ iconSource, label, onPress }) => (
  <TouchableOpacity style={styles.gridButtonContainer} onPress={onPress}>
    <View style={styles.iconWrapper}>
      <Image source={iconSource} style={styles.icon} />
    </View>
    <Text style={styles.buttonLabel}>{label}</Text>
  </TouchableOpacity>
);

export default function SupportScreen() {
  const router = useRouter();

  const handleShare = () => {
    // En el futuro, esto abrirá el diálogo nativo para compartir
    alert('Compartiendo la aplicación...');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingTop: 15 }}>
      <View style={styles.gridContainer}>
        {/* Fila 1 de la cuadrícula */}
        <View style={styles.row}>
          <SupportButton
            label="FAQ"
            iconSource={require('../assets/images/ic_faq.png')}
            onPress={() => alert('Abrir Preguntas Frecuentes')}
          />
          <SupportButton
            label="Manual"
            iconSource={require('../assets/images/ic_manual_magenta.png')}
            onPress={() => alert('Abrir Manual de Usuario')}
          />
        </View>
        
        {/* Fila 2 de la cuadrícula */}
        <View style={styles.row}>
          <SupportButton
            label="Términos"
            iconSource={require('../assets/images/ic_terms_magenta.png')}
            onPress={() => alert('Abrir Términos y Condiciones')}
          />
          <SupportButton
            label="Contáctanos"
            iconSource={require('../assets/images/g_animation_magenta_4.png')}
            onPress={() => alert('Abrir formulario de contacto')}
          />
        </View>
      </View>

      {/* Botón inferior */}
      <TouchableOpacity style={styles.fullWidthButton} onPress={handleShare}>
        <Text style={styles.fullWidthButtonText}>Compartir</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// --- Hoja de Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3F6', // Un rosa muy claro
  },
  gridContainer: {
    paddingHorizontal: 48,
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 2,
    borderColor: '#C12F6E',
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
    textAlign: 'center',
  },
  fullWidthButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 14,
    marginHorizontal: 48,
    marginTop: 24,
    alignItems: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  fullWidthButtonText: {
    color: '#C12F6E',
    fontSize: 14,
    fontWeight: 'bold',
  },
});