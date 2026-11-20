export const API_BASE_URL = 'http://localhost:8000';

export const generateExamScheduleApi = async (
  examTitle = 'Term 1 Exam',
  subject = 'Mathematics',
  examDate = '2026-12-05',
  gradeLevel = 'Class 4',
  weakTopics = []
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/exam/generate-schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        exam_title: examTitle,
        subject,
        exam_date: examDate,
        grade_level: gradeLevel,
        weak_topics: weakTopics,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to generate exam schedule');
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};

export const toggleTaskApi = async (schedule, phaseId, taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/exam/toggle-task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        schedule,
        phase_id: phaseId,
        task_id: taskId,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to toggle task');
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};

export const fetchActiveExamScheduleApi = async (
  subject = 'Mathematics',
  gradeLevel = 'Class 4'
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/exam/active-schedule?subject=${subject}&grade_level=${gradeLevel}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch active exam schedule');
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};
