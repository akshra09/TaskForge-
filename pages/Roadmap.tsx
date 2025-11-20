import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storageService';
import { Roadmap, RoadmapStep } from '../types';
import { Plus, Download, Share2, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

const RoadmapPage: React.FC = () => {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  useEffect(() => {
    setRoadmaps(StorageService.getRoadmaps());
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const deleteRoadmap = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if(confirm("Are you sure you want to delete this roadmap?")) {
        StorageService.deleteRoadmap(id);
        setRoadmaps(StorageService.getRoadmaps());
    }
  };

  // Simple implementation of step completion toggle within the roadmap
  const toggleStep = (roadmapId: string, stepId: string) => {
      const roadmap = roadmaps.find(r => r.id === roadmapId);
      if(!roadmap) return;
      
      const updatedSteps = roadmap.steps.map(s => 
          s.id === stepId ? { ...s, completed: !s.completed } : s
      );
      
      const updatedRoadmap = { ...roadmap, steps: updatedSteps };
      StorageService.saveRoadmap(updatedRoadmap);
      setRoadmaps(StorageService.getRoadmaps());
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Learning Roadmaps</h1>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md transition-all" onClick={() => alert("Use AI Planner to generate new roadmaps!")}>
            <Plus size={18} className="mr-2" /> New Roadmap
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {roadmaps.map(roadmap => (
            <div key={roadmap.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div 
                    className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-between"
                    onClick={() => toggleExpand(roadmap.id)}
                >
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{roadmap.title}</h3>
                            {roadmap.isAiGenerated && (
                                <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs font-bold rounded-full">AI Generated</span>
                            )}
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{roadmap.description}</p>
                        
                        {/* Progress Bar */}
                        <div className="mt-4 w-full max-w-md bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div 
                                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
                                style={{ width: `${(roadmap.steps.filter(s => s.completed).length / roadmap.steps.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={(e) => deleteRoadmap(e, roadmap.id)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={20} /></button>
                        {expandedId === roadmap.id ? <ChevronUp size={24} className="text-gray-400" /> : <ChevronDown size={24} className="text-gray-400" />}
                    </div>
                </div>

                {/* Steps View */}
                {expandedId === roadmap.id && (
                    <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-6">
                        <div className="relative pl-8 border-l-2 border-gray-300 dark:border-gray-600 space-y-8">
                            {roadmap.steps.map((step, idx) => (
                                <div key={step.id} className="relative">
                                    {/* Timeline Dot */}
                                    <div 
                                        className={`absolute -left-[41px] top-1 w-6 h-6 rounded-full border-4 ${
                                            step.completed ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                                        }`}
                                    ></div>
                                    
                                    <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg border ${step.completed ? 'border-emerald-200 dark:border-emerald-900' : 'border-gray-200 dark:border-gray-700'} shadow-sm`}>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className={`font-bold text-gray-900 dark:text-white ${step.completed ? 'line-through text-gray-500' : ''}`}>{step.title}</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{step.description}</p>
                                                {step.resources && step.resources.length > 0 && (
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        {step.resources.map((res, i) => (
                                                            <span key={i} className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 px-2 py-1 rounded border border-indigo-100 dark:border-indigo-900/50">{res}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <input 
                                                type="checkbox" 
                                                checked={step.completed}
                                                onChange={() => toggleStep(roadmap.id, step.id)}
                                                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700">
                                <Download size={18} /> Export PDF
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700">
                                <Share2 size={18} /> Share Link
                            </button>
                        </div>
                    </div>
                )}
            </div>
        ))}
        {roadmaps.length === 0 && <div className="text-center text-gray-500 py-10">No roadmaps yet. Use the AI Planner to generate one!</div>}
      </div>
    </div>
  );
};

export default RoadmapPage;