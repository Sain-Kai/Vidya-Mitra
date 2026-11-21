import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  ScrollView, SafeAreaView, StatusBar, ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/colors';
import { solveDoubtApi, simplifyFurtherApi } from '../api/doubtSolverApi';

const SAMPLE_DOUBTS = [
  'How to add fractions like 1/2 and 1/4?',
  'Why does ice float on water instead of sinking?',
  'How do green plants prepare their food in sunlight?',
];

export const DoubtSolverScreen = ({ navigation }) => {
  const [doubtText, setDoubtText] = useState('');
  const [isSolving, setIsSolving] = useState(false);
  const [isSimplifying, setIsSimplifying] = useState(false);
  const [solution, setSolution] = useState(null);
  const [attachedImage, setAttachedImage] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleSolve = async () => {
    const query = doubtText.trim() || SAMPLE_DOUBTS[0];
    setIsSolving(true);
    setCurrentLevel(1);

    const apiResult = await solveDoubtApi(
      query,
      4,
      'Mathematics',
      1,
      attachedImage ? 'base64_crop_data' : null
    );

    if (apiResult && apiResult.step_by_step_solution) {
      setSolution(apiResult);
    } else {
      setSolution({
        question: query,
        topic: 'Fractions and Parts',
        subject: 'Mathematics',
        current_simplification_level: 1,
        level_explanation: 'Standard: Convert denominators to a common base of four, so 2/4 + 1/4 = 3/4.',
        step_by_step_solution: [
          'Step 1: Understand what fractions represent. Think of a round chapati.',
          'Step 2: One half means two equal slices out of four total slices.',
          'Step 3: One quarter means one slice out of four total slices.',
          'Step 4: Combine the slices: two slices plus one slice equals three slices out of four.',
          'Conclusion: 1/2 + 1/4 = 3/4.'
        ],
        real_world_analogy: 'If you drink half a glass of milk in the morning and a quarter glass in the evening, you drank three quarters of a glass altogether.',
        ncert_citation: 'NCERT Class 4 Mathematics, Chapter on Fractions and Decimals',
        parent_note_hindi: 'बच्चे को रटाने के बजाय रोटी के चार बराबर टुकड़े करके समझाएं। दो टुकड़े आधा बनाते हैं और एक टुकड़ा चौथाई।'
      });
    }
    setIsSolving(false);
  };

  const handleSimplifyFurther = async () => {
    if (!solution) return;
    setIsSimplifying(true);
    const nextLevel = Math.min(3, currentLevel + 1);

    const apiResult = await simplifyFurtherApi(
      solution.question,
      currentLevel,
      4
    );

    if (apiResult && apiResult.level_explanation) {
      setSolution(apiResult);
      setCurrentLevel(apiResult.current_simplification_level || nextLevel);
    } else {
      const fallbackExplanations = {
        2: 'Story: Imagine cutting a sandwich into 4 equal quarters. You take 2 pieces and your sister takes 1 piece. Together you have 3 pieces out of 4.',
        3: 'Ultra Simple: Take 4 marbles. Give 2 to one plate and 1 to another. Count them on one plate: 3 marbles out of 4.'
      };
      setSolution({
        ...solution,
        current_simplification_level: nextLevel,
        level_explanation: fallbackExplanations[nextLevel] || fallbackExplanations[2]
      });
      setCurrentLevel(nextLevel);
    }
    setIsSimplifying(false);
  };

  const handlePlayParentAudio = () => {
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
          <Text style={styles.headerTitle}>Doubt Solver and Material Explainer</Text>
          <Text style={styles.headerSub}>Upload photo, document, or ask any concept</Text>
        </View>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ padding: SPACING.lg }}>
        <View style={styles.inputCard}>
          <Text style={styles.label}>Ask your question or textbook doubt:</Text>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={4}
            placeholder="e.g. Why does ice float on water? or 1/2 + 1/4 = ?"
            placeholderTextColor="#94a3b8"
            value={doubtText}
            onChangeText={setDoubtText}
          />

          <View style={styles.quickDoubtsRow}>
            <Text style={styles.quickLabel}>Try sample doubt:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
              {SAMPLE_DOUBTS.map((sample, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.chip}
                  onPress={() => setDoubtText(sample)}
                >
                  <Text style={styles.chipText}>{sample}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.uploadRow}>
            <TouchableOpacity
              style={[styles.uploadBtn, attachedImage && styles.uploadBtnActive]}
              onPress={() => setAttachedImage(attachedImage ? null : 'simulated_camera_crop.png')}
              activeOpacity={0.8}
            >
              <Text style={styles.uploadIcon}>📷</Text>
              <Text style={styles.uploadText}>
                {attachedImage ? 'Photo Crop Attached ✓' : 'Attach Textbook Photo'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={() => setDoubtText(SAMPLE_DOUBTS[1])}
              activeOpacity={0.8}
            >
              <Text style={styles.uploadIcon}>📄</Text>
              <Text style={styles.uploadText}>Sample Study Material</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.solveBtn}
            onPress={handleSolve}
            disabled={isSolving}
            activeOpacity={0.8}
          >
            <LinearGradient colors={COLORS.primaryGradient} style={styles.solveBtnGrad}>
              {isSolving ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator size="small" color="#ffffff" />
                  <Text style={styles.solveBtnText}>Reasoning Conceptually...</Text>
                </View>
              ) : (
                <Text style={styles.solveBtnText}>Explain Deeply and Solve 🚀</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {solution && (
          <View style={styles.solutionCard}>
            <View style={styles.solutionHeader}>
              <View style={styles.badgeRow}>
                <Text style={styles.solutionBadge}>{solution.topic}</Text>
                <Text style={styles.levelBadge}>
                  Simplification Level {solution.current_simplification_level} of 3
                </Text>
              </View>
              <Text style={styles.sourceText}>{solution.ncert_citation}</Text>
            </View>

            <Text style={styles.problemTitle}>❓ Question: {solution.question}</Text>

            <View style={styles.levelExplanationCard}>
              <Text style={styles.levelExplanationTitle}>
                {solution.current_simplification_level === 1 && '💡 Standard Foundation Explanation:'}
                {solution.current_simplification_level === 2 && '🌟 Story Metaphor Explanation:'}
                {solution.current_simplification_level === 3 && '🎈 Ultra Simple Concrete Explanation:'}
              </Text>
              <Text style={styles.levelExplanationText}>{solution.level_explanation}</Text>
            </View>

            <Text style={styles.stepsTitle}>📝 Step by Step Reasoning:</Text>
            {solution.step_by_step_solution.map((step, idx) => (
              <View key={idx} style={styles.stepRow}>
                <Text style={styles.stepBullet}>•</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}

            <View style={styles.exampleCard}>
              <Text style={styles.exampleTitle}>🌱 Everyday Real World Example:</Text>
              <Text style={styles.exampleText}>{solution.real_world_analogy}</Text>
            </View>

            {solution.parent_note_hindi ? (
              <View style={styles.parentNoteCard}>
                <Text style={styles.parentNoteTitle}>👨‍👩‍👧 माता-पिता के लिए सुझाव:</Text>
                <Text style={styles.parentNoteText}>{solution.parent_note_hindi}</Text>

                <TouchableOpacity
                  style={[styles.audioBtn, isPlayingAudio && styles.audioBtnActive]}
                  onPress={handlePlayParentAudio}
                  activeOpacity={0.8}
                >
                  <Text style={styles.audioBtnText}>
                    {isPlayingAudio ? '🔊 Playing Audio Advice...' : '🔊 Listen Parent Audio'}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {solution.current_simplification_level < 3 && (
              <TouchableOpacity
                style={styles.simplifyBtn}
                onPress={handleSimplifyFurther}
                disabled={isSimplifying}
                activeOpacity={0.8}
              >
                <Text style={styles.simplifyBtnText}>
                  {isSimplifying ? 'Simplifying...' : 'Still difficult? Explain it easier 🔄'}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.askFurtherBtn}
              onPress={() =>
                navigation &&
                navigation.navigate &&
                navigation.navigate('TutorChat', {
                  topic: solution.topic,
                  initialQuestion: `Can you explain more examples of ${solution.topic}?`,
                })
              }
              activeOpacity={0.8}
            >
              <Text style={styles.askFurtherText}>Chat Socratic Tutor on this Topic →</Text>
            </TouchableOpacity>
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
  backText: { fontSize: 22, fontWeight: '700', color: COLORS.textPrimary },
  headerTitleWrap: { flex: 1 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  headerSub: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  container: { flex: 1 },
  inputCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    ...SHADOWS.soft,
    marginBottom: SPACING.md,
  },
  label: { fontSize: 13, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 8 },
  textInput: {
    backgroundColor: '#f8fafc',
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
    fontSize: 14,
    color: COLORS.textPrimary,
    minHeight: 85,
    textAlignVertical: 'top',
  },
  quickDoubtsRow: { marginTop: 10 },
  quickLabel: { fontSize: 11, color: '#64748b', fontWeight: '600', marginBottom: 6 },
  chipsScroll: { flexDirection: 'row' },
  chip: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    marginRight: 8,
  },
  chipText: { fontSize: 11, color: '#475569', fontWeight: '500' },
  uploadRow: { flexDirection: 'row', gap: 10, marginVertical: SPACING.sm },
  uploadBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    borderRadius: RADIUS.sm,
    gap: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  uploadBtnActive: {
    backgroundColor: '#ecfdf5',
    borderColor: '#10b981',
  },
  uploadIcon: { fontSize: 15 },
  uploadText: { fontSize: 11, fontWeight: '600', color: '#475569' },
  solveBtn: { borderRadius: RADIUS.sm, overflow: 'hidden', marginTop: 4 },
  solveBtnGrad: { paddingVertical: 13, alignItems: 'center' },
  loadingRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  solveBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },
  solutionCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    ...SHADOWS.medium,
    marginBottom: SPACING.xl,
  },
  solutionHeader: {
    marginBottom: SPACING.xs,
  },
  badgeRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginBottom: 4 },
  solutionBadge: {
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    fontSize: 11,
    fontWeight: '700',
  },
  levelBadge: {
    backgroundColor: '#fef3c7',
    color: '#b45309',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    fontSize: 11,
    fontWeight: '700',
  },
  sourceText: { fontSize: 11, color: '#94a3b8', fontStyle: 'italic', marginTop: 2 },
  problemTitle: { fontSize: 15, fontWeight: '800', color: COLORS.textPrimary, marginVertical: 8 },
  levelExplanationCard: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#6366f1',
    marginBottom: 10,
  },
  levelExplanationTitle: { fontSize: 12, fontWeight: '700', color: '#4338ca', marginBottom: 4 },
  levelExplanationText: { fontSize: 13, color: '#1e293b', lineHeight: 19 },
  stepsTitle: { fontSize: 13, fontWeight: '700', color: '#334155', marginTop: 6, marginBottom: 6 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', marginVertical: 3 },
  stepBullet: { color: '#6366f1', fontWeight: '800', marginRight: 8, fontSize: 15, lineHeight: 20 },
  stepText: { flex: 1, fontSize: 13, color: '#1e293b', lineHeight: 20 },
  exampleCard: {
    backgroundColor: '#f0fdf4',
    borderLeftWidth: 3,
    borderLeftColor: '#16a34a',
    padding: 12,
    borderRadius: 6,
    marginVertical: 10,
  },
  exampleTitle: { fontSize: 12, fontWeight: '700', color: '#15803d', marginBottom: 4 },
  exampleText: { fontSize: 13, color: '#14532d', lineHeight: 19 },
  parentNoteCard: {
    backgroundColor: '#fffbeb',
    borderLeftWidth: 3,
    borderLeftColor: '#f59e0b',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  parentNoteTitle: { fontSize: 12, fontWeight: '700', color: '#92400e', marginBottom: 4 },
  parentNoteText: { fontSize: 13, color: '#78350f', lineHeight: 19, marginBottom: 8 },
  audioBtn: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  audioBtnActive: { backgroundColor: '#bbf7d0', borderColor: '#86efac' },
  audioBtnText: { fontSize: 11, fontWeight: '700', color: '#92400e' },
  simplifyBtn: {
    backgroundColor: '#ede9fe',
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  simplifyBtnText: { color: '#6366f1', fontSize: 13, fontWeight: '700' },
  askFurtherBtn: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  askFurtherText: { color: '#4f46e5', fontWeight: '700', fontSize: 13 },
});

export default DoubtSolverScreen;
