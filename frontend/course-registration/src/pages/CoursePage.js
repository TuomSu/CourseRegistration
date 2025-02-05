import React, { useState, useEffect } from 'react';
import { registerForCourse, getCourseById, getCourseParticipants, getCourses } from '../services/courseService';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, TextField, List, ListItem, ListItemText, ListItemIcon, Divider, Box, Card, CardContent, Typography} from '@mui/material';
import moment from 'moment';

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

        // Muotoillaan kurssien päivämäärät moment.js:llä ennen niiden tallentamista
    const formattedCourse = {
      ...data,
      formattedDate: moment(data.date).format('DD.MM.YYYY HH:mm'), 
    };

        setCourse(formattedCourse);
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
      {course && ( // Check if course exists before rendering
      <List>
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
        </ListItem>
      </List>
      )}
      

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Card sx={{ maxWidth: 400, width: "100%", p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom textAlign="center">
            Ilmoittaudu kurssille
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nimi"
              variant="outlined"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Sähköposti"
              type="email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Puhelin"
              type="tel"
              variant="outlined"
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ mt: 2 }}
            >
              Ilmoittaudu
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>

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

