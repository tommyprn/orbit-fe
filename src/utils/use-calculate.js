import dayjs from 'dayjs';

export const chunkArray = (arr, amount) => {
  var chunkLength = Math.max(arr?.length / amount, 1);
  var chunks = [];
  for (var i = 0; i < amount; i++) {
    if (chunkLength * (i + 1) <= arr?.length)
      chunks?.push(arr?.slice(chunkLength * i, chunkLength * (i + 1)));
  }
  return chunks;
};

export const dateDiff = (start, end) => {
  const diff = dayjs(start).diff(end, 'day');

  return diff;
};

export const getRiskRating = (impact, likelihood) => {
  const sumValue = impact * likelihood;

  if (impact === 1 && likelihood === 4) {
    return 'M';
  } else if (impact === 5 && likelihood === 2) {
    return 'M';
  } else if (sumValue === 5) {
    return 'M';
  } else if (sumValue <= 2) {
    return 'I';
  } else if (sumValue <= 6) {
    return 'L';
  } else if (sumValue >= 10 && sumValue <= 19) {
    return 'H';
  } else if (sumValue >= 20) {
    return 'VH';
  } else {
    return 'M';
  }
};
