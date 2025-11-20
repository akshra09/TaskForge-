import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storageService';
import { Habit } from '../types';
import { Plus, Flame, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../constants';

const Habits: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHabitTitle, setNewHabitTitle] = useState('');
  const [newHabitCategory, setNewHabitCategory] = useState(CATEGORIES[0]);

  useEffect(() => {
    setHabits(StorageService.getHabits());
  }, []);

  const getWeekDays = () => {
    const days = [];
    const today = new Date();
    // Start from 6 days ago to today
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      days.push(d.toISOString().split('T')[0]);
    }
    return days;
  };

  const weekDays = getWeekDays();

  const handleToggle = (habitId: string, date: string) => {
    StorageService.toggleHabitForDate(habitId, date);
    setHabits(StorageService.getHabits());
  };

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitTitle) return;
    
    const habit: Habit = {
      id: Date.now().toString(),
      title: newHabitTitle,
      category: newHabitCategory,
      streak: 0,
      history: {}
    };
    
    StorageService.saveHabit(habit);
    setHabits(StorageService.getHabits());
    setIsModalOpen(false);
    setNewHabitTitle('');
  };

  const resetStreaks = () => {
      const updatedHabits = habits.map(h => ({...h, streak: 0}));
      updatedHabits.forEach(h => StorageService.saveHabit(h));
      setHabits(updatedHabits);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Habit Tracker</h1>
        <div className="flex gap-2">
            <button 
                onClick={resetStreaks}
                className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
            <RotateCcw size={18} className="mr-2" /> Reset
            </button>
            <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-md transition-all"
            >
            <Plus size={18} className="mr-2" /> Add Habit
            </button>
        </div>
      </div>

      {/* Grid Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 mb-2 px-6">
        <div className="col-span-4 text-sm font-semibold text-gray-500 uppercase">Habit</div>
        {weekDays.map(day => (
          <div key={day} className="col-span-1 text-center text-xs font-semibold text-gray-500 uppercase">
            {new Date(day).toLocaleDateString('en-US', { weekday: 'short' })}
            <br />
            {new Date(day).getDate()}
          </div>
        ))}
        <div className="col-span-1 text-center text-sm font-semibold text-gray-500 uppercase">Streak</div>
      </div>

      {/* Habit List */}
      <div className="space-y-4">
        {habits.map(habit => (
          <div key={habit.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-6">
            <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center">
              {/* Title Mobile/Desktop */}
              <div className="col-span-4 mb-4 md:mb-0">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{habit.title}</h3>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">{habit.category}</span>
              </div>

              {/* Grid for Checkboxes */}
              <div className="flex justify-between md:contents">
                  {weekDays.map(day => {
                    const isCompleted = !!habit.history[day];
                    const isToday = day === new Date().toISOString().split('T')[0];
                    return (
                      <div key={day} className="col-span-1 flex flex-col items-center justify-center">
                         <span className="md:hidden text-xs text-gray-400 mb-1">{new Date(day).getDate()}</span>
                         <button
                            onClick={() => handleToggle(habit.id, day)}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                              isCompleted 
                                ? 'bg-emerald-500 text-white shadow-emerald-500/50 shadow-lg transform scale-110' 
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-300 dark:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                            } ${isToday ? 'ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-gray-800' : ''}`}
                         >
                           {isCompleted && <Plus size={16} className="rotate-45" />}
                         </button>
                      </div>
                    );
                  })}
              </div>

               {/* Streak */}
               <div className="col-span-1 flex items-center justify-center mt-4 md:mt-0">
                  <div className="flex items-center space-x-1 text-orange-500 font-bold">
                    <Flame size={20} className={habit.streak > 0 ? "fill-orange-500 animate-pulse" : "text-gray-400"} />
                    <span className={habit.streak > 0 ? "" : "text-gray-400"}>{habit.streak}</span>
                  </div>
               </div>
            </div>
          </div>
        ))}
        {habits.length === 0 && <div className="text-center py-10 text-gray-500">No habits tracked yet. Start building your routine!</div>}
      </div>

       {/* Modal */}
       {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">New Habit</h2>
            <form onSubmit={handleAddHabit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Habit Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={newHabitTitle}
                  onChange={e => setNewHabitTitle(e.target.value)}
                  placeholder="e.g., Drink Water, Read"
                />
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select 
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none"
                    value={newHabitCategory}
                    onChange={e => setNewHabitCategory(e.target.value)}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Start Tracking</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Habits;