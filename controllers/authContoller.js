const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
    createUser: async (req, res) => {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString(),
        });

        try {
            await newUser.save();
            res.status(201).json({message: "User successfully created"});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                console.log("Email not found");
                return res.status(401).json("Wrong Login Details");
            }

            const decryptedPass = CryptoJS.AES.decrypt(user.password, process.env.SECRET).toString(CryptoJS.enc.Utf8);
            console.log(`Decrypted password: ${decryptedPass}`);
            console.log(`Entered password: ${req.body.password}`);
            if (decryptedPass !== req.body.password) {
                console.log("Incorrect password");
                return res.status(401).json("Wrong Login Details");
            }

            const userToken = jwt.sign({ id: user._id }, process.env.JWT_SEC, { expiresIn: "21d" });
            const { password, __v, createdAt, ...others } = user._doc;
            res.status(200).json({ ...others, token: userToken });
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}
