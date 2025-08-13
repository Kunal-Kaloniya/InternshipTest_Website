import { useState } from "react";
import axios from "axios";

const ViewQuestions = () => {

    const [category, setCategory] = useState("");
    const [questions, setQuestions] = useState([]);

    const testCategories = [
        "Directorate of Biological Sciences",
        "Directorate of Physical Sciences",
        "Directorate of Chemical Sciences",
        "Directorate of Mathematical Sciences",
        "Directorate of Applied Research"
    ];

    const fetchFilteredQuestions = async () => {
        try {
            const response = await axios.get("http://localhost:3000/admin/all-questions", {
                headers: {
                    Authorization: "Player " + localStorage.getItem("token")
                },
                params: {
                    category: category,
                }
            });

            setQuestions(response.data);
        } catch (err) {
            console.error("Failed to fetch questions: ", err);
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            {/* Filter Section */}
            <div className="flex flex-wrap gap-3 items-center mb-6">
                <select
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    className="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                    <option value="">All Categories</option>
                    {testCategories.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>

                <button
                    onClick={fetchFilteredQuestions}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow-sm transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                >
                    Filter
                </button>
            </div>

            {/* Question List */}
            {questions.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300 text-center italic">
                    No questions found.
                </p>
            ) : (
                <div className="space-y-5">
                    {questions.map((q) => (
                        <div
                            key={q._id}
                            className="p-5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                                    ID: {q._id}
                                </span>
                                <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                                    {q.category}
                                </span>
                            </div>

                            {/* Question */}
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                {q.question}
                            </h2>

                            {/* Options */}
                            <div className="mb-3">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Options:
                                </p>
                                <ul className="list-disc pl-6 text-gray-800 dark:text-gray-200">
                                    {q.options.map((opt, idx) => (
                                        <li key={idx}>{opt}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Correct Answer */}
                            <p className="text-sm text-green-700 dark:text-green-400 font-medium mb-2">
                                ✅ Correct Answer: {q.correctAnswer}
                            </p>

                            {/* Explanation */}
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                <span className="font-medium">Explanation:</span> {q.explanation}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
}

export default ViewQuestions;