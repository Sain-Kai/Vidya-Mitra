import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
  ScrollView, SafeAreaView, StatusBar, TextInput, ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/colors';
import {
  generateExamScheduleApi,
  toggleTaskApi,
  fetchActiveExamScheduleApi
} from '../api/examPlannerApi';
import { RevisionMilestoneCard, ExamCountdownBanner } from '../components';

const SUBJECTS = ['Mathematics', 'Science', 'Social Studies', 'English'];

const DEFAULT_SCHEDULE = {
  exam_title: 'Term 1 Mathematics Exam',
  subject: 'Mathematics',
  exam_date: '2026-12-05',
  days_remaining: 15,
  parent_reminders: {
    hi: 'परीक्षा में 15 दिन शेष हैं। आज का लक्ष्य: अध्याय अवधारणाओं का अभ्यास करना।',
    en: '15 days remaining until exam. Daily focus: Foundation concepts.',
  },
  revision_phases: [
    {
      phase_id: 'phase_1',
      phase_name: 'Phase 1: Concept and Story Foundations',
      focus_area: 'Build intuitive understanding without rote memorization',
      days_allocated: 6,
      start_date: '2026-11-20',
      end_date: '2026-11-26',
      daily_tasks: [
        {
          task_id: 't1_01',
          text: 'Review core chapter concepts with Vidya Mitra Socratic tutor',
          completed: true,
          time_minutes: 25,
        },
        {
          task_id: 't1_02',
          text: 'Complete in-lesson micro recaps and concept recall checks',
          completed: false,
          time_minutes: 15,
        },
        {
          task_id: 't1_03',
          text: 'Note down unfamiliar terms and listen to mother tongue summary',
          completed: false,
          time_minutes: 10,
        },
      ],
    },
    {
      phase_id: 'phase_2',
      phase_name: 'Phase 2: Deep Practice and Weak Area Drills',
      focus_area: 'Targeted practice on previously missed question types',
      days_allocated: 6,
      start_date: '2026-11-26',
      end_date: '2026-12-02',
      daily_tasks: [
        {
          task_id: 't2_01',
          text: 'Attempt 10 multi format diagnostic assessment questions',
          completed: false,
          time_minutes: 20,
        },
        {
          task_id: 't2_weak_1',
          text: 'Prioritized Foundation Review: Word Problems and Logical Reasoning',
          completed: false,
          time_minutes: 20,
        },
        {
          task_id: 't2_02',
          text: 'Work through step by step solutions for multi step word problems',
          completed: false,
          time_minutes: 25,
        },
      ],
    },
    {
      phase_id: 'phase_3',
      phase_name: 'Phase 3: Mock Testing and Rapid Recall Polish',
      focus_area: 'Timed exam simulation and teacher evaluation rubric check',
      days_allocated: 3,
      start_date: '2026-12-02',
      end_date: '2026-12-05',
      daily_tasks: [
        {
          task_id: 't3_01',
          text: 'Solve one full length timed mock question paper',
          completed: false,
          time_minutes: 45,
        },
        {
          task_id: 't3_02',
          text: 'Upload handwritten answer transcript to Paper Evaluator for feedback',
          completed: false,
          time_minutes: 15,
        },
        {
          task_id: 't3_03',
          text: 'Listen to audio revision summary with parents and sleep on time',
          completed: false,
          time_minutes: 10,
        },
      ],
    },
  ],
};

