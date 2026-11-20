package com.vidyamitra.controller;

import com.vidyamitra.model.ExamSchedule;
import com.vidyamitra.service.SpacedRepetitionSchedulerService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

/**
 * REST controller for creating and managing spaced repetition exam revision plans.
 */
@RestController
@RequestMapping("/api/v1/exams")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ExamPlannerController {

    private final SpacedRepetitionSchedulerService schedulerService;

    @PostMapping("/schedule")
    public ResponseEntity<ExamSchedule> createExamSchedule(
            @RequestParam(defaultValue = "student_01") String studentId,
            @RequestParam(defaultValue = "Term 1 Mathematics Exam") String examTitle,
            @RequestParam(defaultValue = "Mathematics") String subject,
            @RequestParam(defaultValue = "Class 4") String gradeLevel,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate examDate,
            @RequestBody(required = false) List<String> weakTopics
    ) {
        List<String> defaultChapters = List.of(
                "Chapter 1: Number Systems and Place Value",
                "Chapter 2: Addition and Subtraction Stories",
                "Chapter 3: Fractions and Equal Sharing",
                "Chapter 4: Time, Clocks and Calendar Math",
                "Chapter 5: Perimeter and Basic Shapes"
        );

        ExamSchedule schedule = schedulerService.generateExamPlan(
                studentId,
                examTitle,
                subject,
                gradeLevel,
                examDate,
                defaultChapters,
                weakTopics
        );
        return ResponseEntity.ok(schedule);
    }

    @GetMapping("/student/{studentId}/active")
    public ResponseEntity<ExamSchedule> getActiveExamSchedule(
            @PathVariable String studentId,
            @RequestParam(defaultValue = "Mathematics") String subject,
            @RequestParam(defaultValue = "Class 4") String gradeLevel
    ) {
        LocalDate upcomingDate = LocalDate.now().plusDays(10);
        List<String> defaultChapters = List.of(
                "Chapter 1: Numbers and Counting",
                "Chapter 2: Fractions and Parts",
                "Chapter 3: Speed Distance and Time",
                "Chapter 4: Word Problems and Stories"
        );
        List<String> weakTopics = List.of(
                "Word Problems and Logical Reasoning",
                "Perimeter and Area"
        );

        ExamSchedule schedule = schedulerService.generateExamPlan(
                studentId,
                "Upcoming " + subject + " Examination",
                subject,
                gradeLevel,
                upcomingDate,
                defaultChapters,
                weakTopics
        );
        return ResponseEntity.ok(schedule);
    }
}
