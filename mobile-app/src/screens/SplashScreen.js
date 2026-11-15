import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../constants/colors';

export const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      if (navigation && navigation.replace) {
        navigation.replace('Home');
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <LinearGradient colors={COLORS.primaryGradient} style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>📚</Text>
        </View>
        <Text style={styles.title}>Vidya Mitra</Text>
        <Text style={styles.hindiTitle}>विद्या मित्र</Text>
        <Text style={styles.subtitle}>Your AI Learning Companion & Parent Bridge</Text>
        <View style={styles.tagBadge}>
          <Text style={styles.tagText}>Classes 1 – 8 • Multilingual • Socratic</Text>
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  hindiTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fee140',
    marginTop: 4,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 20,
  },
  tagBadge: {
    marginTop: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  tagText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default SplashScreen;
