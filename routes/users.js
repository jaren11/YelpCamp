const express = require(`express`)
const router = express.Router()
const catchAsync = require(`../utils/catchAsync`)
const ExpressError = require(`../utils/ExpressError`)
const User = require(`../models/user`)
const passport = require(`passport`)
const users = require(`../controllers/usersController`)


router.route(`/register`)
    .get(users.renderRegisterForm)
    .post(catchAsync(users.createUser))

router.route(`/login`)
    .get(users.renderLoginForm)
    .post(passport.authenticate(`local`, { failureFlash: true, failureRedirect: `/login` }), users.login)

router.route(`/logout`)
    .get(users.logout)

module.exports = router