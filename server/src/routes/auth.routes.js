const express = require("express")
const authRouter = express.Router();

const {
    signUp,
    signIn,
    refresh,
    signOut
} = require("../controllers/Auth.controller");
const verifyRefreshToken = require("../middleware/verifyRefreshToken");


authRouter
    .post('/signup', signUp)
    .post('/signin', signIn)
    .get('/refresh', verifyRefreshToken, refresh)
    .get('/signout', signOut)

module.exports = authRouter