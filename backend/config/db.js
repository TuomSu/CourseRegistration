// config/db.js
require('dotenv').config(); // Lataa .env-tiedoston asetukset

const mongoose = require('mongoose');

// Määritä MongoDB:n URI ympäristömuuttujasta
const mongoDBUri = process.env.MONGODB_URI;

// Luo yhteys MongoDB:hen ja palauta yhteysfunktio
const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Yhteys MongoDB-tietokantaan onnistui');
  } catch (error) {
    console.error('Virhe MongoDB-yhteyden muodostamisessa:', error);
    process.exit(1); // Pysäytä palvelin virheen sattuessa
  }
};

module.exports = connectDB;
