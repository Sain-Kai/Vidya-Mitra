import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
  ScrollView, SafeAreaView, StatusBar, TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/colors';

const SAMPLE_ASSESSMENT = [
  {
    id: 'q1',
    type: 'MCQ',
    question: 'If a train leaves Delhi at 6:00 AM and reaches Agra at 9:30 AM, how long was the journey?',
    options: ['3 hours', '3 hours 30 minutes', '4 hours', '2 hours 45 minutes'],
    correct: 1,
    skill: 'Time & Clocks',
    explanation: 'From 6:00 AM to 9:00 AM is 3 hours. Plus 30 minutes gives 3 hours 30 mins.',
  },
  {
    id: 'q2',
    type: 'LOGICAL',
    question: 'A shopkeeper has 5 baskets with 8 apples each. He sells 12 apples. How many apples are left?',
    options: ['28 apples', '32 apples', '40 apples', '30 apples'],
    correct: 0,
    skill: 'Multiplication & Subtraction',
    explanation: 'Total apples = 5 * 8 = 40. Sold = 12. Remaining = 40 - 12 = 28.',
  },
  {
    id: 'q3',
    type: 'SHORT_ANSWER',
    question: 'Why do leaves appear green in sunlight? Name the pigment.',
    expectedKeywords: ['chlorophyll', 'green pigment'],
    skill: 'Plant Biology',
    explanation: 'Leaves contain a green substance called chlorophyll which captures sunlight.',
  },
  {
    id: 'q4',
    type: 'LONG_ANSWER',
    question: 'Explain why we should drink clean boiled or filtered water in the rainy season.',
    skill: 'Health & Hygiene',
    explanation: 'Rainy water can carry germs and bacteria causing diseases like cholera and typhoid.',
  },
];

