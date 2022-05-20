const express = require(`express`)
const router = express.Router()
const catchAsync = require(`../utils/catchAsync`)
const ExpressError = require(`../utils/ExpressError`)
const Campground = require(`../models/campground`)
const { isLoggedIn, isAuthor, validateCampground } = require(`../middleware`)
const { storage } = require(`../cloudinary`)
const campgrounds = require(`../controllers/campgroundsController`)

const multer = require(`multer`)
const upload = multer({ storage })

router.route(`/`)
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array(`image`), validateCampground, catchAsync(campgrounds.createCampground))

router.route(`/new`)
    .get(isLoggedIn, campgrounds.renderNewForm)

router.route(`/:id`)
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, upload.array(`image`), catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, catchAsync(campgrounds.deleteCampground))

router.route(`/:id/edit`)
    .get(isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router;