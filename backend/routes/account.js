const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Account} = require('../db/db')
const {authenticateJwt} = require('../middleware/auth')

router.get('/balance', authenticateJwt, async (req, res) => {
    const account = await Account.findOne({userId: req.user.userId});
    res.json({balance: account.balance})
});


router.get('/transfer', authenticateJwt, async (req, res) => {
    const session = await mongoose.startSession();
    try {
        await session.startTransaction();
        const { to, amount } = req.body;
        const account = await Account.findOne({userId: req.user.userId}).session(session);

        if (!account || account.balance < amount) {
        await session.abortTransaction();
        res.status(400).json({message: 'Insufficient balance'})
        }

        const toAccount = await Account.findOne({userId: to}).session(session);

        if (!toAccount) {
        await session.abortTransaction();
        res.status(400).json({message: 'Invalid Account'})
        }
        await Account.updateOne({userId: req.user.userId}, {
            $inc: {balance: -amount}
        }).session(session);

        await Account.updateOne({userId: to}, {
            $inc: {balance: amount}
        }).session(session);

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({message: 'Transfer Successful'});
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;