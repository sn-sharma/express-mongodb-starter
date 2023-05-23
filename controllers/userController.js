const bcrypt = require('bcrypt')
const User = require("../models/user")

// API Health
exports.health = (req, res) => {
    res.send("APIs are running...")
};

// Users List
exports.userList = async (req, res) => {
    let userList = await User.find().sort({ name: 1 })
    
    res.send(200, userList)
};

// Users Details
exports.userDetails = async (req, res) => {
    let userDetail = await User.find({_id: req.params.id}, {name: 1, email: 1, phone: 1})
    
    res.send(200, userDetail)
};

// Users Create
exports.userCreate = async (req, res) => {
    const passwordHash = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS));

    let userDetail = await User.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: passwordHash,
    })

    res.send(200, userDetail)
};

// Users Update
exports.userUpdate = async (req, res) => { 
    let userDetail;

    if(req.body.password){
        const passwordHash = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS));

        userDetail = await User.updateOne({ _id:req.body.user_id }, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: passwordHash,
        })
    }else{
        userDetail = await  User.updateOne({ _id:req.body.user_id }, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
        })
    }

    res.send(200, userDetail)
};

// Users Delete
exports.userDelete = async (req, res) => {
    await User.deleteOne({ _id:req.params.id }).then(data => res.json({status:"success"}))

    res.send(200, { status:"success" })
};
