import mongoose, { Document, Schema } from "mongoose";

export enum UserRole {
  ADMIN = "ADMIN",
  INSTALLER = "INSTALLER",
  COMPANY = "COMPANY",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  SUSPEND = "SUSPEND",
  BLOCKED = "BLOCKED",
}

export enum AuthProvider {
  LOCAL = "LOCAL",
  GOOGLE = "GOOGLE",
}

export interface IUser extends Document {
  _id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  password: string;
  profilePicture?: string;
  role: UserRole;
  status: UserStatus;
  isDeleted: boolean;
  isVerified: boolean;
  verificationOtp?: string;
  verificationOtpExpiry?: Date;
  resetPasswordOtp?: string;
  resetPasswordOtpExpiry?: Date;
  googleId?: string;
  authProvider?: AuthProvider;
  premiumPlanExpiry?: Date;
  isEnjoyedTrial?: boolean;
  country?: string;
  currency?: string;
  language?: string;
  timezone?: string;
  monthStartDate?: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      select: false,
    },
    profilePicture: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.INSTALLER,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationOtp: {
      type: String,
      select: false,
    },
    verificationOtpExpiry: {
      type: Date,
      select: false,
    },
    resetPasswordOtp: {
      type: String,
      select: false,
    },
    resetPasswordOtpExpiry: {
      type: Date,
      select: false,
    },
    googleId: {
      type: String,
    },
    authProvider: {
      type: String,
      enum: Object.values(AuthProvider),
      default: AuthProvider.LOCAL,
    },
    premiumPlanExpiry: {
      type: Date,
    },
    isEnjoyedTrial: {
      type: Boolean,
      default: false,
    },
    country: { type: String },
    currency: { type: String },
    language: { type: String },
    timezone: { type: String },
    monthStartDate: { type: Number },
  },
  {
    timestamps: true,
  },
);

// Indexes for better query performance (email index created by unique: true)
UserSchema.index({ role: 1 });
UserSchema.index({ status: 1 });
UserSchema.index({ mobileNumber: 1 });
UserSchema.index({ googleId: 1 });

export const User = mongoose.model<IUser>("User", UserSchema);
