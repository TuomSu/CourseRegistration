// server.js

require('dotenv').config(); // Lataa ympäristömuuttujat
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
//const verifyAdmin = require('./middleware/authMiddleware');
const cors = require('cors');
const app = express();

/*Kurssimallit ja kontrollerit
const Course = require('./models/Course');
const { getCourses, registerForCourse, createCourse, getParticipants, getCourseById } = require('./controllers/courseController');
const { loginAdmin } = require('./controllers/authController');*/


//Cors (antaa käyttöoikeuden frontendistä)
app.use(cors());

// Middleware JSON-datan käsittelyyn
app.use(express.json());

// MongoDB-yhteys
const mongoDBUri = process.env.MONGODB_URI;
mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Yhteys MongoDB-tietokantaan onnistui'))
  .catch((err) => console.log('Virhe MongoDB-yhteydessä:', err));

//Admin autentikointi
app.use('/api/auth', authRoutes);

app.use('/api/courses', courseRoutes);

/*Reitit
app.get('/api/courses', getCourses);
app.post('/api/courses/:id/register', registerForCourse);
app.post('/api/courses', createCourse);
app.get('/api/courses/:id/participants', verifyAdmin, getParticipants);
app.get('/api/courses/:id', getCourseById);*/




// Palvelimen käynnistäminen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Palvelin käynnissä portissa ${PORT}`);
});
