import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

function Quiz() {

    const location = useLocation();
    const navigate = useNavigate();

    const { category } = location.state;
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(600);                  // 10 minutes

    // App context to check if the quiz has started
    const { setQuizStarted } = useContext(AppContext);

    useEffect(() => {
        setQuizStarted(true);

        return () => {
            setQuizStarted(false);
        };
    }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    const getQuestions = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/quiz/questions", {
                params: {
                    category: category,
                },
                headers: {
                    Authorization: `Player ${localStorage.getItem("token")}`,
                }
            });

            const flatQuestions = [
                ...response.data.sectionA,
                ...response.data.sectionB,
                ...response.data.sectionC,
                ...response.data.sectionD,
            ]

            setQuestions(flatQuestions);
        } catch (err) {
            console.error("There was some error fetching the quiz questions: ", err);
        }
    }

    useEffect(() => {
        getQuestions();
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const handlePrevious = () => {
        if (currentQuestion === 0) {
            return;
        }

        setCurrentQuestion(prev => prev - 1);
    }

    // Once the page is refreshed while inside the quiz, the quiz auto-submits
    useEffect(() => {
        if (sessionStorage.getItem("refreshSubmit") === "true") {
            sessionStorage.removeItem("refreshSubmit");

            navigate('/dashboard');
        }

        const handleBeforeUnload = () => {
            sessionStorage.setItem("refreshSubmit", "true");
        }

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        }
    }, [])

    const handleNext = () => {
        if (currentQuestion === questions.length - 1) {
            return;
        }

        setCurrentQuestion(prev => prev + 1);
    }

    const handleChange = (quesId, answer) => {
        setSelectedAnswers(prev => ({ ...prev, [quesId]: answer }));
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/users/user/result`, {
                answers: selectedAnswers,
                category: category,
            }, {
                headers: {
                    Authorization: "Player " + localStorage.getItem("token")
                }
            });

            navigate("/result", { state: { result: response.data.score, questions: questions, selectedAnswers: selectedAnswers } });
        } catch (err) {
            console.error("There was an error fetching results: ", err);
        }
    }

    return (
        <div className="font-mono relative bg-white text-black dark:bg-gray-700 dark:text-white transition-all">
            <div className="flex">
                <nav className="md:w-[20vw] px-4 py-10 bg-gray-300 text-black dark:text-white dark:bg-gray-900 transition-all">
                    <h2 className="text-center mb-4 font-semibold text-lg border-b pb-2">Quiz Stats:</h2>

                    <div className="space-y-3 mb-6">
                        <div className="p-3 text-center bg-white dark:bg-gray-800 rounded shadow font-medium">
                            Total Questions: <span className="font-bold">{questions.length}</span>
                        </div>
                        <div className="p-3 text-center bg-white dark:bg-gray-800 rounded shadow font-medium">
                            Attempted: <span className="font-bold">{Object.keys(selectedAnswers).length}</span>
                        </div>
                        <div className="p-3 text-center bg-white dark:bg-gray-800 rounded shadow font-medium">
                            Remaining: <span className="font-bold">{questions.length - Object.keys(selectedAnswers).length}</span>
                        </div>
                    </div>

                    <h2 className="text-center mb-2 font-semibold text-lg border-b pb-2">Your Answers:</h2>
                    <div id="selected-answers" className="h-auto px-2 py-5 mb-5 rounded text-center bg-white dark:bg-gray-800 text-black shadow-2xl grid grid-cols-5 gap-2">
                        {
                            questions.length !== 0 && (
                                <>
                                    {questions.map((q, index) => (
                                        <div
                                            key={index}
                                            className={`py-3 rounded-md bg-gray-400 dark:bg-gray-700 dark:text-white transition-colors ${selectedAnswers[q._id] && "bg-green-400 dark:bg-green-500"}`}
                                        >
                                            {index + 1}
                                        </div>
                                    ))}
                                </>
                            )
                        }
                    </div>

                    <h2 className={`${timeLeft <= 30 && "text-red-600"} mt-6 p-3 text-center font-bold text-lg rounded bg-white dark:bg-gray-800 shadow`}>
                        Time Left: {formatTime(timeLeft)}
                    </h2>
                </nav>
                <div id="main" className={`w-[80vw] h-[90vh] bg-gray-200 text-black dark:bg-gray-800 dark:text-white py-5 px-20 relative transition-all`}>
                    {
                        questions.length > 0 && (
                            <div>
                                <h2 className="text-center text-3xl font-bold italic mb-6">
                                    {currentQuestion < 6
                                        ? "Section A: About GIAR" : currentQuestion < 11
                                            ? "Section B: General Science" : currentQuestion < 16
                                                ? "Section C: Research Aptitude" : "Section D: Domain Knowledge"
                                    }
                                </h2>
                                <h2 className="text-2xl mt-10 font-bold">Q.{currentQuestion + 1}: {questions[currentQuestion].question}</h2>
                                <div id="options" className="mt-10 space-y-4">
                                    {questions[currentQuestion].options.map((option, index) => {
                                        const optionId = `${questions[currentQuestion]._id}-${index}`
                                        return (
                                            <label
                                                key={optionId}
                                                htmlFor={optionId}
                                                className={`block border rounded-lg px-4 py-3 cursor-pointer transition ${selectedAnswers[questions[currentQuestion]._id] === option
                                                    ? "bg-green-100 border-green-500 text-black"
                                                    : "bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    id={optionId}
                                                    name={`question-${questions[currentQuestion]._id}`}
                                                    value={option}
                                                    onChange={() =>
                                                        handleChange(questions[currentQuestion]._id, option)
                                                    }
                                                    checked={
                                                        selectedAnswers[questions[currentQuestion]._id] === option
                                                    }
                                                    className="hidden"
                                                />
                                                {option}
                                            </label>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    }

                    <footer className="absolute bottom-0 left-0 right-0 bg-gray-300 text-black dark:bg-gray-900 px-10 py-4 flex items-center justify-between">
                        <div className="flex gap-6">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow"
                                onClick={handlePrevious}
                            >
                                Previous
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow"
                                onClick={handleNext}
                            >
                                Next
                            </button>
                        </div>

                        <button
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded shadow"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default Quiz;