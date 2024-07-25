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
