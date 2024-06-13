import dayjs from 'dayjs';
import { createOption } from './use-options';

export const month = [
  { label: 'Januari', value: 1 },
  { label: 'Februari', value: 2 },
  { label: 'Maret', value: 3 },
  { label: 'April', value: 4 },
  { label: 'Mei', value: 5 },
  { label: 'Juni', value: 6 },
  { label: 'Juli', value: 7 },
  { label: 'Agustus', value: 8 },
  { label: 'September', value: 9 },
  { label: 'Oktober', value: 10 },
  { label: 'November', value: 11 },
  { label: 'Desember', value: 12 },
];

export const getMonth = {
  1: 'Januari',
  2: 'Februari',
  3: 'Maret',
  4: 'April',
  5: 'Mei',
  6: 'Juni',
  7: 'Juli',
  8: 'Agustus',
  9: 'September',
  10: 'Oktober',
  11: 'November',
  12: 'Desember',
};

export const geoOpt = (data) => {
  const opt = createOption(data);
  return [{ id: null, label: 'Tampil Semua', pic: '', email: '' }, ...opt];
};

export const getYearOpt = () => {
  const year = dayjs().year();
  const arr = [];
  for (let i = 9; i > 0; i--) {
    arr.push(year - i);
  }
  arr.push(year);

  return arr;
};

export const caseOpt = [
  { label: 'Kategori kejadian', value: 'kategori' },
  { label: 'Penyebab kejadian', value: 'penyebab' },
];

export const periodOpt = [
  { label: 'Bulan', value: 'month' },
  { label: 'Triwulan', value: 'triwulan' },
  { label: 'Semi-Annually', value: 'semester' },
  { label: 'Annually', value: 'annual' },
];

export const statusOpt = (data) => {
  return data
    ?.filter(
      (item) =>
        item.nama?.toLowerCase() !== 'recorded' &&
        item.nama?.toLowerCase() !== 'void' &&
        item.nama?.toLowerCase() !== 'draft' &&
        item.nama?.toLowerCase() !== 'need update',
    )
    .map((item) => {
      return {
        label: item.nama,
        value: item.id,
      };
    });
};
// [
//   { label: 'On Progress', value: 'progress' },
//   { label: 'Pending Closed', value: 'pending' },
//   { label: 'Closed', value: 'closed' },
// ];
