import mongoose, { Schema } from "mongoose";

const resultSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    score: {
        type: Number,
    },
    quizMeta: {
        category: {
            type: String,
        }
    },
    questionsAttempted: {
        type: Number,
    }
}, { timestamps: true });

export const Result = new mongoose.model("Result", resultSchema);