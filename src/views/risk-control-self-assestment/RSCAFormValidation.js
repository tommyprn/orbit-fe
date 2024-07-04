import * as yup from 'yup';

export const riskFormSchema = yup.object({
  workProcess: yup.string('masukkan proses kerja').required('proses kerja wajib diisi'),
  chronology: yup.string(`masukkan kronologi kejadian`).required(`kronologi wajib diisi`),
  root: yup.string('masukkan akar permasalahan').required('akar permasalahan wajib diisi'),

  category: '',
  cause: '',
  owner: yup.string('masukkan pemilik risiko').required('pemilik risiko wajib diisi'),
  significance: yup
    .string('masukkan signifikansi risiko')
    .required('signifikansi risiko wajib diisi'),

  impact: yup.number().max(5).min(1),
  likelihood: yup.number().max(5).min(1),
});

export const controlFormSchema = yup.array().of(
  yup.object({
    name: yup.string('masukkan nama kontrol').required('nama kontrol wajib diisi'),
    owner: yup.string('masukkan nama pemilik kontrol').required('nama pemilik kontrol wajib diisi'),
    frequency: yup.string('pilih frekuensi kontrol').required('frekuensi kontrol wajib dipilih'),
    effectiveness: yup
      .string('pilih efektivitas kontrol')
      .required('efektivitas kontrol wajib dipilih'),
    keyControl: yup.string('pilih kontrol utama').required('kontrol utama wajib dipilih'),
    description: yup.string('masukkan deskripsi kontrol').required('deskripsi kontrol wajib diisi'),
  }),
);
