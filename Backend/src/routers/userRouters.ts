import express from 'express';
import { Login, Register,Logout, verifyToken, filterUserforId } from '../controllers/UserController';

const router = express.Router();

router.post('/register', Register)
router.post('/login',Login)
router.post('/logout',Logout)
router.get('/verify',verifyToken)
router.get('/user/:id', filterUserforId)
router.get("/:id", filterUserforId)

export default router;