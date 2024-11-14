// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
    const navigate = useNavigate();

const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, password });
      alert('Rekisteröityminen onnistui!');
      setIsRegistering(false); // Siirrytään kirjautumiseen rekisteröinnin jälkeen
    } catch (error) {
      setError('Rekisteröityminen epäonnistui, tarkista tiedot.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const token = response.data.token;

      // Tallenna tokenin paikallisesti (localStorage)
      localStorage.setItem('token', token);
      setIsLoggedIn(true); // Kirjautuminen onnistui, asetetaan status
      alert('Kirjautuminen onnistui!');
      navigate('/'); // Tämä ohjaa käyttäjän Home-sivulle
    } catch (error) {
      console.error('Virhe kirjautumisessa:', error);
      alert('Kirjautuminen epäonnistui');
    }
  };


  return (
    <div>
      <h2>{isRegistering ? 'Rekisteröityminen' : 'Kirjautuminen'}</h2>
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
        <input
          type="text"
          placeholder="Käyttäjätunnus"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Salasana"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isRegistering ? 'Rekisteröidy' : 'Kirjaudu'}</button>
      </form>
      <p>{error && <span>{error}</span>}</p>

      {/* Linkki rekisteröitymiseen, jos ei ole vielä rekisteröitynyt */}
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Palaa kirjautumiseen' : 'Ei vielä tiliä? Rekisteröidy'}
      </button>
    </div>
  );
};

export default Login;
