const User = require('../models/User');


// register new User
const registerUser = async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.create(email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error adding User', error });
    }
}


// login
const login = async(req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.findOne({ email, password });
        if (user) {
            res.status(401).json({ message: 'Invalid email or password' });
        } else {
            res.status(200).json({message: "user loged in successfully"});
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
}


module.exports = {register, login};
