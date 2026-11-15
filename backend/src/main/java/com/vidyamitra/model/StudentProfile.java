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
 * Student Cognitive & Adaptive Profile (Classes 1 to 8).
 * Tracks weak topics, preferred regional language, and spaced revision metrics.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "students")
public class StudentProfile {
    @Id
    private String id;
    private String fullName;
    private int grade; // 1 to 8
    private String schoolBoard; // NCERT / CBSE / State Board
    private String motherTongue; // hi, bn, te, ta, mr, gu, kn, ml, pa, or
    private String parentPhoneNumber;
    private int currentStreakDays;
    private int coins;

    // Identified cognitive weak areas dynamically updated after assessments
    private List<String> identifiedWeaknesses;

    // Topic -> Mastery Percentage (0 to 100)
    private Map<String, Integer> topicMastery;

    // Difficulty level adaptation: 1 (Concrete/Story) to 3 (Abstract/Standard)
    private int currentCognitiveLevel;

    private LocalDateTime createdAt;
    private LocalDateTime lastActiveAt;
}
