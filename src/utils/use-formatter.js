import dayjs from 'dayjs';

export const formatNumber = (value) => {
  const numericValue = parseFloat(value);
  if (!isNaN(numericValue)) {
    return numericValue.toLocaleString('en-US');
  }
  return '0';
};

export const formatDate = (value) => {
  return dayjs(value).format('DD MMMM YYYY');
};