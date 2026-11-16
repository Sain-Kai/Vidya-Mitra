import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
  ScrollView, SafeAreaView, StatusBar
} from 'react-native';
import { COLORS, SPACING } from '../constants/colors';
import { translateTextApi } from '../api/translationApi';
import {
  LanguageSelectorBar,
  INDIC_LANGUAGES,
  CameraReticle,
  TranslationMeaningCard
} from '../components';

const PRESET_TEXTBOOK_PASSAGES = [
  {
    id: 'p1',
    label: 'Photosynthesis',
    text: 'Plants make their food using sunlight, water, and carbon dioxide through a process called photosynthesis.',
  },
  {
    id: 'p2',
    label: 'Water Cycle',
    text: 'The water cycle moves water continuously between earth and sky through evaporation, condensation, and rain.',
  },
  {
    id: 'p3',
    label: 'Fractions',
    text: 'A fraction represents a part of a whole quantity, divided into equal portions like half and quarter.',
  },
];

const LOCAL_FALLBACK_TRANSLATIONS = {
  photosynthesis: {
    hi: {
      text: 'पौधे प्रकाश संश्लेषण नामक प्रक्रिया द्वारा धूप, पानी और कार्बन डाइऑक्साइड से अपना भोजन बनाते हैं।',
      note: 'जैसे घर में रसोई होती है, वैसे ही हरी पत्तियां धूप और पानी मिलाकर पौधे का भोजन पकाती हैं।',
    },
    bn: {
      text: 'গাছপালা সূর্যালোক, জল এবং কার্বন ডাই অক্সাইড ব্যবহার করে সালোকসংশ্লেষ নামক প্রক্রিয়ার মাধ্যমে তাদের খাদ্য তৈরি করে।',
      note: 'রান্নাঘরের মতো গাছের সবুজ পাতা রোদ আর জল মিশিয়ে গাছের জন্য খাবার তৈরি করে।',
    },
    te: {
      text: 'మొక్కలు సూర్యరశ్మి, నీరు మరియు కార్బన్ డయాక్సైడ్ ఉపయోగించి కిరణజన్య సంయోగక్రియ అనే ప్రక్రియ ద్వారా తమ ఆహారాన్ని తయారు చేసుకుంటాయి.',
      note: 'వంటింట్లో వంట చేసినట్లే, ఆకులు ఎండ మరియు నీటితో మొక్కకు అవసరమైన ఆహారాన్ని తయారు చేస్తాయి.',
    },
    ta: {
      text: 'தாவரங்கள் சூரிய ஒளி, நீர் மற்றும் கார்பன் டை ஆக்சைடைப் பயன்படுத்தி ஒளிச்சேர்க்கை எனப்படும் செயல்முறை மூலம் தங்களின் உணவை உருவாக்குகின்றன.',
      note: 'அம்மா சமையலறையில் உணவு சமைப்பது போல, மரத்தின் பச்சை இலைகள் சூரிய ஒளியால் உணவு தயாரிக்கின்றன.',
    },
    mr: {
      text: 'वनस्पती सूर्यप्रकाश, पाणी आणि कार्बन डायऑक्साइडचा वापर करून प्रकाशसंश्लेषण नावाच्या प्रक्रियेद्वारे स्वतःचे अन्न तयार करतात.',
      note: 'स्वयंपाकघरासारखे झाडांची पाने सूर्यप्रकाश आणि पाण्याने झाडासाठी गोड अन्न शिजवतात.',
    },
    gu: {
      text: 'વનસ્પતિઓ સૂર્યપ્રકાશ, પાણી અને કાર્બન ડાયોક્સાઇડનો ઉપયોગ કરીને પ્રકાશસંશ્લેષણ નામની પ્રક્રિયા દ્વારા પોતાનો ખોરાક બનાવે છે.',
      note: 'રસોડાની જેમ છોડના પાંદડા સૂર્યપ્રકાશ અને પાણીથી પોતાનો ખોરાક તૈયાર કરે છે.',
    },
    kn: {
      text: 'ಸಸ್ಯಗಳು ಸೂರ್ಯನ ಬೆಳಕು, ನೀರು ಮತ್ತು ಇಂಗಾಲದ ಡೈಆಕ್ಸೈಡ್ ಬಳಸಿ ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ ಎಂಬ ಪ್ರಕ್ರಿಯೆಯ ಮೂಲಕ ತಮ್ಮ ಆಹಾರವನ್ನು ತಯಾರಿಸುತ್ತವೆ.',
      note: 'ಮನೆಯಲ್ಲಿ ಅಡುಗೆ ಮಾಡುವಂತೆ, ಎಲೆಗಳು ಬಿಸಿಲು ಮತ್ತು ನೀರಿನಿಂದ ಗಿಡಕ್ಕೆ ಊಟ ತಯಾರು ಮಾಡುತ್ತವೆ.',
    },
    ml: {
      text: 'സസ്യങ്ങൾ സൂര്യപ്രകാശം, ജലം, കാർബൺ ഡൈ ഓക്സൈഡ് എന്നിവ ഉപയോഗിച്ച് പ്രകാശസംശ്ലേഷണം എന്ന പ്രക്രിയയിലൂടെ ഭക്ഷണം ഉണ്ടാക്കുന്നു.',
      note: 'അടുക്കളയിൽ ഭക്ഷണം പാകം ചെയ്യുന്നത് പോലെ, ചെടിയുടെ പച്ച ഇലകൾ വെയിലും വെള്ളവും ചേർത്ത് ഭക്ഷണം ഉണ്ടാക്കുന്നു.',
    },
    pa: {
      text: 'ਪੌਦੇ ਸੂਰਜ ਦੀ ਰੌਸ਼ਨੀ, ਪਾਣੀ ਅਤੇ ਕਾਰਬਨ ਡਾਈਆਕਸਾਈਡ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਪ੍ਰਕਾਸ਼ ਸੰਸਲੇਸ਼ਣ ਰਾਹੀਂ ਆਪਣਾ ਭੋਜਨ ਬਣਾਉਂਦੇ ਹਨ।',
      note: 'ਜਿਵੇਂ ਰਸੋਈ ਵਿਚ ਖਾਣਾ ਪੱਕਦਾ ਹੈ, ਉਵੇਂ ਹੀ ਹਰੇ ਪੱਤੇ ਧੁੱਪ ਅਤੇ ਪਾਣੀ ਨਾਲ ਪੌਦੇ ਦੀ ਰੋਟੀ ਬਣਾਉਂਦੇ ਹਨ।',
    },
    or: {
      text: 'ଉଦ୍ଭିଦମାନେ ସୂର୍ଯ୍ୟାଲୋକ, ଜଳ ଏବଂ ଅଙ୍ଗାରକାମ୍ଳ ବ୍ୟବହାର କରି ଆଲୋକଶ୍ଳେଷଣ ପ୍ରକ୍ରିୟା ମାଧ୍ୟମରେ ନିଜ ଖାଦ୍ୟ ପ୍ରସ୍ତୁତ କରନ୍ତି।',
      note: 'ରୋଷେଇ ଘର ପରି ଗଛର ସବୁଜ ପତ୍ର ଖରା ଏବଂ ପାଣି ମିଶାଇ ନିଜ ପାଇଁ ମିଠା ଖାଦ୍ୟ ତିଆରି କରେ।',
    },
  },
  water_cycle: {
    hi: {
      text: 'जल चक्र वाष्पीकरण, संघनन और वर्षा के माध्यम से पृथ्वी और आकाश के बीच पानी को लगातार घुमाता है।',
      note: 'नदी का पानी भाप बनकर बादल बनता है और फिर बारिश बनकर वापस आ जाता है।',
    },
    bn: {
      text: 'জলচক্র বাষ্পীভবন, ঘনীভবন এবং বৃষ্টির মাধ্যমে পৃথিবী এবং আকাশের মধ্যে জলকে ক্রমাগত সঞ্চালিত করে।',
      note: 'নদীর জল বাষ্প হয়ে আকাশে মেঘ হয়, তারপর আবার বৃষ্টি হয়ে মাটিতে ফিরে আসে।',
    },
  },
  fractions: {
    hi: {
      text: 'भिन्न किसी पूर्ण वस्तु के एक भाग को दर्शाता है, जैसे बराबर हिस्सों में बांटा गया आधा या चौथाई हिस्सा।',
      note: 'एक पूरी रोटी के दो टुकड़े करो, तो हर टुकड़ा आधा भिन्न कहलाता है।',
    },
    bn: {
      text: 'ভগ্নাংশ একটি সম্পূর্ণ জিনিসের অংশ প্রকাশ করে, যেমন সমান ভাগে ভাগ করা অর্ধেক বা এক চতুর্থাংশ।',
      note: 'একটি রুটি সমান দুই ভাগ করলে প্রতিটি অংশকে অর্ধেক ভগ্নাংশ বলে।',
    },
  },
};

