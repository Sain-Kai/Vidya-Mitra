import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  FlatList, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/colors';

export const TutorChatScreen = ({ navigation, route }) => {
  const initialTopic = route?.params?.topic || 'Photosynthesis';
  const initialLang = route?.params?.lang?.code || 'hi';

  const [inputMessage, setInputMessage] = useState('');
  const [simplificationLevel, setSimplificationLevel] = useState(1);
  const [activeCheckpoint, setActiveCheckpoint] = useState(null);

  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'tutor',
      text: 'नमस्ते! मैं तुम्हारा विद्या मित्र हूँ 🌟 आज हम क्या समझना चाहते हैं?',
      citations: [],
    },
    {
      id: '2',
      sender: 'tutor',
      text: `चलो "${initialTopic}" को बिल्कुल सरल तरीके से समझते हैं।`,
      level: 1,
      citations: ['NCERT Class 4 Science Ch. 1'],
      checkpoint: {
        id: 'cp_1',
        question: 'पौधे अपना खाना बनाने के लिए क्या इस्तेमाल करते हैं?',
        options: ['सिर्फ पानी', 'धूप, पानी और हवा (CO2)', 'चॉकलेट और दूध', 'सिर्फ मिट्टी'],
        correctIndex: 1,
        answered: false,
        userSelection: null,
      },
    },
  ]);

  const flatListRef = useRef(null);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'student',
      text: inputMessage.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    // Socratic response simulation
    setTimeout(() => {
      const tutorReply = {
        id: (Date.now() + 1).toString(),
        sender: 'tutor',
        text: 'बहुत अच्छा सवाल! सोचो अगर सूरज न निकले तो पेड़-पौधों को क्या परेशानी होगी?',
        level: simplificationLevel,
        citations: ['NCERT Class 4 Science Ch. 1, p. 8'],
      };
      setMessages((prev) => [...prev, tutorReply]);
    }, 600);
  };

  // Progressive simplification (Requirement #5: "everytime student does not understand, makes explanation easier & easier")
  const handleSimplifyFurther = () => {
    const nextLevel = simplificationLevel + 1;
    setSimplificationLevel(nextLevel);

    let simplerExplanation = '';
    if (nextLevel === 2) {
      simplerExplanation =
        '🌱 [स्तर २ — कहानी से समझो]: मान लो पौधा एक छोटा सा रसोइया (Chef) है। उसकी हरी पत्तियां उसका किचन हैं। जब सूरज अपनी रोशनी देता है और जड़ें जमीन से पानी खींचती हैं, तो पत्तियां खाना तैयार करती हैं!';
    } else {
      simplerExplanation =
        '🍎 [स्तर ३ — बिल्कुल आसान]: जैसे तुम्हें खेलने के लिए रोटी और फल चाहिए, वैसे ही पौधे को बढ़ने के लिए धूप और पानी चाहिए। जब वो धूप से ताकत लेता है, उसी को Photosynthesis कहते हैं। बिल्कुल आसान ना?';
    }

    const simplifiedMsg = {
      id: Date.now().toString(),
      sender: 'tutor',
      text: simplerExplanation,
      level: nextLevel,
      citations: ['Foundational Pedagogy Model'],
    };

    setMessages((prev) => [...prev, simplifiedMsg]);
  };

  const handleAnswerCheckpoint = (msgId, optionIndex) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === msgId && msg.checkpoint) {
          const isCorrect = optionIndex === msg.checkpoint.correctIndex;
          return {
            ...msg,
            checkpoint: {
              ...msg.checkpoint,
              answered: true,
              userSelection: optionIndex,
              isCorrect,
            },
          };
        }
        return msg;
      })
    );
  };

  const renderMessageItem = ({ item }) => {
    const isTutor = item.sender === 'tutor';

    return (
      <View style={[styles.msgRow, isTutor ? styles.tutorRow : styles.studentRow]}>
        {isTutor && (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>🤖</Text>
          </View>
        )}
        <View style={[styles.bubble, isTutor ? styles.tutorBubble : styles.studentBubble]}>
          <Text style={[styles.msgText, isTutor ? styles.tutorText : styles.studentText]}>
            {item.text}
          </Text>

          {item.citations && item.citations.length > 0 && (
            <View style={styles.citationBadge}>
              <Text style={styles.citationText}>📖 स्रोत: {item.citations.join(', ')}</Text>
            </View>
          )}

          {/* In-lesson micro-questioning stop / checkpoint (Requirement #6) */}
          {item.checkpoint && (
            <View style={styles.checkpointCard}>
              <View style={styles.checkpointHeader}>
                <Text style={styles.checkpointTag}>🛑 Quick Recall Stop</Text>
              </View>
              <Text style={styles.checkpointQ}>{item.checkpoint.question}</Text>
              {item.checkpoint.options.map((opt, idx) => {
                const isSelected = item.checkpoint.userSelection === idx;
                const isAnswered = item.checkpoint.answered;
                const isCorrect = idx === item.checkpoint.correctIndex;

                let optStyle = styles.optButton;
                if (isAnswered) {
                  if (isCorrect) optStyle = [styles.optButton, styles.optCorrect];
                  else if (isSelected && !isCorrect) optStyle = [styles.optButton, styles.optWrong];
                }

                return (
                  <TouchableOpacity
                    key={idx}
                    disabled={isAnswered}
                    style={optStyle}
                    onPress={() => handleAnswerCheckpoint(item.id, idx)}
                  >
                    <Text style={styles.optLetter}>{String.fromCharCode(65 + idx)}.</Text>
                    <Text style={styles.optText}>{opt}</Text>
                    {isAnswered && isCorrect && <Text style={styles.checkMark}>✓</Text>}
                  </TouchableOpacity>
                );
              })}
              {item.checkpoint.answered && (
                <Text style={item.checkpoint.isCorrect ? styles.feedbackGood : styles.feedbackHelp}>
                  {item.checkpoint.isCorrect
                    ? '🎉 शाबाश! बिल्कुल सही उत्तर।'
                    : '💡 कोई बात नहीं! एक बार फिर समझते हैं।'}
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation && navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.tutorName}>Vidya Mitra Socratic Tutor</Text>
          <Text style={styles.tutorStatus}>🟢 Active • Zero Judgement • Step-by-Step</Text>
        </View>
        <TouchableOpacity
          style={styles.simplifyHeaderBtn}
          onPress={handleSimplifyFurther}
        >
          <Text style={styles.simplifyBtnText}>🌱 Even Simpler</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Progressive Simplification Indicator Banner */}
      <View style={styles.levelBanner}>
        <Text style={styles.levelBannerText}>
          Difficulty Level: {simplificationLevel === 1 ? 'Standard' : simplificationLevel === 2 ? 'Story Analogy' : 'Concrete Micro-Steps'}
        </Text>
        <TouchableOpacity onPress={handleSimplifyFurther}>
          <Text style={styles.levelBannerAction}>Didn't understand? Tap here 🔄</Text>
        </TouchableOpacity>
      </View>

      {/* Input Toolbar */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.voiceBtn}>
            <Text style={styles.voiceIcon}>🎙️</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Ask your doubt without hesitation..."
            placeholderTextColor="#9ca3af"
            value={inputMessage}
            onChangeText={setInputMessage}
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage}>
            <LinearGradient colors={COLORS.primaryGradient} style={styles.sendBtnGradient}>
              <Text style={styles.sendIcon}>➤</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    ...SHADOWS.soft,
  },
  backBtn: { padding: 8, marginRight: 4 },
  backText: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  headerTitleWrap: { flex: 1 },
  tutorName: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  tutorStatus: { fontSize: 11, color: '#16a34a', marginTop: 1 },
  simplifyHeaderBtn: {
    backgroundColor: '#ecfdf5',
    borderColor: '#10b981',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  simplifyBtnText: { color: '#047857', fontSize: 11, fontWeight: '700' },

  messageList: { padding: SPACING.md, gap: 12 },
  msgRow: { flexDirection: 'row', marginVertical: 4 },
  tutorRow: { justifyContent: 'flex-start' },
  studentRow: { justifyContent: 'flex-end' },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#ede9fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: { fontSize: 18 },
  bubble: { maxWidth: '82%', borderRadius: RADIUS.md, padding: SPACING.md },
  tutorBubble: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 2,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    ...SHADOWS.soft,
  },
  studentBubble: {
    backgroundColor: '#667eea',
    borderTopRightRadius: 2,
  },
  msgText: { fontSize: 14, lineHeight: 21 },
  tutorText: { color: COLORS.text },
  studentText: { color: COLORS.white, fontWeight: '500' },

  citationBadge: {
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  citationText: { fontSize: 11, color: '#64748b', fontStyle: 'italic' },

  checkpointCard: {
    marginTop: 10,
    backgroundColor: '#fffbeb',
    borderColor: '#fde68a',
    borderWidth: 1,
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
  },
  checkpointHeader: { marginBottom: 4 },
  checkpointTag: { fontSize: 11, fontWeight: '700', color: '#b45309' },
  checkpointQ: { fontSize: 13, fontWeight: '600', color: '#92400e', marginBottom: 8 },
  optButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#fcd34d',
    marginBottom: 6,
  },
  optCorrect: { backgroundColor: '#dcfce7', borderColor: '#22c55e' },
  optWrong: { backgroundColor: '#fee2e2', borderColor: '#ef4444' },
  optLetter: { fontSize: 12, fontWeight: '700', color: '#78350f', marginRight: 6 },
  optText: { fontSize: 12, color: '#1f2937', flex: 1 },
  checkMark: { color: '#16a34a', fontWeight: '800', marginLeft: 6 },
  feedbackGood: { fontSize: 12, fontWeight: '700', color: '#15803d', marginTop: 4 },
  feedbackHelp: { fontSize: 12, fontWeight: '700', color: '#b91c1c', marginTop: 4 },

  levelBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: '#dbeafe',
  },
  levelBannerText: { fontSize: 11, color: '#1d4ed8', fontWeight: '600' },
  levelBannerAction: { fontSize: 11, color: '#2563eb', fontWeight: '700', textDecorationLine: 'underline' },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    gap: 8,
  },
  voiceBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceIcon: { fontSize: 20 },
  input: {
    flex: 1,
    height: 42,
    backgroundColor: '#f8fafc',
    borderRadius: 21,
    paddingHorizontal: 16,
    fontSize: 14,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  sendBtn: { width: 42, height: 42, borderRadius: 21, overflow: 'hidden' },
  sendBtnGradient: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' },
  sendIcon: { color: COLORS.white, fontSize: 18, fontWeight: '700' },
});

export default TutorChatScreen;
