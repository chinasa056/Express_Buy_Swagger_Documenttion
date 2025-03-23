const { addToCart, getcart, reduceProductQuantity, clearCart, deleteProductFromCart } = require("../controllers/cartController");
const { authenticate } = require("../middleware/authentication");

const router = require("express").Router()


/**
 * @swagger
 * /cart/{productId}:
 *   post:
 *     summary: Add a product to the user's cart
 *     description: This endpoint allows authenticated users to add a specific product to their cart. If the product already exists in the cart, its quantity is increased, and the total price is updated. If the cart does not exist, a new cart is created.
 *     security:
 *       - bearerAuth: [] # Authentication required via token
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to add to the cart
 *         schema:
 *           type: string
 *           example: 641f1c23e8d431b31cbe98f2
 *     responses:
 *       201:
 *         description: Product added to the cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Products added to cart
 *                 data:
 *                   type: object
 *                   description: Cart details containing products and the grand total price
 *                   properties:
 *                     products:
 *                       type: array
 *                       description: List of products in the cart
 *                       items:
 *                         type: object
 *                         properties:
 *                           productId:
 *                             type: string
 *                             description: ID of the product
 *                             example: 641f1c23e8d431b31cbe98f2
 *                           quantity:
 *                             type: number
 *                             description: Quantity of the product
 *                             example: 2
 *                           unitPrice:
 *                             type: number
 *                             description: Price per unit of the product
 *                             example: 499.99
 *                           unitTotal:
 *                             type: number
 *                             description: Total price for this product
 *                             example: 999.98
 *                     grandTotal:
 *                       type: number
 *                       description: Total cost of all products in the cart
 *                       example: 1499.97
 *       404:
 *         description: User or product not found
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

router.post("/cart/:productId", authenticate, addToCart);

/**
 * @swagger
 * /allCart:
 *   get:
 *     summary: Retrieve all carts
 *     description: This endpoint retrieves a list of all carts in the database, including the products in each cart and the grand total for each user.
 *     security:
 *       - bearerAuth: [] # Authentication required via token
 *     responses:
 *       200:
 *         description: List of all carts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: All Products in the cart
 *                 data:
 *                   type: array
 *                   description: Array of all cart objects, each associated with a user
 *                   items:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: string
 *                         description: User associated with the cart
 *                         example: 641f1c23e8d431b31cbe98f3
 *                       products:
 *                         type: array
 *                         description: List of products in the cart
 *                         items:
 *                           type: object
 *                           properties:
 *                             productId:
 *                               type: string
 *                               description: ID of the product
 *                               example: 641f1c23e8d431b31cbe98f2
 *                             quantity:
 *                               type: number
 *                               description: Quantity of the product
 *                               example: 2
 *                             unitPrice:
 *                               type: number
 *                               description: Price per unit of the product
 *                               example: 499.99
 *                             unitTotal:
 *                               type: number
 *                               description: Total price for this product
 *                               example: 999.98
 *                       grandTotal:
 *                         type: number
 *                         description: Total cost of all products in the cart
 *                         example: 1499.97
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

router.get("/allCart", authenticate, getcart)

/**
 * @swagger
 * /cart/reduce/{productId}:
 *   patch:
 *     summary: Reduce the quantity of a product in the cart
 *     description: This endpoint allows authenticated users to reduce the quantity of a specific product in their cart. If the quantity becomes 0, the product is removed from the cart. The cart’s grand total is updated accordingly.
 *     security:
 *       - bearerAuth: [] # Authentication required
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to reduce
 *         schema:
 *           type: string
 *           example: 641f1c23e8d431b31cbe98f2
 *     responses:
 *       200:
 *         description: Product quantity reduced successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Product quantity reduced
 *                 data:
 *                   type: object
 *                   description: Cart details with updated product quantities and grand total
 *                   properties:
 *                     products:
 *                       type: array
 *                       description: List of products in the cart
 *                       items:
 *                         type: object
 *                         properties:
 *                           productId:
 *                             type: string
 *                             description: ID of the product
 *                             example: 641f1c23e8d431b31cbe98f2
 *                           quantity:
 *                             type: number
 *                             description: Updated quantity of the product
 *                             example: 1
 *                           unitTotal:
 *                             type: number
 *                             description: Updated total price for this product
 *                             example: 499.99
 *                     grandTotal:
 *                       type: number
 *                       description: Updated total cost of all products in the cart
 *                       example: 999.98
 *       404:
 *         description: User, product, or cart not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Product not found in cart
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

router.patch("/cart/reduce/:productId", authenticate, reduceProductQuantity)

/**
 * @swagger
 * /cart/delete/{productId}:
 *   delete:
 *     summary: Delete a specific product from the cart
 *     description: This endpoint allows authenticated users to remove a specific product from their cart entirely. The cart’s grand total is updated accordingly.
 *     security:
 *       - bearerAuth: [] # Authentication required
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to remove from the cart
 *         schema:
 *           type: string
 *           example: 641f1c23e8d431b31cbe98f2
 *     responses:
 *       200:
 *         description: Product removed from the cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Product removed from cart
 *                 data:
 *                   type: object
 *                   description: Updated cart details
 *                   properties:
 *                     products:
 *                       type: array
 *                       description: List of remaining products in the cart
 *                       items:
 *                         type: object
 *                         properties:
 *                           productId:
 *                             type: string
 *                             description: ID of the product
 *                             example: 641f1c23e8d431b31cbe98f2
 *                           quantity:
 *                             type: number
 *                             description: Quantity of the product
 *                             example: 2
 *                           unitTotal:
 *                             type: number
 *                             description: Total price for this product
 *                             example: 999.98
 *                     grandTotal:
 *                       type: number
 *                       description: Updated total cost of all products in the cart
 *                       example: 499.99
 *       404:
 *         description: User, cart, or product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Product not found in cart
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

router.delete("/cart/delete/:productId", authenticate, deleteProductFromCart)

/**
 * @swagger
 * /clearCart:
 *   delete:
 *     summary: Clear all products in the user's cart
 *     description: This endpoint allows authenticated users to clear their cart entirely, removing all products and resetting the grand total to 0.
 *     security:
 *       - bearerAuth: [] # Authentication required
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Cart deleted successfully
 *                 data:
 *                   type: object
 *                   description: Updated cart details (empty)
 *                   properties:
 *                     products:
 *                       type: array
 *                       description: Empty list of products in the cart
 *                       items:
 *                         type: object
 *                     grandTotal:
 *                       type: number
 *                       description: Total cost of all products in the cart, now 0
 *                       example: 0
 *       404:
 *         description: User or cart not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Cart not found
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

router.delete("/clearCart", authenticate, clearCart)


module.exports = router

// swagger": "^0.7.5",
//     "swagger-jsdoc": "^6.2.8",
//     "swagger-ui-express":