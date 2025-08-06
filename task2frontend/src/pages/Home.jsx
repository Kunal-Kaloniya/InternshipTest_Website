import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Home() {

    const { user } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);

    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");

    const instructionList = [
        { id: 1, i: "Read all questions carefully before answering." },
        { id: 2, i: "It is advised not to use unfair means." },
        { id: 3, i: "Manage your time wisely. The total duration of the quiz is 3 minutes." },
        { id: 4, i: "There is 1 mark for every correct answer." },
        { id: 5, i: "Review your answers if time permits before submission." },
        { id: 6, i: "Before starting the test make sure you have stable internet connection. In case the page reloads, the test will be automatcally submitted.", color: true},
    ]

    const navigate = useNavigate();

    useEffect(() => {

        const getCategories = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/quiz/categories");

                setCategories(response.data);

            } catch (err) {
                console.error("There was some error fetching categories: ", err)
            }
        }
        getCategories();
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setMessage("")
        }, 5000)
    }, [message, setMessage])


    const handleClick = async () => {
        if (!category) {
            setMessage("Please select the test category!");
            return;
        }

        setMessage("");
        navigate("/quiz", { state: { category } });
    }

    return (
        <div className="font-mono relative transition-all bg-white text-black dark:bg-gray-700 dark:text-white">
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="pl-5">
                    <h1 className="text-4xl font-bold mb-3">Welcome {user?.username}!</h1>
                </div>

                <div className="w-auto h-[50vh] mt-5 flex lg:flex-row md:flex-col sm:flex-col items-center justify-center gap-5 px-5">

                    <div id="navBar" className="h-full pt-5 pb-3 px-10 rounded-xl flex flex-col flex-1/2 justify-center bg-gray-200 dark:bg-gray-800">
                        <h1 className="text-center mb-5 underline text-2xl text-red-400 font-bold">Instructions</h1>
                        <ol className="text-xl">
                            {
                                instructionList.length !== 0 && (
                                    instructionList.map((ins) => (
                                        <li key={ins.id} className={`${ins?.color ? "text-red-800" : ""}`}>{ins.id}. {ins.i}</li>
                                    ))
                                )
                            }
                        </ol>
                    </div>

                    <div className="h-full pt-5 pb-3 px-10 rounded-xl bg-gray-100 flex flex-col flex-1/2 justify-center bg-gray-200 dark:bg-gray-800">
                        <h2 className="text-2xl mb-5 font-bold">Ready to take the test: </h2>

                        <div className="w-auto h-auto px-6 py-4 mb-5 rounded-lg bg-gray-400 dark:bg-gray-600 flex justify-between items-center">
                            <p>What is this test based on:</p>

                            <select
                                name="categoryOptions"
                                onChange={e => { setCategory(e.target.value); setMessage("") }}
                                className="px-3 py-1 bg-white text-black ml-2 rounded border-2 border-white hover:border-black transition-all outline-0"
                            >
                                <option defaultChecked value="" className="text-center">-- select --</option>
                                {
                                    categories.length !== 0 && (
                                        categories.map((category, index) => (
                                            <option value={category} key={index}>{category}</option>
                                        ))
                                    )
                                }
                            </select>
                        </div>
                        <div className="max-w-[80vw] mx-auto flex justify-center">
                            <button
                                onClick={handleClick}
                                className="my-2 px-4 py-2 border-2 rounded-2xl hover:bg-amber-100 hover:text-black dark:hover:border-white transition-all"
                            >
                                Start Test
                            </button>
                        </div>

                        {
                            message && (
                                <p className="m-4 bg-amber-700 text-white text-center p-5 absolute top-[10vh] right-2">{message}</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Home;