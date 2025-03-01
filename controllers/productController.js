const Product = require("../models/products");
const ExpressError = require("../utils/ExpressError");

// Add a product
exports.addProduct = async (req, res, next) => {
  const newProduct = new Product(req.body);

  // adding owner to products
  newProduct.owner = req.user._id;

  await newProduct.save();
  res.status(201).json({
    message: "Product Created",
    data: [newProduct],
  });
};

// Get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("owner");
    res.json({
      message: "All Available Products",
      data: products,
    });
  } catch (e) {
    next(new ExpressError(500, e.message));
  }
};

// Get a single product
exports.getSpecificProduct = async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findById(productId).populate("owner");
  res.json({
    message: "Specific Product",
    data: [product],
  });
};

// Update a product
exports.updateProduct = async (req, res, next) => {
  const { productId } = req.params;

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { ...req.body },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json({
    message: "Product Updated",
    data: [updatedProduct],
  });
};

// Delete a product
exports.deleteProduct = async (req, res, next) => {
  const { productId } = req.params;

  const deletedProduct = await Product.findByIdAndDelete(productId);
  res.json({ message: "Product deleted", data: [deletedProduct] });
};

// Fetch featured products
exports.getFeaturedProducts = async (req, res, next) => {
  const products = await Product.find({ featured: true });
  res.json({ message: "All Featured Products", data: products });
};

// Fetch products with price less than a certain value
exports.getProductsByPrice = async (req, res) => {
  const products = await Product.find({ price: { $lt: req.query.maxPrice } });
  res.json(products);
};

// Fetch products with rating higher than a certain value
exports.getProductsByRating = async (req, res) => {
  const products = await Product.find({
    rating: { $gte: req.query.minRating },
  });
  res.json(products);
};
