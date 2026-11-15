import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
  ScrollView, SafeAreaView, StatusBar, Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/colors';

const { width } = Dimensions.get('window');

const SUPPORTED_LANGUAGES = [
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

export const LiveTranslateScreen = ({ navigation }) => {
  const [targetLang, setTargetLang] = useState(SUPPORTED_LANGUAGES[0]);
  const [selectedText, setSelectedText] = useState(
    'Plants make their food using sunlight, water, and carbon dioxide through a process called photosynthesis.'
  );
  const [translatedText, setTranslatedText] = useState(
    'पौधे प्रकाश संश्लेषण नामक एक प्रक्रिया के माध्यम से धूप, पानी और कार्बन डाइऑक्साइड का उपयोग करके अपना भोजन बनाते हैं।'
  );
  const [isTranslating, setIsTranslating] = useState(false);
  const [explanationMode, setExplanationMode] = useState(false);

  const handleTranslate = (text, lang) => {
    setIsTranslating(true);
    // Real-time on-device translation simulation / IndicTrans2 integration hook
    setTimeout(() => {
      if (lang.code === 'hi') {
        setTranslatedText(
          'पौधे प्रकाश संश्लेषण (Photosynthesis) के माध्यम से धूप, पानी और हवा से अपना भोजन बनाते हैं।'
        );
      } else if (lang.code === 'bn') {
        setTranslatedText(
          'গাছপালা সূর্যালোক, জল এবং কার্বন ডাই অক্সাইড ব্যবহার করে সালোকসংশ্লেষ নামক প্রক্রিয়ার মাধ্যমে তাদের খাদ্য তৈরি করে।'
        );
      } else if (lang.code === 'te') {
        setTranslatedText(
          'మొక్కలు సూర్యరశ్మి, నీరు మరియు కార్బన్ డయాక్సైడ్ ఉపయోగించి కిరణజన్య సంయోగక్రియ అనే ప్రక్రియ ద్వారా ఆహారాన్ని తయారు చేసుకుంటాయి.'
        );
      } else if (lang.code === 'ta') {
        setTranslatedText(
          'தாவரங்கள் சூரிய ஒளி, நீர் மற்றும் கார்பன் டை ஆக்சைடைப் பயன்படுத்தி ஒளிச்சேர்க்கை எனப்படும் செயல்முறை மூலம் தங்களின் உணவை உருவாக்குகின்றன.'
        );
      } else {
        setTranslatedText(`[${lang.name}] ${text}`);
      }
      setIsTranslating(false);
    }, 400);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1e1e2d" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation && navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Live Camera Translation</Text>
          <Text style={styles.headerSub}>Point camera at textbook line • On-Device</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>⚡ Realtime</Text>
        </View>
      </View>

      {/* Camera Viewfinder Simulation / Feed */}
      <View style={styles.viewfinderContainer}>
        <View style={styles.viewfinder}>
          {/* Target Reticle / Selection Box */}
          <View style={styles.selectionBox}>
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />

            <View style={styles.scannedLine}>
              <Text style={styles.scannedText}>
                {selectedText}
              </Text>
            </View>
          </View>
          <Text style={styles.hintText}>📸 Position textbook text within the frame</Text>
        </View>
      </View>

      {/* Language Selector Bar */}
      <View style={styles.langSelectorWrap}>
        <Text style={styles.langLabel}>Translate into:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.langScroll}>
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = lang.code === targetLang.code;
            return (
              <TouchableOpacity
                key={lang.code}
                style={[styles.langChip, isSelected && styles.langChipActive]}
                onPress={() => {
                  setTargetLang(lang);
                  handleTranslate(selectedText, lang);
                }}
              >
                <Text style={[styles.langChipNative, isSelected && styles.langChipTextActive]}>
                  {lang.native}
                </Text>
                <Text style={[styles.langChipText, isSelected && styles.langChipTextActive]}>
                  {lang.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Bottom Translation Display Box (Requirement #1) */}
      <View style={styles.bottomCard}>
        <View style={styles.bottomCardHeader}>
          <View style={styles.outputTitleRow}>
            <Text style={styles.outputIcon}>📖</Text>
            <Text style={styles.outputTitle}>Meaning ({targetLang.name} / {targetLang.native}):</Text>
          </View>
          <TouchableOpacity
            style={styles.speakButton}
            onPress={() => {
              // Trigger TTS in chosen language
            }}
          >
            <Text style={styles.speakText}>🔊 Read Aloud</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.translationScrollView}>
          <Text style={styles.translationText}>
            {isTranslating ? 'Translating in real-time...' : translatedText}
          </Text>

          {explanationMode && (
            <View style={styles.simpleExplanationCard}>
              <Text style={styles.simpleTitle}>💡 Easy Explanation for Child:</Text>
              <Text style={styles.simpleText}>
                जैसे हम रसोई में गैस और बर्तनों से खाना पकाते हैं, वैसे ही पौधा अपनी हरी पत्तियों को रसोई बनाकर सूरज की धूप और पानी से अपना खाना खुद पकाता है!
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Action Buttons: Explain Simply & Ask Tutor */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.explainBtn]}
            onPress={() => setExplanationMode(!explanationMode)}
          >
            <Text style={styles.explainBtnText}>
              {explanationMode ? 'Hide Simple Note' : '🌱 Explain in Easy Words'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.tutorBtn]}
            onPress={() => navigation && navigation.navigate('TutorChat', { topic: selectedText, lang: targetLang })}
          >
            <LinearGradient colors={COLORS.primaryGradient} style={styles.tutorBtnGradient}>
              <Text style={styles.tutorBtnText}>Ask Vidya Mitra 🤖</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#181824' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#2b2b3d',
  },
  backButton: { padding: SPACING.xs, marginRight: SPACING.sm },
  backButtonText: { color: COLORS.white, fontSize: 24, fontWeight: '700' },
  headerTitleWrap: { flex: 1 },
  headerTitle: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  headerSub: { color: '#9090aa', fontSize: 11, marginTop: 2 },
  badge: {
    backgroundColor: '#10b98122',
    borderColor: '#10b981',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeText: { color: '#10b981', fontSize: 11, fontWeight: '700' },

  viewfinderContainer: {
    height: 220,
    backgroundColor: '#0a0a10',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  viewfinder: {
    width: width - 40,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionBox: {
    width: '100%',
    height: 120,
    borderColor: 'rgba(102, 126, 234, 0.6)',
    borderWidth: 1.5,
    borderRadius: 8,
    backgroundColor: 'rgba(102, 126, 234, 0.08)',
    justifyContent: 'center',
    padding: SPACING.md,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderColor: '#667eea',
  },
  cornerTL: { top: -2, left: -2, borderTopWidth: 3, borderLeftWidth: 3 },
  cornerTR: { top: -2, right: -2, borderTopWidth: 3, borderRightWidth: 3 },
  cornerBL: { bottom: -2, left: -2, borderBottomWidth: 3, borderLeftWidth: 3 },
  cornerBR: { bottom: -2, right: -2, borderBottomWidth: 3, borderRightWidth: 3 },
  scannedLine: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    padding: SPACING.sm,
    borderRadius: 4,
  },
  scannedText: {
    color: '#111827',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  hintText: {
    color: '#a0a0b8',
    fontSize: 11,
    marginTop: 8,
  },

  langSelectorWrap: {
    paddingVertical: SPACING.sm,
    backgroundColor: '#1e1e2e',
    borderBottomWidth: 1,
    borderBottomColor: '#2b2b3d',
  },
  langLabel: {
    color: '#d0d0e0',
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: SPACING.lg,
    marginBottom: 6,
  },
  langScroll: {
    paddingHorizontal: SPACING.lg,
    gap: 8,
  },
  langChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.md,
    backgroundColor: '#29293d',
    borderWidth: 1,
    borderColor: '#3a3a52',
    alignItems: 'center',
  },
  langChipActive: {
    backgroundColor: '#667eea',
    borderColor: '#764ba2',
  },
  langChipNative: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  langChipText: {
    color: '#a0a0b8',
    fontSize: 10,
    marginTop: 1,
  },
  langChipTextActive: {
    color: '#ffffff',
  },

  bottomCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.medium,
  },
  bottomCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  outputTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  outputIcon: { fontSize: 16 },
  outputTitle: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  speakButton: {
    backgroundColor: '#f0f2fe',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  speakText: { color: '#4c51bf', fontSize: 11, fontWeight: '700' },
  translationScrollView: { flex: 1, marginVertical: SPACING.xs },
  translationText: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text,
    fontWeight: '500',
  },
  simpleExplanationCard: {
    marginTop: SPACING.md,
    backgroundColor: '#f0fdf4',
    borderLeftWidth: 3,
    borderLeftColor: '#22c55e',
    padding: SPACING.md,
    borderRadius: RADIUS.sm,
  },
  simpleTitle: { fontSize: 12, fontWeight: '700', color: '#166534', marginBottom: 4 },
  simpleText: { fontSize: 13, color: '#14532d', lineHeight: 19 },

  actionRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.sm,
  },
  actionBtn: { flex: 1, borderRadius: RADIUS.md, overflow: 'hidden' },
  explainBtn: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  explainBtnText: { color: COLORS.text, fontSize: 13, fontWeight: '700' },
  tutorBtn: { borderRadius: RADIUS.md },
  tutorBtnGradient: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tutorBtnText: { color: COLORS.white, fontSize: 13, fontWeight: '700' },
});

export default LiveTranslateScreen;
