package com.vidyamitra.controller;

import com.vidyamitra.model.PaperEvaluationRecord;
import com.vidyamitra.service.TeacherGradingPatternAnalyzerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/evaluation")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PaperEvaluationController {

    private final TeacherGradingPatternAnalyzerService patternAnalyzerService;

    @PostMapping("/grade-paper")
    public ResponseEntity<PaperEvaluationRecord> evaluatePaper(
            @RequestParam String studentId,
            @RequestParam(required = false) String questionPaperUrl,
            @RequestParam(required = false) String answerSheetUrl) {

        List<PaperEvaluationRecord.QuestionGradingItem> items = List.of(
                PaperEvaluationRecord.QuestionGradingItem.builder()
                        .questionNumber("Q1 (Maths)")
                        .maxMarks(5.0)
                        .awardedMarks(5.0)
                        .status("FULL")
                        .deductionReason(null)
                        .teacherExpectationTip("Full marks awarded for neat step formula.")
                        .build(),
                PaperEvaluationRecord.QuestionGradingItem.builder()
                        .questionNumber("Q2 (Maths - Area of Triangle)")
                        .maxMarks(5.0)
                        .awardedMarks(3.0)
                        .status("PARTIAL")
                        .deductionReason("Lost 2 marks: Omitted the base formula and unit (cm²).")
                        .teacherExpectationTip("Always explicitly write 'cm²' with numerical answers.")
                        .build(),
                PaperEvaluationRecord.QuestionGradingItem.builder()
                        .questionNumber("Q3 (Science - Water Cycle)")
                        .maxMarks(5.0)
                        .awardedMarks(4.0)
                        .status("PARTIAL")
                        .deductionReason("Lost 1 mark: Missed directional arrows indicating evaporation & condensation.")
                        .teacherExpectationTip("Diagrams require clear arrow labels.")
                        .build()
        );

        List<String> remedialPlan = patternAnalyzerService.extractTeacherInsights(items);

        PaperEvaluationRecord record = PaperEvaluationRecord.builder()
                .studentId(studentId)
                .subject("Mathematics & Science")
                .grade(4)
                .questionPaperUrl(questionPaperUrl)
                .answerSheetUrl(answerSheetUrl)
                .totalMarks(50.0)
                .estimatedScore(41.0)
                .percentage(82.0)
                .teacherEvaluationPattern("Strict step marking in Math; key diagram arrows expected in Science.")
                .questionGradings(items)
                .remedialActionPlan(remedialPlan)
                .evaluatedAt(LocalDateTime.now())
                .build();

        return ResponseEntity.ok(record);
    }
}
