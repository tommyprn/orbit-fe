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
