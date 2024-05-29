import * as yup from 'yup';

export const riskFormSchema = yup.object({
  caseStatus: yup
    .number(`masukkan status kejadian`)
    .typeError('harap pilih status kejadian')
    .required(`harap pilih status kejadian`),
  chronology: yup.string(`masukkan kronologi kejadian`).required(`kronologi wajib diisi`),

  // financial
  potentialLoss: yup.string(`masukkan nominal kerugian potensial finansial`).when('caseStatus', {
    is: 'Risk Event',
    then: yup.string().required('potensi kerugian wajib diisi'),
  }),

  actualLoss: yup
    .number(`masukkan nominal kerugian aktual`)
    .moreThan(yup.ref('recoveryAmount'), 'nilai harus lebih besar dari recovery')
    .when('caseStatus', {
      is: 'Loss Event',
      then: yup.number().required('kerugian aktual wajib diisi'),
    }),
});
