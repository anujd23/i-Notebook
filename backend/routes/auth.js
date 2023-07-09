const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

//Router 1: Create a user using: Post "/api/auth/createuser" . no login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Enter a password of atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    // If there are errors, return Bad request and the errors
    let success=false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // check whether the user already exists
        let user = await User.findOne({ email: req.body.email });
        // console.log(user);
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email is already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // create a new user 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data ={
            user : {
                id: user.id,
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);

        // console.log(jwtData);
        success=true;
        res.json({success, authtoken});

        // catch errors
    } catch (error) {
        console.error(error.message),
        res.status(500).send("Internal Server Error")
    }
})



// Router 2: Authenticate a user using: Post "/api/auth/login" . no login required
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannnot be blank').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    // If there are errors, return Bad request and the errors
    let success=false;
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
            return res.status(400).json({error : "Please Enter a Valid Credential"});
        }

        const passwordCompare = await bcrypt.compare(req.body.password, user.password)
        if(!passwordCompare){
            return res.status(400).json({success, error : "Please Enter a Valid Credential"});
        }

        const data = {
            user : {
                id: user.id,
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);

        // console.log(jwtData);
        success=true;
        res.json({success, authtoken});

    } catch (error) {
        console.error(error.message),
        res.status(500).send("Internal Server Error")
    }
})



// Router 3:  Get loggedIN User Details : Post "/api/auth/getuser" .    login required
router.post('/getuser', fetchuser, async (req, res) => {
    
    try {
        const userId = req.user.id; // getting the user id
        // console.log(userId);
        const user = await User.findById(userId).select("-password"); // taking the data from the user database except the password
        res.send(user);   // sending the user data in res
    } catch (error) {
        console.error(error.message),
        res.status(500).send("Internal Server Error")
    }
})


module.exports = router;
