const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const createUser = async (req, res) => {
    try {
        const { fullname, email, mobile, password } = req.body;

      
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            fullname,
            email,
            mobile,
            password: hashedPassword
        });

        res.status(201).json({ message: "User created successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user)
            return res.status(404).json({ message: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid)
            return res.status(401).json({ message: "Invalid password" });

        
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                fullname: user.fullname
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                fullname: user.fullname,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



const verifyToken = (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ valid: false, message: "No token" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        res.json({ valid: true, user: decoded });

    } catch (err) {
        res.status(401).json({ valid: false, message: "Invalid or expired token" });
    }
};




module.exports = { createUser, loginUser, verifyToken, forgetPassword };