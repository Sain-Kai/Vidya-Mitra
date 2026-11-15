import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  ScrollView, SafeAreaView, StatusBar, Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/colors';

export const DoubtSolverScreen = ({ navigation }) => {
  const [doubtText, setDoubtText] = useState('');
  const [isSolving, setIsSolving] = useState(false);
  const [solution, setSolution] = useState(null);
  const [attachedImage, setAttachedImage] = useState(null);

  const handleSolve = () => {
    if (!doubtText.trim() && !attachedImage) return;

    setIsSolving(true);
    setTimeout(() => {
      setSolution({
        problem: doubtText || 'Fraction addition: 1/2 + 1/4 = ?',
        stepByStep: [
          'Step 1: Understand what fractions mean. Think of a delicious round pizza!',
          'Step 2: 1/2 means half of the pizza (2 out of 4 slices).',
          'Step 3: 1/4 means 1 slice out of 4 slices.',
          'Step 4: Add them together: 2 slices + 1 slice = 3 slices out of 4.',
          'Conclusion: 1/2 + 1/4 = 2/4 + 1/4 = 3/4.',
        ],
        conceptBuildingExample:
          '💡 Real Life Example: If you drink half a glass of milk in the morning and a quarter glass in the evening, you drank 3/4 of a full glass!',
        ncertChapter: 'NCERT Class 4/5 Mathematics — Fractions & Decimals',
      });
      setIsSolving(false);
    }, 700);
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
          <Text style={styles.headerTitle}>Doubt Solver & Material Explainer</Text>
          <Text style={styles.headerSub}>Upload photo, document, or type question</Text>
        </View>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ padding: SPACING.lg }}>
        {/* Input Card */}
        <View style={styles.inputCard}>
          <Text style={styles.label}>Type your question or concept doubt:</Text>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={4}
            placeholder="e.g. Why does ice float on water? or 1/2 + 1/4 = ?"
            placeholderTextColor="#94a3b8"
            value={doubtText}
            onChangeText={setDoubtText}
          />

          <View style={styles.uploadRow}>
            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={() => setAttachedImage('simulated_question_image.jpg')}
            >
              <Text style={styles.uploadIcon}>📷</Text>
              <Text style={styles.uploadText}>{attachedImage ? 'Photo Attached ✓' : 'Take / Upload Photo'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.uploadBtn}>
              <Text style={styles.uploadIcon}>📄</Text>
              <Text style={styles.uploadText}>Upload PDF Page</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.solveBtn} onPress={handleSolve} disabled={isSolving}>
            <LinearGradient colors={COLORS.primaryGradient} style={styles.solveBtnGrad}>
              <Text style={styles.solveBtnText}>
                {isSolving ? 'Thinking & Explaining Concept...' : 'Explain Deeply & Solve 🚀'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Conceptual Solution Display */}
        {solution && (
          <View style={styles.solutionCard}>
            <View style={styles.solutionHeader}>
              <Text style={styles.solutionBadge}>Foundational Explanation</Text>
              <Text style={styles.sourceText}>{solution.ncertChapter}</Text>
            </View>

            <Text style={styles.problemTitle}>❓ Question: {solution.problem}</Text>

            <Text style={styles.stepsTitle}>📝 Step-by-Step Reasoning:</Text>
            {solution.stepByStep.map((step, idx) => (
              <View key={idx} style={styles.stepRow}>
                <Text style={styles.stepBullet}>•</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}

            <View style={styles.exampleCard}>
              <Text style={styles.exampleText}>{solution.conceptBuildingExample}</Text>
            </View>

            {/* Socratic follow up */}
            <TouchableOpacity
              style={styles.askFurtherBtn}
              onPress={() => navigation && navigation.navigate('TutorChat', { topic: solution.problem })}
            >
              <Text style={styles.askFurtherText}>Still have doubts? Chat with Vidya Mitra →</Text>
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
  backText: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  headerTitleWrap: { flex: 1 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  headerSub: { fontSize: 11, color: COLORS.textLight },

  container: { flex: 1 },
  inputCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    ...SHADOWS.soft,
    marginBottom: SPACING.lg,
  },
  label: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  textInput: {
    backgroundColor: '#f8fafc',
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
    fontSize: 14,
    color: COLORS.text,
    minHeight: 90,
    textAlignVertical: 'top',
  },
  uploadRow: { flexDirection: 'row', gap: 10, marginVertical: SPACING.md },
  uploadBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    borderRadius: RADIUS.sm,
    gap: 6,
  },
  uploadIcon: { fontSize: 16 },
  uploadText: { fontSize: 12, fontWeight: '600', color: '#475569' },
  solveBtn: { borderRadius: RADIUS.sm, overflow: 'hidden', marginTop: 4 },
  solveBtnGrad: { paddingVertical: 13, alignItems: 'center' },
  solveBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },

  solutionCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    ...SHADOWS.medium,
  },
  solutionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  solutionBadge: {
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    fontSize: 11,
    fontWeight: '700',
  },
  sourceText: { fontSize: 10, color: '#94a3b8' },
  problemTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginVertical: 8 },
  stepsTitle: { fontSize: 13, fontWeight: '700', color: '#334155', marginTop: 8, marginBottom: 6 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', marginVertical: 3 },
  stepBullet: { color: '#667eea', fontWeight: '800', marginRight: 8, fontSize: 16, lineHeight: 20 },
  stepText: { flex: 1, fontSize: 13, color: '#1e293b', lineHeight: 20 },
  exampleCard: {
    backgroundColor: '#f0fdf4',
    borderLeftWidth: 3,
    borderLeftColor: '#16a34a',
    padding: SPACING.md,
    borderRadius: 6,
    marginVertical: SPACING.md,
  },
  exampleText: { fontSize: 13, color: '#14532d', lineHeight: 19 },
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
