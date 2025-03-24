const express = require('express')
const { registerUser, loginUser, verifyUser, forgotPassword, resetUserPassword, registerAdmin} = require('../controllers/userController')
const { authenticate, adminAuth} = require('../middleware/authentication');
const { registerUserValidator, loginValidator } = require('../middleware/validator');

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Onboarding
 *   description: endpoints relating to onboarding a user
 */

/**
 * @swagger
 * /api/v1/admin/register:
 *   post:
 *     summary: Register a new admin
 *     tags: [Onboarding]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Full name of the admin
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 description: Email of the admin
 *                 example: jane.doe@gmail.com
 *               password:
 *                 type: string
 *                 description: Password of the admin
 *                 example: JaneDoe$123
 *               confirmPassword:
 *                 type: string
 *                 description: Password confirmation
 *                 example: JaneDoe$123
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fullName:
 *                   type: string
 *                   description: Full name of the admin
 *                   example: Jane Doe
 *                 email:
 *                   type: string
 *                   description: Email of the admin
 *                   example: jane.doe@gmail.com
 *                 roles:
 *                   type: string
 *                   description: Admin role
 *                   example: admin
 *       400:
 *         description: Admin with this email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: Duplicate email used
 *                   example: jane.doe@gmail.com
 *       500:
 *         description: Error registering admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

router.post("/admin/register", registerUserValidator, registerAdmin) 

/**
 * @swagger
 * /api/v1/admin:
 *   post:
 *     summary: Register an admin with authentication
 *     tags: [Onboarding]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Full name of the admin
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: Email of the admin
 *                 example: john.doe@gmail.com
 *               password:
 *                 type: string
 *                 description: Password of the admin
 *                 example: JohnDoe$123
 *               confirmPassword:
 *                 type: string
 *                 description: Password confirmation
 *                 example: JohnDoe$123
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fullName:
 *                   type: string
 *                   description: Full name of the admin
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   description: Email of the admin
 *                   example: john.doe@gmail.com
 *                 roles:
 *                   type: string
 *                   description: Admin role
 *                   example: admin
 *       400:
 *         description: Admin with this email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: Duplicate email used
 *                   example: john.doe@gmail.com
 *       500:
 *         description: Error registering admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

router.post("/admin",adminAuth, registerAdmin)

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Onboarding]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Full name of the user
 *                 example: Alice Bob
 *               email:
 *                 type: string
 *                 description: Email of the user
 *                 example: alice.bob@gmail.com
 *               password:
 *                 type: string
 *                 description: Password of the user
 *                 example: AliceBob$123
 *               confirmPassword:
 *                 type: string
 *                 description: Password confirmation
 *                 example: AliceBob$123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fullName:
 *                   type: string
 *                   description: Full name of the user
 *                   example: Alice Bob
 *                 email:
 *                   type: string
 *                   description: Email of the user
 *                   example: alice.bob@gmail.com
 *       400:
 *         description: User with this email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: Duplicate email used
 *                   example: alice.bob@gmail.com
 *       500:
 *         description: Error registering user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

router.post('/register',registerUserValidator,registerUser);

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: User login
 *     tags: [Onboarding]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user
 *                 example: alice.bob@gmail.com
 *               password:
 *                 type: string
 *                 description: Password of the user
 *                 example: AliceBob$123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Login success message
 *                   example: Account login successful
 *                 user:
 *                   type: object
 *                   description: User details
 *                   properties:
 *                     fullName:
 *                       type: string
 *                       description: Full name of the user
 *                       example: Alice Bob
 *                     email:
 *                       type: string
 *                       description: Email of the user
 *                       example: alice.bob@gmail.com
 *                 token:
 *                   type: string
 *                   description: Authorization token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid credentials or account not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Incorrect password
 *       500:
 *         description: Error logging in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Internal server error
 */

router.post('/login',loginValidator, loginUser);

/**
 * @swagger
 * /api/v1/verify/user/{token}:
 *   get:
 *     summary: Verify user account using a token
 *     tags: [Onboarding]
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         description: Verification token
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Account verified successfully
 *       400:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Invalid token
 *       404:
 *         description: Account not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Account not found
 *       500:
 *         description: Error verifying account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Internal server error
 */

router.get('/verify/user/:token', verifyUser);

/**
 * @swagger
 * /api/v1/forgot_password/user:
 *   post:
 *     summary: Initiate password reset
 *     tags: [Onboarding]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user
 *                 example: alice.bob@gmail.com
 *     responses:
 *       200:
 *         description: Link sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Link has been sent to email address
 *       404:
 *         description: Account not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Account not found
 *       500:
 *         description: Error initiating password reset
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Internal server error
 */

router.post('/forgot_password/user', forgotPassword);

/**
 * @swagger
 * /api/v1/reset_password/user/{token}:
 *   post:
 *     summary: Reset user password using a token
 *     tags: [Onboarding]
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         description: Reset token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: New password
 *                 example: AliceBob$123
 *               confirmPassword:
 *                 type: string
 *                 description: Password confirmation
 *                 example: AliceBob$123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Password changed successfully
 *       400:
 *         description: Password mismatch or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Invalid token
 *       404:
 *         description: Account not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Account not found
 *       500:
 *         description: Error resetting password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: Internal server error
 */

router.post('/reset_password/user/:token', resetUserPassword);


module.exports = router;
