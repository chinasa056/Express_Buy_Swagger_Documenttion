const { initializePyment, checkout } = require("../controllers/checkoutController")
const { authenticate } = require("../middleware/authentication")

const router = require("express").Router()
/**
 * @swagger
 * tags:
 *   name: Checkout
 *   description: endpoints to checkout, payment integration and verification
 */

/**
 * @swagger
 * /api/v1/payment/initialize:
 *   post:
 *     summary: Initialize payment using an external payment gateway
 *     description: This endpoint initializes a payment using the Paystack API. It sends the cart's grand total and user email to the Paystack API, which returns an authorization URL for the payment and a payment reference. The reference is stored in the database for future verification.
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: [] # Authentication required vai token
 *     responses:
 *       200:
 *         description: Payment initialized successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Payment Initialized Successfully
 *                 data:
 *                   type: object
 *                   description: Payment details from Paystack
 *                   properties:
 *                     authorization_url:
 *                       type: string
 *                       description: URL to proceed with payment
 *                       example: https://paystack.com/pay/xyz123abc
 *                     reference:
 *                       type: string
 *                       description: Unique payment reference for future verification
 *                       example: 12345-abcde
 *                 transactionDetails:
 *                   type: object
 *                   description: Saved transaction details in the database
 *                   properties:
 *                     amount:
 *                       type: number
 *                       description: Amount to be paid
 *                       example: 5000
 *                     email:
 *                       type: string
 *                       description: User's email address
 *                       example: user@gmail.com
 *                     reference:
 *                       type: string
 *                       description: Unique payment reference
 *                       example: 12345-abcde
 *                     paymentDate:
 *                       type: string
 *                       description: Date and time of payment initialization
 *                       example: 2025-03-23 10:00:00
 *       404:
 *         description: User or cart not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the user or cart could not be located
 *                   example: This User does not have a cart
 *       500:
 *         description: Internal server error while initializing payment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Error Initializing Payment
 */

router.post("/payment/initialize", authenticate, initializePyment)

/**
 * @swagger
 * /api/v1/checkout:
 *   post:
 *     summary: Process checkout after payment verification
 *     description: This endpoint verifies the payment status using the Paystack API. If the payment is successful, it saves the checkout details in the database, clears the cart, and updates the payment status. If the payment fails, the status is updated accordingly.
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: [] # Authentication required
 *     parameters:
 *       - name: reference
 *         in: query
 *         required: true
 *         description: Unique payment reference returned during payment initialization
 *         schema:
 *           type: string
 *           example: 12345-abcde
 *     responses:
 *       200:
 *         description: Checkout processed successfully or payment failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success or failure message
 *                   example: Checkout Successful
 *                 data:
 *                   type: object
 *                   description: Transaction details from the database
 *                   properties:
 *                     amount:
 *                       type: number
 *                       description: Amount paid
 *                       example: 5000
 *                     email:
 *                       type: string
 *                       description: User's email address
 *                       example: user@user.com.com
 *                     reference:
 *                       type: string
 *                       description: Payment reference
 *                       example: 12345-abcde
 *                     status:
 *                       type: string
 *                       description: Payment status
 *                       example: Success
 *       404:
 *         description: User or cart not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the user or cart could not be located
 *                   example: This User does not have a cart
 *       400:
 *         description: Payment verification failed or invalid reference
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Payment Failed
 *                 data:
 *                   type: object
 *                   description: Failed transaction details from the database
 *                   properties:
 *                     reference:
 *                       type: string
 *                       description: Payment reference
 *                       example: 12345-abcde
 *                     status:
 *                       type: string
 *                       description: Payment status
 *                       example: Failed
 *       500:
 *         description: Internal server error while processing checkout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Error Checking Out
 */

router.post("/checkout", authenticate, checkout)


module.exports = router