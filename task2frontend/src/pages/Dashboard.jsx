import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import Leaderboard from "../components/Leaderboard.jsx";

function Dashboard() {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get("http://localhost:3000/users/user/quiz-history", {
                    headers: {
                        Authorization: "Player " + localStorage.getItem("token")
                    }
                });
                setHistory(response.data);
            } catch (err) {
                console.error("There was an error fetching the history: ", err);
            }
        }

        fetchHistory();
    }, [])

    return (
        <div className="font-mono min-h-screen transition-all dark:bg-gray-900 dark:text-white">

            <section className="max-w-7xl mx-auto mt-5 flex lg:flex-row md:flex-col sm:flex-col items-stretch justify-center gap-6">
                <div className="flex flex-col items-center flex-1/3 rounded-xl bg-white dark:bg-gray-800 px-20 py-10">
                    <div className="w-24 h-24 bg-blue-600 text-white dark:bg-blue-400 dark:text-gray-900 flex items-center justify-center font-extrabold text-5xl rounded-full my-5">
                        {user?.username[0].toUpperCase()}
                    </div>
                    <h1 className="mt-4 text-2xl font-extrabold">{user?.username}</h1>
                    <p className="text-gray-500 dark:text-gray-300 mt-1">
                        Total tests attempted: <span className="font-bold">{history?.length}</span>
                    </p>
                    <button
                        className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
                        onClick={() => navigate('/home')}
                    >
                        Take a Test
                    </button>
                </div>

                <div className="flex-2/3 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <Leaderboard />
                </div>
            </section>

            <section className="max-w-7xl mx-auto text-center mt-10 p-6">
                <h1 className="text-2xl font-bold mb-6 border-b border-gray-300 dark:border-gray-700 pb-2">Quiz History</h1>
                {
                    history ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {history.map((q, index) => (
                                <div key={index} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-5 shadow-md hover:shadow-xl transition-shadow">
                                    <h3 className="text-lg font-semibold mb-2">{q.quizMeta.category} Test</h3>
                                    <p className="text-sm">Score: <span className="font-bold">{q.score}</span> / 20</p>
                                    <p className="text-sm">Questions Attempted: {q.questionsAttempted}</p>
                                    <p className="text-sm text-red-400">Incorrect: {q.questionsAttempted - q.score}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">You have not taken any test yet.</p>
                    )
                }
            </section>
        </div>
    );
}

export default Dashboard;