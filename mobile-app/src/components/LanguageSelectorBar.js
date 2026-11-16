import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SPACING, BORDER_RADIUS } from '../constants/theme';

export const INDIC_LANGUAGES = [
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
];

export const LanguageSelectorBar = ({ selectedCode, onSelectLanguage }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>Select Language:</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {INDIC_LANGUAGES.map(lang => {
          const isSelected = selectedCode === lang.code;
          return (
            <TouchableOpacity
              key={lang.code}
              style={[styles.langChip, isSelected && styles.langChipActive]}
              onPress={() => onSelectLanguage(lang)}
              activeOpacity={0.8}
            >
              <Text style={[styles.langNative, isSelected && styles.langNativeActive]}>
                {lang.native}
              </Text>
              <Text style={[styles.langEnglish, isSelected && styles.langEnglishActive]}>
                {lang.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#12121c',
    paddingVertical: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#242436',
  },
  sectionLabel: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: SPACING.lg,
    marginBottom: 4,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    gap: 8,
  },
  langChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: '#1e1e2d',
    borderWidth: 1,
    borderColor: '#2e2e42',
    alignItems: 'center',
    minWidth: 70,
  },
  langChipActive: {
    backgroundColor: '#667eea',
    borderColor: '#818cf8',
  },
  langNative: {
    fontSize: 13,
    fontWeight: '700',
    color: '#cbd5e1',
  },
  langNativeActive: {
    color: '#ffffff',
  },
  langEnglish: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 2,
  },
  langEnglishActive: {
    color: '#e0e7ff',
    fontWeight: '600',
  },
});

export default LanguageSelectorBar;
