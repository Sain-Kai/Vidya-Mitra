package com.vidyamitra.service;

import com.vidyamitra.model.ExamSchedule;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class SpacedRepetitionSchedulerService {

    /**
     * Given an upcoming exam date and subject topics, computes a personalized
     * 3-phase revision cycle (Foundational Review -> Deep Drills -> Mock Testing).
     */
    public ExamSchedule generateExamPlan(String studentId, String examTitle, LocalDate examDate, List<String> topics) {
        LocalDate today = LocalDate.now();
        int daysAvailable = (int) ChronoUnit.DAYS.between(today, examDate);
        if (daysAvailable <= 0) daysAvailable = 1;

        List<ExamSchedule.RevisionMilestone> milestones = new ArrayList<>();

        // Phase 1: Foundational Review (First 40% of time)
        int phase1Days = Math.max(1, (int) (daysAvailable * 0.4));
        milestones.add(ExamSchedule.RevisionMilestone.builder()
                .cycleName("Phase 1: Concept & Story Foundations")
                .startDate(today)
                .endDate(today.plusDays(phase1Days))
                .targetChapters(topics)
                .dailyTasks(List.of(
                        "Study Chapter concepts with Vidya Mitra Socratic tutor",
                        "Complete in-lesson micro-recaps & concept questions",
                        "Note down unfamiliar terms"
                ))
                .isCompleted(false)
                .build());

        // Phase 2: Deep Drills & Weakness Focus (Next 40% of time)
        int phase2Days = Math.max(1, (int) (daysAvailable * 0.4));
        milestones.add(ExamSchedule.RevisionMilestone.builder()
                .cycleName("Phase 2: Deep Practice & Weak Area Drills")
                .startDate(today.plusDays(phase1Days))
                .endDate(today.plusDays(phase1Days + phase2Days))
                .targetChapters(topics)
                .dailyTasks(List.of(
                        "Attempt short & long answer questions",
                        "Focus on areas marked 'Needs Support' in previous diagnostics",
                        "Practice step-by-step formula and diagram labeling"
                ))
                .isCompleted(false)
                .build());

        // Phase 3: Mock Testing & Final Confidence (Remaining 20% of time)
        milestones.add(ExamSchedule.RevisionMilestone.builder()
                .cycleName("Phase 3: Mock Exam & Teacher Rubrics Polish")
                .startDate(today.plusDays(phase1Days + phase2Days))
                .endDate(examDate)
                .targetChapters(topics)
                .dailyTasks(List.of(
                        "Solve full-length timed mock question paper",
                        "Upload answers to Paper Evaluator for instant feedback",
                        "Listen to audio revision summary in mother tongue"
                ))
                .isCompleted(false)
                .build());

        return ExamSchedule.builder()
                .studentId(studentId)
                .examTitle(examTitle)
                .examDate(examDate)
                .daysRemaining(daysAvailable)
                .revisionPlan(milestones)
                .build();
    }
}
