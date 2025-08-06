import { Navigate, Outlet } from "react-router-dom";
import axios from 'axios'
import { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";


function ProtectedRoute() {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const validateUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/verify-token", {
                    headers: {
                        Authorization: "Player " + token,
                    }
                })

                setIsAuthenticated(true)
                if (response.status >= 200 && response.status < 300) {
                    setIsAuthenticated(true)
                }
            } catch (error) {
                setIsAuthenticated(false)
            } finally {
                setIsLoading(false)
            }
        }

        validateUser()
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex flex-1 justify-center items-center">
                <FiLoader className='animate-spin' />
            </div>
        )
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;