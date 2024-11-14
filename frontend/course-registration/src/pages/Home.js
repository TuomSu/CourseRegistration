import React, { useEffect, useState } from 'react';
import { getCourses } from '../services/courseService';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import {jwtDecode} from 'jwt-decode'; 
import CourseForm from './CourseForm';

function Home() {
const [isAdmin, setIsAdmin] = useState(false); 
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Tarkistetaan admin-status
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    setIsAdmin(true);
    } catch (error) {
      console.error('Tokenin dekoodaus epäonnistui', error);
    }
  }, []); 

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getCourses();

      // Muotoillaan kurssien päivämäärät moment.js:llä ennen niiden tallentamista
      const formattedCourses = data.map(course => ({
        ...course,
        formattedDate: moment(course.date).format('DD.MM.YYYY HH:mm'), // Muotoile päivämäärä
      }));

      setCourses(formattedCourses); // Tallenna kurssit muotoiltuna
    };
    fetchCourses();
  }, []);

  const handleCourseDetails = (courseId) => {
    navigate(`/course/${courseId}`); 
  };

  const history = useNavigate();

  // Uloskirjautumistoiminto
  const handleLogout = () => {
    // Poistetaan token localStorageista
    localStorage.removeItem('token');
    
    // Ohjataan käyttäjä etusivulle
    navigate('/');
    window.location.reload();
  };

  return (
    <div>
        <div>
        <Link to="/login">
          <button>Admin - Kirjaudu sisään</button>
        </Link>
        <button onClick={handleLogout}>Kirjaudu ulos</button>
        {isAdmin && (
        <button onClick={() => navigate('/course-form')}>Lisää uusi kurssi</button>
      )}
      </div>
      
      <h1>Available Courses</h1>
      
      <ul>
        {courses.map(course => (
          <li key={course._id}>
           <p>{course.title} - {course.formattedDate} - {course.currentParticipants}/{course.maxParticipants} participants</p>
            <button onClick={() => handleCourseDetails(course._id)}>
              Lisätietoja ja ilmoittautuminen
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
