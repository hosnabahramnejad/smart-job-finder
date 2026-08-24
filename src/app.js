const express = require('express');

const app = express();

app.use(express.json());

const jobsrouter = require('./routes/jobs-routes.js');
const profilerouter = require('./routes/profile-routes.js');

app.use('/api', jobsrouter);
app.use('/api', profilerouter);
app.listen(3000);