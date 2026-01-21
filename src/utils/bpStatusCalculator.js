export const getBPStatus = (systolic, diastolic) => {
  if (systolic < 120 && diastolic < 80) {
    return {
      status: 'Normal',
      color: 'green',
      bgColor: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-500/50',
      textColor: 'text-green-600 dark:text-green-400',
    };
  } else if (systolic < 130 && diastolic < 80) {
    return {
      status: 'Elevated',
      color: 'yellow',
      bgColor: 'from-yellow-500/20 to-amber-500/20',
      borderColor: 'border-yellow-500/50',
      textColor: 'text-yellow-600 dark:text-yellow-400',
    };
  } else if (systolic < 140 || diastolic < 90) {
    return {
      status: 'High BP Stage 1',
      color: 'orange',
      bgColor: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-500/50',
      textColor: 'text-orange-600 dark:text-orange-400',
    };
  } else {
    return {
      status: 'High BP Stage 2',
      color: 'red',
      bgColor: 'from-red-500/20 to-rose-500/20',
      borderColor: 'border-red-500/50',
      textColor: 'text-red-600 dark:text-red-400',
    };
  }
};

export const isValidBP = (systolic, diastolic) => {
  return (
    systolic >= 60 &&
    systolic <= 250 &&
    diastolic >= 40 &&
    diastolic <= 150 &&
    systolic > diastolic
  );
};

