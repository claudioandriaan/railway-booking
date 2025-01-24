import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Client from "../models/ClientModel.js";

export const register = async (req, res) => {
    try {
        const { firstname, lastname, email, phone, password } = req.body;

        if (!firstname || !lastname || !email || !phone || !password)  {
            res.status(400).json({error: 'All fields are required!'});
        }

        // Check if the user already exists
        const clientExist = await Client.findOne({phone});
        if(clientExist){
            return res.status(400).json({ error: 'Client already exists with this Phone Number' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const user = new Client({
            firstname,
            lastname,
            email,
            phone,
            password: hashedPassword
        });

        // Save the user in the database
        await user.save();

        // Send a success response
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

export const login = async (req, res) => {
    try {
        // Check  user
        const user = await Client.findOne({ phone: req.body.phone });
        if (!user) {
            return res.status(401).json({ message: 'User not found!' });
        }
        // Compare the password
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) {
            return res.status(401).json({ message: 'Incorrect password!' });
        }

        const token = jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
        );

        res.status(200).json({
            userId: user._id,
            token: token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUsers = async (req, res) => {
    const users = await Client.find();
    if(!users) {
        return res.status(401).json({ message: 'No user found!' });
    }
    res.status(200).json({users});
}