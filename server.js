const app = require('./app');   //hämtar app från app.js
const mongoose = require('mongoose');   //hämtar mongoose
require('dotenv').config();     //tar dotenv(PORT & MONGO_URI) och lägger i processen

const PORT = process.env.PORT || 9999   //ger dotenv från processen till PORT
app.listen(PORT, () => console.log('Server running at http://localhost:' + PORT)) //startar servern på porten PORT från env från processen

mongoose.connect(process.env.MONGO_URI) //kopplar på databasen med MONGO_URI från env från processen
    .then(() => console.log('connected to DB')) //Skriver ut meddelande om kopplingen gick bra
    .catch(err => console.log(err.message))     //Skriver ut felmeddelande om kopplingen sket sig 