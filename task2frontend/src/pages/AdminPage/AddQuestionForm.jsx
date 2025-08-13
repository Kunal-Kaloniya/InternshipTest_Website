import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddQuestionForm = () => {

    const [form, setForm] = useState({
        "question": "",
        "section": "",
        "options": ["", "", "", ""],
        "correctAnswer": "",
        "category": "",
        "explanation": ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleOptionChange = (index, value) => {
        let updatedOptions = [...form.options];
        updatedOptions[index] = value;
        setForm({ ...form, options: updatedOptions });
    }

    const handleAddQuestion = async (e) => {

        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/admin/add-question", form, {
                headers: {
                    Authorization: "Player " + localStorage.getItem("token")
                }
            });

            toast.success("Question added successfully!");
            setForm({
                "question": "",
                "section": "",
                "options": ["", "", "", ""],
                "correctAnswer": "",
                "category": "",
                "explanation": ""
            })
        } catch (err) {
            toast.error("Failed to add question!");
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
                Add a Question
            </h1>

            <form onSubmit={handleAddQuestion} className="space-y-5">
                {/* Question */}
                <div>
                    <label
                        htmlFor="question"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        Question
                    </label>
                    <input
                        id="question"
                        type="text"
                        name="question"
                        value={form.question}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Options */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Options
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {form.options.map((opt, index) => (
                            <input
                                key={index}
                                type="text"
                                value={opt}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                placeholder={`Option ${index + 1}`}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        ))}
                    </div>
                </div>

                {/* Correct Answer */}
                <div>
                    <label
                        htmlFor="correctAnswer"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        Correct Answer
                    </label>
                    <input
                        id="correctAnswer"
                        type="text"
                        name="correctAnswer"
                        value={form.correctAnswer}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Category */}
                <div>
                    <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        Category
                    </label>
                    <input
                        id="category"
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Section */}
                <div>
                    <label
                        htmlFor="section"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        Section
                    </label>
                    <select
                        id="section"
                        name="section"
                        value={form.section}
                        onChange={handleChange}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="">-- Select --</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                </div>

                {/* Explanation */}
                <div>
                    <label
                        htmlFor="explanation"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        Explanation
                    </label>
                    <textarea
                        id="explanation"
                        name="explanation"
                        value={form.explanation}
                        onChange={handleChange}
                        rows={4}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Add Question Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Add Question
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddQuestionForm;