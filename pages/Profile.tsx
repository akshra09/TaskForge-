import React, { useEffect, useState } from 'react';
import { StorageService } from '../services/storageService';
import { UserProfile } from '../types';
import { User, Moon, Sun, Download, LogOut } from 'lucide-react';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    setProfile(StorageService.getProfile());
  }, []);

  const toggleDarkMode = () => {
    if (profile) {
      const updated = { ...profile, darkMode: !profile.darkMode };
      setProfile(updated);
      StorageService.saveProfile(updated);
    }
  };

  const handleExport = () => {
    const data = StorageService.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'taskforge_backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!profile) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile & Settings</h1>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
            <User size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.username}</h2>
        <p className="text-gray-500 dark:text-gray-400">{profile.email}</p>
        <button className="mt-4 text-indigo-600 hover:underline text-sm">Edit Profile</button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Preferences</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        {profile.darkMode ? <Moon size={20} /> : <Sun size={20} />}
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">Appearance</p>
                        <p className="text-sm text-gray-500">Toggle dark/light theme</p>
                    </div>
                </div>
                <button 
                    onClick={toggleDarkMode}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${profile.darkMode ? 'bg-indigo-600' : 'bg-gray-200'}`}
                >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${profile.darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                        <Download size={20} />
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">Export Data</p>
                        <p className="text-sm text-gray-500">Download all your tasks and roadmaps</p>
                    </div>
                </div>
                <button onClick={handleExport} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Download JSON
                </button>
            </div>
          </div>
      </div>
      
      <button className="w-full py-3 flex items-center justify-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-xl font-medium transition-colors">
        <LogOut size={18} /> Log Out
      </button>
    </div>
  );
};

export default Profile;