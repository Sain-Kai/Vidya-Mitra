import React, { useRef, useEffect } from 'react';
import {
  Animated, StyleSheet, View, Text,
  TouchableOpacity, FlatList, Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/colors';

const { width } = Dimensions.get('window');

const SUBJECTS_CLASS_1_TO_8 = [
  { id: '1', name: 'Mathematics (गणित)', icon: '📐', subtitle: 'Numbers, Shapes, Logic', gradient: ['#667eea', '#764ba2'] },
  { id: '2', name: 'EVS / Science (पर्यावरण/विज्ञान)', icon: '🌱', subtitle: 'Plants, Water, Space', gradient: ['#43e97b', '#38f9d7'] },
  { id: '3', name: 'English (अंग्रेज़ी)', icon: '📚', subtitle: 'Stories, Grammar, Phonics', gradient: ['#fa709a', '#fee140'] },
  { id: '4', name: 'Hindi (हिन्दी)', icon: '✍️', subtitle: 'कविताएं, व्याकरण, कहानियां', gradient: ['#f093fb', '#f5576c'] },
  { id: '5', name: 'Social Studies (सामाजिक विज्ञान)', icon: '🏛️', subtitle: 'Our Earth, History & Civics', gradient: ['#4facfe', '#00f2fe'] },
  { id: '6', name: 'Logical Reasoning (तर्कशक्ति)', icon: '🧩', subtitle: 'Puzzles & Brain Gym', gradient: ['#30cfd0', '#330867'] },
];

export const SubjectGrid = ({ onSelectSubject }) => {
  const renderSubject = ({ item, index }) => (
    <SubjectCard
      item={item}
      index={index}
      onPress={() => onSelectSubject && onSelectSubject(item)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={SUBJECTS_CLASS_1_TO_8}
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
      style={[
        styles.cardContainer,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.touchable}>
        <LinearGradient
          colors={item.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>{item.icon}</Text>
          </View>
          <Text style={styles.subjectName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.subjectSub} numberOfLines={1}>
            {item.subtitle}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.sm,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  cardContainer: {
    width: (width - 48) / 2,
  },
  touchable: {
    borderRadius: RADIUS.md,
    ...SHADOWS.medium,
  },
  card: {
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    minHeight: 120,
    justifyContent: 'space-between',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 20,
  },
  subjectName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
    lineHeight: 17,
  },
  subjectSub: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
  },
});

export default SubjectGrid;
