import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
  ScrollView, SafeAreaView, StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/colors';

export const PaperEvaluatorScreen = ({ navigation }) => {
  const [questionPaperUploaded, setQuestionPaperUploaded] = useState(true);
  const [answerSheetUploaded, setAnswerSheetUploaded] = useState(true);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const handleEvaluate = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setEvaluationResult({
        totalMarks: 50,
        estimatedScore: 41,
        percentage: 82,
        teacherEvaluationPattern: 'School Teacher strictly awards step marks in Mathematics and looks for key definitions in Science.',
        detailedBreakdown: [
          {
            qNo: 'Q1 (Maths)',
            marksAwarded: '5 / 5',
            status: 'full',
            comment: 'Full marks: Clear step-by-step formula and correct final calculation.',
          },
          {
            qNo: 'Q2 (Maths - Area of Triangle)',
            marksAwarded: '3 / 5',
            status: 'partial',
            deductionReason: 'Lost 2 marks: Skipped writing the base formula [1/2 × base × height] and omitted units (cm²). Teacher marks strictly on units!',
            recommendedCorrection: 'Always write formula first, and write "cm²" with the final answer.',
          },
          {
            qNo: 'Q3 (Science - Water Cycle)',
            marksAwarded: '4 / 5',
            status: 'partial',
            deductionReason: 'Lost 1 mark: Missed drawing arrows in the diagram showing condensation.',
            recommendedCorrection: 'Diagrams require directional arrows to demonstrate the cycle.',
          },
          {
            qNo: 'Q4 (English - Sentence Correction)',
            marksAwarded: '5 / 5',
            status: 'full',
            comment: 'Accurate grammatical tense and punctuation.',
          },
        ],
        remedialSuggestions: [
          'Practice writing measurement units (cm, m, sq units) in every math problem.',
          'Always state the theorem or formula before numerical substitution.',
          'In science questions with diagrams, directional arrows are mandatory for full marks.',
        ],
      });
      setIsEvaluating(false);
    }, 900);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation && navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Paper & Answer Sheet Evaluator</Text>
          <Text style={styles.headerSub}>Upload question paper + handwritten answers for scoring</Text>
        </View>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ padding: SPACING.lg }}>
        {/* Upload Cards */}
        <View style={styles.uploadCard}>
          <Text style={styles.sectionHeading}>Step 1: Upload Documents</Text>

          <View style={styles.uploadBoxesRow}>
            {/* Question paper upload */}
            <TouchableOpacity
              style={[styles.uploadBox, questionPaperUploaded && styles.uploadBoxDone]}
              onPress={() => setQuestionPaperUploaded(!questionPaperUploaded)}
            >
              <Text style={styles.uploadBoxIcon}>📄</Text>
              <Text style={styles.uploadBoxTitle}>Question Paper</Text>
              <Text style={styles.uploadBoxStatus}>
                {questionPaperUploaded ? '✓ Uploaded (Class 5 Maths.pdf)' : 'Tap to upload'}
              </Text>
            </TouchableOpacity>

            {/* Answer sheet upload */}
            <TouchableOpacity
              style={[styles.uploadBox, answerSheetUploaded && styles.uploadBoxDone]}
              onPress={() => setAnswerSheetUploaded(!answerSheetUploaded)}
            >
              <Text style={styles.uploadBoxIcon}>✍️</Text>
              <Text style={styles.uploadBoxTitle}>Answer Sheet</Text>
              <Text style={styles.uploadBoxStatus}>
                {answerSheetUploaded ? '✓ Uploaded (Page 1-3.jpg)' : 'Tap to photograph'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.evaluateBtn} onPress={handleEvaluate} disabled={isEvaluating}>
            <LinearGradient colors={COLORS.primaryGradient} style={styles.evaluateBtnGrad}>
              <Text style={styles.evaluateBtnText}>
                {isEvaluating ? 'Evaluating with Teacher Rubrics...' : 'Evaluate & Estimate Score 🔍'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Evaluation & Insights Display */}
        {evaluationResult && (
          <View style={styles.resultCard}>
            <View style={styles.scoreRow}>
              <View>
                <Text style={styles.scoreLabel}>Estimated Score:</Text>
                <Text style={styles.scoreVal}>{evaluationResult.estimatedScore} / {evaluationResult.totalMarks}</Text>
              </View>
              <View style={styles.scoreBadge}>
                <Text style={styles.scorePctText}>{evaluationResult.percentage}%</Text>
              </View>
            </View>

            {/* Teacher pattern insight (Requirement #10) */}
            <View style={styles.patternBox}>
              <Text style={styles.patternTitle}>👨‍🏫 Teacher Evaluation Pattern Insight:</Text>
              <Text style={styles.patternDesc}>{evaluationResult.teacherEvaluationPattern}</Text>
            </View>

            {/* Step-by-Step Breakdown */}
            <Text style={styles.breakdownHeader}>Question-by-Question Grading:</Text>
            {evaluationResult.detailedBreakdown.map((item, idx) => (
              <View key={idx} style={[styles.qItem, item.status === 'partial' ? styles.qItemWarn : styles.qItemSuccess]}>
                <View style={styles.qHeader}>
                  <Text style={styles.qNo}>{item.qNo}</Text>
                  <Text style={styles.qMarks}>{item.marksAwarded}</Text>
                </View>
                {item.comment && <Text style={styles.qComment}>{item.comment}</Text>}
                {item.deductionReason && (
                  <View style={styles.deductionBox}>
                    <Text style={styles.deductionText}>⚠️ {item.deductionReason}</Text>
                    <Text style={styles.remedialTip}>💡 Fix: {item.recommendedCorrection}</Text>
                  </View>
                )}
              </View>
            ))}

            {/* Remedial Checklist */}
            <View style={styles.checklistCard}>
              <Text style={styles.checklistTitle}>🎯 Exam Improvement Checklist:</Text>
              {evaluationResult.remedialSuggestions.map((sug, sIdx) => (
                <View key={sIdx} style={styles.checkItem}>
                  <Text style={styles.checkBullet}>☑️</Text>
                  <Text style={styles.checkText}>{sug}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
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
  uploadCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    ...SHADOWS.soft,
    marginBottom: SPACING.lg,
  },
  sectionHeading: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  uploadBoxesRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  uploadBox: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#cbd5e1',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
  },
  uploadBoxDone: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
    borderStyle: 'solid',
  },
  uploadBoxIcon: { fontSize: 28, marginBottom: 4 },
  uploadBoxTitle: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  uploadBoxStatus: { fontSize: 10, color: '#64748b', textAlign: 'center', marginTop: 4 },
  evaluateBtn: { borderRadius: RADIUS.sm, overflow: 'hidden' },
  evaluateBtnGrad: { paddingVertical: 13, alignItems: 'center' },
  evaluateBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },

  resultCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    ...SHADOWS.medium,
    marginBottom: SPACING.xl,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 12,
    marginBottom: 12,
  },
  scoreLabel: { fontSize: 12, color: COLORS.textLight, fontWeight: '600' },
  scoreVal: { fontSize: 24, fontWeight: '800', color: COLORS.text },
  scoreBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  scorePctText: { fontSize: 16, fontWeight: '800', color: '#15803d' },

  patternBox: {
    backgroundColor: '#fffbeb',
    borderColor: '#fde68a',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  patternTitle: { fontSize: 12, fontWeight: '700', color: '#b45309', marginBottom: 2 },
  patternDesc: { fontSize: 12, color: '#78350f', lineHeight: 18 },

  breakdownHeader: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  qItem: {
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  qItemSuccess: { backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' },
  qItemWarn: { backgroundColor: '#fff7ed', borderColor: '#fed7aa' },
  qHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  qNo: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  qMarks: { fontSize: 13, fontWeight: '800', color: '#4338ca' },
  qComment: { fontSize: 12, color: '#166534', lineHeight: 16 },
  deductionBox: { marginTop: 4 },
  deductionText: { fontSize: 12, color: '#c2410c', fontWeight: '600', lineHeight: 17 },
  remedialTip: { fontSize: 12, color: '#0369a1', fontWeight: '600', marginTop: 4 },

  checklistCard: {
    marginTop: 10,
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    padding: 12,
  },
  checklistTitle: { fontSize: 13, fontWeight: '700', color: '#1d4ed8', marginBottom: 6 },
  checkItem: { flexDirection: 'row', alignItems: 'flex-start', marginVertical: 3 },
  checkBullet: { marginRight: 6, fontSize: 12 },
  checkText: { flex: 1, fontSize: 12, color: '#1e3a8a', lineHeight: 18 },
});

export default PaperEvaluatorScreen;
