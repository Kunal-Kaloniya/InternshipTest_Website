import { Outlet } from "react-router-dom"
import Header from "./Header"

export default function Root() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
            <Header />
            <Outlet />
        </div>
    )
}