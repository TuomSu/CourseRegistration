import React from 'react';
import './Container.css'; // Luo erillinen tyylitiedosto

const Container = ({ children }) => (
  <div className="container">
    {children}
  </div>
);

export default Container;