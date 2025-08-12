import axios from "axios";
import { useState, useEffect } from "react";

function Leaderboard() {

    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/leaderboard", {
                    headers: {
                        Authorization: "Player " + localStorage.getItem("token"),
                    }
                });

                setLeaderboard(response.data);
            } catch (err) {
                console.error("Failed to fetch leaderboard", err);
            }
        };

        fetchLeaderboard();
    }, [])

    return (
        <div className="dark:text-white">
            <h2 className="text-2xl font-bold mb-4 text-center">Leaderboard</h2>
            {leaderboard.length !== 0 ? (
                <div className="overflow-y-auto rounded-xl flex justify-center">
                    <table className="text-center text-sm w-full">
                        <thead className="bg-gray-400 text-black dark:bg-gray-900 dark:text-white">
                            <tr>
                                <th className="p-2">Rank</th>
                                <th className="p-2">Username</th>
                                <th className="p-2">Total Score</th>
                                <th className="p-2">Quizzes Taken</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((user, index) => (
                                <tr key={user.username}  className="border-t border-gray-200 dark:border-slate-700">
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2">{user.username}</td>
                                    <td className="p-2">{user.totalScore}</td>
                                    <td className="p-2">{user.quizzesTaken}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center px-4 py-2 border rounded-lg">No quizes attempted...</p>
            )}
        </div>
    );
}

export default Leaderboard;