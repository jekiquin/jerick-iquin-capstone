const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config;
PORT=process.env.PORT || 8000;

app.use(cors());
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
    console.log('Press ctrl+c to stop.')
})
