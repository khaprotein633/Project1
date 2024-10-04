const User  = require('../model/User')


const userController = {
    GetAllUser : async (req,res) =>{
        const AllUser = await User.find({});
        res.status(200).json(AllUser);
    }
}
module.exports = userController;