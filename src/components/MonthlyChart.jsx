import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const MonthlyChart = ({ readings }) => {
  if (!readings || readings.length === 0) {
    return (
      <div className="glass-card rounded-3xl p-8 text-center">
        <p className="text-slate-500 dark:text-slate-400">
          No data available. Add readings to see your monthly averages.
        </p>
      </div>
    );
  }

  // Group readings by day and calculate averages
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const recentReadings = readings.filter(
    (r) => new Date(r.date) >= thirtyDaysAgo
  );

  if (recentReadings.length === 0) {
    return (
      <div className="glass-card rounded-3xl p-8 text-center">
        <p className="text-slate-500 dark:text-slate-400">
          No readings in the last 30 days. Add readings to see your monthly averages.
        </p>
      </div>
    );
  }

  // Group by day
  const readingsByDay = {};
  recentReadings.forEach((reading) => {
    const dateKey = new Date(reading.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    if (!readingsByDay[dateKey]) {
      readingsByDay[dateKey] = {
        date: dateKey,
        fullDate: reading.date,
        systolic: [],
        diastolic: [],
      };
    }
    readingsByDay[dateKey].systolic.push(reading.systolic);
    readingsByDay[dateKey].diastolic.push(reading.diastolic);
  });

  // Calculate averages
  const chartData = Object.values(readingsByDay)
    .map((day) => ({
      date: day.date,
      fullDate: day.fullDate,
      Systolic: Math.round(
        day.systolic.reduce((a, b) => a + b, 0) / day.systolic.length
      ),
      Diastolic: Math.round(
        day.diastolic.reduce((a, b) => a + b, 0) / day.diastolic.length
      ),
    }))
    .sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate))
    .slice(-30); // Last 30 days

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
              Avg {entry.name}: {entry.value} mmHg
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
        Monthly Averages (Last 30 Days)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
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
            tick={{ fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={80}
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
          />
          <Bar
            dataKey="Systolic"
            fill="#0ea5e9"
            radius={[8, 8, 0, 0]}
            name="Avg Systolic"
            animationDuration={1000}
          />
          <Bar
            dataKey="Diastolic"
            fill="#14b8a6"
            radius={[8, 8, 0, 0]}
            name="Avg Diastolic"
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyChart;

