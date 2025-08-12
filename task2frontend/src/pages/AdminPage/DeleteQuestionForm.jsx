import { useState } from "react";
import axios from "axios";

const DeleteQuestionForm = () => {

    const [quesId, setQuesId] = useState("");
    const [isQuesValid, setIsQuesValid] = useState(false);

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

    const handleDeleteQuestion = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/admin/delete-question/${id}`, {
                headers: {
                    Authorization: "Player " + localStorage.getItem("token")
                }
            })

            // setMessage({ status: "pass", msg: "Successfully deleted the question!" });
            setQuesId("");
            setIsQuesValid(false);
        } catch (err) {
            // setMessage({ status: "fail", msg: "Failed to Delete the question!" });
            console.error("Failed to delete question: ", err);
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-lg mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
                Delete a Question
            </h1>

            {/* Search Question By Id */}
            <div className="mb-4">
                <label
                    htmlFor="questionId"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    Question ID
                </label>
                <input
                    id="questionId"
                    type="text"
                    name="questionId"
                    placeholder="Enter question ID"
                    value={quesId}
                    onChange={(e) => setQuesId(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>

            {/* Search Button */}
            <button
                className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => handleSearchQuestion(quesId)}
            >
                Search Question
            </button>

            {/* Delete Question Button */}
            {isQuesValid && (
                <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => handleDeleteQuestion(quesId)}
                >
                    Delete Question
                </button>
            )}
        </div>

    );
}

export default DeleteQuestionForm;