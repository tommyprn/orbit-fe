import * as yup from 'yup';

export const validationSchema = yup.object({
  caseStatus: yup.number(`masukkan status kejadian`).required(`status kejadian wajib diisi`),
  chronology: yup.string(`masukkan kronologi kejadian`).required(`kronologi wajib diisi`),
  rootCause: yup.string(`masukkan akar masalah kejadian`).required(`akar permasalahan wajib diisi`),
  reportDate: yup.string(`input tanggal`).required(`tanggal laporan wajib diisi`),
  incidentDate: yup.string(`input tanggal`).required(`tanggal insiden wajib diisi`),
  identifiedDate: yup.string(`input tanggal`).required(`tanggal identifikasi wajib diisi`),
  impact: yup.string(`masukkan dampak dari kejadian`).required(`dampak permasalahan wajib diisi`),
  caseCause: yup.number(`masukkan penyebab kejadian`).required(`penyebab kejadian wajib diisi`),

  // category
  caseCategory: yup.number(`masukkan kategori kejadian`).required(`kategori kejadian wajib diisi`),

  // financial
  potentialLoss: yup.string(`masukkan nominal kerugian potensial finansial`).when('caseStatus', {
    is: 'Risk Event',
    then: yup.string().required('potensi kerugian wajib diisi'),
  }),
  recoveryAmount: yup.string(`masukkan nominal pemulihan dana`).when('caseStatus', {
    is: 'Loss Event',
    then: yup.string().required('nominal recovery wajib diisi'),
  }),
  actualLoss: yup.string(`masukkan nominal kerugian aktual`).when('caseStatus', {
    is: 'Loss Event',
    then: yup.string().required('kerugian aktual wajib diisi'),
  }),
  costCentre: yup.number(`masukkan data cost centre`).required(`cost centre wajib diisi`),
  recoverySource: yup.string(`masukkan sumber recovery`).required(`sumber recovery wajib diisi`),

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
      workUnit: yup
        .number(`masukkan dampak dari kejadian`)
        .required('harap pilih unit kerja yang bersangkutan'),
      targetDate: yup.string(`input tanggal`).required(`kolom ini wajib dipilih`),
    }),
  ),
});
