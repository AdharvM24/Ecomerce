const Product = require('../../models/Products');
const cloudinary = require('../../middleware/cludinary');

exports.createProduct = async (req, res) => {
    try {
        console.log('admin datas products!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        const result = await cloudinary.uploader.upload(req.file.path);

        const { name, description, price, category, rating } = req.body;
        const product = new Product({
            name,
            description,
            price,
            category,
            rating,
            imageUrl: result.secure_url
        });

        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found',
            error_code: 1404,
            data: {},
        });
        }
        res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
        data: {},
        });
    } catch (err) {
        res.status(500).json({
        success: false,
        message: err.message,
        error_code: 1500,
        data: {},
        });
    }
    };