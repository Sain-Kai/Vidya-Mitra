import React, { useRef, useEffect, useState } from 'react';
import {
  Animated, StyleSheet, View, Text,
  ScrollView, StatusBar, TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/colors';
import { GradientCard } from '../components/GradientCard';
import { MotivationalBanner } from '../components/MotivationalBanner';
import { SubjectGrid } from '../components/SubjectGrid';
import { SectionHeader } from '../components/SectionHeader';

export const HomeScreen = ({ navigation }) => {
  const headerAnim = useRef(new Animated.Value(0)).current;
  const [userType, setUserType] = useState('student');
  const [selectedClass, setSelectedClass] = useState('Class 4');

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [headerAnim]);

  if (!userType) {
    return <UserTypeSelectionScreen onSelect={setUserType} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} bounces={false}>
        <Animated.View
          style={[
            styles.header,
            {
              opacity: headerAnim,
              transform: [
                {
                  translateY: headerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>नमस्ते / Welcome back! 👋</Text>
              <Text style={styles.userName}>Aarav Sharma • {selectedClass}</Text>
            </View>
            <TouchableOpacity
              style={styles.profileIcon}
              onPress={() => setUserType(userType === 'student' ? 'parent' : 'student')}
            >
              <Text style={styles.profileInitial}>{userType === 'student' ? '🎒' : '👨‍👩‍👧'}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <MotivationalBanner
          quote="विद्या ददाति विनयं — Knowledge bestows humility and true understanding."
          author="Hitopadesha"
        />

        {/* Quick Access Top Bar for Core Superpowers */}
        <View style={styles.quickBar}>
          <TouchableOpacity
            style={styles.quickItem}
            onPress={() => navigation && navigation.navigate('LiveTranslate')}
          >
            <View style={[styles.quickIconWrap, { backgroundColor: '#e0e7ff' }]}>
              <Text style={styles.quickIcon}>📷</Text>
            </View>
            <Text style={styles.quickLabel}>Live Scan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickItem}
            onPress={() => navigation && navigation.navigate('TutorChat')}
          >
            <View style={[styles.quickIconWrap, { backgroundColor: '#fef3c7' }]}>
              <Text style={styles.quickIcon}>🤖</Text>
            </View>
            <Text style={styles.quickLabel}>AI Tutor</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickItem}
            onPress={() => navigation && navigation.navigate('DoubtSolver')}
          >
            <View style={[styles.quickIconWrap, { backgroundColor: '#dcfce7' }]}>
              <Text style={styles.quickIcon}>💡</Text>
            </View>
            <Text style={styles.quickLabel}>Ask Doubt</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickItem}
            onPress={() => navigation && navigation.navigate('PaperEvaluator')}
          >
            <View style={[styles.quickIconWrap, { backgroundColor: '#fae8ff' }]}>
              <Text style={styles.quickIcon}>✍️</Text>
            </View>
            <Text style={styles.quickLabel}>Grade Paper</Text>
          </TouchableOpacity>
        </View>

        <SectionHeader title="Your Learning Progress" subtitle="Spaced revision streak & mastery" />
        <View style={styles.statsRow}>
          <StatCard label="🔥 Streak" value="7 days" delay={100} />
          <StatCard label="⭐ Mastery" value="74%" delay={200} />
          <StatCard label="🎯 Weak Spots" value="2 Topics" delay={300} />
        </View>

        {userType === 'student' && (
          <>
            <SectionHeader
              title="Next Revision Stop"
              actionText="View Planner"
              onAction={() => navigation && navigation.navigate('ExamPlanner')}
            />
            <GradientCard
              gradient={COLORS.primaryGradient}
              icon="📚"
              title="Fractions & Shapes"
              subtitle="Continue with story-based explanation & recaps"
              onPress={() => navigation && navigation.navigate('TutorChat', { topic: 'Fractions & Shapes' })}
              delay={400}
            />

            <SectionHeader
              title="Exam Readiness"
              actionText="Take Quiz"
              onAction={() => navigation && navigation.navigate('Assessment')}
            />
            <GradientCard
              gradient={COLORS.warningGradient}
              icon="📝"
              title="Mid-Term Unit Test Prep"
              subtitle="Solve practice questions & see estimated scores"
              onPress={() => navigation && navigation.navigate('Assessment')}
              delay={500}
            />

            <SectionHeader title="Class 1–8 NCERT Subjects" subtitle="Aligned with multilingual curriculum" />
            <SubjectGrid
              onSelectSubject={(subject) =>
                navigation && navigation.navigate('TutorChat', { topic: subject.name })
              }
            />
          </>
        )}

        {userType === 'parent' && (
          <>
            <SectionHeader title="Parent Bridge & Language Companion" />
            <GradientCard
              gradient={COLORS.successGradient}
              icon="📷"
              title="Live Textbook Camera Translation"
              subtitle="Scan child's English homework into Hindi/Bengali/Tamil/Telugu"
              onPress={() => navigation && navigation.navigate('LiveTranslate')}
              delay={400}
            />

            <GradientCard
              gradient={COLORS.accentGradient}
              icon="📊"
              title="Audio Progress Report"
              subtitle="Listen to Aarav's weekly study report in your mother tongue"
              onPress={() => navigation && navigation.navigate('Performance')}
              delay={500}
            />

            <GradientCard
              gradient={COLORS.primaryGradient}
              icon="👨‍🏫"
              title="Teacher Grading Pattern Insights"
              subtitle="Understand where your child lost marks and how to support them"
              onPress={() => navigation && navigation.navigate('PaperEvaluator')}
              delay={600}
            />
          </>
        )}

        <SectionHeader title="Need Guidance?" />
        <HelpDeskCard onLiveChat={() => navigation && navigation.navigate('TutorChat')} />

        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => setUserType(userType === 'student' ? 'parent' : 'student')}
        >
          <Text style={styles.switchText}>
            Switch to {userType === 'student' ? 'Parent / अभिभावक' : 'Student'} Mode
          </Text>
        </TouchableOpacity>

        <View style={{ height: SPACING.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const UserTypeSelectionScreen = ({ onSelect }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.selectionContainer, { opacity: fadeAnim }]}>
        <Text style={styles.selectionTitle}>विद्या मित्र • Vidya Mitra</Text>
        <Text style={styles.selectionSubtitle}>Select your account type to personalize learning</Text>

        <View style={styles.selectionCards}>
          <TouchableOpacity style={styles.typeCard} onPress={() => onSelect('student')} activeOpacity={0.8}>
            <LinearGradient colors={COLORS.primaryGradient} style={styles.typeCardGradient}>
              <Text style={styles.typeIcon}>👨‍🎓</Text>
              <Text style={styles.typeName}>I am a Student (विद्यार्थी)</Text>
              <Text style={styles.typeSubtext}>Learn at your pace with kind AI explanations</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.typeCard} onPress={() => onSelect('parent')} activeOpacity={0.8}>
            <LinearGradient colors={COLORS.accentGradient} style={styles.typeCardGradient}>
              <Text style={styles.typeIcon}>👨‍👩‍👧</Text>
              <Text style={styles.typeName}>I am a Parent (अभिभावक)</Text>
              <Text style={styles.typeSubtext}>Translate textbooks & guide child in native language</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const StatCard = ({ label, value, delay }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      delay,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [delay, scaleAnim]);

  return (
    <Animated.View style={[styles.statCard, { transform: [{ scale: scaleAnim }] }]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </Animated.View>
  );
};

const HelpDeskCard = ({ onLiveChat }) => {
  return (
    <TouchableOpacity onPress={onLiveChat} activeOpacity={0.8}>
      <LinearGradient colors={['#ff6b6b', '#ee5a6f']} style={styles.helpCard}>
        <View style={styles.helpContent}>
          <Text style={styles.helpIcon}>💬</Text>
          <View style={styles.helpText}>
            <Text style={styles.helpTitle}>Ask Vidya Mitra Any Question</Text>
            <Text style={styles.helpSubtitle}>Zero shyness, 100% patient guidance</Text>
          </View>
          <Text style={styles.helpArrow}>▶</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  container: { flex: 1, paddingHorizontal: SPACING.lg, backgroundColor: COLORS.white },
  header: { marginBottom: SPACING.md },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { color: COLORS.textLight, fontSize: 12, fontWeight: '500', marginBottom: 2 },
  userName: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  profileIcon: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.soft,
  },
  profileInitial: { fontSize: 20 },

  quickBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SPACING.md,
    backgroundColor: '#f8fafc',
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
  },
  quickItem: { alignItems: 'center', flex: 1 },
  quickIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  quickIcon: { fontSize: 20 },
  quickLabel: { fontSize: 11, fontWeight: '700', color: '#334155' },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.md, gap: SPACING.md },
  statCard: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    ...SHADOWS.soft,
  },
  statLabel: { fontSize: 11, color: COLORS.textLight, marginBottom: SPACING.xs, fontWeight: '600' },
  statValue: { fontSize: 16, fontWeight: '800', color: COLORS.text },

  selectionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: SPACING.lg },
  selectionTitle: { fontSize: 26, fontWeight: '800', color: COLORS.text, marginBottom: 8 },
  selectionSubtitle: { fontSize: 13, color: COLORS.textLight, textAlign: 'center', marginBottom: SPACING.xxl },
  selectionCards: { width: '100%', gap: SPACING.lg },
  typeCard: { ...SHADOWS.medium, borderRadius: RADIUS.lg, overflow: 'hidden' },
  typeCardGradient: { padding: SPACING.xl, alignItems: 'center', justifyContent: 'center' },
  typeIcon: { fontSize: 44, marginBottom: SPACING.md },
  typeName: { color: COLORS.white, fontSize: 17, fontWeight: '700', marginBottom: SPACING.xs },
  typeSubtext: { color: 'rgba(255,255,255,0.85)', fontSize: 12, textAlign: 'center' },

  helpCard: { borderRadius: RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.md, ...SHADOWS.medium },
  helpContent: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  helpIcon: { fontSize: 30 },
  helpText: { flex: 1 },
  helpTitle: { color: COLORS.white, fontWeight: '700', fontSize: 14, marginBottom: 2 },
  helpSubtitle: { color: 'rgba(255,255,255,0.85)', fontSize: 12 },
  helpArrow: { color: COLORS.white, fontSize: 14, fontWeight: '700' },

  switchButton: { marginTop: SPACING.md, marginBottom: SPACING.xl, paddingVertical: SPACING.md, alignItems: 'center' },
  switchText: { color: COLORS.primaryGradient[0], fontSize: 13, fontWeight: '700', textDecorationLine: 'underline' },
});

export default HomeScreen;
