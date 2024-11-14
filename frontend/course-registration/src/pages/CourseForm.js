import React, { useState } from 'react';
import { addCourse } from '../services/courseService'; // Lisää kurssinlisäysfunktio service-tiedostosta
import { useNavigate } from 'react-router-dom';

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
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Kurssin nimi:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Kurssin päivämäärä:</label>
        <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div>
        <label>Enimmäisosallistujat:</label>
        <input type="number" value={maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} required />
      </div>
      <div>
        <label>Kurssikuva:</label>
        <input type="file" onChange={handleFileChange} accept="image/*" />
      </div>
      <button type="submit">Lisää kurssi</button>
    </form>
    <button onClick={() => navigate('/')}>Takaisin kurssilistaukseen</button></div>
  );
};

export default CourseForm;
