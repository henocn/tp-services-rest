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
            res.status(200).json({ message: 'User logged in successfully' });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
}


const getAllUsers = async (req, res) => {
    const adminTokken = req.body.adminTokken
    
    if(!adminTokken){
        res.status(401).json({message: 'Admin tokken is required'})
    }

    const user = await User.findById(adminTokken);
    if(user.role !== "admin" || user.role !== "superadmin") {
        return res.status(403).json({message: "You are not authorized to acces to this information"})
    }
    const users = await User.find();

    return res.status(200).json({users: users})
}


module.exports = {register, login};
