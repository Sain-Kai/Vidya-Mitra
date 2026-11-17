package com.vidyamitra.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * Assessment Record tracking multi format test attempts.
 * Captures overall score, topic breakdowns, identified weak areas,
 * and adaptive remedial lessons.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "assessment_records")
public class AssessmentRecord {
    @Id
    private String id;
    private String studentId;
    private String subject;
    private String gradeLevel;
    private double earnedScore;
    private double maxScore;
    private double masteryPercentage;

    private List<String> weakTopics;
    private Map<String, Double> topicMasteryScores;
    private Map<String, Double> skillMasteryScores;

    private List<Map<String, Object>> adaptiveNextLessons;
    private String parentSummaryHindi;
    private String parentSummaryEnglish;

    private LocalDateTime submittedAt;
}
