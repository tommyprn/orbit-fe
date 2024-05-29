import React, { useEffect } from 'react';
import * as yup from 'yup';
import secureLocalStorage from 'react-secure-storage';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { getDropdown } from 'src/actions/masterDataActions';
import { Typography, Divider, Button } from '@mui/material';

// component
import BaseInput from 'src/components/shared/input/base-input';
import SliderInput from 'src/components/shared/slider/slider';
import DashboardCard from '../../components/shared/DashboardCard';
import PageContainer from 'src/components/container/PageContainer';

const RiskForm = (props) => {
  const role = JSON.parse(secureLocalStorage.getItem('selectedRoleName')).toLowerCase();
  const { dropDown, getDropdown } = props;
  console.log(dropDown);
  useEffect(() => {
    (async () => {
      await getDropdown();
    })();
  }, []);

  const riskFormSchema = yup.object({
    key: yup.string().required(`Kolom ini wajib diisi`),
    root: yup.string().required(`Kolom ini wajib diisi`),
    owner: yup.string().required(`Kolom ini wajib diisi`),
    cause: yup.string().required(`Kolom ini wajib diisi`),
    impact: yup.number().max(5).min(1),
    category: yup.string().required(`Kolom ini wajib diisi`),
    likelihood: yup.number().max(5).min(1),
    chronology: yup.string().required(`Kolom ini wajib diisi`),
  });

  const formik = useFormik({
    initialValues: {
      key: '',
      root: '',
      cause: '',
      owner: '',
      impact: 1,
      category: '',
      likelihood: 1,
      chronology: '',
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

  const getRiskRating = () => {
    const sumValue = formik.values?.impact * formik.values?.likelihood;
    if (sumValue < 2) {
      return 'I';
    } else if (sumValue < 6) {
      return 'L';
    } else if (sumValue > 10 && sumValue <= 19) {
      return 'H';
    } else if (sumValue > 19) {
      return 'VH';
    } else {
      return 'M';
    }
  };

  const getColor = {
    I: '#00B050',
    L: '#92D050',
    M: '#FFFF00',
    H: '#FFC000',
    VH: '#FF0000',
  };
  console.log(dropDown);
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
                gap: '16px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <BaseInput
                id="key"
                title="Proses kerja"
                formik={formik}
                placeholder="keterangan detail proses kerja"
              />

              <BaseInput
                id="chronology"
                type="quill"
                title="Kronologi/ deskripsi kejadian"
                formik={formik}
                placeholder="keterangan detail risiko yang teridentifikasi"
              />

              <BaseInput
                id="root"
                title="Akar permasalahan"
                formik={formik}
                placeholder="akar permasalahan timbulnya risiko"
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
                formik={formik}
                option={dropDown?.caseCategory.levelOne}
                placeholder="kategori kejadian risiko opr"
              />

              <BaseInput
                id="cause"
                title="Penyebab kejadian"
                type="select"
                formik={formik}
                option={dropDown?.caseCause}
                placeholder="penyebab kejadian risiko opr"
              />

              <BaseInput
                id="significant"
                title="Risiko signifikan"
                formik={formik}
                placeholder="apakah risiko ini merupakan risiko signifikan?"
              />

              <BaseInput
                id="owner"
                title="Pemilik risiko (L1/ BOSM)"
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

                  <Typography variant="h4" sx={{ color: getColor[getRiskRating()] }}>
                    {getRiskRating()}
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
