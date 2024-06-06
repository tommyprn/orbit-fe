import React, { useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { IconX } from '@tabler/icons';
import { connect, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { getDropdown } from 'src/actions/masterDataActions';
import { getRiskColor } from 'src/utils/use-formatter';
import { getRiskRating } from 'src/utils/use-calculate';
import { controlFormSchema } from './RSCAFormValidation';
import {
  Typography,
  Divider,
  Button,
  Card,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Table,
  TableHead,
  IconButton,
} from '@mui/material';

// component
import BaseInput from 'src/components/shared/input/base-input';
import SliderInput from 'src/components/shared/slider/slider';
import DashboardCard from '../../components/shared/DashboardCard';
import PageContainer from 'src/components/container/PageContainer';

const ControlForm = (props) => {
  const role = JSON.parse(secureLocalStorage.getItem('selectedRoleName')).toLowerCase();
  const { dropDown, getDropdown } = props;
  const customizer = useSelector((state) => state.customizer);

  useEffect(() => {
    (async () => {
      await getDropdown();
    })();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      owner: '',
      frequency: '',
      effectiveness: '',
      keyControl: '',
      impact: 1,
      likelihood: 1,
    },
    validationSchema: controlFormSchema,
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

  const deleteRowHandle = () => {};

  const frequencyOpt = [
    {
      id: 'multiple',
      value: 'multiple',
      label: 'Multiple times per day',
    },
    {
      id: 'day',
      value: 'day',
      label: 'Daily',
    },
    {
      id: 'week',
      value: 'week',
      label: 'Weekly',
    },
    {
      id: 'fortnight',
      value: 'fortnight',
      label: 'Fortnightly',
    },
    {
      id: 'month',
      value: 'month',
      label: 'Monthly',
    },
    {
      id: 'quarter',
      value: 'quarter',
      label: 'Quarterly',
    },
    {
      id: 'semester',
      value: 'semester',
      label: 'Semi-annualy',
    },
    {
      id: 'annual',
      value: 'annual',
      label: 'Annualy',
    },
  ];

  const effectiveOpt = [
    {
      id: 'effective',
      value: 'effective',
      label: 'Effective',
    },
    {
      id: 'partial',
      value: 'partial',
      label: 'Partially Effective',
    },
    {
      id: 'Uneffective',
      value: 'Uneffective',
      label: 'Not Effective',
    },
  ];

  const keyOpt = [
    { id: 'yes', value: 'yes', label: 'Yes' },
    { id: 'no', value: 'no', label: 'No' },
  ];

  return (
    <PageContainer
      customStyle={{
        maxWidth: customizer.isCollapse
          ? `calc(100vw - 152px)`
          : window.innerWidth > 1199
          ? `calc(100vw - 335px)`
          : '100%',
      }}
      title="top issue"
      description="top issue Page"
    >
      <DashboardCard>
        <Card
          elevation={0}
          sx={{
            gap: '16px',
            width: '100%',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Typography variant="h6" sx={{ width: '20%' }}>
              Tindak Lanjut
            </Typography>

            <Button variant="contained" onClick={null}>
              Tambah Plan
            </Button>
          </div>

          <Paper
            sx={{
              width: '100%',
              overflowY: 'hidden',
            }}
          >
            <TableContainer sx={{ paddingBottom: '20px', maxHeight: '500px' }}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>hapus</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Nama</TableCell>
                    <TableCell>Deskripsi</TableCell>
                    <TableCell>Pemilik Kontrol</TableCell>
                    <TableCell>Frekuensi</TableCell>
                    <TableCell>Kontrol Utama</TableCell>
                    <TableCell>Efektivitas</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[{}].map((row, index) => {
                    return (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => deleteRowHandle(index)}
                          >
                            <IconX fontSize="inherit" />
                          </IconButton>
                        </TableCell>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <BaseInput
                            id="name"
                            type="quill"
                            formik={formik}
                            helperText="Nama kontrol wajib diisi"
                            placeholder="Nama kontrol"
                          />
                        </TableCell>
                        <TableCell>
                          <BaseInput
                            id="description"
                            type="quill"
                            formik={formik}
                            helperText="Deskripsi kontrol wajib diisi"
                            placeholder="Deskripsi kontrol"
                          />
                        </TableCell>
                        <TableCell>
                          <BaseInput id="owner" formik={formik} placeholder="Pemilik kontrol" />
                        </TableCell>
                        <TableCell>
                          <BaseInput
                            id="frequency"
                            type="select"
                            formik={formik}
                            option={frequencyOpt}
                            placeholder="pilih frekuensi kontrol"
                          />
                        </TableCell>
                        <TableCell>
                          <BaseInput
                            id="effectiveness"
                            type="select"
                            formik={formik}
                            option={keyOpt}
                            placeholder="apakah merupakan kontrol utama?"
                          />
                        </TableCell>
                        <TableCell>
                          <BaseInput
                            id="keyControl"
                            type="select"
                            formik={formik}
                            option={effectiveOpt}
                            placeholder="pilih efektivitas kontrol"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Card>
      </DashboardCard>
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

export default connect(mapStateToProps, mapDispatchToProps)(ControlForm);
