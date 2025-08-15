// app/index.tsx
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Asegúrate que las imágenes estén en esta ruta
const animationFrames = [
    require('../assets/images/ic_launch_animation_1.png'),
    require('../assets/images/ic_launch_animation_2.png'),
    require('../assets/images/ic_launch_animation_3.png'),
    require('../assets/images/ic_launch_animation_4.png'),
];

export default function SplashScreen() {
    const [frameIndex, setFrameIndex] = useState(0);
    const router = useRouter(); // Hook de navegación de Expo Router

    useEffect(() => {
        const animationInterval = setInterval(() => {
            setFrameIndex(prevIndex => (prevIndex + 1) % animationFrames.length);
        }, 200);

        const navigationTimeout = setTimeout(() => {
            // Usamos router.replace para navegar al dashboard
            // 'replace' evita que el usuario pueda volver atrás al splash screen
            router.replace('/dashboard');
        }, 4000);

        return () => {
            clearInterval(animationInterval);
            clearTimeout(navigationTimeout);
        };
    }, []);

    // Necesitarás instalar react-native-linear-gradient
    // Ejecuta: npx expo install react-native-linear-gradient
    return (
        <LinearGradient
            colors={['#C12F6E', '#83234E']} // Colores de ejemplo
            style={styles.container}
        >
            <Image
                source={animationFrames[frameIndex]}
                style={styles.logo}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
    },
});