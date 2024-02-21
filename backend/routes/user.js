const express = require('express');
const router = express.Router();
const {
    User
} = require('../db/db');
const {
    z,
    ZodError
} = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    authenticateJwt,
    secretKey
} = require('../middleware/auth')

require("dotenv").config();
const secretkey = process.env.MY_SECRET_KEY;

const signupSchema = z.object({
    username: z.string().email().min(3).max(30),
    firstname: z.string().max(30),
    lastname: z.string().max(30),
    password: z.string().min(6)
})

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const user = await User.findOne({
        username
    });
    if (user) {
        return res.status(403).json({
            message: 'User already exists'
        });
    }
    try {
        const userData = signupSchema.parse(req.body);
        const hashedPassword = await bcrypt.hash(userData.password, 10)

        const newUser = new User({
            username: userData.username,
            firstname: userData.firstname,
            lastname: userData.lastname,
            password: hashedPassword
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
        res.status(200).json({
            success: true,
            msg: 'SignUp Successful : New User Created',
            token: token,
            data: userData
        });
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(411).json({
                success: false,
                msg: 'validation failed'
            });
        } else {
            console.error(error);
            res.status(500).json({
                success: false,
                msg: 'Internal Server Error'
            });
        }
    }

})

router.post('/signin', async (req, res) => {
    const {
        username,
        password
    } = req.body;
    const user = await User.findOne({
        username
    });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password"
        });
    }
    const userId = user._id;

    if (user) {
        const token = jwt.sign({
            userId
        }, secretkey);
        res.status(200).json({
            success: true,
            msg: 'Signin Successful : Welcome back',
            token: token
        })
    } else {
        res.status(411).json({
            msg: "User doesn't exist, please signup"
        });
    }
})

const updateSchema = z.object({
    firstname: z.string().max(30).optional(),
    lastname: z.string().max(30).optional(),
    password: z.string().min(6).optional()
})
router.put('/', authenticateJwt, async (req, res) => {
    const {success} = updateSchema.safeParse(req.body)
    if (!success) {
        console.log('firstname & lastname should be of max 30 letters and password should be a minimum of 6')
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne({ _id: req.user.userId}, req.body)
    res.json({
        message: "User information updated successfully"
    })

})

router.get('/search' , async (req, res) => {
    const filter = req.query.filter || '' ;

    const users = await User.find({
        $or : [{
            firstname : {
                "$regex" : filter
            }

        },{
            lastname : {
                "$regex" : filter
            }
        }]
    })
    res.json({
        user : users.map(user => ({
            username : user.username,
            firstname : user.firstname,
            lastname : user.lastname,
            _id : user._id
        }))  
    })
})



module.exports = router;