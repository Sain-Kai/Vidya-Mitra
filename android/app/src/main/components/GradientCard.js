import React, { useRef, useEffect } from 'react';
import {
  Animated, StyleSheet, View, Text, TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/colors';

export const GradientCard = ({
  gradient = COLORS.primaryGradient,
  title,
  subtitle,
  icon,
  onPress,
  delay = 0,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, fadeAnim, slideAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
        marginBottom: SPACING.md,
      }}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.card, SHADOWS.medium]}
        >
          <View style={styles.content}>
            {icon && <Text style={styles.icon}>{icon}</Text>}
            <View style={styles.text}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  icon: {
    fontSize: 32,
  },
  text: {
    flex: 1,
  },
  title: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  arrow: {
    color: COLORS.white,
    fontSize: 18,
  },
});
