package com.vidyamitra.service;

import com.vidyamitra.model.PaperEvaluationRecord;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeacherGradingPatternAnalyzerService {

    /**
     * Synthesizes insights on where the student lost marks based on typical
     * Indian school teacher evaluation patterns (step marking, formula omission, units, keywords).
     */
    public List<String> extractTeacherInsights(List<PaperEvaluationRecord.QuestionGradingItem> gradings) {
        List<String> insights = new ArrayList<>();

        boolean missedUnits = gradings.stream().anyMatch(g ->
                g.getDeductionReason() != null && g.getDeductionReason().toLowerCase().contains("unit"));
        boolean missedFormulas = gradings.stream().anyMatch(g ->
                g.getDeductionReason() != null && g.getDeductionReason().toLowerCase().contains("formula"));
        boolean missedKeywords = gradings.stream().anyMatch(g ->
                g.getDeductionReason() != null && g.getDeductionReason().toLowerCase().contains("keyword"));

        if (missedUnits) {
            insights.add("Teacher strictly checks final answer units (cm, m, cm², kg). Always write units next to numerical answers.");
        }
        if (missedFormulas) {
            insights.add("Teachers award 1 to 2 step marks for explicitly writing down the formula before calculations.");
        }
        if (missedKeywords) {
            insights.add("In Science and EVS, underline key technical terms (e.g. 'Photosynthesis', 'Chlorophyll', 'Evaporation') to catch the examiner's eye.");
        }

        if (insights.isEmpty()) {
            insights.add("Keep handwriting neat and maintain consistent step numbering matching the question paper.");
        }

        return insights;
    }
}
