import * as yup from 'yup';

export const validationSchema = yup.object({
  caseStatus: yup
    .number(`masukkan status kejadian`)
    .typeError('harap pilih status kejadian')
    .required(`harap pilih status kejadian`),
  chronology: yup.string(`masukkan kronologi kejadian`).required(`kronologi wajib diisi`),
  brief: yup
    .string(`masukkan kronologi singkat kejadian`)
    .required(`kronologi singkat wajib diisi`),
  reportDate: yup.string(`input tanggal`).required(`tanggal laporan wajib diisi`),
  incidentStartDate: yup.string(`input tanggal`).required(`tanggal insiden wajib diisi`),
  incidentEndDate: yup.string(`input tanggal`).required(`tanggal insiden wajib diisi`),
  identifiedDate: yup.string(`input tanggal`).required(`tanggal identifikasi wajib diisi`),
  impact: yup.string(`masukkan dampak dari kejadian`).required(`dampak permasalahan wajib diisi`),
  caseCause: yup
    .number(`masukkan penyebab kejadian`)
    .typeError('harap pilih penyebab kejadian')
    .required(`harap pilih penyebab kejadian`),

  // category
  caseCategory: yup
    .number(`masukkan kategori kejadian`)
    .typeError('harap pilih satu aktivitas')
    .required(`harap pilih satu aktivitas`),

  // financial
  potentialLoss: yup.string(`masukkan nominal kerugian potensial finansial`).when('caseStatus', {
    is: 'Risk Event',
    then: yup.string().required('potensi kerugian wajib diisi'),
  }),
  recoveryAmount: yup.number(`masukkan nominal pemulihan dana`).when('caseStatus', {
    is: 'Loss Event',
    then: yup.number().required('nominal recovery wajib diisi'),
  }),
  actualLoss: yup.number(`masukkan nominal kerugian aktual`).when('caseStatus', {
    is: 'Loss Event',
    then: yup.number().required('kerugian aktual wajib diisi'),
  }),
  costCentre: yup
    .number(`masukkan data cost centre`)
    .nullable()
    .when(['actualLoss', 'recoveryAmount'], {
      is: (gross, rec) => gross - rec > 0,
      then: yup.number().typeError('harap pilih cost centre').required(`harap pilih cost centre`),
    }),
  recoverySource: yup.string(`masukkan sumber recovery`).when('recoveryAmount', {
    is: (val) => val > 0,
    then: yup.string().required(`sumber recovery wajib diisi`),
  }),
  followUp: yup.string(`masukkan sumber recovery`).required(`rencana tindakan wajib diisi`),

  //action plan
  actionPlan: yup.array().of(
    yup.object().shape({
      PIC: yup
        .string(`masukkan PIC/ penanggung jawab dari rancangan ini`)
        .required(`kolom ini wajib diisi`),
      plan: yup
        .string(`rencana penganggulangan masalah dari kejadian`)
        .required(`kolom ini wajib diisi`),
      email: yup
        .string(`masukkan email dari PIC yang aktif`)
        .email('mohon masukkan email yang valid')
        .required(`kolom ini wajib diisi`),
      branch: yup
        .object()
        .shape({
          id: yup.number(`masukkan opsi dari kejadian`).when('isBranch', {
            is: true,
            then: yup.number(`masukkan opsi dari kejadian`).required('harap pilih cabang'),
          }),
          label: yup.string('opsi tidak ditemukan').when('isBranch', {
            is: true,
            then: yup.string(`masukkan opsi dari kejadian`).required('harap pilih cabang'),
          }),
        })
        .default({}),
      workUnit: yup
        .object()
        .shape({
          id: yup.number(`masukkan opsi dari kejadian`).when('isBranch', {
            is: false,
            then: yup.number(`masukkan opsi dari kejadian`).required('harap pilih unit kerja'),
          }),
          label: yup.string('opsi tidak ditemukan').when('isBranch', {
            is: false,
            then: yup.string(`masukkan opsi dari kejadian`).required('harap pilih unit kerja'),
          }),
        })
        .default({}),
      targetDate: yup.string(`input tanggal`).required(`kolom ini wajib dipilih`),
    }),
  ),
});
