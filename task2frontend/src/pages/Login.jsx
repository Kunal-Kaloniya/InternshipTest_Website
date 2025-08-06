import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function Login() {

    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/login", form);
            setMessage(res.data.message);
            localStorage.setItem("token", res.data.token);
            login({
                username: res.data.user.username,
                email: res.data.user.email,
                role: res.data.user.role,
                id: res.data.user._id,
            });
            setForm({ email: "", password: "" });
            navigate("/home");
        } catch (err) {
            setMessage("Login Failed!");
            console.error("Login Error: ", err);
        }
    }

    return (
        <div className="w-full h-[100vh] flex items-center justify-center bg-gray-900 font-mono">
            <div className="border min-w-md h-auto mx-auto bg-white rounded">
                <h1 className="text-center font-bold text-5xl m-5">Login</h1>
                <form onSubmit={handleLogin} className="flex flex-col p-5">

                    <label htmlFor="email" className="text-sm">E-mail:</label>
                    <input type="email" name="email" onChange={handleChange} value={form.email} className="min-w-full h-15 mb-3 px-3 outline-0 border text-md rounded-sm" />

                    <label htmlFor="email" className="text-sm">Password:</label>
                    <input type="password" name="password" onChange={handleChange} value={form.password} className="min-w-full h-15 mb-3 px-3 outline-0 border text-md rounded-sm" />

                    <button type="submit" className="border px-4 py-2 w-50 mx-auto mt-8">Login</button>
                </form>


                <p className="mx-5 mb-3 text-[12px]">
                    New here?
                    <Link to="/signup" className="text-blue-500 pl-2 font-extralight">SignUp</Link>
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

export default Login;