import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
  ScrollView, SafeAreaView, StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/colors';
import { fetchDiagnosticsApi } from '../api/assessmentApi';

const SUBJECT_OPTIONS = ['Mathematics', 'Science', 'Social Studies'];

const DEFAULT_TOPIC_MASTERY = [
  { name: 'Numbers and Counting', mastery: 95, status: 'Mastered' },
  { name: 'Fractions and Shapes', mastery: 78, status: 'Good' },
  { name: 'Speed Distance and Time Problems', mastery: 42, status: 'Needs Support' },
  { name: 'Word Problems and Logical Reasoning', mastery: 35, status: 'Weak Area' },
];

const DEFAULT_SKILLS = [
  { name: 'Conceptual Foundation', percentage: 86 },
  { name: 'Application', percentage: 68 },
  { name: 'Logical Thinking', percentage: 40 },
];

const DEFAULT_REMEDIAL_LESSONS = [
  {
    topic: 'Word Problems and Logical Reasoning',
    title: 'Fun with Story Problems',
    level: 'Foundational Level 1',
    analogy: 'Picture real cricket balls or fruit baskets instead of plain abstract numbers.',
    challenge: 'You have 4 boxes with 5 crayons each. You gift 3 crayons. How many remain?',
  },
  {
    topic: 'Speed Distance and Time Problems',
    title: 'Round Track Runner Steps',
    level: 'Foundational Level 1',
    analogy: 'Think of distance as total foot steps taken and speed as steps per minute.',
    challenge: 'If you walk 2 km in 30 minutes, how far do you walk in 1 hour?',
  },
];

