import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
  ScrollView, SafeAreaView, StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/colors';

export const PerformanceScreen = ({ navigation }) => {
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');

  const topicMastery = [
    { name: 'Numbers & Counting (Class 1-3)', mastery: 95, status: 'Mastered' },
    { name: 'Fractions & Shapes', mastery: 78, status: 'Good' },
    { name: 'Speed, Distance & Time Problems', mastery: 42, status: 'Needs Support' },
    { name: 'Word Problems & Logical Reasoning', mastery: 35, status: 'Weak Area' },
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
          <Text style={styles.headerTitle}>Learning & Weakness Analytics</Text>
          <Text style={styles.headerSub}>Adaptive Diagnostic Insights (Classes 1–8)</Text>
        </View>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ padding: SPACING.lg }}>
        {/* Overall Mastery Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Student Cognitive Profile</Text>
          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricVal}>74%</Text>
              <Text style={styles.metricLabel}>Overall Mastery</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricVal}>14</Text>
              <Text style={styles.metricLabel}>Assessments Taken</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricVal}>2</Text>
              <Text style={styles.metricLabel}>Weak Topics</Text>
            </View>
          </View>
        </View>

        {/* Parent Summary Box in Regional Language */}
        <View style={styles.parentNotice}>
          <Text style={styles.parentNoticeTitle}>👨‍👩‍👧 माता-पिता के लिए संदेश (Parent Summary):</Text>
          <Text style={styles.parentNoticeDesc}>
            आपका बच्चा गणित के बुनियादी सवालों को बहुत अच्छे से समझ रहा है, लेकिन शब्द-समस्याओं (Word Problems) में थोड़ी कठिनाई हो रही है। विद्या मित्र ने इसके लिए आसान उदाहरणों वाले 3 नए अभ्यास पाठ तैयार किए हैं।
          </Text>
          <TouchableOpacity style={styles.voiceNoteBtn}>
            <Text style={styles.voiceNoteText}>🔊 Listen Audio Report (Hindi)</Text>
          </TouchableOpacity>
        </View>

        {/* Topic Breakdown */}
        <Text style={styles.sectionHeading}>Topic-wise Proficiency:</Text>
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
                {topic.status} ({topic.mastery}%)
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

        {/* Action to start personalized remedial tutor */}
        <TouchableOpacity
          style={styles.remedialBtn}
          onPress={() => navigation && navigation.navigate('TutorChat', { topic: 'Word Problems & Logical Reasoning' })}
        >
          <LinearGradient colors={COLORS.primaryGradient} style={styles.remedialGrad}>
            <Text style={styles.remedialText}>Start Remedial Lesson on Weak Areas 🎯</Text>
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
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    ...SHADOWS.soft,
    marginBottom: SPACING.md,
  },
  summaryTitle: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  metricItem: { alignItems: 'center' },
  metricVal: { fontSize: 22, fontWeight: '800', color: '#4338ca' },
  metricLabel: { fontSize: 11, color: COLORS.textLight, marginTop: 2 },
  divider: { width: 1, height: 32, backgroundColor: '#e2e8f0' },

  parentNotice: {
    backgroundColor: '#fff7ed',
    borderLeftWidth: 4,
    borderLeftColor: '#ea580c',
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  parentNoticeTitle: { fontSize: 13, fontWeight: '700', color: '#9a3412', marginBottom: 4 },
  parentNoticeDesc: { fontSize: 13, color: '#7c2d12', lineHeight: 20 },
  voiceNoteBtn: {
    marginTop: 10,
    backgroundColor: '#fed7aa',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  voiceNoteText: { fontSize: 11, fontWeight: '700', color: '#9a3412' },

  sectionHeading: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: 10 },
  topicCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 10,
  },
  topicHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  topicName: { fontSize: 13, fontWeight: '600', color: COLORS.text, flex: 1, paddingRight: 8 },
  topicTag: { fontSize: 11, fontWeight: '700' },
  tagGood: { color: '#16a34a' },
  tagMid: { color: '#ca8a04' },
  tagWeak: { color: '#dc2626' },

  barBg: { height: 6, backgroundColor: '#f1f5f9', borderRadius: 3, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 3 },
  barGreen: { backgroundColor: '#22c55e' },
  barYellow: { backgroundColor: '#eab308' },
  barRed: { backgroundColor: '#ef4444' },

  remedialBtn: { borderRadius: RADIUS.md, overflow: 'hidden', marginTop: SPACING.md, marginBottom: SPACING.xl },
  remedialGrad: { paddingVertical: 14, alignItems: 'center' },
  remedialText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },
});

export default PerformanceScreen;
