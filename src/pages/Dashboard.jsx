import { useState, useEffect } from 'react';
import { Plus, Moon, Sun, Edit2, Trash2, TrendingUp } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import BPCard from '../components/BPCard';
import AddReadingModal from '../components/AddReadingModal';
import WeeklyChart from '../components/WeeklyChart';
import MonthlyChart from '../components/MonthlyChart';
import { getReadings, saveReading, updateReading, deleteReading } from '../utils/storage';

const Dashboard = () => {
  const [readings, setReadings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReading, setEditingReading] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    loadReadings();
    applyDarkMode();
  }, [darkMode]);

  const applyDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const loadReadings = () => {
    const loaded = getReadings();
    setReadings(loaded.sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  const handleAddReading = () => {
    setEditingReading(null);
    setIsModalOpen(true);
  };

  const handleEditReading = (reading) => {
    setEditingReading(reading);
    setIsModalOpen(true);
  };

  const handleSaveReading = (reading) => {
    if (editingReading) {
      updateReading(editingReading.id, reading);
      toast.success('Reading updated successfully!', {
        icon: '✅',
        style: {
          borderRadius: '12px',
          background: darkMode ? '#1e293b' : '#fff',
          color: darkMode ? '#f1f5f9' : '#0f172a',
        },
      });
    } else {
      saveReading(reading);
      toast.success('Reading saved successfully!', {
        icon: '💚',
        style: {
          borderRadius: '12px',
          background: darkMode ? '#1e293b' : '#fff',
          color: darkMode ? '#f1f5f9' : '#0f172a',
        },
      });
    }
    loadReadings();
    setIsModalOpen(false);
    setEditingReading(null);
  };

  const handleDeleteReading = (id) => {
    if (window.confirm('Are you sure you want to delete this reading?')) {
      deleteReading(id);
      toast.success('Reading deleted', {
        icon: '🗑️',
        style: {
          borderRadius: '12px',
          background: darkMode ? '#1e293b' : '#fff',
          color: darkMode ? '#f1f5f9' : '#0f172a',
        },
      });
      loadReadings();
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  const latestReading = readings.length > 0 ? readings[0] : null;

  // Calculate trend (simplified - compare last 7 days avg with previous 7 days)
  const getTrend = () => {
    if (readings.length < 7) return null;
    const last7 = readings.slice(0, 7);
    const prev7 = readings.slice(7, 14);
    if (prev7.length === 0) return null;

    const last7Avg =
      last7.reduce((sum, r) => sum + r.systolic, 0) / last7.length;
    const prev7Avg =
      prev7.reduce((sum, r) => sum + r.systolic, 0) / prev7.length;

    const diff = last7Avg - prev7Avg;
    if (Math.abs(diff) < 2) return null;

    return {
      improving: diff < 0,
      message:
        diff < 0
          ? 'Your BP is improving this week! 📉'
          : 'Your BP is slightly higher this week 📈',
    };
  };

  const trend = getTrend();

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Blood Pressure Tracker
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Monitor your health with precision
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-2xl glass-card hover:scale-110 transition-transform"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 text-slate-700" />
            )}
          </button>
          
          <button
            onClick={handleAddReading}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary-500 to-teal-500 text-white font-semibold hover:from-primary-600 hover:to-teal-600 hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Reading</span>
          </button>
        </div>
      </div>

      {/* Trend Banner */}
      {trend && (
        <div className="mb-6 glass-card rounded-2xl p-4 flex items-center gap-3 bg-gradient-to-r from-primary-500/10 to-teal-500/10 border border-primary-500/20">
          <TrendingUp
            className={`w-6 h-6 ${
              trend.improving ? 'text-green-500' : 'text-orange-500'
            }`}
          />
          <p className="font-semibold text-slate-900 dark:text-white">
            {trend.message}
          </p>
        </div>
      )}

      {/* Main BP Card */}
      <div className="mb-8">
        <BPCard reading={latestReading} />
      </div>

      {/* Readings List */}
      {readings.length > 0 && (
        <div className="mb-8 glass-card rounded-3xl p-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Recent Readings
          </h2>
          <div className="space-y-3">
            {readings.slice(0, 5).map((reading) => {
              const date = new Date(reading.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={reading.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">
                          {reading.systolic}
                        </span>
                        <span className="text-xl text-slate-500 dark:text-slate-400">
                          /
                        </span>
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">
                          {reading.diastolic}
                        </span>
                        <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">
                          mmHg
                        </span>
                        {reading.pulse && (
                          <>
                            <span className="text-slate-300 dark:text-slate-600 mx-2">
                              •
                            </span>
                            <span className="text-lg text-slate-600 dark:text-slate-400">
                              {reading.pulse} bpm
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditReading(reading)}
                      className="p-2 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/30 text-primary-600 dark:text-primary-400 transition-all"
                      aria-label="Edit reading"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteReading(reading.id)}
                      className="p-2 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-all"
                      aria-label="Delete reading"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {readings.length > 5 && (
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
              Showing 5 of {readings.length} readings
            </p>
          )}
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <WeeklyChart readings={readings} />
        <MonthlyChart readings={readings} />
      </div>

      {/* Disclaimer */}
      <div className="glass-card rounded-2xl p-6 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          <strong>Disclaimer:</strong> This tool is for informational purposes
          only and is not a medical diagnosis. Please consult with a healthcare
          professional for medical advice.
        </p>
      </div>

      {/* Modal */}
      <AddReadingModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingReading(null);
        }}
        onSave={handleSaveReading}
        editingReading={editingReading}
      />
    </div>
  );
};

export default Dashboard;

