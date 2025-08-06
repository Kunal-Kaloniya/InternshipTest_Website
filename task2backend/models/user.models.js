import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required",]
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);