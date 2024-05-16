import dayjs from 'dayjs';

export const formatNumber = (value) => {
  const numericValue = parseFloat(value);
  if (!isNaN(numericValue)) {
    return numericValue.toLocaleString('en-US');
  }
  return '0';
};

export const formatText = (data) => {
  return data.replace(/(<([^>]+)>)/gi, '');
};

export const formatDate = (value) => {
  return dayjs(value).format('DD MMMM YYYY');
};

export const roundDecimal = (value) => {
  return Math.round(value * 1000) / 1000;
};
