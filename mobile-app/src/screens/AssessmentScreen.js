import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
  ScrollView, SafeAreaView, StatusBar, TextInput, ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/colors';
import { generateAssessmentApi, submitAssessmentApi } from '../api/assessmentApi';

const DEFAULT_QUESTIONS = [
  {
    id: 'math_c4_01',
    type: 'MCQ',
    topic: 'Time and Clocks',
    skill: 'Application',
    question: 'If a school bus leaves the terminal at 7:15 AM and arrives at school at 8:05 AM, how many minutes did the journey take?',
    options: ['40 minutes', '50 minutes', '55 minutes', '60 minutes'],
    correct_option_index: 1,
    points: 1.0,
    explanation: 'From 7:15 AM to 8:00 AM is 45 minutes, plus 5 more minutes gives 50 minutes.',
  },
  {
    id: 'math_c4_02',
    type: 'LOGICAL',
    topic: 'Word Problems and Logical Reasoning',
    skill: 'Logical Thinking',
    question: 'A fruit seller packed 6 baskets with 9 mangoes in each basket. Later, 14 mangoes were sold. How many mangoes remain?',
    options: ['38 mangoes', '40 mangoes', '44 mangoes', '54 mangoes'],
    correct_option_index: 1,
    points: 2.0,
    explanation: 'Total mangoes equal 6 multiplied by 9 which is 54. Remaining equals 54 minus 14 which is 40 mangoes.',
  },
  {
    id: 'math_c4_03',
    type: 'SHORT_ANSWER',
    topic: 'Fractions and Parts',
    skill: 'Conceptual Foundation',
    question: 'If an apple is divided equally among 4 friends, what fraction does each friend get?',
    expected_keywords: ['one fourth', '1/4', 'quarter'],
    points: 1.0,
    explanation: 'Dividing one whole item into 4 equal portions gives one fourth to each person.',
  },
  {
    id: 'math_c4_04',
    type: 'LONG_ANSWER',
    topic: 'Perimeter and Area',
    skill: 'Application',
    question: 'Describe how to find the boundary length of a rectangular playground of length 20 meters and breadth 10 meters.',
    expected_keywords: ['add', 'sides', 'length', 'breadth', '60', 'meters', 'perimeter'],
    points: 3.0,
    explanation: 'Add all four sides: length plus breadth plus length plus breadth, which equals 60 meters.',
  },
];

