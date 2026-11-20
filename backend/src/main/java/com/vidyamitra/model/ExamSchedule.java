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
    private String examTitle;
    private String subject;
    private String gradeLevel;
    private LocalDate examDate;
    private int daysRemaining;
    private List<String> weakTopicsPrioritized;
    private List<RevisionMilestone> revisionPlan;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RevisionMilestone {
        private String phaseId;
        private String cycleName;
        private String focusArea;
        private LocalDate startDate;
        private LocalDate endDate;
        private List<String> targetChapters;
        private List<MilestoneTask> dailyTasks;
        private boolean isCompleted;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MilestoneTask {
        private String taskId;
        private String text;
        private boolean completed;
        private int timeMinutes;
    }
}