export const PerformanceScreen = ({ navigation }) => {
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [overallMastery, setOverallMastery] = useState(74);
  const [assessmentsCount, setAssessmentsCount] = useState(14);
  const [weakCount, setWeakCount] = useState(2);
  const [topicMastery, setTopicMastery] = useState(DEFAULT_TOPIC_MASTERY);
  const [skillsList, setSkillsList] = useState(DEFAULT_SKILLS);
  const [remedialLessons, setRemedialLessons] = useState(DEFAULT_REMEDIAL_LESSONS);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeLangTab, setActiveLangTab] = useState('hi');

  useEffect(() => {
    let isMounted = true;
    const loadDiagnostics = async () => {
      const data = await fetchDiagnosticsApi(selectedSubject, 'Class 4');
      if (isMounted && data && data.mastery_percentage !== undefined) {
        setOverallMastery(Math.round(data.mastery_percentage));
        if (data.topic_mastery) {
          const mapped = data.topic_mastery.map(tm => ({
            name: tm.topic,
            mastery: Math.round(tm.mastery_percentage),
            status: tm.status,
          }));
          setTopicMastery(mapped);
        }
        if (data.weak_topics) {
          setWeakCount(data.weak_topics.length);
        }
        if (data.adaptive_next_lessons && data.adaptive_next_lessons.length > 0) {
          const lessonsMapped = data.adaptive_next_lessons.map(l => ({
            topic: l.topic,
            title: l.lesson_title,
            level: l.difficulty,
            analogy: l.foundation_analogy,
            challenge: l.practice_challenge,
          }));
          setRemedialLessons(lessonsMapped);
        }
      }
    };
    loadDiagnostics();
    return () => {
      isMounted = false;
    };
  }, [selectedSubject]);

  const handlePlayVoice = () => {
    setIsPlayingAudio(true);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 2500);
  };

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
          <Text style={styles.headerTitle}>Learning and Weakness Analytics</Text>
          <Text style={styles.headerSub}>Adaptive Diagnostic Insights for Classes 1 to 8</Text>
        </View>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ padding: SPACING.lg }}>
        <View style={styles.subjectSelectorRow}>
          {SUBJECT_OPTIONS.map(subj => {
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

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Student Cognitive Profile</Text>
          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricVal}>{overallMastery}%</Text>
              <Text style={styles.metricLabel}>Overall Mastery</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricVal}>{assessmentsCount}</Text>
              <Text style={styles.metricLabel}>Assessments Taken</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricVal}>{weakCount}</Text>
              <Text style={styles.metricLabel}>Weak Topics</Text>
            </View>
          </View>
        </View>

        <View style={styles.parentNotice}>
          <View style={styles.parentHeaderRow}>
            <Text style={styles.parentNoticeTitle}>👨‍👩‍👧 Regional Parent Summary:</Text>
            <View style={styles.langTabGroup}>
              <TouchableOpacity
                style={[styles.langTab, activeLangTab === 'hi' && styles.langTabActive]}
                onPress={() => setActiveLangTab('hi')}
              >
                <Text style={[styles.langTabText, activeLangTab === 'hi' && styles.langTabTextActive]}>
                  हिन्दी
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.langTab, activeLangTab === 'bn' && styles.langTabActive]}
                onPress={() => setActiveLangTab('bn')}
              >
                <Text style={[styles.langTabText, activeLangTab === 'bn' && styles.langTabTextActive]}>
                  বাংলা
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.langTab, activeLangTab === 'en' && styles.langTabActive]}
                onPress={() => setActiveLangTab('en')}
              >
                <Text style={[styles.langTabText, activeLangTab === 'en' && styles.langTabTextActive]}>
                  EN
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.parentNoticeDesc}>
            {activeLangTab === 'hi' &&
              'आपका बच्चा गणित के बुनियादी सवालों को बहुत अच्छे से समझ रहा है, लेकिन शब्द समस्याओं में थोड़ी कठिनाई हो रही है। विद्या मित्र ने इसके लिए आसान उदाहरणों वाले नए अभ्यास पाठ तैयार किए हैं।'}
            {activeLangTab === 'bn' &&
              'আপনার সন্তান মৌলিক ধারণাগুলি ভালো বুঝেছে, তবে শব্দ সমস্যাগুলিতে অনুশীলনের প্রয়োজন। বিদ্যা মিত্র বাস্তব উদাহরণের সাথে নতুন পাঠ প্রস্তুত করেছে।'}
            {activeLangTab === 'en' &&
              'Student demonstrates solid conceptual foundation in core arithmetic. Focused remediation lessons have been scheduled for multi step word problems.'}
          </Text>

          <TouchableOpacity
            style={[styles.voiceNoteBtn, isPlayingAudio && styles.voiceNoteBtnActive]}
            onPress={handlePlayVoice}
          >
            <Text style={styles.voiceNoteText}>
              {isPlayingAudio ? '🔊 Playing Audio Report...' : '🔊 Listen Audio Report'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.skillsCard}>
          <Text style={styles.sectionHeading}>Cognitive Skills Proficiency:</Text>
          {skillsList.map((skill, idx) => (
            <View key={idx} style={styles.skillRow}>
              <View style={styles.skillNameRow}>
                <Text style={styles.skillName}>{skill.name}</Text>
                <Text style={styles.skillPct}>{skill.percentage}%</Text>
              </View>
              <View style={styles.skillBarBg}>
                <View style={[styles.skillBarFill, { width: `${skill.percentage}%` }]} />
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionHeading}>Topic-wise Proficiency Breakdown:</Text>
        {topicMastery.map((topic, idx) => (
          <View key={idx} style={styles.topicCard}>
            <View style={styles.topicHeader}>
              <Text style={styles.topicName}>{topic.name}</Text>
              <Text
                style={[
                  styles.topicTag,
                  topic.mastery >= 80 ? styles.tagGood : topic.mastery >= 60 ? styles.tagMid : styles.tagWeak,
                ]}
              >
                {topic.status} - {topic.mastery}%
              </Text>
            </View>
            <View style={styles.barBg}>
              <View
                style={[
                  styles.barFill,
                  { width: `${topic.mastery}%` },
                  topic.mastery >= 80 ? styles.barGreen : topic.mastery >= 60 ? styles.barYellow : styles.barRed,
                ]}
              />
            </View>
          </View>
        ))}

        {remedialLessons.length > 0 && (
          <View style={styles.remedialSection}>
            <Text style={styles.sectionHeading}>🌱 Adaptive Remediation Lessons:</Text>
            {remedialLessons.map((lesson, idx) => (
              <View key={idx} style={styles.remedialCard}>
                <View style={styles.remedialHeader}>
                  <Text style={styles.remedialTitle}>{lesson.title}</Text>
                  <Text style={styles.remedialBadge}>{lesson.level}</Text>
                </View>
                <Text style={styles.remedialTopic}>Topic: {lesson.topic}</Text>
                <Text style={styles.remedialAnalogy}>💡 {lesson.analogy}</Text>
                <Text style={styles.remedialChallenge}>🎯 {lesson.challenge}</Text>
                <TouchableOpacity
                  style={styles.startRemedialBtn}
                  onPress={() =>
                    navigation &&
                    navigation.navigate('TutorChat', {
                      topic: lesson.topic,
                      initialQuestion: lesson.analogy,
                    })
                  }
                >
                  <Text style={styles.startRemedialBtnText}>Start Foundation Lesson →</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.remedialBtn}
          onPress={() => navigation && navigation.navigate('Assessment')}
        >
          <LinearGradient colors={COLORS.primaryGradient} style={styles.remedialGrad}>
            <Text style={styles.remedialText}>Take New Diagnostic Assessment 🎯</Text>
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
  subjectSelectorRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: SPACING.md,
  },
  subjectChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
  },
  subjectChipActive: {
    backgroundColor: '#6366f1',
  },
  subjectChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  subjectChipTextActive: {
    color: COLORS.white,
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    ...SHADOWS.soft,
    marginBottom: SPACING.md,
  },
  summaryTitle: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 12 },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  metricItem: { alignItems: 'center' },
  metricVal: { fontSize: 22, fontWeight: '800', color: '#4338ca' },
  metricLabel: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  divider: { width: 1, height: 32, backgroundColor: '#e2e8f0' },
  parentNotice: {
    backgroundColor: '#fffbeb',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: '#fef3c7',
  },
  parentHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  parentNoticeTitle: { fontSize: 13, fontWeight: '700', color: '#92400e' },
  langTabGroup: { flexDirection: 'row', gap: 4 },
  langTab: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 4, backgroundColor: '#fde68a' },
  langTabActive: { backgroundColor: '#d97706' },
  langTabText: { fontSize: 10, fontWeight: '700', color: '#78350f' },
  langTabTextActive: { color: COLORS.white },
  parentNoticeDesc: { fontSize: 13, color: '#78350f', lineHeight: 20, marginBottom: 12 },
  voiceNoteBtn: {
    backgroundColor: '#fef3c7',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  voiceNoteBtnActive: {
    backgroundColor: '#bbf7d0',
    borderColor: '#86efac',
  },
  voiceNoteText: { fontSize: 12, fontWeight: '700', color: '#92400e' },
  skillsCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.soft,
  },
  sectionHeading: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 10 },
  skillRow: { marginBottom: 10 },
  skillNameRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  skillName: { fontSize: 12, fontWeight: '600', color: '#334155' },
  skillPct: { fontSize: 12, fontWeight: '700', color: '#6366f1' },
  skillBarBg: { height: 6, backgroundColor: '#f1f5f9', borderRadius: 3, overflow: 'hidden' },
  skillBarFill: { height: 6, backgroundColor: '#6366f1', borderRadius: 3 },
  topicCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.soft,
  },
  topicHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  topicName: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary, flex: 1 },
  topicTag: { fontSize: 11, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  tagGood: { backgroundColor: '#dcfce7', color: '#15803d' },
  tagMid: { backgroundColor: '#fef3c7', color: '#b45309' },
  tagWeak: { backgroundColor: '#fee2e2', color: '#b91c1c' },
  barBg: { height: 6, backgroundColor: '#f1f5f9', borderRadius: 3, overflow: 'hidden' },
  barFill: { height: 6, borderRadius: 3 },
  barGreen: { backgroundColor: '#10b981' },
  barYellow: { backgroundColor: '#f59e0b' },
  barRed: { backgroundColor: '#ef4444' },
  remedialSection: { marginTop: SPACING.sm, marginBottom: SPACING.sm },
  remedialCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  remedialHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  remedialTitle: { fontSize: 14, fontWeight: '700', color: '#1e293b' },
  remedialBadge: { fontSize: 11, fontWeight: '700', color: '#d97706' },
  remedialTopic: { fontSize: 11, color: '#64748b', fontWeight: '600', marginBottom: 6 },
  remedialAnalogy: { fontSize: 12, color: '#334155', lineHeight: 18, marginBottom: 6 },
  remedialChallenge: { fontSize: 12, color: '#0f172a', fontWeight: '600', marginBottom: 10 },
  startRemedialBtn: {
    backgroundColor: '#fef3c7',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  startRemedialBtnText: { color: '#b45309', fontSize: 12, fontWeight: '700' },
  remedialBtn: { borderRadius: RADIUS.md, overflow: 'hidden', marginTop: SPACING.md, marginBottom: SPACING.xl },
  remedialGrad: { paddingVertical: 14, alignItems: 'center' },
  remedialText: { color: COLORS.white, fontSize: 15, fontWeight: '700' },
});

export default PerformanceScreen;
