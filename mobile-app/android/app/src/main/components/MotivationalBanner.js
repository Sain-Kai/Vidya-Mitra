import React, { useRef, useEffect } from 'react';
import {
  Animated, StyleSheet, View, Text
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, RADIUS } from '../constants/colors';
export const MotivationalBanner = ({ quote, author }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);
  return (
    <Animated.View
      style={{
        transform: [{ scale: pulseAnim }],
        marginBottom: SPACING.xl,
      }}
    >
      <LinearGradient
        colors={['rgba(102,126,234,0.9)', 'rgba(118,75,162,0.9)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.banner, { borderRadius: RADIUS.lg }]}
      >
        <View style={styles.content}>
          <Text style={styles.quote}>"{quote}"</Text>
          <Text style={styles.author}>— {author}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  banner: {
    width: '100%',
    padding: SPACING.lg,
    minHeight: 180,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  quote: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: SPACING.sm,
    lineHeight: 24,
  },
  author: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