export const AssessmentScreen = ({ navigation }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [shortAnswers, setShortAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = SAMPLE_ASSESSMENT[currentIdx];

  const handleSelectOption = (idx) => {
    setAnswers({ ...answers, [currentIdx]: idx });
  };

  const handleNext = () => {
    if (currentIdx < SAMPLE_ASSESSMENT.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    SAMPLE_ASSESSMENT.forEach((q, idx) => {
      if (q.type === 'MCQ' || q.type === 'LOGICAL') {
        if (answers[idx] === q.correct) score += 1;
      } else {
        // Approximate short answer check
        const text = (shortAnswers[idx] || '').toLowerCase();
        if (q.expectedKeywords && q.expectedKeywords.some(k => text.includes(k))) {
          score += 1;
        } else if (text.length > 10) {
          score += 1;
        }
      }
    });
    return score;
  };

  if (isCompleted) {
    const totalScore = calculateScore();
    const pct = Math.round((totalScore / SAMPLE_ASSESSMENT.length) * 100);

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <ScrollView style={styles.resultContainer} contentContainerStyle={{ padding: SPACING.lg }}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scorePct}>{pct}%</Text>
            <Text style={styles.scoreFraction}>{totalScore} / {SAMPLE_ASSESSMENT.length} Correct</Text>
          </View>

          <Text style={styles.resultHeading}>Diagnostic Analysis Completed 🎯</Text>
          <Text style={styles.resultSub}>
            Vidya Mitra has analyzed your answers to tailor your next revision sessions:
          </Text>

          {/* Diagnostic Breakdown */}
          <View style={styles.diagnosisCard}>
            <Text style={styles.diagnosisTitle}>🔍 Areas Identified for Improvement:</Text>
            <View style={styles.diagItem}>
              <Text style={styles.diagBadgeWeak}>⚠️ Needs Practice</Text>
              <Text style={styles.diagText}>Time calculations & word problems (Logical reasoning)</Text>
            </View>
            <View style={styles.diagItem}>
              <Text style={styles.diagBadgeStrong}>✅ Strong Mastery</Text>
              <Text style={styles.diagText}>Plant biology & photosynthesis concepts</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.retakeBtn}
            onPress={() => {
              setAnswers({});
              setShortAnswers({});
              setCurrentIdx(0);
              setIsCompleted(false);
            }}
          >
            <Text style={styles.retakeText}>🔄 Retake Diagnostic Test</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.planBtn}
            onPress={() => navigation && navigation.navigate('ExamPlanner')}
          >
            <LinearGradient colors={COLORS.primaryGradient} style={styles.planBtnGrad}>
              <Text style={styles.planBtnText}>Generate Weakness-Based Study Plan 📅</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation && navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Interactive Assessment</Text>
          <Text style={styles.headerSub}>Question {currentIdx + 1} of {SAMPLE_ASSESSMENT.length}</Text>
        </View>
        <View style={styles.typeBadge}>
          <Text style={styles.typeBadgeText}>{currentQ.type}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${((currentIdx + 1) / SAMPLE_ASSESSMENT.length) * 100}%` }]} />
      </View>

      <ScrollView style={styles.questionBody} contentContainerStyle={{ padding: SPACING.lg }}>
        <Text style={styles.skillTag}>Skill: {currentQ.skill}</Text>
        <Text style={styles.questionText}>{currentQ.question}</Text>

        {/* Options for MCQ / LOGICAL */}
        {(currentQ.type === 'MCQ' || currentQ.type === 'LOGICAL') && (
          <View style={styles.optionsWrap}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = answers[currentIdx] === idx;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                  onPress={() => handleSelectOption(idx)}
                >
                  <View style={[styles.optIndicator, isSelected && styles.optIndicatorSelected]}>
                    <Text style={[styles.optIndText, isSelected && styles.optIndTextSelected]}>
                      {String.fromCharCode(65 + idx)}
                    </Text>
                  </View>
                  <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Text Input for SHORT / LONG ANSWER */}
        {(currentQ.type === 'SHORT_ANSWER' || currentQ.type === 'LONG_ANSWER') && (
          <View style={styles.textAnswerWrap}>
            <Text style={styles.answerPrompt}>Write your explanation below:</Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={4}
              placeholder="Explain in your own words..."
              value={shortAnswers[currentIdx] || ''}
              onChangeText={(txt) => setShortAnswers({ ...shortAnswers, [currentIdx]: txt })}
            />
          </View>
        )}
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity
          disabled={currentIdx === 0}
          style={[styles.prevBtn, currentIdx === 0 && styles.btnDisabled]}
          onPress={() => setCurrentIdx(currentIdx - 1)}
        >
          <Text style={styles.prevBtnText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <LinearGradient colors={COLORS.primaryGradient} style={styles.nextBtnGrad}>
            <Text style={styles.nextBtnText}>
              {currentIdx === SAMPLE_ASSESSMENT.length - 1 ? 'Submit Test' : 'Next Question →'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backBtn: { padding: 8, marginRight: 4 },
  backText: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  headerTitleWrap: { flex: 1 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  headerSub: { fontSize: 11, color: COLORS.textLight },
  typeBadge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeBadgeText: { color: '#2563eb', fontSize: 11, fontWeight: '700' },

  progressBarBg: { height: 4, backgroundColor: '#f1f5f9', width: '100%' },
  progressBarFill: { height: 4, backgroundColor: '#667eea' },

  questionBody: { flex: 1 },
  skillTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#f8fafc',
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 26,
    marginBottom: SPACING.xl,
  },

  optionsWrap: { gap: 12 },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: '#f8fafc',
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
  },
  optionCardSelected: {
    backgroundColor: '#f5f3ff',
    borderColor: '#7c3aed',
  },
  optIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optIndicatorSelected: { backgroundColor: '#7c3aed' },
  optIndText: { fontSize: 14, fontWeight: '700', color: '#475569' },
  optIndTextSelected: { color: COLORS.white },
  optionLabel: { fontSize: 15, color: COLORS.text, flex: 1, fontWeight: '500' },
  optionLabelSelected: { color: '#6d28d9', fontWeight: '700' },

  textAnswerWrap: { marginTop: SPACING.sm },
  answerPrompt: { fontSize: 13, fontWeight: '600', color: COLORS.textLight, marginBottom: 8 },
  textArea: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: RADIUS.md,
    padding: 12,
    fontSize: 14,
    color: COLORS.text,
    minHeight: 120,
    textAlignVertical: 'top',
  },

  footer: {
    flexDirection: 'row',
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    gap: 12,
  },
  prevBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    justifyContent: 'center',
  },
  btnDisabled: { opacity: 0.4 },
  prevBtnText: { color: COLORS.text, fontWeight: '600', fontSize: 14 },
  nextBtn: { flex: 1, borderRadius: RADIUS.md, overflow: 'hidden' },
  nextBtnGrad: { paddingVertical: 12, justifyContent: 'center', alignItems: 'center' },
  nextBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },

  resultContainer: { alignItems: 'center' },
  scoreCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#f0fdf4',
    borderWidth: 4,
    borderColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  scorePct: { fontSize: 36, fontWeight: '800', color: '#16a34a' },
  scoreFraction: { fontSize: 12, color: '#15803d', fontWeight: '600' },
  resultHeading: { fontSize: 20, fontWeight: '700', color: COLORS.text, textAlign: 'center' },
  resultSub: { fontSize: 13, color: COLORS.textLight, textAlign: 'center', marginTop: 4, marginBottom: SPACING.lg },

  diagnosisCard: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: SPACING.xl,
  },
  diagnosisTitle: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: 10 },
  diagItem: { marginVertical: 6 },
  diagBadgeWeak: { color: '#d97706', fontSize: 11, fontWeight: '700', marginBottom: 2 },
  diagBadgeStrong: { color: '#16a34a', fontSize: 11, fontWeight: '700', marginBottom: 2 },
  diagText: { fontSize: 13, color: COLORS.text, lineHeight: 18 },

  retakeBtn: { paddingVertical: 12, marginBottom: 12, alignItems: 'center' },
  retakeText: { color: '#6366f1', fontWeight: '700', fontSize: 14 },
  planBtn: { width: '100%', borderRadius: RADIUS.md, overflow: 'hidden' },
  planBtnGrad: { paddingVertical: 14, alignItems: 'center' },
  planBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 15 },
});

export default AssessmentScreen;
