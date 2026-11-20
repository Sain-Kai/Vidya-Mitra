import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SPACING, BORDER_RADIUS } from '../constants/theme';

export const ExamCountdownBanner = ({
  examTitle,
  daysRemaining,
  examDate,
  parentReminder,
  onPlayReminderAudio,
  isPlayingAudio,
}) => {
  const isUrgent = daysRemaining <= 3;

  return (
    <View style={styles.bannerContainer}>
      <View style={styles.topRow}>
        <View style={styles.titleArea}>
          <Text style={styles.examTitle}>{examTitle}</Text>
          <Text style={styles.examDate}>Exam Date: {examDate}</Text>
        </View>

        <View style={[styles.countdownBadge, isUrgent && styles.countdownBadgeUrgent]}>
          <Text style={styles.countdownNumber}>{daysRemaining}</Text>
          <Text style={styles.countdownLabel}>Days Left</Text>
        </View>
      </View>

      {parentReminder ? (
        <View style={styles.parentNoticeBox}>
          <Text style={styles.parentNoticeTitle}>👨‍👩‍👧 Parent Daily Audio Reminder:</Text>
          <Text style={styles.parentNoticeText}>{parentReminder}</Text>

          <TouchableOpacity
            style={[styles.audioBtn, isPlayingAudio && styles.audioBtnActive]}
            onPress={onPlayReminderAudio}
            activeOpacity={0.8}
          >
            <Text style={styles.audioBtnText}>
              {isPlayingAudio ? '🔊 Playing Audio Notice...' : '🔊 Listen Audio Notice'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: SPACING.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleArea: {
    flex: 1,
    marginRight: 12,
  },
  examTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  examDate: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
    fontWeight: '500',
  },
  countdownBadge: {
    backgroundColor: '#ede9fe',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    minWidth: 70,
  },
  countdownBadgeUrgent: {
    backgroundColor: '#fee2e2',
  },
  countdownNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: '#6366f1',
  },
  countdownLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
    marginTop: 1,
  },
  parentNoticeBox: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    backgroundColor: '#fffbeb',
    padding: 10,
    borderRadius: 8,
  },
  parentNoticeTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400e',
    marginBottom: 4,
  },
  parentNoticeText: {
    fontSize: 12,
    color: '#78350f',
    lineHeight: 18,
    marginBottom: 8,
  },
  audioBtn: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  audioBtnActive: {
    backgroundColor: '#bbf7d0',
    borderColor: '#86efac',
  },
  audioBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400e',
  },
});

export default ExamCountdownBanner;
