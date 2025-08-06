import { useState, useEffect } from "react";
import axios from "axios";

function Admin() {

    const [message, setMessage] = useState({ status: "fail", msg: "" });
    const [quesId, setQuesId] = useState("");
    const [form, setForm] = useState({
        "question": "",
        "section": "",
        "options": ["", "", "", ""],
        "correctAnswer": "",
        "category": "",
        "explanation": ""
    });
    const [activeTab, setActiveTab] = useState("add");
    const [isQuesValid, setIsQuesValid] = useState(false);
    const [users, setUsers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [category, setCategory] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...form.options];
        updatedOptions[index] = value;
        setForm({ ...form, options: updatedOptions });
    }

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3000/admin/fetch-users", {
                headers: {
                    Authorization: "Player " + localStorage.getItem("token")
                }
            })

            setUsers(response.data);

        } catch (err) {
            setMessage({ status: "fail", msg: "Failed to fetch users!" });
            console.error("Failed to fetch users: ", err);
        }
    }

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
            setMessage({ status: "fail", msg: "Failed to fetch questions!" });
            console.error("Failed to fetch questions: ", err);
        }
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setForm({
            "question": "",
            "section": "",
            "options": ["", "", "", ""],
            "correctAnswer": "",
            "category": "",
            "explanation": ""
        });
        setQuesId("");
        setIsQuesValid(false);

        if (tab === "users") {
            fetchUsers();
        }
    }

    const handleAddQuestion = async (e) => {

        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/admin/add-question", form, {
                headers: {
                    Authorization: "Player " + localStorage.getItem("token")
                }
            });

            setMessage({ status: "pass", msg: "Successfully added the question!" });
            setForm({
                "question": "",
                "section": "",
                "options": ["", "", "", ""],
                "correctAnswer": "",
                "category": "",
                "explanation": ""
            })
        } catch (err) {
            setMessage({ status: "fail", msg: "Failed to add the question!" });
            console.error("Error adding question: ", err);
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

            setMessage({ status: "pass", msg: "Successfully updated the question!" });
            setForm({
                "question": "",
                "section": "",
                "options": ["", "", "", ""],
                "correctAnswer": "",
                "category": "",
                "explanation": ""
            })

            setQuesId("");
        } catch (err) {
            setMessage({ status: "fail", msg: "Failed to update the question!" });
            console.error("Error updating question: ", err);
        }
    }

    const handleDeleteQuestion = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/admin/delete-question/${id}`, {
                headers: {
                    Authorization: "Player " + localStorage.getItem("token")
                }
            })

            setMessage({ status: "pass", msg: "Successfully deleted the question!" })
        } catch (err) {
            setMessage({ status: "fail", msg: "Failed to Delete the question!" });
            console.error("Failed to delete question: ", err);
        }
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
            setMessage({ status: "fail", msg: "Question Search failed!" });
            console.error("Question Search failed: ", err);
        }
    }

    const handleDeleteUser = async (id, index) => {

        const newUserArr = [...users];
        newUserArr.splice(index, 1);

        try {
            await axios.delete(`http://localhost:3000/admin/delete-user/${id}`, {
                headers: {
                    Authorization: "Player " + localStorage.getItem("token")
                }
            })

            setUsers(newUserArr);
            setMessage({ status: "pass", msg: "Successfully deleted the user!" })
        } catch (err) {
            setMessage({ status: "fail", msg: "Failed to Delete the user!" });
            console.error("Failed to delete user: ", err);
        }
    }

    useEffect(() => {
        if (message.msg !== "") {
            const timer = setTimeout(() => {
                setMessage({ status: "", msg: "" });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="min-h-screen font-mono transition-all bg-white text-black dark:bg-gray-700">
            <div className="p-5">
                <div className="flex flex-col gap-2 border-r-1 px-5 fixed left-0 right-[80vw] bottom-0 top-[10vh] dark:text-white">
                    <h1 className="text-3xl font-bold text-center my-5">Admin Panel</h1>
                    {
                        ["add", "update", "delete", "questions", "users"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`px-5 py-3 rounded-md border-1 ${activeTab === tab
                                    ? "bg-gray-800 text-white"
                                    : "bg-white text-gray-900"
                                    } hover:bg-gray-700 hover:text-white hover:shadow-2xl transition-all`}
                            >
                                {tab === "users" ? "Manage Users" : tab === "questions" ? "View all Questions" : tab.charAt(0).toUpperCase() + tab.slice(1) + " Question"}
                            </button>
                        ))
                    }
                </div>

                <div className="mt-[10vh] px-20 pt-10 absolute left-[20vw] top-0 right-0 bottom-0 transition-all dark:bg-gray-800 dark:text-white">
                    {activeTab === "add" && (
                            <div>
                                <h1 className="text-center text-2xl font-bold">Add a question </h1>
                                <hr />

                                <form className="flex flex-col gap-2 p-5 max-w-lg mx-auto" onSubmit={handleAddQuestion}>
                                    <input type="text" name="question" placeholder="question" value={form.question} onChange={handleChange} className="max-w-auto border-2 rounded-md bg-white text-black px-3 py-1" />

                                    <div className="grid grid-cols-2 gap-1 my-2">
                                        {
                                            form.options.map((opt, index) => (
                                                <input key={index} type="text" name="options" value={opt} onChange={(e) => handleOptionChange(index, e.target.value)} placeholder={`option-${index}`} className="border-2 rounded-md bg-white text-black px-3 py-1" />
                                            ))
                                        }
                                    </div>

                                    <input type="text" name="correctAnswer" placeholder="correct answer" value={form.correctAnswer} onChange={handleChange} className="max-w-auto border-2 rounded-md bg-white text-black px-3 py-1 mb-2" />

                                    <input type="text" name="category" placeholder="category" value={form.category} onChange={handleChange} className="max-w-auto border-2 rounded-md bg-white text-black px-3 py-1 mb-2" />

                                    <div className="mb-5">
                                        <label htmlFor="difficulty" className="inline-block">Section: </label>
                                        <select name="difficulty" id="difficulty" value={form.section} onChange={handleChange} className="ml-2 px-3 py-1 border-2 rounded-md">
                                            <option className="text-black" defaultChecked value="">-- select --</option>
                                            <option className="text-black" value="A">A</option>
                                            <option className="text-black" value="B">B</option>
                                            <option className="text-black" value="C">C</option>
                                            <option className="text-black" value="D">D</option>
                                        </select>
                                    </div>

                                    <textarea name="explanation" id="explanation" placeholder="explanation" value={form.explanation} onChange={handleChange} className="border-2 min-h-[8em] rounded-md bg-white text-black px-3 py-1"></textarea>

                                    <button type="submit" className="bg-white text-xl text-gray-900 rounded-md px-3 py-1 border-3 border-gray-900 hover:shadow-2xl hover:bg-gray-900 hover:text-white transition-all hover:font-bold">Add Question</button>
                                </form>
                            </div>
                        )}

                    {
                        activeTab === "update" && (
                            <div>
                                <h1 className="text-center text-2xl font-bold">Update a question </h1>
                                <hr />

                                <input type="text" name="questionId" placeholder="question id" value={quesId} onChange={(e) => setQuesId(e.target.value)} className="max-w-auto border-2 rounded-md bg-white text-black px-3 py-1 mx-5 my-3" />

                                <button className="bg-white text-gray-700 rounded px-3 py-1 border-1 border-gray-400 hover:shadow-2xl hover:bg-gray-500 hover:text-white transition-all" onClick={() => handleSearchQuestion(quesId)}>Search Question</button>

                                {
                                    isQuesValid && <form className="flex flex-col gap-2 p-5 max-w-lg mx-auto" onSubmit={(e) => handleUpdateQuestion(e, quesId)}>
                                        <input type="text" name="question" placeholder="question" value={form.question} onChange={handleChange} className="max-w-auto border-2 rounded-md bg-white text-black px-3 py-1" />

                                        <div className="grid grid-cols-2 gap-1 my-2">
                                            {
                                                form.options.map((opt, index) => (
                                                    <input key={index} type="text" name="options" value={opt} onChange={(e) => handleOptionChange(index, e.target.value)} placeholder={`option-${index}`} className="border-2 rounded-md bg-white text-black px-3 py-1" />
                                                ))
                                            }
                                        </div>

                                        <input type="text" name="correctAnswer" placeholder="correct answer" value={form.correctAnswer} onChange={handleChange} className="max-w-auto border-2 rounded-md bg-white text-black px-3 py-1 mb-2" />

                                        <input type="text" name="category" placeholder="category" value={form.category} onChange={handleChange} className="max-w-auto border-2 rounded-md bg-white text-black px-3 py-1 mb-2" />

                                        <div className="mb-5">
                                            <label htmlFor="difficulty" className="inline-block">Section: </label>
                                            <select name="difficulty" id="difficulty" value={form.section} onChange={handleChange} className="ml-2 px-3 py-1 border-2 rounded-md">
                                                <option className="text-black" defaultChecked value="">-- select --</option>
                                                <option className="text-black" value="A">A</option>
                                                <option className="text-black" value="B">B</option>
                                                <option className="text-black" value="C">C</option>
                                                <option className="text-black" value="D">D</option>
                                            </select>
                                        </div>

                                        <textarea name="explanation" id="explanation" placeholder="explanation" value={form.explanation} onChange={handleChange} className="border-2 rounded-md bg-white text-black px-3 py-1"></textarea>

                                        <button type="submit" className="bg-white text-xl text-gray-900 rounded-md px-3 py-1 border-3 border-gray-900 hover:shadow-2xl hover:bg-gray-900 hover:text-white transition-all hover:font-bold">Update Question</button>
                                    </form>
                                }
                            </div>
                        )
                    }

                    {
                        activeTab === "delete" && (
                            <div className="">
                                <h1 className="text-center text-2xl font-bold">Delete a question </h1>
                                <hr />

                                <input type="text" name="questionId" placeholder="question id" value={quesId} onChange={(e) => setQuesId(e.target.value)} className="max-w-auto border-2 rounded-md bg-white text-black px-3 py-1 mx-5 my-3" />

                                <button className="bg-white text-gray-700 rounded px-3 py-1 border-1 border-gray-400 hover:shadow-2xl hover:bg-gray-500 hover:text-white transition-all" onClick={() => handleSearchQuestion(quesId)}>Search Question</button>

                                {
                                    isQuesValid && <button type="submit" className="mx-5 bg-white text-xl text-red-900 rounded-md px-3 py-1 border-3 border-red-900 hover:shadow-2xl hover:bg-red-900 hover:text-white transition-all hover:font-bold block" onClick={() => handleDeleteQuestion(quesId)}>Delete Question</button>
                                }
                            </div>
                        )
                    }

                    {
                        activeTab === "questions" && (
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4 items-center">
                                    <select onChange={(e) => setCategory(e.target.value)} value={category} className="bg-gray-300 px-3 py-1 rounded-md text-black">
                                        <option value="">All Categories</option>
                                        <option value="Directorate of Biological Sciences">Directorate of Biological Sciences</option>
                                        <option value="Directorate of Physical Sciences">Directorate of Physical Sciences</option>
                                        <option value="Directorate of Chemical Sciences">Directorate of Chemical Sciences</option>
                                        <option value="Directorate of Mathematical Sciences">Directorate of Mathematical Sciences</option>
                                        <option value="Directorate of Mathematical Sciences">Directorate of Mathematical Sciences</option>
                                        <option value="Directorate of Applied Research">Directorate of Applied Research</option>
                                    </select>

                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                        onClick={fetchFilteredQuestions}
                                    >
                                        Filter
                                    </button>
                                </div>

                                {questions.length === 0 ? (
                                    <p>No questions found.</p>
                                ) : (
                                    questions.map((q) => (
                                        <div key={q._id} className="border p-4 rounded bg-gray-100">
                                            <p><strong>ID:</strong> {q._id}</p>
                                            <p><strong>Category:</strong> {q.category}</p>
                                            <p><strong>Question:</strong> {q.question}</p>
                                            <p><strong>Options:</strong></p>
                                            <ul className="list-disc pl-6">
                                                {q.options.map((opt, idx) => (
                                                    <li key={idx}>{opt}</li>
                                                ))}
                                            </ul>
                                            <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
                                            <p><strong>Explanation:</strong> {q.explanation}</p>
                                        </div>
                                    ))
                                )}

                            </div>
                        )
                    }

                    {
                        activeTab === "users" && (
                            users.map((user, index) => (
                                <div key={index} className="flex items-center justify-between border-1 border-gray-600 bg-gray-300 rounded-md px-5 py-3 my-4 text-black">
                                    <div className="flex flex-1 items-baseline">
                                        <h1>{user?.username}</h1>
                                        <h1 className="text-[10px] font-light text-gray-500 italic pl-2">"{user?.role}"</h1>
                                    </div>
                                    <h1 className="flex-1">{user?.email}</h1>
                                    <div className="flex space-x-2 flex-1 justify-end">
                                        {
                                            user?.role === "user" && (
                                                <button className="bg-white text-gray-700 rounded px-3 py-1 border-1 border-gray-400 hover:shadow-2xl hover:bg-gray-500 hover:text-white transition-all" onClick={() => handleDeleteUser(user._id, index)}>Delete User</button>
                                            )
                                        }
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>

                {
                    message.msg && (
                        <div className={`${message.status === "pass" ? "bg-green-500" : "bg-red-500"} text-white text-xl px-10 py-5 absolute bottom-5 left-0`}>
                            <h1>{message.msg}</h1>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Admin;