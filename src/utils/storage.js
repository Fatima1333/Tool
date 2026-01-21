const STORAGE_KEY = 'bp_readings';

export const saveReading = (reading) => {
  const readings = getReadings();
  readings.push({
    ...reading,
    id: Date.now().toString(),
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(readings));
  return readings;
};

export const getReadings = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const updateReading = (id, updatedReading) => {
  const readings = getReadings();
  const index = readings.findIndex((r) => r.id === id);
  if (index !== -1) {
    readings[index] = { ...updatedReading, id };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readings));
  }
  return readings;
};

export const deleteReading = (id) => {
  const readings = getReadings();
  const filtered = readings.filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return filtered;
};

