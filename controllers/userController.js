const bcrypt = require('bcrypt');
const User = require('../models/User');


// register new User
const register = async (req, res) => {
    const {email, password, role} = req.body
    try{
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword, role });
        user.setAction("register")
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error adding User', error });
    }
};


// login
const login = async(req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try{
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            user.setAction("login");
            res.status(200).json({ message: 'User logged in successfully' });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
}


// Endpoint pour le put
const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (user) {
            user.setAction("update")
            res.status(200).json(user);

        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log("An error occured");
        res.status(500).json({ message: 'Error updating User', error });
    }
}


const getAllUsers = async (req, res) => {
    const adminTokken = req.body.adminTokken
    console.log(adminTokken)

    try {
        if(!adminTokken){
            res.status(401).json({message: 'Admin tokken is required'})
        }
        
        const user = await User.findById(adminTokken);
        if(user.role !== "admin") {
            return res.status(403).json({message: "You are not authorized to acces to this information"})
        }
        const users = await User.find();
        
        return res.status(200).json({users: users})
    } catch(error) {
        res.status(401).json({message: 'Error'})
    }
}


module.exports = {register, login, updateUser, getAllUsers};
