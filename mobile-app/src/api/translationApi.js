export const API_BASE_URL = 'http://localhost:8000';

export const translateTextApi = async (text, targetLang = 'hi', sourceLang = 'en') => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/translate/ocr`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        target_lang: targetLang,
        source_lang: sourceLang,
      }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};

export const extractOcrTextApi = async (sampleText = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ocr/extract`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sample_text: sampleText,
      }),
    });
    if (!response.ok) {
      throw new Error('OCR extraction failed');
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};
