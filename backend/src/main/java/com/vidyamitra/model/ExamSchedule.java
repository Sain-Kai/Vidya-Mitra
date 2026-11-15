package com.vidyamitra.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

/**
 * Exam Revision Planner model.
 * Generates spaced revision milestones leading up to unit tests and term exams.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "exam_schedules")
public class ExamSchedule {
    @Id
    private String id;
    private String studentId;
    private String examTitle; // e.g. "Term 1 Mathematics Exam"
    private LocalDate examDate;
    private int daysRemaining;
    private List<RevisionMilestone> revisionPlan;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RevisionMilestone {
        private String cycleName; // e.g. "Concept Foundation", "Deep Drills", "Mock Exam"
        private LocalDate startDate;
        private LocalDate endDate;
        private List<String> targetChapters;
        private List<String> dailyTasks;
        private boolean isCompleted;
    }
}
