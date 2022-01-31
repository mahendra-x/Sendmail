const app = require('./app');
const express = require('express');
const connectDatabase = require('./config/database');



const dotenv = require('dotenv');

dotenv.config( { path: 'config/config.env'})

connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT}`)
})