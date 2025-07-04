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
    const data = req.body
    try{
        const usr = await User.find({ email:data.email, password:data.password });
        if (usr.length > 0) {
            res.status(200).json(usr[0]);
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
        const User = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (User) {
            res.status(200).json(User);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log("An error occured");
        res.status(500).json({ message: 'Error updating User', error });
    }
}


module.exports = {addUser, bulkCreate, getAllUsers, getElementById, updateUser, deleteUser};
