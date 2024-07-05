const User = require("../models/User");

const userController = {
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json("User not found");
            }
            const { password, ...others } = user._doc;
            res.status(200).json(others);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = userController;
