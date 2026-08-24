const express = require('express');

const app = express();

const router = require('./routes/jobs-routes.js');

app.use('/api', router);
app.listen(3000);