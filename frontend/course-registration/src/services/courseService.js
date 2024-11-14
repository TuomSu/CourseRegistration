import axios from 'axios';

const API_URL = 'http://localhost:5000/api/courses';

export const getCourses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getCourseById = async (courseId) => {
    try {
      const response = await axios.get(`${API_URL}/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Virhe haettaessa kurssia ID:n perusteella:', error);
      throw error;
    }
  };

export const registerForCourse = async (courseId, participantData) => {
  const response = await axios.post(`${API_URL}/${courseId}/register`, participantData);
  return response.data;
};

export const getCourseParticipants = async (courseId, token) => {
  const response = await axios.get(`${API_URL}/${courseId}/participants`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

export const addCourse = async (formData, token) => {
  const response = await axios.post(
    'http://localhost:5000/api/courses',
    formData,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Määritetään oikea Content-Type
      },
    }
  );
  return response.data;
};
