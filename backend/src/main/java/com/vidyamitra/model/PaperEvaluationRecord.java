package com.vidyamitra.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Question Paper & Answer Sheet Evaluation Record.
 * Stores estimated score, step-wise deductions, and teacher evaluation patterns.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "paper_evaluations")
public class PaperEvaluationRecord {
    @Id
    private String id;
    private String studentId;
    private String subject;
    private int grade;
    private String questionPaperUrl;
    private String answerSheetUrl;
    private double totalMarks;
    private double estimatedScore;
    private double percentage;

    // Pattern insights regarding where marks were lost based on teacher grading style
    private String teacherEvaluationPattern;
    private List<QuestionGradingItem> questionGradings;
    private List<String> remedialActionPlan;
    private LocalDateTime evaluatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionGradingItem {
        private String questionNumber;
        private double maxMarks;
        private double awardedMarks;
        private String status; // FULL, PARTIAL, ZERO
        private String deductionReason;
        private String teacherExpectationTip;
    }
}