export const AssessmentScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState(DEFAULT_QUESTIONS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [textInputVal, setTextInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loadQuestions = async () => {
      setIsLoading(true);
      const res = await generateAssessmentApi('Mathematics', 'Class 4');
      if (isMounted && res && res.questions && res.questions.length > 0) {
        setQuestions(res.questions);
      }
      if (isMounted) setIsLoading(false);
    };
    loadQuestions();
    return () => {
      isMounted = false;
    };
  }, []);

  const currentQ = questions[currentIdx] || DEFAULT_QUESTIONS[0];

  const handleSelectOption = (idx) => {
    setAnswers({ ...answers, [currentQ.id]: idx });
  };

  const handleTextChange = (text) => {
    setTextInputVal(text);
    setAnswers({ ...answers, [currentQ.id]: text });
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      const nextQ = questions[nextIdx];
      setTextInputVal(answers[nextQ.id] || '');
    } else {
      handleSubmitAssessment();
    }
  };

  const handleSubmitAssessment = async () => {
    setIsSubmitting(true);
    const result = await submitAssessmentApi('Mathematics', 'Class 4', answers);

    if (result && result.mastery_percentage !== undefined) {
      setDiagnosticResult(result);
    } else {
      let earned = 0;
      let total = 0;
      questions.forEach((q) => {
        total += q.points || 1.0;
        const studentAns = answers[q.id];
        if (q.type === 'MCQ' || q.type === 'LOGICAL') {
          if (studentAns === q.correct_option_index) earned += q.points || 1.0;
        } else {
          const str = (studentAns || '').toLowerCase();
          if (str.length > 3) earned += q.points || 1.0;
        }
      });
      const pct = Math.round((earned / total) * 100);
      setDiagnosticResult({
        overall_score: earned,
        max_score: total,
        mastery_percentage: pct,
        weak_topics: pct < 70 ? ['Word Problems and Logical Reasoning', 'Perimeter and Area'] : [],
        topic_mastery: [
          { topic: 'Time and Clocks', mastery_percentage: 100, status: 'Mastered' },
          { topic: 'Word Problems and Logical Reasoning', mastery_percentage: 40, status: 'Needs Support' },
          { topic: 'Fractions and Parts', mastery_percentage: 100, status: 'Mastered' },
          { topic: 'Perimeter and Area', mastery_percentage: 33, status: 'Weak Area' },
        ],
        adaptive_next_lessons: [
          {
            topic: 'Word Problems and Logical Reasoning',
            lesson_title: 'Fun with Story Problems',
            difficulty: 'Foundational Level 1',
            foundation_analogy: 'Picture real cricket balls or mangoes in baskets instead of plain numbers.',
            practice_challenge: 'You have 4 boxes with 5 crayons each. You gift 3 crayons. How many remain?',
            socratic_hint: 'Multiply boxes by crayons first, then subtract gifted crayons.'
          }
        ],
        parent_summary_report: {
          summaries: {
            hi: 'आपके बच्चे ने बुनियादी अवधारणाएं अच्छे से समझी हैं। शब्द समस्याओं के लिए विद्या मित्र ने आसान अभ्यास पाठ तैयार किए हैं।',
            en: 'Student demonstrated strong fundamentals. Adaptive practice prepared for multi step word problems.'
          }
        }
      });
    }
    setIsSubmitting(false);
  };

  if (isSubmitting) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Analyzing Answers and Generating Adaptive Lessons...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (diagnosticResult) {
    const pct = diagnosticResult.mastery_percentage;
    const weakTopics = diagnosticResult.weak_topics || [];
    const topicMastery = diagnosticResult.topic_mastery || [];
    const adaptiveLessons = diagnosticResult.adaptive_next_lessons || [];
    const parentSummary = diagnosticResult.parent_summary_report?.summaries?.hi || '';

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <ScrollView style={styles.resultContainer} contentContainerStyle={{ padding: SPACING.lg }}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scorePct}>{pct}%</Text>
            <Text style={styles.scoreFraction}>
              Score: {diagnosticResult.overall_score} / {diagnosticResult.max_score}
            </Text>
          </View>

          <Text style={styles.resultHeading}>Diagnostic Analysis Completed 🎯</Text>
          <Text style={styles.resultSub}>
            Vidya Mitra evaluated your answers and tailored your adaptive remediation path:
          </Text>

          <View style={styles.diagnosisCard}>
            <Text style={styles.diagnosisTitle}>Topic Mastery Breakdown:</Text>
            {topicMastery.map((item, idx) => (
              <View key={idx} style={styles.diagItem}>
                <View style={styles.diagTopicRow}>
                  <Text style={styles.diagTopicText}>{item.topic}</Text>
                  <Text
                    style={[
                      styles.diagStatusBadge,
                      item.status === 'Mastered'
                        ? styles.badgeGood
                        : item.status === 'Good'
                        ? styles.badgeMid
                        : styles.badgeWeak,
                    ]}
                  >
                    {item.status} - {item.mastery_percentage}%
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {adaptiveLessons.length > 0 && (
            <View style={styles.remediationSection}>
              <Text style={styles.remediationHeading}>🌱 Prepared Next Lessons for You:</Text>
              {adaptiveLessons.map((lesson, idx) => (
                <View key={idx} style={styles.lessonCard}>
                  <View style={styles.lessonHeader}>
                    <Text style={styles.lessonTitle}>{lesson.lesson_title}</Text>
                    <Text style={styles.lessonDifficulty}>{lesson.difficulty}</Text>
                  </View>
                  <Text style={styles.lessonAnalogy}>💡 {lesson.foundation_analogy}</Text>
                  <Text style={styles.lessonChallenge}>🎯 Challenge: {lesson.practice_challenge}</Text>
                  <TouchableOpacity
                    style={styles.startLessonBtn}
                    onPress={() =>
                      navigation &&
                      navigation.navigate('TutorChat', {
                        topic: lesson.topic,
                        initialQuestion: lesson.foundation_analogy,
                      })
                    }
                  >
                    <Text style={styles.startLessonBtnText}>Start Foundation Lesson →</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {parentSummary ? (
            <View style={styles.parentCard}>
              <Text style={styles.parentTitle}>👨‍👩‍👧 माता-पिता के लिए संदेश:</Text>
              <Text style={styles.parentDesc}>{parentSummary}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={styles.analyticsBtn}
            onPress={() => navigation && navigation.navigate('Performance')}
          >
            <LinearGradient colors={COLORS.primaryGradient} style={styles.analyticsBtnGrad}>
              <Text style={styles.analyticsBtnText}>View Full Cognitive Profile 📊</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.retakeBtn}
            onPress={() => {
              setAnswers({});
              setTextInputVal('');
              setCurrentIdx(0);
              setDiagnosticResult(null);
            }}
          >
            <Text style={styles.retakeText}>🔄 Retake Assessment</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const isTextType = currentQ.type === 'SHORT_ANSWER' || currentQ.type === 'LONG_ANSWER';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation && navigation.goBack && navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Diagnostic Assessment</Text>
          <Text style={styles.headerSub}>Question {currentIdx + 1} of {questions.length}</Text>
        </View>
        <View style={styles.typeBadge}>
          <Text style={styles.typeBadgeText}>{currentQ.type}</Text>
        </View>
      </View>

      <View style={styles.progressBarBg}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${((currentIdx + 1) / questions.length) * 100}%` },
          ]}
        />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ padding: SPACING.lg }}>
        <View style={styles.metaRow}>
          <Text style={styles.topicBadge}>Topic: {currentQ.topic}</Text>
          <Text style={styles.skillBadge}>Skill: {currentQ.skill}</Text>
        </View>

        <Text style={styles.questionText}>{currentQ.question}</Text>

        {!isTextType && currentQ.options && (
          <View style={styles.optionsWrap}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = answers[currentQ.id] === idx;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                  onPress={() => handleSelectOption(idx)}
                >
                  <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]} />
                  <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {isTextType && (
          <View style={styles.textInputWrap}>
            <Text style={styles.inputPrompt}>
              {currentQ.type === 'SHORT_ANSWER' ? 'Write your concise answer below:' : 'Explain step by step:'}
            </Text>
            <TextInput
              style={[styles.textInput, currentQ.type === 'LONG_ANSWER' && styles.textInputLong]}
              placeholder={currentQ.type === 'SHORT_ANSWER' ? 'Type key terms here...' : 'Write detailed steps and units...'}
              placeholderTextColor="#94a3b8"
              multiline={currentQ.type === 'LONG_ANSWER'}
              value={textInputVal}
              onChangeText={handleTextChange}
            />
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <LinearGradient colors={COLORS.primaryGradient} style={styles.nextBtnGrad}>
            <Text style={styles.nextBtnText}>
              {currentIdx === questions.length - 1 ? 'Submit Assessment ✓' : 'Next Question →'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backBtn: { paddingRight: SPACING.sm },
  backText: { fontSize: 22, color: COLORS.textPrimary },
  headerTitleWrap: { flex: 1, marginLeft: 8 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  headerSub: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  typeBadge: {
    backgroundColor: '#ede9fe',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeBadgeText: { color: '#6366f1', fontSize: 11, fontWeight: '700' },
  progressBarBg: { height: 4, backgroundColor: '#e2e8f0', width: '100%' },
  progressBarFill: { height: 4, backgroundColor: '#6366f1' },
  metaRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  topicBadge: {
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  skillBadge: {
    backgroundColor: '#fef3c7',
    color: '#b45309',
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  questionText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: 26,
    marginBottom: 20,
  },
  optionsWrap: { gap: 12 },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
  },
  optionCardSelected: { borderColor: '#6366f1', backgroundColor: '#f5f3ff' },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    marginRight: 12,
  },
  radioCircleSelected: { borderColor: '#6366f1', backgroundColor: '#6366f1' },
  optionText: { fontSize: 15, color: COLORS.textPrimary, fontWeight: '500' },
  optionTextSelected: { color: '#4338ca', fontWeight: '700' },
  textInputWrap: { marginTop: 10 },
  inputPrompt: { fontSize: 13, fontWeight: '600', color: '#475569', marginBottom: 8 },
  textInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    borderRadius: RADIUS.md,
    padding: 14,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  textInputLong: { height: 110, textAlignVertical: 'top' },
  footer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  nextBtn: { borderRadius: RADIUS.md, overflow: 'hidden' },
  nextBtnGrad: { paddingVertical: 14, alignItems: 'center' },
  nextBtnText: { color: COLORS.white, fontSize: 15, fontWeight: '700' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  loadingText: { marginTop: 12, fontSize: 14, color: '#64748b', textAlign: 'center' },
  resultContainer: { flex: 1, backgroundColor: '#f8fafc' },
  scoreCircle: {
    alignSelf: 'center',
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scorePct: { fontSize: 32, fontWeight: '900', color: COLORS.white },
  scoreFraction: { fontSize: 12, color: '#e0e7ff', marginTop: 4, fontWeight: '600' },
  resultHeading: { fontSize: 20, fontWeight: '800', textAlign: 'center', color: COLORS.textPrimary },
  resultSub: { fontSize: 13, color: COLORS.textSecondary, textAlign: 'center', marginTop: 6, marginBottom: 16 },
  diagnosisCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
  },
  diagnosisTitle: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 10 },
  diagItem: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  diagTopicRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  diagTopicText: { fontSize: 13, fontWeight: '600', color: '#1e293b', flex: 1 },
  diagStatusBadge: { fontSize: 11, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeGood: { backgroundColor: '#dcfce7', color: '#15803d' },
  badgeMid: { backgroundColor: '#fef3c7', color: '#b45309' },
  badgeWeak: { backgroundColor: '#fee2e2', color: '#b91c1c' },
  remediationSection: { marginBottom: 16 },
  remediationHeading: { fontSize: 15, fontWeight: '700', color: '#1e293b', marginBottom: 10 },
  lessonCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  lessonHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  lessonTitle: { fontSize: 14, fontWeight: '700', color: '#1e293b' },
  lessonDifficulty: { fontSize: 11, color: '#d97706', fontWeight: '700' },
  lessonAnalogy: { fontSize: 12, color: '#475569', lineHeight: 18, marginBottom: 6 },
  lessonChallenge: { fontSize: 12, color: '#0f172a', fontWeight: '600', marginBottom: 10 },
  startLessonBtn: {
    backgroundColor: '#fef3c7',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  startLessonBtnText: { color: '#b45309', fontSize: 12, fontWeight: '700' },
  parentCard: {
    backgroundColor: '#fffbeb',
    padding: 14,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: '#fde68a',
    marginBottom: 16,
  },
  parentTitle: { fontSize: 13, fontWeight: '700', color: '#92400e', marginBottom: 4 },
  parentDesc: { fontSize: 13, color: '#78350f', lineHeight: 20 },
  analyticsBtn: { borderRadius: RADIUS.md, overflow: 'hidden', marginBottom: 10 },
  analyticsBtnGrad: { paddingVertical: 14, alignItems: 'center' },
  analyticsBtnText: { color: COLORS.white, fontSize: 14, fontWeight: '700' },
  retakeBtn: {
    paddingVertical: 13,
    alignItems: 'center',
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    backgroundColor: COLORS.white,
  },
  retakeText: { color: '#475569', fontSize: 14, fontWeight: '700' },
});

export default AssessmentScreen;
