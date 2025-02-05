
import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CoursePage from './pages/CoursePage';
import CourseForm from './pages/CourseForm';
import PageHeader from './components/PageHeader';
import Container from './components/Container';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <Router>
      <Container>
      <PageHeader isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/course/:courseId" element={<CoursePage/>} />
        <Route path="/course-form" element={<CourseForm/>} />
      </Routes>
      </Container>
    </Router>
  );
}

export default App;
