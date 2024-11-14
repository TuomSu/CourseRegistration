
import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CoursePage from './pages/CoursePage';
import CourseForm from './pages/CourseForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <Router>
      <div>
        <h1>Welcome</h1>
        {isLoggedIn ? (
          <p>Admin</p>
        ) : (
          <p>Visitor</p>
        )}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/course/:courseId" element={<CoursePage/>} />
        <Route path="/course-form" element={<CourseForm/>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
