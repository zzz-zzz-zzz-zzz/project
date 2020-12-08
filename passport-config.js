const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./models/user')


function initialize(passport) {
    const authenticateUser = async (username, password, done) => {
        const user = await User.findOne({username: username})
        if (user == null) {
            return done(null, false, {message: 'No such user'})
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: 'Password incorrect'})
            }
        } catch (err){
            return done(err)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'username'},
    authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, User.findById(id))
    })
}

module.exports = initialize