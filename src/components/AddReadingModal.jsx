import { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { isValidBP } from '../utils/bpStatusCalculator';

const AddReadingModal = ({ isOpen, onClose, onSave, editingReading = null }) => {
  const [formData, setFormData] = useState({
    systolic: '',
    diastolic: '',
    pulse: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingReading) {
      setFormData({
        systolic: editingReading.systolic.toString(),
        diastolic: editingReading.diastolic.toString(),
        pulse: editingReading.pulse?.toString() || '',
        date: editingReading.date.split('T')[0],
      });
    } else {
      setFormData({
        systolic: '',
        diastolic: '',
        pulse: '',
        date: new Date().toISOString().split('T')[0],
      });
    }
    setErrors({});
  }, [editingReading, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const systolic = parseInt(formData.systolic);
    const diastolic = parseInt(formData.diastolic);
    const pulse = formData.pulse ? parseInt(formData.pulse) : null;

    if (!formData.systolic) {
      newErrors.systolic = 'Systolic is required';
    } else if (systolic < 60 || systolic > 250) {
      newErrors.systolic = 'Systolic must be between 60-250';
    }

    if (!formData.diastolic) {
      newErrors.diastolic = 'Diastolic is required';
    } else if (diastolic < 40 || diastolic > 150) {
      newErrors.diastolic = 'Diastolic must be between 40-150';
    }

    if (systolic && diastolic && !isValidBP(systolic, diastolic)) {
      newErrors.diastolic = 'Diastolic must be less than systolic';
    }

    if (pulse !== null && (pulse < 30 || pulse > 200)) {
      newErrors.pulse = 'Pulse must be between 30-200 bpm';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const reading = {
      systolic: parseInt(formData.systolic),
      diastolic: parseInt(formData.diastolic),
      pulse: formData.pulse ? parseInt(formData.pulse) : null,
      date: formData.date,
    };

    onSave(reading);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-card rounded-3xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {editingReading ? 'Edit Reading' : 'Add Reading'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Systolic (mmHg) *
            </label>
            <input
              type="number"
              name="systolic"
              value={formData.systolic}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border-2 ${
                errors.systolic
                  ? 'border-red-500'
                  : 'border-slate-200 dark:border-slate-700'
              } focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all`}
              placeholder="120"
              min="60"
              max="250"
            />
            {errors.systolic && (
              <p className="mt-1 text-sm text-red-500">{errors.systolic}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Diastolic (mmHg) *
            </label>
            <input
              type="number"
              name="diastolic"
              value={formData.diastolic}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border-2 ${
                errors.diastolic
                  ? 'border-red-500'
                  : 'border-slate-200 dark:border-slate-700'
              } focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all`}
              placeholder="80"
              min="40"
              max="150"
            />
            {errors.diastolic && (
              <p className="mt-1 text-sm text-red-500">{errors.diastolic}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Pulse (bpm) <span className="text-xs font-normal text-slate-500">Optional</span>
            </label>
            <input
              type="number"
              name="pulse"
              value={formData.pulse}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border-2 ${
                errors.pulse
                  ? 'border-red-500'
                  : 'border-slate-200 dark:border-slate-700'
              } focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all`}
              placeholder="72"
              min="30"
              max="200"
            />
            {errors.pulse && (
              <p className="mt-1 text-sm text-red-500">{errors.pulse}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border-2 ${
                errors.date
                  ? 'border-red-500'
                  : 'border-slate-200 dark:border-slate-700'
              } focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-500">{errors.date}</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary-500 to-teal-500 text-white font-semibold hover:from-primary-600 hover:to-teal-600 hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              {editingReading ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReadingModal;

