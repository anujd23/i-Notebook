const jwt = require('jsonwebtoken')
const JWT_SECRET = 'Ye boy machake'

const fetchuser = (req, res, next)=>{
   // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');  // get the token from the header
    if(!token){
        res.status(401).send("Please authenticate with a valid token"); // if someone change the token  
    }
    
    try {
        const data =  jwt.verify(token, JWT_SECRET);   // verify the token to get the user Data
        req.user = (data.user)  // add the user data to the req
        next(); // it verify and execute the next function written in auth.js
    } catch (error) {
        console.error(error.message), // for any kind of error occured 
        res.status(500).send("Internal Server Error")
    }
}


module.exports = fetchuser;