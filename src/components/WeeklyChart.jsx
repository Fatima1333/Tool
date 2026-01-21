import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const WeeklyChart = ({ readings }) => {
  if (!readings || readings.length === 0) {
    return (
      <div className="glass-card rounded-3xl p-8 text-center">
        <p className="text-slate-500 dark:text-slate-400">
          No data available. Add readings to see your weekly trend.
        </p>
      </div>
    );
  }

  // Get last 7 days of readings
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const recentReadings = readings
    .filter((r) => new Date(r.date) >= sevenDaysAgo)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (recentReadings.length === 0) {
    return (
      <div className="glass-card rounded-3xl p-8 text-center">
        <p className="text-slate-500 dark:text-slate-400">
          No readings in the last 7 days. Add readings to see your weekly trend.
        </p>
      </div>
    );
  }

  const chartData = recentReadings.map((reading) => ({
    date: new Date(reading.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    fullDate: reading.date,
    Systolic: reading.systolic,
    Diastolic: reading.diastolic,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 backdrop-blur-xl">
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
            {new Date(data.fullDate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className="text-sm font-bold"
              style={{ color: entry.color }}
            >
              {entry.name}: {entry.value} mmHg
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-3xl p-6">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        Weekly Trend
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
            className="dark:stroke-slate-700"
          />
          <XAxis
            dataKey="date"
            stroke="#64748b"
            className="dark:stroke-slate-400"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            stroke="#64748b"
            className="dark:stroke-slate-400"
            tick={{ fontSize: 12 }}
            domain={['auto', 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="Systolic"
            stroke="#0ea5e9"
            strokeWidth={3}
            dot={{ r: 6, fill: '#0ea5e9' }}
            activeDot={{ r: 8 }}
            name="Systolic"
            animationDuration={1000}
          />
          <Line
            type="monotone"
            dataKey="Diastolic"
            stroke="#14b8a6"
            strokeWidth={3}
            dot={{ r: 6, fill: '#14b8a6' }}
            activeDot={{ r: 8 }}
            name="Diastolic"
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyChart;

