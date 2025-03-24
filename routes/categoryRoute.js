const { createCategory, getAllCategoryy, getOneCategory } = require("../controllers/categoryController")
const { authenticate } = require("../middleware/authentication")

const router = require("express").Router()
/**
 * @swagger
 * tags:
 *   name: category
 *   description: endpoints relating to ategories
 */

/**
 * @swagger
 * /api/v1/category:
 *   post:
 *     summary: Create a new category
 *     tags: [category]
 *     security:
 *       - bearerAuth: [] # Authentication required via a bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *                 example: Electronics
 *     responses:
 *       201:
 *         description: New category added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: New Category Added
 *                 data:
 *                   type: object
 *                   description: The newly created category details
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: ID of the new category
 *                       example: 641f1c23e8d431b31cbe98f2
 *                     name:
 *                       type: string
 *                       description: Name of the category
 *                       example: Electronics
 *       400:
 *         description: Category already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Category already exists
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
 *                 error:
 *                   type: string
 *                   description: Detailed error information
 */

router.post("/category", authenticate, createCategory);


/**
 * @swagger
 * /api/v1/allCategories:
 *   get:
 *     summary: Retrieve all categories
 *     tags: [category]
 *     security:
 *       - bearerAuth: [] # Authentication required via a bearer token
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: All Categories Available
 *                 data:
 *                   type: array
 *                   description: Array of all category objects
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: ID of the category
 *                         example: 641f1c23e8d431b31cbe98f2
 *                       name:
 *                         type: string
 *                         description: Name of the category
 *                         example: Electronics
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
 *                 error:
 *                   type: string
 *                   description: Detailed error information
 */

router.get("/allCategories", authenticate, getAllCategoryy)

/**
 * @swagger
 * /api/v1/category/{categoryId}:
 *   get:
 *     summary: Retrieve a single category by ID and associated proucts
 *     tags: [category]
 *     security:
 *       - bearerAuth: [] # Authentication required via a bearer token
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the category to retrieve
 *         schema:
 *           type: string
 *           example: 641f1c23e8d431b31cbe98f2
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Category Retrieved Successfully
 *                 data:
 *                   type: object
 *                   description: The category details
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: ID of the category
 *                       example: 641f1c23e8d431b31cbe98f2
 *                     name:
 *                       type: string
 *                       description: Name of the category
 *                       example: Electronics
 *                     productIds:
 *                       type: array
 *                       description: List of associated product IDs
 *                       items:
 *                         type: string
 *                         example: 641f1c73e8d431b31cbe98f5
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Category Not Found
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
 *                 error:
 *                   type: string
 *                   description: Detailed error information
 */

router.get("/category/:categoryId", authenticate, getOneCategory)


module.exports = router