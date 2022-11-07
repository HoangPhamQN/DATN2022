require("dotenv").config();
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')

const { User, Role } = require('../models');
const { route } = require("../routes/auth.route");

passport.serializeUser(function (user, done) {
    done(null, user.id);
});
// used to deserialize the user
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.CALLBACK_URL,
// },
//     async (accessToken, refreshToken, profile, done) => {
//         //get the user data from google 
//         const newUser = {
//             googleId: profile.id,
//             displayName: profile.displayName,
//             firstName: profile.name.givenName,
//             lastName: profile.name.familyName,
//             image: profile.photos[0].value,
//             email: profile.emails[0].value
//         }

//         try {
//             //find the user in our database 
//             let user = await User.findOne({ googleId: profile.id })

//             if (user) {
//                 //If user present in our database.
//                 done(null, user)
//             } else {
//                 // if user is not preset in our database save user data to database.
//                 user = await User.create(newUser)
//                 done(null, user)
//             }
//         } catch (err) {
//             console.error(err)
//         }

//     });
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            const role = await Role.find({ 'name': 'Buyer' })
            console.log(role)
            //get the user data from google 
            const newUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                givenName: profile.name.givenName,
                familyName: profile.name.familyName,
                photoUrl: profile.photos[0].value,
                email: profile.emails[0].value,
                role: role[0].id
            }

            try {
                //find the user in our database 
                let user = await User.findOne({ googleId: profile.id })

                if (user) {
                    //If user present in our database.
                    done(null, user)
                } else {
                    // if user is not preset in our database save user data to database.
                    user = await User.create(newUser)
                    done(null, user)
                }
            } catch (err) {
                console.error(err)
            }
        }
    )
)