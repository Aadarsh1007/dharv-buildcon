const express = require('express');
const app = express();
const contactRoute = require('./routes/contact');

app.use(express.json());
app.use(express.static('public'));

app.use('/api', contactRoute);

app.listen(3000, () => console.log('Server running on port 3000'));