// controllers/courseController.js

const Course = require('../models/Course'); // Malli, joka on määritelty MongoDB-tietokantaa varten

// GET /api/courses - Hakee kaikki kurssit ja näyttää vapaiden paikkojen määrän
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Virhe kurssien haussa', error });
  }
};

// Controller-funktio kurssin lisäämiseen
const createCourse = async (req, res) => {
    try {
      const { title, date, maxParticipants } = req.body;
      const imagePath = req.file ? req.file.path : null;
  
      const newCourse = new Course({
        title,
        date,
        maxParticipants,
        currentParticipants: 0,
        image: imagePath,
      });
  
      await newCourse.save(); // Tallentaa kurssin MongoDB:hen
      res.status(201).json(newCourse); // Palauttaa lisätyn kurssin JSON-muodossa
    } catch (error) {
      res.status(500).json({ message: 'Virhe kurssin lisäämisessä', error });
    }
  };

  // Hakee yksittäisen kurssin ID:n perusteella
const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id); // Oletus, että Course on mongoose-malli
    if (!course) {
      return res.status(404).json({ message: 'Kurssia ei löytynyt' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Virhe kurssia haettaessa', error });
  }
};


// GET /api/courses/:id/participants
const getParticipants= async (req, res) => {
  const { id } = req.params; // The course ID from the URL

  try {
    // Find the course by ID
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Return the participants list
    res.status(200).json(course.participants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching participants', error });
  }
};

// POST /api/courses/:id/register - Ilmoittautuminen kurssille ID:n perusteella
const registerForCourse = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body; // Participant's data
  try {
    // Hae kurssi ID:n perusteella
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: 'Kurssia ei löydy' });
    }

    // Tarkista onko kurssilla vapaita paikkoja
    if (course.currentParticipants >= course.maxParticipants) {
      return res.status(400).json({ message: 'Kurssi on täynnä' });
    }

    // Lisää osallistuja kurssille
    course.participants.push({ name, email, phone });
    course.currentParticipants += 1;
    await course.save();

    res.status(200).json({ message: 'Ilmoittautuminen onnistui', course });
  } catch (error) {
    res.status(500).json({ message: 'Ilmoittautuminen epäonnistui', error });
  }
};

module.exports = { getCourses, registerForCourse, createCourse, getParticipants, getCourseById };
