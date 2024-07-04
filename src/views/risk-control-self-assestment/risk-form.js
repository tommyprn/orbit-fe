import React, { useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { getDropdown } from 'src/actions/masterDataActions';
import { createOption } from 'src/utils/use-options';
import { getRiskColor } from 'src/utils/use-formatter';
import { getRiskRating } from 'src/utils/use-calculate';
import { riskFormSchema } from './RSCAFormValidation';
import { Typography, Divider, Button } from '@mui/material';

// component
import BaseInput from 'src/components/shared/input/base-input';
import SliderInput from 'src/components/shared/slider/slider';
import DashboardCard from '../../components/shared/DashboardCard';
import PageContainer from 'src/components/container/PageContainer';

const RiskForm = (props) => {
  const role = JSON.parse(secureLocalStorage.getItem('selectedRoleName')).toLowerCase();
  const { dropDown, getDropdown } = props;

  useEffect(() => {
    (async () => {
      await getDropdown();
    })();
  }, []);

  const formik = useFormik({
    initialValues: {
      root: '',
      cause: null,
      owner: '',
      impact: 1,
      category: null,
      likelihood: 1,
      chronology: '',
      workProcess: '',
      significance: '',
    },
    validationSchema: riskFormSchema,
    onSubmit: async (values) => {
      console.log(values);
      //   const res = await createFormLed(values, user);
      //   if (res?.responseCode === 200) {
      //     showToast('success', 'berhasil submit laporan');
      //   } else {
      //     showToast(
      //       'error',
      //       'terjadi kesalahan saat mensubmit laporan, mohon cek kembali input anda',
      //     );
      //   }
    },
  });

  return (
    <PageContainer title="top issue" description="top issue Page">
      <DashboardCard>
        <form
          style={{ gap: '16px', display: 'flex', flexDirection: 'column' }}
          onSubmit={formik.handleSubmit}
        >
          <div
            style={{
              gap: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                gap: '24px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <BaseInput
                id="workProcess"
                title="Proses kerja"
                value={formik.values.workProcess}
                formik={formik}
                placeholder="keterangan detail proses kerja"
              />

              <BaseInput
                id="root"
                title="Akar permasalahan"
                value={formik.values.root}
                formik={formik}
                placeholder="akar permasalahan timbulnya risiko"
              />

              <BaseInput
                id="chronology"
                type="quill"
                title="Kronologi/ deskripsi kejadian"
                value={formik.values.chronology}
                formik={formik}
                helperText="kronologi kejadian wajib diisi"
                placeholder="keterangan detail risiko yang teridentifikasi"
              />
            </div>

            <div
              style={{
                gap: '20.5px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <BaseInput
                id="category"
                title="Kategori kejadian"
                type="select"
                value={formik.values.category}
                formik={formik}
                option={createOption(dropDown?.caseCategory.levelOne)}
                placeholder="kategori kejadian risiko opr"
              />

              <BaseInput
                id="cause"
                title="Penyebab kejadian"
                type="select"
                value={formik.values.cause}
                formik={formik}
                option={createOption(dropDown?.caseCause)}
                placeholder="penyebab kejadian risiko opr"
              />

              <BaseInput
                id="significance"
                title="Risiko signifikan"
                value={formik.values.significance}
                formik={formik}
                placeholder="apakah risiko ini merupakan risiko signifikan?"
              />

              <BaseInput
                id="owner"
                title="Pemilik risiko (L1/ BOSM)"
                value={formik.values.owner}
                formik={formik}
                placeholder="nama pejabat tertinggi pada unit kerja pemilik risiko"
              />
            </div>
          </div>

          <Divider />

          <div
            style={{
              gap: '16px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h5" style={{ width: '100%' }}>
              Risk rating
            </Typography>

            <div style={{ gap: '24px', display: 'flex', justifyContent: 'space-between' }}>
              <SliderInput title="Dampak" id="impact" formik={formik} />
              <SliderInput title="Potensi risiko" id="likelihood" formik={formik} />
              <div
                style={{
                  gap: '8px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    gap: '8px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    paddingRight: '24px',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="body1">Peringkat risiko</Typography>

                  <Typography
                    variant="h4"
                    sx={{
                      color:
                        getRiskColor[
                          getRiskRating(formik.values?.impact, formik.values?.likelihood)
                        ],
                    }}
                  >
                    {getRiskRating(formik.values?.impact, formik.values?.likelihood)}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!formik.isValid || !formik.dirty || role !== 'inputer'}
            >
              Submit
            </Button>
          </div>
        </form>
      </DashboardCard>

      <DashboardCard></DashboardCard>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    dropDown: state.masterData.dropdown,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDropdown: () => dispatch(getDropdown()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RiskForm);
