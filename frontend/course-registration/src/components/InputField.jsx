import React from 'react';

const InputField = ({ label, type, value, onChange, ...props }) => (
    <div style={{ marginBottom: '10px' }}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        {...props} // Tämä sisältää mahdolliset lisäominaisuudet kuten `accept` file-inputille
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
      />
    </div>
  );
  
  export default InputField;