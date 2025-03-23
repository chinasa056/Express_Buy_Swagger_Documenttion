const { addProduct, getAllProducts, getOneProduct, getProductsByCategory, deleteProduct } = require("../controllers/productController.js")
const { authenticate, adminAuth } = require("../middleware/authentication.js")

const router = require("express").Router()

const upload = require("../utils/multer.js")

/**
 * @swagger
 * /product/{categoryId}:
 *   post:
 *     summary: create a new product,Add a new product under a specific category
 *     security:
 *       - bearerAuth: [] # Requires admin authorization 
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the category to which the product belongs
 *         schema:
 *           type: string
 *           example: 641f1c23e8d431b31cbe98f2
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productImage:
 *                 type: string
 *                 format: binary
 *                 description: Image of the product
 *               description:
 *                 type: string
 *                 description: Description of the product
 *                 example: A high-quality smartphone
 *               price:
 *                 type: number
 *                 description: Price of the product
 *                 example: 499.99
 *     responses:
 *       201:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: New Product Added
 *                 productDetails:
 *                   type: object
 *                   description: Details of the newly added product
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Product ID
 *                       example: 641f1c23e8d431b31cbe98f2
 *                     description:
 *                       type: string
 *                       description: Description of the product
 *                       example: A high-quality smartphone
 *                     price:
 *                       type: number
 *                       description: Price of the product
 *                       example: 499.99
 *                     categoryName:
 *                       type: string
 *                       description: Name of the category
 *                       example: Electronics
 *                     productImage:
 *                       type: object
 *                       properties:
 *                         imageUrl:
 *                           type: string
 *                           description: URL of the uploaded image
 *                           example: https://example.com/image.jpg
 *                         publicId:
 *                           type: string
 *                           description: Cloudinary public ID of the image
 *                           example: abc123def456
 *       404:
 *         description: User or category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: User not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Internal Server Error
 */

router.post("/product/:categoryId", adminAuth, upload.single("productImage"),addProduct)

/**
 * @swagger
 * /allProducts:
 *   get:
 *     summary: Retrieve all products
 *     security:
 *       - bearerAuth: [] # Requires authentication via token
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: All Products
 *                 data:
 *                   type: array
 *                   description: List of product details
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Product ID
 *                         example: 641f1c23e8d431b31cbe98f2
 *                       description:
 *                         type: string
 *                         description: Product description
 *                         example: A high-quality smartphone
 *                       price:
 *                         type: number
 *                         description: Product price
 *                         example: 499.99
 *                       categoryName:
 *                         type: string
 *                         description: Category name
 *                         example: Electronics
 *                       productImage:
 *                         type: object
 *                         properties:
 *                           imageUrl:
 *                             type: string
 *                             description: URL of the product image
 *                             example: https://example.com/image.jpg
 *                           publicId:
 *                             type: string
 *                             description: Cloudinary public ID of the image
 *                             example: abc123def456
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Internal Server Error
 */

router.get("/allProducts", authenticate, upload.single("productImage"),getAllProducts)

/**
 * @swagger
 * /product/{productId}:
 *   get:
 *     summary: Retrieve a single product by its ID
 *     security:
 *       - bearerAuth: [] # Requires authentication via token
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *           example: 641f1c23e8d431b31cbe98f2
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Products Retrieved
 *                 data:
 *                   type: object
 *                   description: Product details
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Product ID
 *                       example: 641f1c23e8d431b31cbe98f2
 *                     description:
 *                       type: string
 *                       description: Description of the product
 *                       example: A high-quality smartphone
 *                     price:
 *                       type: number
 *                       description: Price of the product
 *                       example: 499.99
 *                     categoryName:
 *                       type: string
 *                       description: Category name
 *                       example: Electronics
 *                     productImage:
 *                       type: object
 *                       properties:
 *                         imageUrl:
 *                           type: string
 *                           description: URL of the product image
 *                           example: https://example.com/image.jpg
 *                         publicId:
 *                           type: string
 *                           description: Cloudinary public ID of the image
 *                           example: abc123def456
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Product Not Found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Internal Server Error
 */

router.get("/product/:productId", authenticate, upload.single("productImage"),getOneProduct);

/**
 * @swagger
 * /product/delete/{productId}/{categoryId}:
 *   delete:
 *     summary: Delete a product and remove its association with a category
 *     security:
 *       - bearerAuth: [] # Requires admin authorization
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *           example: 641f1c23e8d431b31cbe98f2
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the associated category
 *         schema:
 *           type: string
 *           example: 641f1c73e8d431b31cbe98f5
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Product deleted successfully
 *       404:
 *         description: Product or category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Product Not Found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Internal Server Error
 */

router.delete("/product/delete/:productId/:categoryId", adminAuth,upload.single("productImage"), deleteProduct)

module.exports = router