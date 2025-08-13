import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function Login() {

    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/login", form);
            localStorage.setItem("token", res.data.token);
            login({
                username: res.data.user.username,
                email: res.data.user.email,
                role: res.data.user.role,
                id: res.data.user._id,
            });
            setForm({ email: "", password: "" });
            toast.success("Login successfull!");
            navigate("/home");
        } catch (err) {
            toast.error("Login Failed");
            console.error("Login Error: ", err.message);
        }
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-white dark:bg-slate-700 transition-colors font-mono">
            <div className="min-w-md mx-auto text-black dark:text-white bg-gray-200 dark:bg-slate-800 rounded-md">
                <h1 className="text-center font-semibold text-5xl m-5">Login</h1>
                <form onSubmit={handleLogin} className="flex flex-col p-5">

                    <label htmlFor="email" className="text-sm mb-1">E-mail:</label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={form.email}
                        className="min-w-full h-15 mb-3 px-3 outline-0 bg-white dark:bg-slate-700 shadow-2xl text-md rounded-sm"
                    />

                    <label htmlFor="email" className="text-sm mb-1">Password:</label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={form.password}
                        className="min-w-full h-15 mb-3 px-3 outline-0 bg-white dark:bg-slate-700 shadow-2xl text-md rounded-sm"
                    />

                    <button
                        type="submit"
                        className="px-4 py-2 w-50 mx-auto mt-8 rounded-md bg-white dark:bg-slate-500 hover:bg-green-500 hover:text-white transition-all"
                    >
                        Login
                    </button>
                </form>


                <p className="mx-5 mb-3 text-[12px]">
                    New here?
                    <Link to="/signup" className="text-blue-500 pl-2 font-bold">SignUp</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;