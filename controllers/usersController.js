const User = require(`../models/user`)

module.exports.renderRegisterForm = (req, res) => {
    res.render(`users/register`)
}

module.exports.createUser = async (req, res) => {
    try {
        const { email, username, password } = req.body
        const theUser = new User({ email, username })
        const registeredUser = await User.register(theUser, password)
        req.login(registeredUser, err => {
            if (err) {
                return next(err)
            }
            req.flash(`success`, `Welcome to Yelpcamp, ${registeredUser.username}!`)
            res.redirect(`/campgrounds`)
        })
    } catch (e) {
        req.flash(`error`, e.message)
        res.redirect(`register`)
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render(`users/login`)
}

module.exports.login = (req, res) => {
    const { username } = req.body
    req.flash(`success`, `Welcome back to YelpCamp, ${username}!`)
    const redirectUrl = req.session.returnTo || `/campgrounds`
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res) => {
    req.logout()
    req.flash(`success`, `Logged out`)
    const redirectUrl = req.session.returnTo || `/campgrounds`
    delete req.session.returnTo
    res.redirect(redirectUrl)
}