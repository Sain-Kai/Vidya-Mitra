import React, { useRef, useEffect, useState } from 'react';
import {
  Animated, StyleSheet, View, Text,
  ScrollView, StatusBar,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/colors';
import { GradientCard } from '../components/GradientCard';
import { MotivationalBanner } from '../components/MotivationalBanner';
import { SubjectGrid } from '../components/SubjectGrid';

export const HomeScreen = ({ navigation }) => {
  const headerAnim = useRef(new Animated.Value(0)).current;
  const [userType, setUserType] = useState(null);

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
              <Text style={styles.greeting}>Welcome back! 👋</Text>
              <Text style={styles.userName}>Surja</Text>
            </View>
            <TouchableOpacity style={styles.profileIcon}>
              <Text style={styles.profileInitial}>S</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <MotivationalBanner
          quote="Success is not final, failure is not fatal"
          author="Winston Churchill"
        />

        <Text style={styles.sectionTitle}>Your Progress</Text>
        <View style={styles.statsRow}>
          <StatCard label="🔥 Streak" value="7 days" delay={100} />
          <StatCard label="⭐ Level" value="12" delay={200} />
          <StatCard label="💰 Coins" value="240" delay={300} />
        </View>

        {userType === 'student' && (
          <>
            <Text style={styles.sectionTitle}>Today's Learning</Text>
            <GradientCard
              gradient={COLORS.primaryGradient}
              icon="📚"
              title="Quadratic Equations"
              subtitle="Continue from where you left"
              onPress={() => console.log('Continue learning')}
              delay={400}
            />
            <Text style={styles.sectionTitle}>Choose Subject</Text>
            <SubjectGrid onSelectSubject={(subject) => console.log('Selected:', subject.name)} />
          </>
        )}

        {userType === 'parent' && (
          <>
            <Text style={styles.sectionTitle}>Kids' Progress</Text>
            <GradientCard
              gradient={COLORS.successGradient}
              icon="👨‍🎓"
              title="View All Kids"
              subtitle="Monitor learning & performance"
              onPress={() => console.log('View kids')}
              delay={400}
            />
            <GradientCard
              gradient={COLORS.accentGradient}
              icon="📊"
              title="Analytics"
              subtitle="Weekly reports & insights"
              onPress={() => console.log('View analytics')}
              delay={500}
            />
          </>
        )}

        <Text style={styles.sectionTitle}>Need Help?</Text>
        <HelpDeskCard />

        <TouchableOpacity style={styles.switchButton} onPress={() => setUserType(null)}>
          <Text style={styles.switchText}>Switch to {userType === 'student' ? 'Parent' : 'Student'} Account</Text>
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
        <Text style={styles.selectionTitle}>Who are you?</Text>
        <Text style={styles.selectionSubtitle}>Select your account type to continue</Text>

        <View style={styles.selectionCards}>
          <TouchableOpacity style={styles.typeCard} onPress={() => onSelect('student')} activeOpacity={0.8}>
            <LinearGradient colors={COLORS.primaryGradient} style={styles.typeCardGradient}>
              <Text style={styles.typeIcon}>👨‍🎓</Text>
              <Text style={styles.typeName}>I'm a Student</Text>
              <Text style={styles.typeSubtext}>Learn & grow</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.typeCard} onPress={() => onSelect('parent')} activeOpacity={0.8}>
            <LinearGradient colors={COLORS.accentGradient} style={styles.typeCardGradient}>
              <Text style={styles.typeIcon}>👨‍👩‍👧</Text>
              <Text style={styles.typeName}>I'm a Parent</Text>
              <Text style={styles.typeSubtext}>Track progress</Text>
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

const HelpDeskCard = () => {
  const [expanded, setExpanded] = useState(false);
  const animHeight = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    Animated.timing(animHeight, {
      toValue: expanded ? 0 : 120,
      duration: 400,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleExpand} activeOpacity={0.8}>
        <LinearGradient colors={['#ff6b6b', '#ee5a6f']} style={styles.helpCard}>
          <View style={styles.helpContent}>
            <Text style={styles.helpIcon}>💬</Text>
            <View style={styles.helpText}>
              <Text style={styles.helpTitle}>Live Chat Support</Text>
              <Text style={styles.helpSubtitle}>Get instant help</Text>
            </View>
            <Text style={styles.helpArrow}>{expanded ? '▼' : '▶'}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <Animated.View style={[styles.expandedContent, { height: animHeight }]}>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionIcon}>📞</Text>
            <Text style={styles.optionText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionIcon}>💌</Text>
            <Text style={styles.optionText}>Email</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  container: { flex: 1, paddingHorizontal: SPACING.lg, backgroundColor: COLORS.white },
  header: { marginBottom: SPACING.xl },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { color: COLORS.textLight, fontSize: 12, fontWeight: '500', marginBottom: 4 },
  userName: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  profileIcon: { width: 44, height: 44, borderRadius: RADIUS.full, backgroundColor: COLORS.gray, justifyContent: 'center', alignItems: 'center', ...SHADOWS.medium },
  profileInitial: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: COLORS.text, marginBottom: SPACING.md, marginTop: SPACING.lg },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.xl, gap: SPACING.md },
  statCard: { flex: 1, backgroundColor: COLORS.gray, borderRadius: RADIUS.md, padding: SPACING.md, alignItems: 'center', ...SHADOWS.soft },
  statLabel: { fontSize: 12, color: COLORS.textLight, marginBottom: SPACING.xs, fontWeight: '500' },
  statValue: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  selectionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: SPACING.lg, backgroundColor: COLORS.white },
  selectionTitle: { fontSize: 28, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.md },
  selectionSubtitle: { fontSize: 14, color: COLORS.textLight, textAlign: 'center', marginBottom: SPACING.xxl },
  selectionCards: { width: '100%', gap: SPACING.lg },
  typeCard: { ...SHADOWS.medium, borderRadius: RADIUS.lg, overflow: 'hidden' },
  typeCardGradient: { padding: SPACING.xl, alignItems: 'center', justifyContent: 'center' },
  typeIcon: { fontSize: 48, marginBottom: SPACING.md },
  typeName: { color: COLORS.white, fontSize: 18, fontWeight: '700', marginBottom: SPACING.xs },
  typeSubtext: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
  helpCard: { borderRadius: RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.md, ...SHADOWS.medium },
  helpContent: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  helpIcon: { fontSize: 32 },
  helpText: { flex: 1 },
  helpTitle: { color: COLORS.white, fontWeight: '600', fontSize: 14, marginBottom: SPACING.xs },
  helpSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
  helpArrow: { color: COLORS.white, fontSize: 14 },
  expandedContent: { backgroundColor: 'rgba(255,107,107,0.05)', borderRadius: RADIUS.md, overflow: 'hidden', marginBottom: SPACING.lg },
  optionsContainer: { flexDirection: 'row', padding: SPACING.md, gap: SPACING.md },
  option: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: SPACING.md, backgroundColor: COLORS.white, borderRadius: RADIUS.md, borderWidth: 1, borderColor: '#ff6b6b' },
  optionIcon: { fontSize: 24, marginBottom: SPACING.xs },
  optionText: { fontSize: 11, fontWeight: '600', color: COLORS.text },
  switchButton: { marginBottom: SPACING.xl, paddingVertical: SPACING.md, alignItems: 'center' },
  switchText: { color: COLORS.primaryGradient[0], fontSize: 12, fontWeight: '600', textDecorationLine: 'underline' },
});

export default HomeScreen;
