import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import secureLocalStorage from 'react-secure-storage';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { showToast } from 'src/utils/use-snackbar';
import { getDropdown } from 'src/actions/masterDataActions';
import { createOption } from 'src/utils/use-options';
import { IconCloudUpload } from '@tabler/icons';
import { validationSchema } from './validationForm';
import { useNavigate, useParams } from 'react-router';
import { formatNumber, formatDate } from 'src/utils/use-formatter';
import { editFormLed, getOneFormLed, approveLED } from 'src/actions/formLEDActions';
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
  Autocomplete,
  InputAdornment,
  TableContainer,
} from '@mui/material';

// component
import Spinner from '../spinner/Spinner';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import DetailWrapper from 'src/components/shared/detail-wrapper';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import QuillTextField from 'src/components/forms/quil-text/quill-text';

import './formLED.css';
import './detailLED.css';

const BCrumb = [
  {
    title: 'Mohon pastikan data yang telah anda ubah terisi dengan benar',
  },
];

const UpdateFormLED = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(secureLocalStorage.getItem('history'));

  const { detail, isLoading, approveLED, masterData, getDropdown, editFormLed, getOneFormLed } =
    props;

  const [nettLossNotif, setNetLossNotif] = useState(false);
  const [caseStatusValue, setCaseStatusValue] = useState({
    id: 0,
    label: '',
  });

  const dataLaporan = detail?.laporanLed;
  const dataActionPlan = detail?.actionPlans;

  useEffect(() => {
    (async () => {
      await getDropdown();
      await getOneFormLed(params.reportId);
    })();
  }, [getDropdown, getOneFormLed, params.reportId]);

  useEffect(() => {
    if (dataLaporan) {
      setCaseStatusValue({
        id: dataLaporan?.statusKejadian?.id ?? 0,
        label: dataLaporan?.statusKejadian?.nama ?? '',
      });
    }
  }, [dataLaporan, dataActionPlan]);

  const formik = useFormik({
    initialValues: {
      id: dataLaporan?.id,
      brief: dataLaporan?.kronologiSingkat,
      impact: dataLaporan?.dampak,
      followUp: dataLaporan?.tindakLanjut,
      reportId: dataLaporan?.idLaporan,
      caseCause: dataLaporan?.penyebabKejadianEntity?.id,
      caseStatus: dataLaporan?.statusKejadian?.id,
      costCentre: dataLaporan?.sslEntity?.id,
      chronology: dataLaporan?.kronologi,
      reportDate: dayjs(dataLaporan?.tanggalLapor),
      actualLoss: String(dataLaporan?.nominalRealisasiKerugian),
      incidentEndDate: dayjs(dataLaporan?.tanggalKejadianEnd),
      incidentStartDate: dayjs(dataLaporan?.tanggalKejadianStart),
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
          isEnable: item.isDone ? item.isDone : false,
        };
      }),
    },
    enableReinitialize: true,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      const res = await editFormLed(values, user);
      if (res.responseCode === 200) {
        navigate('/LED/list');
        showToast('success', 'laporan berhasil disubmit');
      } else {
        showToast('error', 'gagal koneksi ke server, mohon coba beberapa saat lagi');
      }
    },
  });

  const onCancel = () => {
    navigate(-1);
  };

  const onApprove = async (id) => {
    const res = await approveLED(id, user);
    if (res.responseCode === 200) {
      navigate('/LED/list');
      showToast('success', 'laporan berhasil di approve');
    } else {
      showToast('error', 'gagal koneksi ke server, mohon coba beberapa saat lagi');
    }
  };

  const onCheck = (e, index) => {
    formik.setFieldValue(`actionPlan.${index}.isEnable`, e.target.checked);
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
              <div className="form-input-wrapper">
                <Typography variant="body1" sx={{ width: '20%', fontWeight: '500' }}>
                  Status kejadian
                </Typography>

                <Autocomplete
                  disablePortal
                  id="caseStatus"
                  sx={{ width: '80%' }}
                  value={caseStatusValue}
                  options={createOption(masterData.dropdown.caseStatus)}
                  onChange={(event, newValue) => {
                    if (newValue === null) {
                      setCaseStatusValue({ id: 0, label: '' });
                    } else {
                      setCaseStatusValue(newValue);
                      formik.setFieldValue('caseStatus', newValue.id);
                    }
                  }}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="caseStatus"
                      value={caseStatusValue}
                      error={formik.touched.caseStatus && Boolean(formik.errors.caseStatus)}
                      onBlur={formik.handleBlur}
                      helperText={formik.touched.caseStatus && formik.errors.caseStatus}
                      placeholder="pilih status kejadian"
                    />
                  )}
                />
              </div>

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

              <DetailWrapper
                title="Penyebab kejadian"
                content={dataLaporan?.penyebabKejadianEntity?.nama}
              />

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
              <Typography variant="h6">Kronologi kejadian</Typography>

              <DetailWrapper title="Kronologi singkat" content={dataLaporan?.kronologiSingkat} />

              {caseStatusValue.label === 'Loss Event' ? (
                <div className="form-input-wrapper">
                  <Typography variant="body1" sx={{ width: '20%', fontWeight: '500' }}>
                    Kronologi
                  </Typography>

                  <QuillTextField
                    id="chronology"
                    value={formik.values.chronology}
                    isError={formik.errors}
                    onChange={(val) => formik.setFieldValue('chronology', val)}
                    helperText="kronologi kejadian wajib diisi"
                  />
                </div>
              ) : (
                <div className="detail-wrapper">
                  <Typography variant="body1" sx={{ width: '20%', fontWeight: '500' }}>
                    Kronologi
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ width: '80%' }}
                    dangerouslySetInnerHTML={{ __html: dataLaporan?.kronologi }}
                  />
                </div>
              )}

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
            </>

            <Divider sx={{ marginTop: 'px' }} />
            <Typography variant="h6">Kerugian finansial</Typography>

            <>
              <DetailWrapper
                title="Nominal potensi kerugian"
                content={`Rp. ${formatNumber(dataLaporan?.potensiKerugian)}`}
              />

              {caseStatusValue.label !== 'Loss Event' ? (
                <DetailWrapper
                  title="Gross loss"
                  content={`Rp. ${formatNumber(dataLaporan?.nominalRealisasiKerugian)}`}
                />
              ) : (
                <div className="form-input-wrapper">
                  <Typography variant="body1" sx={{ width: '20%', fontWeight: '500' }}>
                    Gross loss
                  </Typography>

                  <TextField
                    sx={{ width: '80%' }}
                    id="actualLoss"
                    type="text"
                    value={formatNumber(formik.values.actualLoss)}
                    error={
                      (formik.touched.actualLoss && Boolean(formik.errors.actualLoss)) ||
                      nettLossNotif
                    }
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    onChange={(e) => {
                      const newValue = e.target.value.replace(/[^0-9.]/g, '');
                      formik.setFieldValue('actualLoss', Number(newValue));
                      if (newValue < formik.values.recoveryAmount) {
                        setNetLossNotif(true);
                      } else {
                        setNetLossNotif(false);
                      }
                    }}
                    helperText={
                      nettLossNotif
                        ? 'nominal gross harus melebihi recovery'
                        : formik.touched.actualLoss
                        ? formik.errors.actualLoss
                        : ''
                    }
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Rp.</InputAdornment>,
                    }}
                    placeholder="nominal kerugian aktual"
                  />
                </div>
              )}

              {caseStatusValue.label !== 'Loss Event' ? (
                <DetailWrapper
                  title="Nominal recovery"
                  content={`Rp. ${formatNumber(dataLaporan?.nominalRecover)}`}
                />
              ) : (
                <div className="form-input-wrapper">
                  <Typography variant="body1" sx={{ width: '20%', fontWeight: '500' }}>
                    Nominal recovery
                  </Typography>

                  <TextField
                    sx={{ width: '80%' }}
                    id="recoveryAmount"
                    type="text"
                    value={formatNumber(formik.values.recoveryAmount)}
                    error={formik.touched.recoveryAmount && Boolean(formik.errors.recoveryAmount)}
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    onChange={(e) => {
                      const newValue = e.target.value.replace(/[^0-9.]/g, '');
                      formik.setFieldValue('recoveryAmount', Number(newValue));
                      if (newValue > formik.values.actualLoss) {
                        setNetLossNotif(true);
                      } else {
                        setNetLossNotif(false);
                      }
                    }}
                    helperText={formik.touched.recoveryAmount && formik.errors.recoveryAmount}
                    placeholder="nominal jumlah pemulihan"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Rp.</InputAdornment>,
                    }}
                  />
                </div>
              )}

              <DetailWrapper
                title="Nett loss"
                content={`Rp. ${formatNumber(
                  formik.values.actualLoss - formik.values.recoveryAmount,
                )}`}
              />

              {caseStatusValue.label !== 'Loss Event' ? (
                <DetailWrapper
                  title="Cost Centre"
                  content={
                    dataLaporan?.sslEntity?.kode
                      ? `${dataLaporan?.sslEntity?.kode} - ${dataLaporan?.sslEntity?.nama}`
                      : '-'
                  }
                />
              ) : (
                <div className="form-input-wrapper">
                  <Typography variant="body1" sx={{ width: '20%' }}>
                    Cost Centre
                  </Typography>

                  <Autocomplete
                    disablePortal
                    id="costCentre"
                    sx={{ width: '80%' }}
                    value={formik.values.costCentre}
                    options={createOption(masterData.dropdown.costCentre, true)}
                    onChange={(event, newValue) => {
                      formik.setFieldValue('costCentre', newValue?.id);
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="costCentre"
                        value={formik.values.costCentre}
                        error={formik.touched.costCentre && Boolean(formik.errors.costCentre)}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.costCentre && formik.errors.costCentre}
                        placeholder="pilih kode cost centre"
                      />
                    )}
                  />
                </div>
              )}

              {caseStatusValue.label !== 'Loss Event' ? (
                <DetailWrapper
                  title="Sumber recovery"
                  content={dataLaporan?.sumberRecovery ? dataLaporan?.sumberRecovery : '-'}
                />
              ) : (
                <div className="form-input-wrapper">
                  <Typography variant="body1" sx={{ width: '20%' }}>
                    Sumber recovery
                  </Typography>

                  <TextField
                    sx={{ width: '80%' }}
                    id="recoverySource"
                    value={formik.values?.recoverySource}
                    error={formik.touched.recoverySource && Boolean(formik.errors.recoverySource)}
                    onBlur={formik.handleBlur}
                    variant="outlined"
                    onChange={formik.handleChange}
                    helperText={formik.touched.recoverySource && formik.errors.recoverySource}
                    placeholder="tuliskan sumber disini"
                  />
                </div>
              )}

              <div className="form-input-wrapper">
                <Typography variant="body1" sx={{ width: '20%' }}>
                  Tindakan yang dilakukan
                </Typography>

                <QuillTextField
                  id="followUp"
                  value={formik.values.followUp}
                  isError={formik.errors}
                  onChange={(val) => formik.setFieldValue('followUp', val)}
                  helperText={formik.errors.followUp}
                />
              </div>
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
                              <Checkbox
                                onClick={(e) => onCheck(e, index)}
                                defaultChecked={row.isDone}
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
            <div className="button-wrapper">
              <Button variant="contained" color="error" onClick={onCancel}>
                Kembali
              </Button>

              {user.role?.toLowerCase() === 'inputer' ? (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!formik.isValid || !formik.dirty || nettLossNotif}
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