export const ExamPlannerScreen = ({ navigation }) => {
  const [examName, setExamName] = useState('Term 1 Mathematics Exam');
  const [examDate, setExamDate] = useState('2026-12-05');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadActiveSchedule = async () => {
      const data = await fetchActiveExamScheduleApi(selectedSubject, 'Class 4');
      if (isMounted && data && data.revision_phases) {
        setSchedule(data);
      }
    };
    loadActiveSchedule();
    return () => {
      isMounted = false;
    };
  }, [selectedSubject]);

  const handleGenerateSchedule = async () => {
    setIsLoading(true);
    const result = await generateExamScheduleApi(
      examName,
      selectedSubject,
      examDate,
      'Class 4',
      ['Word Problems and Logical Reasoning', 'Perimeter and Area']
    );
    if (result && result.revision_phases) {
      setSchedule(result);
    }
    setIsLoading(false);
  };

  const handleToggleTask = async (phaseId, taskId) => {
    const updated = await toggleTaskApi(schedule, phaseId, taskId);
    if (updated && updated.revision_phases) {
      setSchedule(updated);
    } else {
      const cloned = JSON.parse(JSON.stringify(schedule));
      for (const phase of cloned.revision_phases || []) {
        if (phase.phase_id === phaseId) {
          for (const task of phase.daily_tasks || []) {
            if (task.task_id === taskId) {
              task.completed = !task.completed;
              break;
            }
          }
        }
      }
      setSchedule(cloned);
    }
  };

  const handlePlayReminderAudio = () => {
    setIsPlayingAudio(true);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 2500);
  };

  const phases = schedule.revision_phases || [];
  const parentNotice = schedule.parent_reminders?.hi || '';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation && navigation.goBack && navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Smart Exam and Revision Planner</Text>
          <Text style={styles.headerSub}>Spaced revision cycles tailored to your exam date</Text>
        </View>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ padding: SPACING.lg }}>
        <View style={styles.setupCard}>
          <Text style={styles.cardTitle}>📅 Upcoming Exam Setup</Text>

          <View style={styles.subjectRow}>
            {SUBJECTS.map(subj => {
              const isSelected = selectedSubject === subj;
              return (
                <TouchableOpacity
                  key={subj}
                  style={[styles.subjectChip, isSelected && styles.subjectChipActive]}
                  onPress={() => setSelectedSubject(subj)}
                >
                  <Text style={[styles.subjectChipText, isSelected && styles.subjectChipTextActive]}>
                    {subj}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.inputRow}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={styles.inputLabel}>Exam Title:</Text>
              <TextInput
                style={styles.input}
                value={examName}
                onChangeText={setExamName}
                placeholder="e.g. Unit Test 2"
                placeholderTextColor="#94a3b8"
              />
            </View>
            <View style={{ width: 120 }}>
              <Text style={styles.inputLabel}>Exam Date:</Text>
              <TextInput
                style={styles.input}
                value={examDate}
                onChangeText={setExamDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#94a3b8"
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.recalculateBtn}
            onPress={handleGenerateSchedule}
            activeOpacity={0.8}
          >
            <Text style={styles.recalculateBtnText}>
              {isLoading ? 'Calculating Cycles...' : 'Recalculate Spaced Cycles 🔄'}
            </Text>
          </TouchableOpacity>
        </View>

        <ExamCountdownBanner
          examTitle={schedule.exam_title || examName}
          daysRemaining={schedule.days_remaining || 10}
          examDate={schedule.exam_date || examDate}
          parentReminder={parentNotice}
          onPlayReminderAudio={handlePlayReminderAudio}
          isPlayingAudio={isPlayingAudio}
        />

        <View style={styles.milestonesSection}>
          <Text style={styles.sectionHeading}>Structured Revision Milestones:</Text>

          {phases.map(milestone => (
            <RevisionMilestoneCard
              key={milestone.phase_id}
              milestone={milestone}
              onToggleTask={handleToggleTask}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.startMockBtn}
          onPress={() => navigation && navigation.navigate && navigation.navigate('Assessment')}
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
  backText: { fontSize: 22, fontWeight: '700', color: COLORS.textPrimary },
  headerTitleWrap: { flex: 1 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  headerSub: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  container: { flex: 1 },
  setupCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    ...SHADOWS.soft,
    marginBottom: SPACING.md,
  },
  cardTitle: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 12 },
  subjectRow: { flexDirection: 'row', gap: 6, marginBottom: 12, flexWrap: 'wrap' },
  subjectChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: '#f1f5f9',
  },
  subjectChipActive: { backgroundColor: '#6366f1' },
  subjectChipText: { fontSize: 11, color: '#475569', fontWeight: '600' },
  subjectChipTextActive: { color: COLORS.white },
  inputRow: { flexDirection: 'row', marginBottom: 12 },
  inputLabel: { fontSize: 11, color: '#64748b', fontWeight: '600', marginBottom: 4 },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  recalculateBtn: {
    backgroundColor: '#ede9fe',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  recalculateBtnText: { color: '#6366f1', fontSize: 12, fontWeight: '700' },
  milestonesSection: { marginBottom: SPACING.sm },
  sectionHeading: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 10 },
  startMockBtn: { borderRadius: RADIUS.md, overflow: 'hidden', marginTop: SPACING.xs, marginBottom: SPACING.xl },
  startMockGrad: { paddingVertical: 14, alignItems: 'center' },
  startMockText: { color: COLORS.white, fontSize: 15, fontWeight: '700' },
});

export default ExamPlannerScreen;
