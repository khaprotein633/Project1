const Role = require('../model/Role');

const roleController = {
    getAllRoles: async (req, res) => {
        try{
            const listRole = await Role.find({});
            res.status(200).json(listRole);
        }catch(err){
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
      
    },
    postRole: async(req,res)=>{
        try{
            const newrole = new Role(req.body);
            await newrole.save();
            res.status(200).json(newrole);
        }
        catch(err){
            console.log('Error:' ,err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
        
    }
};

module.exports = roleController;