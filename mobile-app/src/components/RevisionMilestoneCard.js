import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SPACING, BORDER_RADIUS } from '../constants/theme';

export const RevisionMilestoneCard = ({
  milestone,
  onToggleTask,
}) => {
  const tasks = milestone.daily_tasks || [];
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const isPhaseDone = totalCount > 0 && completedCount === totalCount;

  return (
    <View style={[styles.card, isPhaseDone && styles.cardDone]}>
      <View style={styles.header}>
        <View style={styles.titleWrap}>
          <Text style={styles.phaseName}>{milestone.phase_name}</Text>
          <Text style={styles.datesText}>
            {milestone.start_date} to {milestone.end_date} - {milestone.days_allocated} days
          </Text>
        </View>
        <View style={[styles.statusBadge, isPhaseDone ? styles.statusBadgeDone : styles.statusBadgeActive]}>
          <Text style={[styles.statusText, isPhaseDone ? styles.statusTextDone : styles.statusTextActive]}>
            {isPhaseDone ? 'Completed' : `${completedCount} of ${totalCount} Done`}
          </Text>
        </View>
      </View>

      <Text style={styles.focusArea}>🎯 Focus: {milestone.focus_area}</Text>

      <View style={styles.tasksContainer}>
        {tasks.map(task => {
          const isDone = task.completed;
          return (
            <TouchableOpacity
              key={task.task_id}
              style={[styles.taskItem, isDone && styles.taskItemDone]}
              onPress={() => onToggleTask && onToggleTask(milestone.phase_id, task.task_id)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, isDone && styles.checkboxDone]}>
                {isDone && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={[styles.taskText, isDone && styles.taskTextDone]}>
                {task.text}
              </Text>
              {task.time_minutes && (
                <View style={styles.timeBadge}>
                  <Text style={styles.timeBadgeText}>{task.time_minutes} min</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: SPACING.md,
  },
  cardDone: {
    borderColor: '#a7f3d0',
    backgroundColor: '#f0fdf4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  titleWrap: {
    flex: 1,
    marginRight: 8,
  },
  phaseName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
  datesText: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusBadgeActive: {
    backgroundColor: '#ede9fe',
  },
  statusBadgeDone: {
    backgroundColor: '#dcfce7',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusTextActive: {
    color: '#6366f1',
  },
  statusTextDone: {
    color: '#15803d',
  },
  focusArea: {
    fontSize: 12,
    color: '#475569',
    marginBottom: 10,
    lineHeight: 18,
  },
  tasksContainer: {
    gap: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  taskItemDone: {
    backgroundColor: '#f0fdf4',
    borderColor: '#dcfce7',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#94a3b8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxDone: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
  },
  taskText: {
    flex: 1,
    fontSize: 12,
    color: '#1e293b',
    lineHeight: 18,
    fontWeight: '500',
  },
  taskTextDone: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
  timeBadge: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 6,
  },
  timeBadgeText: {
    fontSize: 10,
    color: '#475569',
    fontWeight: '600',
  },
});

export default RevisionMilestoneCard;
