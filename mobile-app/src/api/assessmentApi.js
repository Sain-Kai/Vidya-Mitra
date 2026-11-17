export const API_BASE_URL = 'http://localhost:8000';

export const generateAssessmentApi = async (subject = 'Mathematics', gradeLevel = 'Class 4') => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/assessment/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject,
        grade_level: gradeLevel,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to generate assessment');
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};

export const submitAssessmentApi = async (subject, gradeLevel, answers) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/assessment/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject,
        grade_level: gradeLevel,
        answers,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to submit assessment');
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};

export const fetchDiagnosticsApi = async (subject = 'Mathematics', gradeLevel = 'Class 4') => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/performance/diagnostics?subject=${subject}&grade_level=${gradeLevel}`);
    if (!response.ok) {
      throw new Error('Failed to fetch diagnostics');
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};
