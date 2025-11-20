import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { StorageService } from '../services/storageService';
import { Task, Habit, Roadmap, TaskStatus } from '../types';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Plus, ArrowRight, Zap, CheckSquare, Calendar } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);

  useEffect(() => {
    setTasks(StorageService.getTasks());
    setHabits(StorageService.getHabits());
    setRoadmaps(StorageService.getRoadmaps());
  }, []);

  const completedTasks = tasks.filter(t => t.status === TaskStatus.DONE).length;
  const pendingTasks = tasks.filter(t => t.status !== TaskStatus.DONE).length;

  const taskData = [
    { name: 'Done', value: completedTasks, color: '#10B981' }, // Emerald
    { name: 'Pending', value: pendingTasks, color: '#6366F1' }, // Indigo
  ];

  // Simplified habit data for chart
  const habitData = habits.map(h => ({
    name: h.title.substring(0, 8) + '...',
    streak: h.streak
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Welcome back! Here's your productivity overview.</p>
        </div>
        <Link to="/ai-planner" className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition-colors font-medium">
          <Zap size={18} className="mr-2" /> AI Planner
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Tasks Completed</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{completedTasks}</h3>
            </div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 rounded-xl">
              <CheckSquare size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-emerald-600 font-medium">
            {tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0}% Completion Rate
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Active Habits</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{habits.length}</h3>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-xl">
              <Calendar size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Top streak: <span className="font-bold text-purple-600">{Math.max(...habits.map(h => h.streak), 0)} days</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Active Roadmaps</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{roadmaps.length}</h3>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-xl">
              <Zap size={24} />
            </div>
          </div>
          <div className="mt-4 text-sm text-blue-600 cursor-pointer hover:underline">
            <Link to="/roadmap">View All Roadmaps &rarr;</Link>
          </div>
        </div>
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Task Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Habit Streaks</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={habitData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
                <XAxis dataKey="name" stroke="#9CA3AF" tick={{fontSize: 12}} />
                <YAxis stroke="#9CA3AF" tick={{fontSize: 12}} />
                <Tooltip 
                   cursor={{fill: 'transparent'}}
                   contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff', borderRadius: '8px' }}
                />
                <Bar dataKey="streak" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Upcoming Tasks</h3>
          <Link to="/tasks" className="text-indigo-600 text-sm font-medium hover:underline">View All</Link>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {tasks.filter(t => t.status !== TaskStatus.DONE).slice(0, 3).map(task => (
            <div key={task.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`} />
                <span className="text-gray-900 dark:text-gray-200 font-medium">{task.title}</span>
              </div>
              <span className="text-sm text-gray-500">{task.dueDate}</span>
            </div>
          ))}
          {tasks.filter(t => t.status !== TaskStatus.DONE).length === 0 && (
            <div className="p-8 text-center text-gray-500">No upcoming tasks. Time to rest!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;