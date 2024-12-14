import  mongoose,{ Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password : {type: String, required : true},
    name : String,
    verified : {type: String, default : false},
    accessToken : String,
    accessTokenExpiresAt : Date,
    refreshToken : String,
    refreshTokenExpiresAt : Date,
    resetPasswordToken : String,
    resetPasswordTokenExpiresAt: Date,
    verificationToken : String,
    verificationExpiresAt : Date,
    lastLoginAt : Date
  },
  { timestamps: true }
);

export const User = mongoose.model('User',UserSchema)
