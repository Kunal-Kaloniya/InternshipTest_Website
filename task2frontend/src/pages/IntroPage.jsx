import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

function IntroPage() {
    return (
        <div className={`min-h-screen flex flex-col items-center justify-between dark:bg-gray-800 dark:text-white transition-all duration-300`}>

            <main className="flex flex-col items-center justify-center gap-6 p-5 flex-1">
                <h2 className="text-4xl font-extrabold text-center">Challenge Your Brain</h2>
                <p className="text-lg text-center max-w-xl">
                    Test your knowledge in Math, Science, and Computer Science. Choose your difficulty and climb the leaderboard!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 max-w-5xl text-center">
                    <div className="bg-white text-black shadow-md rounded-lg p-5 border">
                        <h3 className="text-xl font-bold">🎯 Choose Category</h3>
                        <p>Select from Math, Science, or Computer Science</p>
                    </div>
                    <div className="bg-white text-black shadow-md rounded-lg p-5 border">
                        <h3 className="text-xl font-bold">⏲️ Timed Tests</h3>
                        <p>Answer under pressure with a live timer</p>
                    </div>
                    <div className="bg-white text-black shadow-md rounded-lg p-5 border">
                        <h3 className="text-xl font-bold">📊 Track Your Progress</h3>
                        <p>See your test history and performance</p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full text-center py-4 text-sm bg-gray-300 dark:bg-slate-900">
                Made by Kunal • GIAR Internship Test © 2025
            </footer>
        </div>
    );
}

export default IntroPage;