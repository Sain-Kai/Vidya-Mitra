import React, { useRef, useEffect } from 'react';
import {
  Animated, StyleSheet, View, Text,
  TouchableOpacity, FlatList, Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/colors';
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;
const SUBJECTS = [
  { id: '1', name: 'Mathematics', icon: '📐', gradient: ['#667eea', '#764ba2'] },
  { id: '2', name: 'Physics', icon: '⚛️', gradient: ['#f093fb', '#f5576c'] },
  { id: '3', name: 'Chemistry', icon: '🧪', gradient: ['#4facfe', '#00f2fe'] },
  { id: '4', name: 'Biology', icon: '🦠', gradient: ['#43e97b', '#38f9d7'] },
  { id: '5', name: 'English', icon: '📚', gradient: ['#fa709a', '#fee140'] },
  { id: '6', name: 'History', icon: '🏛️', gradient: ['#30cfd0', '#330867'] },
];
export const SubjectGrid = ({ onSelectSubject }) => {
  const renderSubject = ({ item, index }) => (
    <SubjectCard
      item={item}
      index={index}
      onPress={() => onSelectSubject(item)}
    />
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={SUBJECTS}
        renderItem={renderSubject}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        scrollEnabled={false}
      />
    </View>
  );
};
const SubjectCard = ({ item, index, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, opacityAnim, scaleAnim]);
  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
        opacity: opacityAnim,
      }}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <LinearGradient
          colors={item.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.card, SHADOWS.medium]}
        >
          <Text style={styles.icon}>{item.icon}</Text>
          <Text style={styles.name}>{item.name}</Text>
         <Text style={styles.cta}>Learn →</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xl,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.2,
    borderRadius: RADIUS.lg,
    justifyContent: 'space-between',
    padding: SPACING.md,
    alignItems: 'center',
  },
  icon: {
    fontSize: 36,
    marginBottom: SPACING.sm,
  },
  name: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  cta: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    marginTop: SPACING.sm,
  },
});
