import { useState, useEffect } from "react";

import AddQuestionForm from "./AddQuestionForm";
import UpdateQuestionForm from "./UpdateQuestionForm";
import DeleteQuestionForm from "./DeleteQuestionForm";
import ViewQuestions from "./ViewQuestions";
import ManageUsers from "./ManageUsers";

function Admin() {

    const [activeTab, setActiveTab] = useState("add");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }

    return (
        <div className="min-h-screen font-sans bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="py-6 text-center border-b border-gray-200 dark:border-gray-700">
                    <h1 className="text-2xl font-bold tracking-wide">Admin Panel</h1>
                </div>

                <nav className="flex-1 py-4 space-y-2">
                    {["add", "update", "delete", "questions", "users"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`w-full text-left px-6 py-3 transition-colors font-medium ${activeTab === tab
                                    ? "bg-blue-600 text-white shadow"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`}
                        >
                            {tab === "users"
                                ? "Manage Users"
                                : tab === "questions"
                                    ? "View All Questions"
                                    : `${tab.charAt(0).toUpperCase() + tab.slice(1)} Question`}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} Your Company
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {activeTab === "add" && <AddQuestionForm />}
                {activeTab === "update" && <UpdateQuestionForm />}
                {activeTab === "delete" && <DeleteQuestionForm />}
                {activeTab === "questions" && <ViewQuestions />}
                {activeTab === "users" && <ManageUsers />}
            </main>
        </div>

    );
}

export default Admin;