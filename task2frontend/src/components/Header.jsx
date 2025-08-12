import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import {AppContext} from "../context/AppContext";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

function Header() {

    const { isLogged, user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { quizStarted } = useContext(AppContext);
    const navigate = useNavigate();

    const navigationLinks = [
        {
            id: 1,
            to: '/',
            text: "Home"
        },{
            id: 2,
            to: '/dashboard',
            text: "Dashboard"
        },{
            id: 3,
            to: '/home',
            text: "Quiz"
        },
    ]

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <nav id="header" className="w-full h-[10vh] font-mono px-10 py-4 flex items-center justify-between fixed top-0 left-0 right-0 z-1 transition-all bg-gray-300 dark:bg-gray-900 dark:text-white shadow-2xl">
            <h1 className="text-3xl font-bold cursor-pointer" onClick={() => navigate('/')}>GIAR</h1>
            {
                isLogged && (
                    <>
                        {!quizStarted && (
                            <div className="font-medium flex gap-5">
                                {
                                    navigationLinks.map((link) => (
                                        <Link
                                            key={link.id}
                                            to={link.to}
                                            className="border-b-2 text-md px-1 lg:px-2 py-2 lg:py-2.5 focus:text-violet-600"
                                        >
                                            {link.text}
                                        </Link>
                                    ))
                                }
                                {
                                    user?.role === "admin" && (
                                        <Link
                                            to='/admin'
                                            className="border-b-2 text-md px-1 lg:px-2 py-2 lg:py-2.5 focus:text-violet-600"
                                        >
                                            Admin
                                        </Link>
                                    )
                                }
                            </div>
                        )}
                        <div className="flex items-center gap-5">

                            <button
                                onClick={toggleTheme}
                                className="p-2 text-2xl rounded-full hover:shadow-lg bg-white dark:bg-gray-800 transition-all"
                            >
                                {theme === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
                            </button>

                            <button
                                className="px-4 py-2 bg-white dark:bg-slate-700 font-bold dark:text-white rounded hover:bg-red-500 hover:text-white transition-all"
                                onClick={quizStarted ? () => {alert("Can't logout amid test!")} : handleLogout }
                            >
                                Logout
                            </button>
                        </div>
                    </>
                )
            }
            {
                !isLogged && (
                    <div className="space-x-2 text-black text-sm flex">
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-2xl rounded-full hover:shadow-lg bg-white dark:bg-gray-800 dark:text-white transition-all"
                        >
                            {theme === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
                        </button>
                        <button
                            className="px-4 py-2 bg-white dark:bg-slate-700 font-bold dark:text-white rounded hover:bg-blue-500 hover:text-white transition-all"
                            onClick={() => { navigate("/signup") }}
                        >
                            SignUp
                        </button>
                        <button
                            className="px-4 py-2 bg-white dark:bg-slate-700 font-bold dark:text-white hover:text-white rounded hover:bg-green-500 transition-all"
                            onClick={() => { navigate("/login") }}
                        >
                            Login
                        </button>
                    </div>
                )
            }
        </nav>
    )
}

export default Header;