import { useEffect, useState } from "react";

const Toast = ({ text, type = "default", duration = 5000 }) => {

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (text) {
            setMessage(text);
        }
    }, [text]);

    useEffect(() => {
        if (!message) return;

        const timer = setTimeout(() => {
            setMessage("");
        }, duration);

        return () => clearTimeout(timer)
    }, [message, duration]);

    if (!message) return null;

    const typeClasses = {
        error: "bg-red-600",
        success: "bg-green-600",
        default: "bg-blue-600",
    }

    return (
        <>
            {
                message && (
                    <p
                        className={`m-4 min-w-md text-white text-center p-5 absolute top-[10vh] right-0 shadow-lg rounded ${typeClasses[type] || typeClasses.default}`}
                    >
                        {message}
                    </p>
                )
            }
        </>
    );
}

export default Toast;