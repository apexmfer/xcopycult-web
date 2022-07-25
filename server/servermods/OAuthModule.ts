import ServerModule from "./ServerModule";


 

require('dotenv').config()


 const GOOGLE_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
 const GOOGLE_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
 const OAUTH_CALLBACK_URL = "http://localhost:3000/auth/google/callback"
 const EXPRESS_SESSION_SECRET = "purpleunicorn5767"
 const passport = require('passport');
 const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
       

 const cookieParser = require('cookie-parser');
 
 const session = require('express-session');



export default class OAuthModule extends ServerModule {

     

    init(expressApp:any){
        this.initPassportStrategy(expressApp)
    }

    initPassportStrategy(expressApp:any){ 


        expressApp.use(session({
        resave: false,
        saveUninitialized: true,
        secret: EXPRESS_SESSION_SECRET
        }));


        /*  PASSPORT SETUP  */
    
        
        var userProfile;

        
        expressApp.use(cookieParser());


    
        expressApp.use(passport.initialize());
        expressApp.use(passport.session());
    
       // expressApp.set('view engine', 'ejs');
    
        //expressApp.get('/auth/success', (req, res) => res.send(userProfile));
        //expressApp.get('/auth/error', (req, res) => res.send("OAuth: error logging in"));
    
        passport.serializeUser(function(user, cb) {
        cb(null, user);
        });
    
        passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
        });
    
     
        passport.use(new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: OAUTH_CALLBACK_URL
        },
        function(accessToken, refreshToken, profile, done) {
            userProfile=profile;
            return done(null, userProfile);
        }
        ));
        
        expressApp.get('/auth/google', 
        passport.authenticate('google', { scope : ['profile', 'email'] }));
        
        expressApp.get('/auth/google/callback', 
        passport.authenticate('google', { failureRedirect: '/error' }),
        async function(req, res)   {
            // Successful authentication 

            //pass on the req inputs to /oauth/success to start the session 
            res.redirect('/oauth/success');
        });
    
        
     }

}

 