export const LiveTranslateScreen = ({ navigation }) => {
  const [targetLang, setTargetLang] = useState(INDIC_LANGUAGES[0]);
  const [selectedPassage, setSelectedPassage] = useState(PRESET_TEXTBOOK_PASSAGES[0]);
  const [translatedText, setTranslatedText] = useState(
    LOCAL_FALLBACK_TRANSLATIONS.photosynthesis.hi.text
  );
  const [childNote, setChildNote] = useState(
    LOCAL_FALLBACK_TRANSLATIONS.photosynthesis.hi.note
  );
  const [isTranslating, setIsTranslating] = useState(false);
  const [explanationMode, setExplanationMode] = useState(false);
  const [selectionMode, setSelectionMode] = useState('paragraph');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const performLiveTranslation = async () => {
      setIsTranslating(true);
      try {
        const apiResponse = await translateTextApi(
          selectedPassage.text,
          targetLang.code,
          'en'
        );

        if (!isMounted) return;

        if (apiResponse && apiResponse.translated_text) {
          setTranslatedText(apiResponse.translated_text);
          setChildNote(apiResponse.child_friendly_explanation || '');
        } else {
          resolveLocalFallback();
        }
      } catch (err) {
        if (isMounted) resolveLocalFallback();
      } finally {
        if (isMounted) setIsTranslating(false);
      }
    };

    const resolveLocalFallback = () => {
      let topicKey = 'photosynthesis';
      if (selectedPassage.id === 'p2') topicKey = 'water_cycle';
      if (selectedPassage.id === 'p3') topicKey = 'fractions';

      const topicDict = LOCAL_FALLBACK_TRANSLATIONS[topicKey];
      if (topicDict && topicDict[targetLang.code]) {
        setTranslatedText(topicDict[targetLang.code].text);
        setChildNote(topicDict[targetLang.code].note);
      } else {
        setTranslatedText(`${targetLang.name} Translation: ${selectedPassage.text}`);
        setChildNote(`सरल अर्थ: ${selectedPassage.text}`);
      }
    };

    performLiveTranslation();

    return () => {
      isMounted = false;
    };
  }, [targetLang, selectedPassage]);

  const handleAudioPlayback = () => {
    setIsPlayingAudio(true);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 2000);
  };

  const handleAskTutor = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('TutorChat', {
        topic: selectedPassage.label,
        initialQuestion: `Can you explain ${selectedPassage.label} with real world examples?`,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0e0e17" />

      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation && navigation.goBack && navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.titleArea}>
          <Text style={styles.screenTitle}>Live Indic Lens</Text>
          <Text style={styles.screenSub}>Real-Time Camera Translation</Text>
        </View>
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.badgeText}>LIVE</Text>
        </View>
      </View>

      <View style={styles.passageSelectorRow}>
        <Text style={styles.selectorLabel}>Sample Textbook Passage:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.passageScroll}
        >
          {PRESET_TEXTBOOK_PASSAGES.map(item => {
            const isSelected = selectedPassage.id === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.passageChip, isSelected && styles.passageChipActive]}
                onPress={() => setSelectedPassage(item)}
              >
                <Text
                  style={[
                    styles.passageChipText,
                    isSelected && styles.passageChipTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <CameraReticle
        selectionMode={selectionMode}
        onToggleMode={mode => setSelectionMode(mode)}
        samplePassageText={selectedPassage.text}
      />

      <LanguageSelectorBar
        selectedCode={targetLang.code}
        onSelectLanguage={lang => setTargetLang(lang)}
      />

      <TranslationMeaningCard
        targetLangName={targetLang.name}
        targetLangNative={targetLang.native}
        translatedText={translatedText}
        childNote={childNote}
        isTranslating={isTranslating}
        isPlayingAudio={isPlayingAudio}
        explanationMode={explanationMode}
        onToggleExplanation={() => setExplanationMode(!explanationMode)}
        onPlayAudio={handleAudioPlayback}
        onAskTutor={handleAskTutor}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e17',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: '#12121c',
    borderBottomWidth: 1,
    borderBottomColor: '#20202e',
  },
  backBtn: {
    paddingRight: SPACING.sm,
  },
  backArrow: {
    fontSize: 22,
    color: '#ffffff',
  },
  titleArea: {
    flex: 1,
    marginLeft: 8,
  },
  screenTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#ffffff',
  },
  screenSub: {
    fontSize: 11,
    color: '#818cf8',
    marginTop: 1,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
  },
  badgeText: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '700',
  },
  passageSelectorRow: {
    backgroundColor: '#161622',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#242436',
  },
  selectorLabel: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: SPACING.lg,
    marginBottom: 4,
  },
  passageScroll: {
    paddingHorizontal: SPACING.lg,
    gap: 8,
  },
  passageChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    backgroundColor: '#232338',
  },
  passageChipActive: {
    backgroundColor: '#4338ca',
  },
  passageChipText: {
    color: '#cbd5e1',
    fontSize: 11,
    fontWeight: '600',
  },
  passageChipTextActive: {
    color: '#ffffff',
  },
});

export default LiveTranslateScreen;
