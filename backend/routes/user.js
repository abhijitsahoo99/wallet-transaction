const express = require('express');
const router = express.Router();
const {User} = require('../db/db');
const {z, ZodError} = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require("dotenv").config();
const secretkey = process.env.MY_SECRET_KEY;

const signupSchema = z.object({
    username : z.string().email().min(3).max(30),
    firstname : z.string().max(30),
    lastname: z.string().max(30),
    password : z.string().min(6)
})

router.post('/signup', async(req , res)=>{
    const username = req.body.username;
    const user = await User.findOne({ username });
    if(user) {
        return res.status(403).json({ message : 'User already exists' });
    }
    try{
        const userData = signupSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(userData.password, 10)

        const newUser = new User({
            username : userData.username,
            firstname : userData.firstname,
            lastname : userData.lastname,
            password : hashedPassword
        })
        // const user = await User.create({
        //     username: req.body.username,
        //     password: req.body.password,
        //     firstName: req.body.firstName,
        //     lastName: req.body.lastName,
        // })
        // const userId = user._id;
    
        // const token = jwt.sign({
        //     userId
        // }, secretkey);
    
        // res.status(200).json({success : true , msg : 'SignUp Successful : New User Created' , token : token , data: userData});

        await newUser.save();
        const userId = newUser._id;
        const token = jwt.sign({
            userId
        }, secretkey);
        res.status(200).json({success : true , msg : 'SignUp Successful : New User Created' , token : token , data: userData});
    }
    catch(error){
        if(error instanceof ZodError){
            res.status(400).json({success: false , msg : 'validation failed'});
        }
        else{
            console.error(error);
            res.status(500).json({success: false , msg : 'Internal Server Error'});
        }
    }

})
module.exports = router;