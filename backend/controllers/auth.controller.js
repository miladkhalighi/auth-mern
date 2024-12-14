import bcrypt from "bcryptjs";
import crypto from "crypto";
import { User } from "../model/user.model.js";
import {
  generateTokenAndSetCookie,
  generateVerificationToken,
} from "../utils/generateToken.js";
import {
  sendResetPasswordEmail,
  sendUpdatePasswordSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/emails.js";

export const singUpCtr = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "email or password are required" });
  }

  try {
    //existance
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ success: false, message: "this email has already in used" });
    }
    //hash password
    const hashedPass = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();
    //create userschema
    const user = new User({
      email,
      password: hashedPass,
      name,
      verificationToken,
      verificationExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24H
    });

    await user.save();
    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(user.email, user.verificationToken);

    res.status(200).json({
      success: true,
      message: "user has created successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const verifyEmailCtr = async (req, res) => {
  const { verificationToken } = req.body;
  if (!verificationToken) {
    return res
      .status(400)
      .json({ success: false, message: "otp code is requried" });
  }
  try {
    const user = await User.findOne({
      verificationToken: verificationToken,
      verificationExpiresAt: { $gt: Date.now() },
      verified: false,
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "invalid or expired token" });
    }

    user.verified = true;
    user.verificationToken = undefined;
    user.verificationExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    return res.status(200).json({
      success: true,
      message: "user verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "interval server error",
      error: error.message,
    });
  }
};

export const logInCtr = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials" });
    }

    const matchPass = await bcrypt.compare(password, user.password);

    if (!matchPass) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials" });
    }
    if (!user.verified) {
      return res.status(400).json({
        success: false,
        verified: false,
        message: "User need to be verified!",
      });
    }

    generateTokenAndSetCookie(res, user._id);
    user.lastLoginAt = new Date();
    await user.save();

    return res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const forgotPassCtr = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found !" });
    }

    //reset pass token
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //1H

    await user.save();

    await sendResetPasswordEmail(user.email, token);

    res.status(200).json({
      success: true,
      message: "reset password link sent to your email!",
      token,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const resetPassCtr = async (req, res) => {
    
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "token is invalid or expired!" });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    user.password = hashedPass;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;

    await user.save();

    await sendUpdatePasswordSuccessEmail(user.email)

    return res
      .status(200)
      .json({
        success: true,
        message: "user password updated successfully!",
        user: { ...user._doc, password: undefined },
      });
  } catch (error) {
    res.status(400).json({success : false, error : error.message})
  }
};

export const logOutCtr = (_, res) => {
  res.clearCookie("token");
  res
    .status(200)
    .json({ success: true, message: "user logged out successfully!" });
};

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};