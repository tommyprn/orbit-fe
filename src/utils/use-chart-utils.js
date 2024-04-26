import { chunkArray } from './use-calculate';

export const getSliceAmount = (period) => {
  if (period === 'month') {
    return 12;
  } else if (period === 'semester') {
    return 2;
  } else if (period === 'annual') {
    return 1;
  } else {
    return 4;
  }
};

export const chartValue = (data, period, nominal) => {
  const newData = chunkArray(data, getSliceAmount(period));
  const newValue = newData.map((item) => {
    return item.reduce((sum, val) => {
      if (nominal) {
        return sum + val / 1000000;
      }
      return sum + val;
    }, 0);
  });

  return newValue;
};

export const getSeries = (data) => {
  return data.find((item) => item.label.toLowerCase() === 'grand total');
};

export const periodTranslate = {
  month: 'bulanan',
  annual: 'tahunan',
  triwulan: 'triwulan',
  semester: 'semester',
};
