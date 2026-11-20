package com.vidyamitra.service;

import com.vidyamitra.model.ExamSchedule;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

/**
 * Spaced Repetition Scheduling Service.
 * Computes personalized three phase revision cycles:
 * Phase 1 Concept Foundation
 * Phase 2 Deep Practice and Weak Area Drills
 * Phase 3 Mock Testing and Rapid Recall Polish
 */
@Service
public class SpacedRepetitionSchedulerService {

    public ExamSchedule generateExamPlan(
            String studentId,
            String examTitle,
            String subject,
            String gradeLevel,
            LocalDate examDate,
            List<String> topics,
            List<String> weakTopics
    ) {
        LocalDate today = LocalDate.now();
        int daysAvailable = (int) ChronoUnit.DAYS.between(today, examDate);
        if (daysAvailable <= 0) daysAvailable = 1;

        List<ExamSchedule.RevisionMilestone> milestones = new ArrayList<>();

        int phase1Days = Math.max(1, (int) (daysAvailable * 0.4));
        int phase2Days = Math.max(1, (int) (daysAvailable * 0.4));
        int phase3Days = Math.max(1, daysAvailable - phase1Days - phase2Days);

        List<ExamSchedule.MilestoneTask> p1Tasks = new ArrayList<>();
        p1Tasks.add(ExamSchedule.MilestoneTask.builder()
                .taskId("t1_01")
                .text("Study Chapter concepts with Vidya Mitra Socratic tutor")
                .completed(true)
                .timeMinutes(25)
                .build());
        p1Tasks.add(ExamSchedule.MilestoneTask.builder()
                .taskId("t1_02")
                .text("Complete in-lesson micro-recaps and concept recall questions")
                .completed(false)
                .timeMinutes(15)
                .build());
        p1Tasks.add(ExamSchedule.MilestoneTask.builder()
                .taskId("t1_03")
                .text("Note down unfamiliar terms and listen to mother tongue summary")
                .completed(false)
                .timeMinutes(10)
                .build());

        milestones.add(ExamSchedule.RevisionMilestone.builder()
                .phaseId("phase_1")
                .cycleName("Phase 1: Concept and Story Foundations")
                .focusArea("Build intuitive understanding without rote memorization")
                .startDate(today)
                .endDate(today.plusDays(phase1Days))
                .targetChapters(topics)
                .dailyTasks(p1Tasks)
                .isCompleted(false)
                .build());

        List<ExamSchedule.MilestoneTask> p2Tasks = new ArrayList<>();
        p2Tasks.add(ExamSchedule.MilestoneTask.builder()
                .taskId("t2_01")
                .text("Attempt 10 multi format diagnostic assessment questions")
                .completed(false)
                .timeMinutes(20)
                .build());

        if (weakTopics != null) {
            int wIdx = 1;
            for (String wt : weakTopics) {
                p2Tasks.add(ExamSchedule.MilestoneTask.builder()
                        .taskId("t2_weak_" + wIdx)
                        .text("Prioritized Foundation Review: " + wt + " using concrete stories")
                        .completed(false)
                        .timeMinutes(20)
                        .build());
                wIdx++;
            }
        }

        p2Tasks.add(ExamSchedule.MilestoneTask.builder()
                .taskId("t2_02")
                .text("Work through step by step solutions for multi step word problems")
                .completed(false)
                .timeMinutes(25)
                .build());
        p2Tasks.add(ExamSchedule.MilestoneTask.builder()
                .taskId("t2_03")
                .text("Practice neat diagram drawing and unit labeling")
                .completed(false)
                .timeMinutes(15)
                .build());

        milestones.add(ExamSchedule.RevisionMilestone.builder()
                .phaseId("phase_2")
                .cycleName("Phase 2: Deep Practice and Weak Area Drills")
                .focusArea("Targeted practice on previously missed question types")
                .startDate(today.plusDays(phase1Days))
                .endDate(today.plusDays(phase1Days + phase2Days))
                .targetChapters(topics)
                .dailyTasks(p2Tasks)
                .isCompleted(false)
                .build());

        List<ExamSchedule.MilestoneTask> p3Tasks = new ArrayList<>();
        p3Tasks.add(ExamSchedule.MilestoneTask.builder()
                .taskId("t3_01")
                .text("Solve full length timed mock question paper")
                .completed(false)
                .timeMinutes(45)
                .build());
        p3Tasks.add(ExamSchedule.MilestoneTask.builder()
                .taskId("t3_02")
                .text("Upload handwritten answers to Paper Evaluator for feedback")
                .completed(false)
                .timeMinutes(15)
                .build());
        p3Tasks.add(ExamSchedule.MilestoneTask.builder()
                .taskId("t3_03")
                .text("Listen to audio revision summary in mother tongue with parents")
                .completed(false)
                .timeMinutes(10)
                .build());

        milestones.add(ExamSchedule.RevisionMilestone.builder()
                .phaseId("phase_3")
                .cycleName("Phase 3: Mock Testing and Rapid Recall Polish")
                .focusArea("Timed exam simulation and teacher evaluation rubric check")
                .startDate(today.plusDays(phase1Days + phase2Days))
                .endDate(examDate)
                .targetChapters(topics)
                .dailyTasks(p3Tasks)
                .isCompleted(false)
                .build());

        return ExamSchedule.builder()
                .studentId(studentId)
                .examTitle(examTitle)
                .subject(subject)
                .gradeLevel(gradeLevel)
                .examDate(examDate)
                .daysRemaining(daysAvailable)
                .weakTopicsPrioritized(weakTopics)
                .revisionPlan(milestones)
                .build();
    }

    public ExamSchedule toggleTaskCompletion(ExamSchedule schedule, String phaseId, String taskId) {
        if (schedule != null && schedule.getRevisionPlan() != null) {
            for (ExamSchedule.RevisionMilestone milestone : schedule.getRevisionPlan()) {
                if (phaseId.equals(milestone.getPhaseId()) && milestone.getDailyTasks() != null) {
                    for (ExamSchedule.MilestoneTask task : milestone.getDailyTasks()) {
                        if (taskId.equals(task.getTaskId())) {
                            task.setCompleted(!task.isCompleted());
                            break;
                        }
                    }
                }
            }
        }
        return schedule;
    }
}
