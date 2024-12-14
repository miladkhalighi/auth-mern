import express from "express";
import {
  singUpCtr,
  verifyEmailCtr,
  logInCtr,
  logOutCtr,
  forgotPassCtr,
  resetPassCtr,
  checkAuth
} from "../controllers/auth.controller.js";
import verifyToken from '../midlewares/verifyToken.js'
const router = express.Router();

router.post("/signup", singUpCtr);
router.post("/login", logInCtr);
router.post("/logout", logOutCtr);

router.post("/verify-email", verifyEmailCtr);
router.post("/forgot-password", forgotPassCtr);
router.post("/reset-password/:token", resetPassCtr);

router.get("/check-auth",verifyToken,checkAuth)

export default router;
