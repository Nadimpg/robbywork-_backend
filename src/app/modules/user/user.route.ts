import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../../helpars/fileUploader";
import { UserRole } from "../../models/User.model";

const router = express.Router();

// Register new user (no auth required)
router.post(
  "/register",
  validateRequest(UserValidation.CreateUserValidationSchema),
  userController.createUser,
);

// Verify registration OTP (no auth required)
router.post(
  "/verify-registration",
  validateRequest(UserValidation.VerifyRegistrationOtpSchema),
  userController.verifyRegistrationOtp,
);

// Resend registration OTP (no auth required)
router.post(
  "/resend-registration-otp",
  validateRequest(UserValidation.ResendRegistrationOtpSchema),
  userController.resendRegistrationOtp,
);

// Complete profile as Fitter (auth required)
router.patch(
  "/complete-profile/fitter",
  auth(UserRole.FITTER),
  fileUploader.upload.single("profilePicture"),
  validateRequest(UserValidation.CompleteProfileAsFitterSchema),
  userController.completeProfileAsFitter,
);

export const userRoutes = router;
