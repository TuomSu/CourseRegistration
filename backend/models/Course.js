// models/Course.js

const mongoose = require('mongoose');

// Määrittele kurssin skeema
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  maxParticipants: {
    type: Number,
    required: true,
    default: 15,
  },
  currentParticipants: {
    type: Number,
    default: 0,
  },
  image: {
    type: String, // Kuvan URL-osoite
    required: false,
  },
  participants: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
  ],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
