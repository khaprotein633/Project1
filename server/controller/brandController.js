const Brands = require('../model/Brands');

const brandController = {
    getAllBrands: async (req, res) => {
        const listBrand = await Brands.find({});
        res.status(200).json(listBrand);
    }
};

module.exports = brandController;