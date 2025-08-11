import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {

    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/signup", form);
            setMessage(res.data.message);
            setForm({ username: "", email: "", password: "" });
            navigate("/login");
        } catch (err) {
            setMessage("Signup Failed!");
            console.error("Signup Error: ", err);
        }
    }

    return (
        <div className="w-full h-[100vh] flex items-center justify-center bg-white dark:bg-slate-700 transition-colors font-mono">
            <div className="min-w-md h-auto mx-auto text-black dark:text-white bg-gray-200 dark:bg-slate-800 rounded-md">
                <h1 className="text-center font-semibold text-5xl m-5">SignUp</h1>
                <form onSubmit={handleSignup} className="flex flex-col p-5">

                    <label htmlFor="username" className="text-sm mb-1">Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        className="min-w-full h-15 mb-3 px-3 outline-0 bg-white dark:bg-slate-700 shadow-2xl text-md rounded-sm"
                    />

                    <label htmlFor="email" className="text-sm mb-1">E-mail:</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="min-w-full h-15 mb-3 px-3 outline-0 bg-white dark:bg-slate-700 shadow-2xl text-md rounded-sm"
                    />

                    <label htmlFor="email" className="text-sm mb-1">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="min-w-full h-15 mb-3 px-3 outline-0 bg-white dark:bg-slate-700 shadow-2xl text-md rounded-sm"
                    />

                    <button type="submit" className="px-4 py-2 w-50 mx-auto mt-8 rounded-md bg-white dark:bg-slate-500 hover:bg-blue-500 hover:text-white transition-all">Sign Up</button>
                </form>


                <p className="mx-5 mb-3 text-[12px]">
                    Already a user? Try
                    <Link to="/login" className="text-blue-500 pl-2 font-bold">Loging in</Link>
                </p>

                {
                    message && (
                        <p className="bg-gray-200 text-center rounded-b-md text-red-500">{message}</p>
                    )
                }
            </div>
        </div>
    );
}

export default Signup;