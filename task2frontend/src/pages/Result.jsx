import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Result() {

    const location = useLocation();

    const { result } = location.state;
    const { questions, selectedAnswers } = location.state || [];
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (result < 5) {
            setMessage("You need to practice more about the concepts.");
        } else if (result >= 5 && result < 11) {
            setMessage("Not good! Try harder next time.");
        } else if (result >= 11 && result < 17) {
            setMessage("Not bad but not too good. Keep practicing.")
        } else {
            setMessage("Great Job! Keep working hard like this.");
        }
    }, [result])

    return (
        <div className="font-mono py-5 bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition-all">
            <section className="max-w-[80vw] py-10 mx-auto rounded-xl text-black bg-white dark:bg-gray-800 dark:text-white">
                <div className="text-center pb-10 text-xl transition-all">
                    <h1 className="text-3xl font-bold mb-5">Your score is {result} out of {questions.length}.</h1>
                    <p>You have attempted {Object.keys(selectedAnswers).length} out of {questions.length} questions</p>
                    <p>Of which {Object.keys(selectedAnswers).length - result} {Object.keys(selectedAnswers).length - result === 1 ? "was" : "were"} incorrect</p>
                </div>
                <div>
                    {
                        message && (
                            <p className="text-center italic font-bold">"{message}"</p>
                        )
                    }
                </div>
            </section>

            <section className="max-w-[90vw] h-auto mt-5 mx-auto rounded-xl p-3 text-black bg-white dark:bg-gray-800 dark:text-white transition-all">
                <h2 className="text-xl font-bold text-center mb-3">Explanation: </h2>
                <div className="grid grid-cols-2 gap-2">
                    {
                        questions.length !== 0 && (
                            questions.map((q, index) => {
                                const isCorrect = questions[index].correctAnswer === selectedAnswers[q._id];
                                return (
                                    <div className={`${isCorrect ? "bg-green-100 border-green-400" : "bg-red-100 border-red-400"} border rounded-xl px-4 py-2 text-black`} key={index}>
                                        <h1><span className="font-black">Q{index + 1}:</span> {q.question}</h1>
                                        <p><span className="font-black">Correct Answer:</span> {q.correctAnswer}</p>
                                        <p><span className="font-black">Your Answer:</span> {selectedAnswers[q._id] ? selectedAnswers[q._id] : "N/A"}</p>
                                        <p><span className="font-black">Explanation:</span> {q.explanation}</p>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </section>
        </div>
    );
}

export default Result;