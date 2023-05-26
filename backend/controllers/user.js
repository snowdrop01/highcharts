const User = require('../models/user');

exports.getData = async(req,res) => {
    try {
        const userData = await User.find()
        res.status(200).json(userData)

    }
    catch (err) {
        console.log(err.message);
    }
}