import React, { useState, useEffect } from 'react';
import { registerForCourse, getCourseById, getCourseParticipants } from '../services/courseService';
import { useParams, useNavigate } from 'react-router-dom';

function CoursePage() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);


  const fetchParticipants = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token){
        return;
    }
      const data = await getCourseParticipants(courseId, token);
      setParticipants(data);
    } catch (error) {
      console.error('Virhe haettaessa osallistujia', error);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(courseId);
        setCourse(data);
      } catch (error) {
        console.error('Failed to fetch course:', error);
      }
    };
    fetchCourse();
    fetchParticipants();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Lähetetään ilmoittautumiset palvelimelle
      const response = await registerForCourse(courseId, { name, email, phone });
      setMessage(response.message);
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Failed to register:', error);
      setMessage('Ilmoittautuminen epäonnistui. Yritä uudelleen.');
    }
  };

  

  

  

  if (!course) return <p>Ladataan...</p>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>Date: {course.date}</p>
      <p>Max Participants: {course.maxParticipants}</p>
      <p>Current Participants: {course.currentParticipants}</p>

      <h3>Ilmoittaudu kurssille</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nimi:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Sähköposti:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Puhelin:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ilmoittaudu</button>
      </form>

      {message && <p>{message}</p>}
      {participants.length > 0 && (
        <div>
          <h3>Osallistujat:</h3>
          <ul>
            {participants.map((participant, index) => (
              <li key={index}>{participant.name} - {participant.email} - {participant.phone}</li>
            ))}
          </ul>
          </div>
      )}
      <button onClick={() => navigate('/')}>Takaisin kurssilistaukseen</button>
    </div>
  );
}

export default CoursePage;

