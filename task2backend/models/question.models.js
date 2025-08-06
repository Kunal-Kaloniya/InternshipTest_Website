import mongoose  from "mongoose";

const questionSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        enum: ['A', 'B', 'C', 'D'],
        required: true,
    },
    question: {
        type: String,
        unique: true,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    explanation: {
        type: String,
        required: true,
    },
});

export const Question = mongoose.model("Question", questionSchema);