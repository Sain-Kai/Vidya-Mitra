package com.vidyamitra.controller;

import com.vidyamitra.model.AssessmentRecord;
import com.vidyamitra.service.PerformanceDiagnosticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Controller exposing diagnostic assessment endpoints and cognitive analytics.
 */
@RestController
@RequestMapping("/api/v1/assessments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AssessmentController {

    private final PerformanceDiagnosticsService diagnosticsService;

    @PostMapping("/submit")
    public ResponseEntity<AssessmentRecord> submitAssessment(
            @RequestParam(defaultValue = "student_01") String studentId,
            @RequestParam(defaultValue = "Mathematics") String subject,
            @RequestParam(defaultValue = "Class 4") String gradeLevel,
            @RequestParam(defaultValue = "7.0") double earnedScore,
            @RequestParam(defaultValue = "10.0") double maxScore,
            @RequestBody(required = false) Map<String, Double> topicScores
    ) {
        AssessmentRecord record = diagnosticsService.processAssessmentSubmission(
                studentId,
                subject,
                gradeLevel,
                earnedScore,
                maxScore,
                topicScores,
                null
        );
        return ResponseEntity.ok(record);
    }

    @GetMapping("/student/{studentId}/diagnostics")
    public ResponseEntity<Map<String, Object>> getStudentDiagnostics(
            @PathVariable String studentId
    ) {
        Map<String, Object> diagnostics = diagnosticsService.getStudentCognitiveDiagnostics(studentId);
        return ResponseEntity.ok(diagnostics);
    }
}
