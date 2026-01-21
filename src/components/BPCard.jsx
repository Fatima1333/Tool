import { Heart, Activity } from 'lucide-react';
import { getBPStatus } from '../utils/bpStatusCalculator';

const BPCard = ({ reading }) => {
  if (!reading) {
    return (
      <div className="glass-card rounded-3xl p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
            <Heart className="w-10 h-10 text-slate-400 dark:text-slate-500" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-1">
              No Readings Yet
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Add your first blood pressure reading to get started
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { systolic, diastolic, pulse, date } = reading;
  const status = getBPStatus(systolic, diastolic);

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      className={`glass-card rounded-3xl p-8 border-2 ${status.borderColor} bg-gradient-to-br ${status.bgColor} transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            Latest Reading
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">{formattedDate}</p>
        </div>
        <div className="relative">
          <Heart
            className={`w-8 h-8 ${status.textColor} animate-pulse`}
            fill="currentColor"
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-6xl font-bold text-slate-900 dark:text-white">
            {systolic}
          </span>
          <span className="text-4xl font-semibold text-slate-600 dark:text-slate-400">
            /
          </span>
          <span className="text-6xl font-bold text-slate-900 dark:text-white">
            {diastolic}
          </span>
          <span className="text-xl text-slate-500 dark:text-slate-500">mmHg</span>
        </div>

        {pulse && (
          <div className="flex items-center gap-2 mt-4 text-slate-600 dark:text-slate-400">
            <Activity className="w-5 h-5" />
            <span className="text-lg font-semibold">{pulse} bpm</span>
          </div>
        )}
      </div>

      <div
        className={`inline-flex items-center px-4 py-2 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm ${status.textColor} font-semibold text-sm`}
      >
        {status.status}
      </div>
    </div>
  );
};

export default BPCard;

