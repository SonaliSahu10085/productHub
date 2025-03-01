const express = require("express");
const productController = require("../controllers/productController");
const wrapAsync = require("../utils/wrapAsync");
const { validateProduct } = require("../middlewares/serverValidation");
const IsValidProduct = require("../middlewares/IsValidProduct");
const { IsAuthenticated, IsOwner } = require("../middlewares/auth");

const router = express.Router();

/* GET - Retrieves all products, optionally filtered by price or rating */
router.get("/", wrapAsync(productController.getAllProducts));

/* GET - Retrives all featured/favourtie products. */
router.get(
  "/featured",
  IsAuthenticated,
  wrapAsync(productController.getFeaturedProducts)
);

/* POST - Add new product. */
router.post(
  "/new",
  IsAuthenticated,
  validateProduct,
  wrapAsync(productController.addProduct)
);

/* GET - Retrives a specific product by ID. */
router.get(
  "/:productId",
  IsValidProduct,
  wrapAsync(productController.getSpecificProduct)
);

/* PATCH - Updates a product by ID. */
router.patch(
  "/:productId",
  IsAuthenticated,
  IsValidProduct,
  IsOwner,
  validateProduct,
  wrapAsync(productController.updateProduct)
);

/* DELETE - Deletes a product by ID. */
router.delete(
  "/:productId",
  IsAuthenticated,
  IsValidProduct,
  IsOwner,
  wrapAsync(productController.deleteProduct)
);

module.exports = router;
