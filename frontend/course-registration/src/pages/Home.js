import React, { useEffect, useState } from 'react';
import { getCourses } from '../services/courseService';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import {jwtDecode} from 'jwt-decode'; 
import CourseForm from './CourseForm';
import { Container, Button, TextField } from '@mui/material';
import { List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';

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
        {/*<Link to="/login">
          <Button>Admin - Kirjaudu sisään</Button>
        </Link>
        <Button onClick={handleLogout}>Kirjaudu ulos</Button>*/}
        {isAdmin && (
        <Button onClick={() => navigate('/course-form')}>Lisää uusi kurssi</Button>
      )}
      </div>
      
      <h1>Available Courses</h1>
      
      <List>
        {courses.map(course => (
          <React.Fragment key={course._id}>
           <ListItem 
          alignItems="flex-start" 
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}
        >
          <ListItemText
            primary={course.title}
            secondary={
              <>
                <span>{course.formattedDate}</span><br />
                <span>{course.currentParticipants}/{course.maxParticipants} participants</span>
              </>
            }
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => handleCourseDetails(course._id)}
            sx={{ mt: 1 }}
          >
            Lisätietoja ja ilmoittautuminen
          </Button>
        </ListItem>
        <Divider variant="inset" component="li" />
      </React.Fragment>
    ))}
  </List>
    </div>
  );
}

export default Home;
