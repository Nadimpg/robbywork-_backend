import mongoose, { Document, Schema } from "mongoose";

export enum UserRole {
  ADMIN = "ADMIN",
  FITTER = "FITTER",
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

export enum Plan {
  FREE = "FREE",
  PREMIUM = "PREMIUM",
}

export interface IUser extends Document {
  _id: string;
  fullName: string;
  userName?: string;
  email: string;
  mobileNumber: string;
  password: string;
  profilePicture?: string;
  role: UserRole;
  status: UserStatus;
  isVerified: boolean;
  verificationOtp?: string;
  verificationOtpExpiry?: Date;
  resetPasswordOtp?: string;
  resetPasswordOtpExpiry?: Date;
  googleId?: string;
  authProvider?: AuthProvider;
  premiumPlanExpiry?: Date;
  country?: string;
  language?: string;
  timezone?: string;
  postalCode?: string;
  workLocations?: string[];
  skills?: string[];
  spokenLanguages?: string[];
  driversLicense?: string;
  hourlyRate?: number;
  dailyRate?: number;
  experienceYears?: number;
  bio?: string;
  plan?: Plan;
  lattitude?: number;
  longitude?: number;
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
    userName: {
      type: String,
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
      default: UserRole.FITTER,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
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
    country: {
      type: String,
    },
    language: {
      type: String,
    },
    timezone: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    workLocations: [
      {
        type: String,
      },
    ],
    skills: [
      {
        type: String,
      },
    ],
    spokenLanguages: [
      {
        type: String,
      },
    ],
    driversLicense: {
      type: String,
    },
    hourlyRate: {
      type: Number,
    },
    dailyRate: {
      type: Number,
    },
    experienceYears: {
      type: Number,
    },
    bio: {
      type: String,
    },
    plan: {
      type: String,
      enum: Object.values(Plan),
    },
    lattitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
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
