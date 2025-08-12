import { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3000/admin/fetch-users", {
                headers: {
                    Authorization: "Player " + localStorage.getItem("token")
                }
            })

            setUsers(response.data);

        } catch (err) {
            // setMessage({ status: "fail", msg: "Failed to fetch users!" });
            console.error("Failed to fetch users: ", err);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = async (id, index) => {

        const newUserArr = [...users];
        newUserArr.splice(index, 1);

        try {
            await axios.delete(`http://localhost:3000/admin/delete-user/${id}`, {
                headers: {
                    Authorization: "Player " + localStorage.getItem("token")
                }
            })

            setUsers(newUserArr);
            setMessage({ status: "pass", msg: "Successfully deleted the user!" })
        } catch (err) {
            setMessage({ status: "fail", msg: "Failed to Delete the user!" });
            console.error("Failed to delete user: ", err);
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Manage Users
            </h1>

            {users.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300 italic text-center">
                    No users found.
                </p>
            ) : (
                <div className="space-y-4">
                    {users.map((user, index) => (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row md:items-center md:justify-between border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Username & Role */}
                            <div className="flex items-center mb-2 md:mb-0">
                                <span className="font-semibold text-gray-800 dark:text-gray-100">
                                    {user?.username}
                                </span>
                                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                                    {user?.role}
                                </span>
                            </div>

                            {/* Email */}
                            <p className="text-sm text-gray-600 dark:text-gray-300 flex-1">
                                {user?.email}
                            </p>

                            {/* Actions */}
                            <div className="flex justify-end">
                                {user?.role === "user" && (
                                    <button
                                        onClick={() => handleDeleteUser(user._id, index)}
                                        className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-md shadow-sm transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
}

export default ManageUsers;