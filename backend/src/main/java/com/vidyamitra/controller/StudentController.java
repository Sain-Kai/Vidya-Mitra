package com.vidyamitra.controller;

import com.vidyamitra.model.PaperEvaluationRecord;
import com.vidyamitra.model.StudentProfile;
import com.vidyamitra.service.TeacherGradingPatternAnalyzerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StudentController {

    @GetMapping("/{id}")
    public ResponseEntity<StudentProfile> getStudentProfile(@PathVariable String id) {
        StudentProfile mockProfile = StudentProfile.builder()
                .id(id)
                .fullName("Aarav Sharma")
                .grade(4)
                .schoolBoard("NCERT / CBSE")
                .motherTongue("hi")
                .currentStreakDays(7)
                .coins(240)
                .currentCognitiveLevel(2)
                .identifiedWeaknesses(List.of("Speed & Time Problems", "Logical Word Puzzles"))
                .topicMastery(Map.of(
                        "Numbers & Place Value", 95,
                        "Fractions & Decimals", 78,
                        "Speed, Distance & Time", 42,
                        "Logical Reasoning", 35
                ))
                .createdAt(LocalDateTime.now().minusMonths(1))
                .lastActiveAt(LocalDateTime.now())
                .build();

        return ResponseEntity.ok(mockProfile);
    }
}
