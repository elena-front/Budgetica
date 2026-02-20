const apiRouter = require('express').Router();
const authRouter = require('./auth.routes');

apiRouter.use('/auth', authRouter);

module.exports = apiRouter;