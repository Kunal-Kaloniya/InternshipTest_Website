import { useState } from "react";
import axios from "axios";

const UpdateQuestionForm = () => {

    const [form, setForm] = useState({
        "question": "",
        "section": "",
        "options": ["", "", "", ""],
        "correctAnswer": "",
        "category": "",
        "explanation": ""
    });
    const [quesId, setQuesId] = useState("");
    const [isQuesValid, setIsQuesValid] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleOptionChange = (index, value) => {
        let updatedOptions = [...form.options];
        updatedOptions[index] = value;
        setForm({ ...form, options: updatedOptions });
    }

    const handleSearchQuestion = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/admin/search-question/${id}`, {
                headers: {
                    Authorization: "Player " + localStorage.getItem("token")
                }
            })

            if (response.status === 200) {
                setIsQuesValid(true);
            }
        } catch (err) {
            // setMessage({ status: "fail", msg: "Question Search failed!" });
            console.error("Question Search failed: ", err);
        }
    }

    const handleUpdateQuestion = async (e, id) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:3000/admin/update-question/${id}`, form, {
                headers: {
                    Authorization: "Player " + localStorage.getItem("token")
                }
            });

            // setMessage({ status: "pass", msg: "Successfully updated the question!" });
            setForm({
                "question": "",
                "section": "",
                "options": ["", "", "", ""],
                "correctAnswer": "",
                "category": "",
                "explanation": ""
            })

            setQuesId("");
            setIsQuesValid(false);
        } catch (err) {
            // setMessage({ status: "fail", msg: "Failed to update the question!" });
            console.error("Error updating question: ", err);
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
                Update a Question
            </h1>

            {/* Search Question By Id */}
            <div className="flex gap-3 mb-6">
                <input
                    type="text"
                    name="questionId"
                    placeholder="Enter Question ID"
                    value={quesId}
                    onChange={(e) => setQuesId(e.target.value)}
                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                    type="button"
                    onClick={() => handleSearchQuestion(quesId)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Search
                </button>
            </div>

            {isQuesValid && (
                <form
                    className="space-y-5"
                    onSubmit={(e) => handleUpdateQuestion(e, quesId)}
                >
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

                    {/* Update Question Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Update Question
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default UpdateQuestionForm;