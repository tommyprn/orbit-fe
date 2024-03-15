import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { IconCloudUpload } from '@tabler/icons';
import { useNavigate, useParams } from 'react-router';
import {
  Card,
  Table,
  Paper,
  Button,
  Divider,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Typography,
  TableContainer,
} from '@mui/material';
import { getDropdown } from 'src/actions/masterDataActions';
import { editFormLed, getOneFormLed, approveLED } from 'src/actions/formLEDActions';

import './formLED.css';
import './detailLED.css';

// component
import Spinner from '../spinner/Spinner';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import DetailWrapper from 'src/components/shared/detail-wrapper';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const BCrumb = [
  {
    title: 'Mohon pastikan data yang telah anda ubah terisi dengan benar',
  },
];

const UpdateFormLED = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('history'));
  const { detail, isLoading, approveLED, masterData, getDropdown, editFormLed, getOneFormLed } =
    props;

  const dataLaporan = detail?.laporanLed;
  const dataActionPlan = detail?.actionPlans;

  useEffect(() => {
    (async () => {
      await getDropdown();
      await getOneFormLed(params.reportId);
    })();
  }, [getDropdown, getOneFormLed, params.reportId]);

  const formik = useFormik({
    initialValues: {
      id: dataLaporan?.id,
      brief: dataLaporan?.kronologiSingkat,
      impact: dataLaporan?.dampak,
      reportId: dataLaporan?.idLaporan,
      caseCause: dataLaporan?.penyebabKejadianEntity?.id,
      caseStatus: dataLaporan?.statusKejadian?.id,
      costCentre: dataLaporan?.sslEntity?.id,
      chronology: dataLaporan?.kronologi,
      reportDate: dayjs(dataLaporan?.tanggalLapor),
      actualLoss: String(dataLaporan?.nominalRealisasiKerugian),
      incidentDate: dayjs(dataLaporan?.tanggalKejadian),
      caseCategory: dataLaporan?.aktivitasEntity?.id,
      potentialLoss: String(dataLaporan?.potensiKerugian),
      identifiedDate: dayjs(dataLaporan?.tanggalIdentifikasi),
      recoveryAmount: String(dataLaporan?.nominalRecovery),
      recoverySource: dataLaporan?.sumberRecovery,
      actionPlan: dataActionPlan?.map((item) => {
        return {
          id: item.id ?? 0,
          PIC: item.penanggungJawab,
          plan: item.actionPlan,
          file: item.namaFile ?? '',
          email: item.email,
          isBranch: item.cabangEntity ? true : false,
          branch: item.cabangEntity
            ? { id: item.cabangEntity.id, label: item.cabangEntity.namaCabang }
            : { id: 0, label: '' },
          workUnit: item.unitKerjaEntity
            ? { id: item.unitKerjaEntity.idUnitKerja, label: item.unitKerjaEntity.namaUnitKerja }
            : { id: 0, label: '' },
          targetDate: item.targetPenyelesaian,
        };
      }),
    },
    enableReinitialize: true,
    // validationSchema: validationSchema,

    onSubmit: (values) => {
      editFormLed(values, user);
      navigate('/LED/list');
    },
  });

  const formatNumber = (value) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      return numericValue.toLocaleString('en-US');
    }
    return '0';
  };

  const formatDate = (value) => {
    return dayjs(value).format('DD MMMM YYYY');
  };

  const onCancel = () => {
    navigate(-1);
  };

  const onApprove = async (id) => {
    await approveLED(id, user);
    navigate('/LED/List');
  };

  return (
    <PageContainer title="Edit Laporan Loss Event Database (LED)" description="EditFormLED Page">
      <Breadcrumb title="Edit Laporan LED" items={BCrumb} />

      <DashboardCard>
        {masterData?.isLoading || isLoading || (!dataLaporan && !dataActionPlan) ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit} className="form-sheet">
            <div className="form-title">
              <Typography variant="h4">Incident Number: {dataLaporan?.idLaporan}</Typography>
            </div>

            <>
              <DetailWrapper title="Status kejadian" content={dataLaporan?.statusKejadian?.nama} />
              <div className="detail-wrapper">
                <Typography variant="body1" sx={{ width: '20%', fontWeight: '500' }}>
                  Kronologi{' '}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ width: '80%' }}
                  dangerouslySetInnerHTML={{ __html: dataLaporan?.kronologi }}
                />
              </div>
              <DetailWrapper title="Kronologi singkat" content={dataLaporan?.kronologiSingkat} />
              <DetailWrapper
                title="Tanggal lapor"
                content={formatDate(dataLaporan?.tanggalLapor)}
              />
              <DetailWrapper
                title="Tanggal kejadian"
                content={formatDate(dataLaporan?.tanggalKejadian)}
              />
              <DetailWrapper
                title="Tanggal identifikasi"
                content={formatDate(dataLaporan?.tanggalIdentifikasi)}
              />
              <div className="detail-wrapper">
                <Typography variant="body1" sx={{ width: '20%', fontWeight: '500' }}>
                  Dampak
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ width: '80%' }}
                  dangerouslySetInnerHTML={{ __html: dataLaporan?.dampak }}
                />
              </div>
              <DetailWrapper
                title="Penyebab kejadian"
                content={dataLaporan?.penyebabKejadianEntity?.nama}
              />
            </>

            <Divider sx={{ marginTop: 'px' }} />
            <Typography variant="h6">Kategori kejadian</Typography>

            <>
              <DetailWrapper
                title="Aktivitas (level 3)"
                content={dataLaporan?.aktivitasEntity?.nama}
              />
              <DetailWrapper
                title="Sub kategori (level 2)"
                content={dataLaporan?.aktivitasEntity?.subKategori?.nama}
              />
              <DetailWrapper
                title="Kategori (level 1)"
                content={dataLaporan?.aktivitasEntity?.subKategori?.kategoriKejadian?.nama}
              />
            </>

            <Divider sx={{ marginTop: 'px' }} />
            <Typography variant="h6">Kerugian finansial</Typography>

            <>
              <DetailWrapper
                title="Nominal potensi kerugian"
                content={`Rp. ${formatNumber(dataLaporan?.potensiKerugian)}`}
              />

              <DetailWrapper
                title="Nominal recovery"
                content={`Rp. ${formatNumber(dataLaporan?.nominalRecovery)}`}
              />

              <DetailWrapper
                title="Nominal realisasi kerugian"
                content={`Rp. ${formatNumber(dataLaporan?.nominalRealisasiKerugian)}`}
              />

              <DetailWrapper
                title="Detail NO.GL/SSL/Cost Centre"
                content={`${dataLaporan?.sslEntity?.kode} - ${dataLaporan?.sslEntity?.nama}`}
              />

              <DetailWrapper
                title="Sumber recovery"
                content={`Rp. ${formatNumber(dataLaporan?.sumberRecovery)}`}
              />
            </>

            <Divider sx={{ marginTop: 'px' }} />
            <Card
              elevation={0}
              sx={{
                gap: '16px',
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
              </div>

              <Paper
                sx={{
                  maxWidth: '100%',
                  overflow: 'hidden',
                }}
              >
                <TableContainer sx={{ paddingBottom: '20px' }}>
                  <Table size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>no</TableCell>
                        <TableCell sx={{ width: '400px' }}>Action Plan*</TableCell>
                        <TableCell sx={{ width: '200px' }}>Unit Kerja*</TableCell>
                        <TableCell sx={{ width: '200px' }}>PIC*</TableCell>
                        <TableCell sx={{ width: '200px' }}>Email PIC*</TableCell>
                        <TableCell sx={{ width: '200px' }}>Tanggal target penyelesaian*</TableCell>
                        <TableCell sx={{ width: '200px' }}>Lampiran</TableCell>
                        <TableCell>Status Done</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataActionPlan?.map((row, index) => {
                        return (
                          <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell>{index + 1}</TableCell>

                            <TableCell>
                              <Typography variant="body1">{row?.actionPlan}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body1">
                                {row?.unitKerjaEntity?.namaUnitKerja ||
                                  row?.cabangEntity?.namaCabang}
                                <strong>
                                  {` (${
                                    row?.unitKerjaEntity?.kodeUnitKerja ||
                                    row?.cabangEntity?.kodeCabang
                                  })`}
                                </strong>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body1">{row?.penanggungJawab}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body1">{row?.email}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body1">
                                {formatDate(row?.targetPenyelesaian)}
                              </Typography>
                            </TableCell>

                            <TableCell>
                              {
                                <Button
                                  sx={{ width: '200px' }}
                                  variant="outlined"
                                  component="label"
                                  startIcon={<IconCloudUpload />}
                                >
                                  <Typography sx={{ width: '100%', textAlign: 'center' }}>
                                    {formik.values?.actionPlan?.[index]?.file !== ''
                                      ? formik.values?.actionPlan?.[index]?.file.name ||
                                        formik.values?.actionPlan?.[index]?.file
                                      : 'Upload file'}
                                  </Typography>
                                  <TextField
                                    id={`actionPlan.${index}.file`}
                                    sx={{
                                      clip: 'rect(0 0 0 0)',
                                      left: 0,
                                      width: 1,
                                      height: 1,
                                      bottom: 0,
                                      overflow: 'hidden',
                                      position: 'absolute',
                                      clipPath: 'inset(50%)',
                                      whiteSpace: 'nowrap',
                                    }}
                                    type="file"
                                    error={
                                      formik.touched?.actionPlan?.[index]?.file &&
                                      Boolean(formik.errors?.actionPlan?.[index]?.file)
                                    }
                                    onBlur={formik.handleBlur}
                                    variant="standard"
                                    onChange={(event) => {
                                      const files = event.target.files[0];
                                      formik.setFieldValue(`actionPlan.${index}.file`, files);
                                    }}
                                    helperText={
                                      formik.touched?.actionPlan?.[index]?.file &&
                                      formik.errors?.actionPlan?.[index]?.file
                                    }
                                    placeholder="lampiran laporan"
                                  />
                                </Button>
                              }
                            </TableCell>
                            <TableCell>
                              <Checkbox />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Card>
            <div className="button-wrapper">
              <Button variant="contained" color="error" onClick={onCancel}>
                Kembali
              </Button>

              {user.role === 'inputer' ? (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!formik.isValid || !formik.dirty}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={() => onApprove(dataLaporan?.id)}
                >
                  Approve LED
                </Button>
              )}
            </div>
          </form>
        )}
      </DashboardCard>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    detail: state.LED.detail.data,
    isLoading: state.LED.isLoading,
    masterData: state.masterData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    approveLED: (id, user) => dispatch(approveLED(id, user)),
    getDropdown: () => dispatch(getDropdown()),
    editFormLed: (payload, user) => dispatch(editFormLed(payload, user)),
    getOneFormLed: (id) => dispatch(getOneFormLed(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateFormLED);
