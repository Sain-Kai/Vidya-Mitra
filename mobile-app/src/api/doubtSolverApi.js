export const API_BASE_URL = 'http://localhost:8000';

export const solveDoubtApi = async (
  questionText,
  grade = 4,
  subject = 'Mathematics',
  simplificationLevel = 1,
  imageBase64 = null
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tutor/doubt-solver`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question_text: questionText,
        grade,
        subject,
        simplification_level: simplificationLevel,
        image_base64: imageBase64,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to solve doubt');
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};

export const simplifyFurtherApi = async (questionText, currentLevel = 1, grade = 4) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/doubt/simplify-further`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question_text: questionText,
        current_level: currentLevel,
        grade,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to simplify doubt further');
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};
