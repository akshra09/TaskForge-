import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, BarChart2, Zap } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">TF</div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">TaskForge</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600">Features</a>
          <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600">Testimonials</a>
        </nav>
        <div className="flex space-x-4">
          <Link to="/dashboard" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-colors shadow-lg shadow-indigo-500/30">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 py-20 md:py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          Master Your Life with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-500">AI-Driven</span> Productivity.
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          Generate custom learning roadmaps, track habits, and manage tasks in one unified workspace powered by Gemini.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link to="/ai-planner" className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 transition-transform hover:scale-105 shadow-xl flex items-center justify-center gap-2">
            <Zap size={20} /> Generate AI Roadmap
          </Link>
          <Link to="/dashboard" className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
            <BarChart2 size={20} /> Track Goals
          </Link>
        </div>

        {/* Visual/Screenshot Area */}
        <div className="mt-16 relative mx-auto max-w-5xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 aspect-video flex items-center justify-center group">
             <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-emerald-500/10 opacity-50"></div>
             <img 
               src="https://picsum.photos/1200/675" 
               alt="App Screenshot" 
               className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
             />
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-black/50 backdrop-blur-md text-white px-6 py-3 rounded-full font-semibold">
                  Interactive Dashboard Preview
                </span>
             </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 dark:bg-gray-800/50 py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Smart Task Management</h3>
              <p className="text-gray-600 dark:text-gray-400">Organize tasks with priorities, categories, and due dates. Filter and search effortlessly.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                <BarChart2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Habit Streaks</h3>
              <p className="text-gray-600 dark:text-gray-400">Visual consistency trackers to keep you motivated and building long-term discipline.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">AI Roadmap Generator</h3>
              <p className="text-gray-600 dark:text-gray-400">Input a skill, get a step-by-step study plan generated by Google Gemini in seconds.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white dark:bg-gray-900 py-10 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} TaskForge. Built with React & Gemini.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;