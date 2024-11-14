// routes/courseRoutes.js

const express = require('express');
const router = express.Router();
const { getCourses, registerForCourse, createCourse, getParticipants, getCourseById } = require('../controllers/courseController');
const verifyAdmin = require('../middleware/authMiddleware');
const multer = require('multer');

// GET /api/courses - Palauttaa kaikki kurssit ja vapaat paikat
router.get('/', getCourses);

// GET /api/courses/:id - Hakee kurssin ID:n perusteella
router.get('/:id', getCourseById);

// GET /api/participants - Kaikki kurssin osallistujat
router.get('/:id/participants', verifyAdmin, getParticipants);

// POST - uuden kurssin lisäämiseksi, vain Admin
// Määritä multer tallentamaan kuvat 'uploads' kansioon
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Määritä tallennuspaikka
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Luo tiedostonimi
    }
  });
  
  const upload = multer({ storage: storage });
  
  router.post('/', verifyAdmin, upload.single('image'), createCourse);

// POST /api/courses/:id/register - Ilmoittautuminen kurssille ID:n perusteella
router.post('/:id/register', registerForCourse);

module.exports = router;
