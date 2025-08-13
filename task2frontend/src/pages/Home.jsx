import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Toast from "../components/Toast";

function Home() {

    const { user } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);

    const [category, setCategory] = useState("");
    const [toast, setToast] = useState({ text: "", type: "default" });

    const instructionList = [
        { id: 1, i: "Read all questions carefully before answering." },
        { id: 2, i: "It is advised not to use unfair means." },
        { id: 3, i: "Manage your time wisely. The total duration of the quiz is 10 minutes.", color: true },
        { id: 4, i: "There is 1 mark for every correct answer." },
        { id: 5, i: "Review your answers if time permits before submission." },
        { id: 6, i: "Before starting the test make sure you have stable internet connection. In case the page reloads, your test will be cancelled.", color: true },
    ]

    const navigate = useNavigate();

    useEffect(() => {

        const getCategories = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/quiz/categories");

                setCategories(response.data.categories);

            } catch (err) {
                console.error("There was some error fetching categories: ", err)
            }
        }
        getCategories();
    }, [])


    const handleClick = async () => {
        if (!category) {
            setToast({ text: "Please select the test category!", type: "default" });
            return;
        }

        setToast({ text: "", type: "default" });
        navigate("/quiz", { state: { category } });
    }

    return (
        <div className="font-mono transition-all bg-white text-black dark:bg-gray-700 dark:text-white">
            <div className="min-h-screen flex flex-col items-center justify-center">

                {/* Hero Section */}
                <header className="text-center w-full py-8 dark:text-white">
                    <h1 className="text-4xl font-bold">Welcome, {user?.username}!</h1>
                    <p className="mt-2 text-lg">Pick a category and show what you’ve got.</p>
                </header>

                <main className="w-auto min-h-full mt-5 flex lg:flex-row md:flex-col sm:flex-col items-stretch justify-center gap-5 px-5">

                    <aside id="navBar" className="py-5 px-10 rounded-xl flex flex-col flex-1/3 justify-center bg-gray-200 dark:bg-gray-800">
                        <h1 className="text-left mb-5 underline text-2xl text-red-400 font-bold">Instructions</h1>
                        <ol className="text-xl">
                            {
                                instructionList.length !== 0 && (
                                    instructionList.map((ins) => (
                                        <li key={ins.id} className={`${ins?.color ? "text-red-800" : ""}`}>{ins.id}. {ins.i}</li>
                                    ))
                                )
                            }
                        </ol>
                    </aside>

                    <section className="pt-5 pb-3 px-10 rounded-xl flex flex-col flex-2/3 justify-center bg-gray-200 dark:bg-gray-800">
                        <h2 className="text-2xl font-bold mb-4">Choose a Test Category</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categories.length > 0 &&
                                categories.map((cat, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => { setCategory(cat); setMessage(""); }}
                                        className={`cursor-pointer p-6 rounded-lg shadow-md border-2 transition-all
                                        ${category === cat
                                                ? "border-blue-500 bg-blue-100 dark:bg-blue-900"
                                                : "border-transparent bg-gray-100 dark:bg-gray-700 hover:border-blue-300"}
                                    `}
                                    >
                                        <h3 className="text-xl font-semibold">{cat}</h3>
                                        <p className="text-sm text-gray-500">Click to select</p>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="p-6 flex justify-center">
                            <button
                                onClick={handleClick}
                                className="px-6 py-3 bg-blue-500 text-white rounded-full font-bold text-lg hover:bg-blue-600 transition-all"
                            >
                                Start Test
                            </button>
                        </div>
                    </section>
                </main>


                <Toast text={toast.text} type={toast.type} />
            </div>
        </div >
    );
}

export default Home;
