import React, { useState } from 'react';
import { addCourse } from '../services/courseService'; // Lisää kurssinlisäysfunktio service-tiedostosta
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import { Container, Button, TextField } from '@mui/material';

const CourseForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(0);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Tallennetaan valittu kuva
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Hae token paikallisesta muistista
    if (!token) return;

    // Luodaan FormData, jotta voidaan lähettää kuva ja muut tiedot
    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('maxParticipants', maxParticipants);
    if (image) {
      formData.append('image', image); // Liitetään kuva lomakkeeseen
    }

    try {
      await addCourse(formData, token); // Lähetetään FormData backendille
      alert('Kurssi ja kuva lisätty!');
      setTitle('');
      setDate('');
      setMaxParticipants(0);
      setImage(null);
    } catch (error) {
      console.error('Kurssin lisääminen epäonnistui:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Lisää uusi kurssi</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Kurssin nimi:"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <InputField
          label="Kurssin päivämäärä:"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <InputField
          label="Enimmäisosallistujat:"
          type="number"
          value={maxParticipants}
          onChange={(e) => setMaxParticipants(e.target.value)}
          required
        />
        <InputField
          label="Kurssikuva:"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />
        <Button type="submit">Lisää kurssi</Button>
      </form>
      <Button onClick={() => navigate('/')}>Takaisin kurssilistaukseen</Button>
    </div>
  );
};

export default CourseForm;
