import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SPACING, BORDER_RADIUS } from '../constants/theme';

export const TranslationMeaningCard = ({
  targetLangName,
  targetLangNative,
  translatedText,
  childNote,
  isTranslating,
  isPlayingAudio,
  explanationMode,
  onToggleExplanation,
  onPlayAudio,
  onAskTutor,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.icon}>📖</Text>
          <Text style={styles.title}>
            Meaning in {targetLangName} - {targetLangNative}:
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.speakButton, isPlayingAudio && styles.speakButtonActive]}
          onPress={onPlayAudio}
          activeOpacity={0.7}
        >
          <Text style={styles.speakText}>
            {isPlayingAudio ? '🔊 Playing Audio...' : '🔊 Read Aloud'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.translationText}>
          {isTranslating ? 'Translating in real time...' : translatedText}
        </Text>

        {explanationMode && childNote ? (
          <View style={styles.childNoteBox}>
            <Text style={styles.childNoteTitle}>💡 Easy Explanation for Child:</Text>
            <Text style={styles.childNoteText}>{childNote}</Text>
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.explainBtn]}
          onPress={onToggleExplanation}
          activeOpacity={0.8}
        >
          <Text style={styles.explainBtnText}>
            {explanationMode ? 'Hide Simple Story' : '🌱 Explain to Child'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.askBtn]}
          onPress={onAskTutor}
          activeOpacity={0.8}
        >
          <Text style={styles.askBtnText}>🧠 Ask Tutor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#161622',
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: '#242436',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 16,
    marginRight: 6,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#a0a0c0',
  },
  speakButton: {
    backgroundColor: '#ebf4ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  speakButtonActive: {
    backgroundColor: '#bbf7d0',
  },
  speakText: {
    color: '#4c51bf',
    fontSize: 11,
    fontWeight: '700',
  },
  contentScroll: {
    flex: 1,
    marginVertical: SPACING.xs,
  },
  translationText: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 25,
    fontWeight: '500',
  },
  childNoteBox: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#1f1b2e',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#f59e0b',
  },
  childNoteTitle: {
    color: '#fbbf24',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  childNoteText: {
    color: '#e2e8f0',
    fontSize: 13,
    lineHeight: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: SPACING.xs,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  explainBtn: {
    backgroundColor: '#27273a',
    borderWidth: 1,
    borderColor: '#383854',
  },
  explainBtnText: {
    color: '#cbd5e1',
    fontWeight: '700',
    fontSize: 13,
  },
  askBtn: {
    backgroundColor: '#667eea',
  },
  askBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
  },
});

export default TranslationMeaningCard;
