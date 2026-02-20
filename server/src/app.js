require('dotenv').config();

const express = require('express');
const apiRouter = require('./routes/api.router');
const PORT = process.env.PORT || 3000;
const serverConfig = require('./config/serverConfig');

const app = express();
serverConfig(app);

app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`server runs on port: ${PORT}`);
});

