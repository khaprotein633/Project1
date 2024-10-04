const Role = require('../model/Role');

const roleController = {
    getAllRoles: async (req, res) => {
        const listRole = await Role.find({});
        res.status(200).json(listRole);
    }
};

module.exports = roleController;