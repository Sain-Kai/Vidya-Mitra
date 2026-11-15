import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
  ScrollView, SafeAreaView, StatusBar, TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/colors';

export const ExamPlannerScreen = ({ navigation }) => {
  const [examName, setExamName] = useState('Mid-Term Unit Test');
  const [examDate, setExamDate] = useState('2026-11-25');
  const [daysRemaining, setDaysRemaining] = useState(10);
  const [scheduleGenerated, setScheduleGenerated] = useState(true);

  const sampleSchedule = [
    {
      day: 'Day 1 & 2',
      focus: 'Foundations & Concepts',
      tasks: [
        'Mathematics: Chapter 3 (Fractions & Decimals)',
        'EVS: Water Cycle & Rain',
        'Quick 10-Question Diagnostic Check',
      ],
      status: 'completed',
    },
    {
      day: 'Day 3 & 4',
      focus: 'Deep Practice & Formula Drills',
      tasks: [
        'Solve 15 Word Problems on Speed & Time',
        'English: Reading Comprehension & Synonyms',
        'Interactive Stop: Micro-quiz on Chapter 3',
      ],
      status: 'in-progress',
    },
    {
      day: 'Day 5 & 6',
      focus: 'Revision Cycle 1 (Spaced Repetition)',
      tasks: [
        'Review weak areas identified in previous tests',
        'EVS: Draw and label leaf structure & parts of plant',
      ],
      status: 'pending',
    },
    {
      day: 'Day 7 & 8',
      focus: 'Full Mock Test & Answer Review',
      tasks: [
        'Attempt 50-mark timed mock exam',
        'Upload answer sheet to Paper Evaluator for grading',
        'Review where marks were deducted',
      ],
      status: 'pending',
    },
    {
      day: 'Day 9 & 10',
      focus: 'Final Revision & Confidence Booster',
      tasks: [
        'Light flashcard review',
        'Audio summary recap with parent in Hindi/Bengali',
        'Relax and sleep on time!',
      ],
      status: 'pending',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation && navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Smart Exam & Revision Planner</Text>
          <Text style={styles.headerSub}>Spaced-repetition revision tailored to your exam date</Text>
        </View>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ padding: SPACING.lg }}>
        {/* Exam Setup Card */}
        <View style={styles.setupCard}>
          <Text style={styles.cardTitle}>📅 Upcoming Exam Details</Text>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>Exam / Unit Test Name:</Text>
              <TextInput
                style={styles.input}
                value={examName}
                onChangeText={setExamName}
              />
            </View>
            <View style={{ width: 110 }}>
              <Text style={styles.inputLabel}>Exam Date:</Text>
              <TextInput
                style={styles.input}
                value={examDate}
                onChangeText={setExamDate}
              />
            </View>
          </View>

          <View style={styles.countdownRow}>
            <Text style={styles.countdownBadge}>⏳ {daysRemaining} Days to Go</Text>
            <Text style={styles.countdownNote}>Revision cycles calculated automatically</Text>
          </View>
        </View>

        {/* Schedule Cycles */}
        {scheduleGenerated && (
          <View style={styles.scheduleWrap}>
            <Text style={styles.sectionTitle}>Your Personalized Study & Revision Cycles</Text>

            {sampleSchedule.map((cycle, idx) => (
              <View key={idx} style={styles.cycleCard}>
                <View style={styles.cycleHeader}>
                  <Text style={styles.cycleDay}>{cycle.day}</Text>
                  <Text style={[styles.statusTag, cycle.status === 'completed' ? styles.statusDone : styles.statusActive]}>
                    {cycle.status === 'completed' ? '✓ Completed' : cycle.status === 'in-progress' ? '⚡ Today\'s Goal' : 'Planned'}
                  </Text>
                </View>

                <Text style={styles.focusText}>🎯 Focus: {cycle.focus}</Text>

                <View style={styles.taskList}>
                  {cycle.tasks.map((task, tIdx) => (
                    <View key={tIdx} style={styles.taskItem}>
                      <Text style={styles.taskBullet}>◽</Text>
                      <Text style={styles.taskName}>{task}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.startMockBtn}
          onPress={() => navigation && navigation.navigate('Assessment')}
        >
          <LinearGradient colors={COLORS.primaryGradient} style={styles.startMockGrad}>
            <Text style={styles.startMockText}>Take Today's Exam Readiness Test 📝</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backBtn: { padding: 8, marginRight: 4 },
  backText: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  headerTitleWrap: { flex: 1 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  headerSub: { fontSize: 11, color: COLORS.textLight },

  container: { flex: 1 },
  setupCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    ...SHADOWS.soft,
    marginBottom: SPACING.lg,
  },
  cardTitle: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  row: { flexDirection: 'row', gap: 12 },
  inputLabel: { fontSize: 11, color: COLORS.textLight, fontWeight: '600', marginBottom: 4 },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: COLORS.text,
  },
  countdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  countdownBadge: {
    backgroundColor: '#fef3c7',
    color: '#b45309',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  countdownNote: { fontSize: 11, color: '#64748b' },

  scheduleWrap: { marginBottom: SPACING.xl },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  cycleCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 10,
    ...SHADOWS.soft,
  },
  cycleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cycleDay: { fontSize: 13, fontWeight: '800', color: '#4338ca' },
  statusTag: { fontSize: 11, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  statusDone: { backgroundColor: '#dcfce7', color: '#15803d' },
  statusActive: { backgroundColor: '#e0e7ff', color: '#3730a3' },
  focusText: { fontSize: 12, fontWeight: '600', color: '#1e293b', marginTop: 4, marginBottom: 8 },
  taskList: { gap: 4 },
  taskItem: { flexDirection: 'row', alignItems: 'flex-start' },
  taskBullet: { color: '#6366f1', marginRight: 6, fontSize: 12 },
  taskName: { flex: 1, fontSize: 12, color: '#475569' },

  startMockBtn: { borderRadius: RADIUS.md, overflow: 'hidden', marginBottom: SPACING.xl },
  startMockGrad: { paddingVertical: 14, alignItems: 'center' },
  startMockText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },
});

export default ExamPlannerScreen;
