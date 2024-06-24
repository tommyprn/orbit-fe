import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { dateDiff } from 'src/utils/use-calculate';
import { useFormik } from 'formik';
import { showToast } from 'src/utils/use-snackbar';
import { getDropdown } from 'src/actions/masterDataActions';
import { formatNumber } from 'src/utils/use-formatter';
import { validationSchema } from './validationForm';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { connect, useSelector } from 'react-redux';
import { IconCloudUpload, IconX } from '@tabler/icons';
import { useNavigate, useParams } from 'react-router';
import { createOption, createGroupedOption } from 'src/utils/use-options';
import { editFormLed, getOneFormLed, approveLED, createDraftLed } from 'src/actions/formLEDActions';
import {
  Card,
  Table,
  Paper,
  styled,
  Button,
  Divider,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  IconButton,
  Typography,
  Autocomplete,
  TableContainer,
  InputAdornment,
} from '@mui/material';
import secureLocalStorage from 'react-secure-storage';

// component
import Spinner from '../spinner/Spinner';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import FormTextField from 'src/components/forms/form-input-textfield/form-input-textfield';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import QuillTextField from 'src/components/forms/quil-text/quill-text';
import CustomAutoComplete from 'src/components/shared/custom-auto-complete';

import './formLED.css';
import './detailLED.css';

const BCrumb = [
  {
    title: 'Mohon pastikan data yang telah anda ubah terisi dengan benar',
  },
];

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 8px',
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.primary.light,
}));

const GroupItems = styled('ul')({
  padding: '0',
  backgroundColor: '#ffffff',
});

const EditFormLED = (props) => {
  const user = JSON.parse(secureLocalStorage.getItem('history'));
  const role = JSON.parse(secureLocalStorage.getItem('selectedRoleName'));

  const params = useParams();
  const navigate = useNavigate();
  const customizer = useSelector((state) => state.customizer);
  const {
    detail,
    isLoading,
    masterData,
    approveLED,
    getDropdown,
    editFormLed,
    getOneFormLed,
    createDraftLed,
  } = props;

  const dataLaporan = detail?.laporanLed;
  const dataActionPlan = detail?.actionPlans;

  const [rows, setRows] = useState([
    {
      PIC: '',
      plan: '',
      file: '',
      email: '',
      workUnit: '',
      targetDate: '',
    },
  ]);
  const [slaNotif, setSLANotif] = useState('');
  const [nettLossNotif, setNetLossNotif] = useState(false);
  const [workUnitValue, setWorkUnitValue] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  const [costCentreValue, setCostCentreValue] = useState({
    id: 0,
    label: '',
  });
  const [caseCauseValue, setCaseCauseValue] = useState({
    id: 0,
    label: '',
  });
  const [caseStatusValue, setCaseStatusValue] = useState({
    id: 0,
    label: '',
  });
  const [caseCategoryValue, setCaseCategoryValue] = useState({
    id: 0,
    label: '',
  });
  const [selectedCategory, setSelectedCategory] = useState({
    id: dataLaporan?.aktivitasEntity?.id,
    nama: dataLaporan?.aktivitasEntity?.nama,
    subKategori: {
      id: dataLaporan?.aktivitasEntity?.subKategori?.id,
      nama: dataLaporan?.aktivitasEntity?.subKategori?.nama,
      kategoriKejadian: {
        id: dataLaporan?.aktivitasEntity?.subKategori?.kategoriKejadian?.id,
        nama: dataLaporan?.aktivitasEntity?.subKategori?.kategoriKejadian?.nama,
      },
    },
  });

  useEffect(() => {
    (async () => {
      await getDropdown(user);
      await getOneFormLed(params.reportId);
    })();
  }, [params.reportId]);

  useEffect(() => {
    const newData = masterData?.dropdown?.caseCategory?.levelThree?.find((item) => {
      return item.id === caseCategoryValue.id;
    });

    setSelectedCategory(newData);
  }, [setSelectedCategory, caseCategoryValue]);

  useEffect(() => {
    if (dataLaporan) {
      setCostCentreValue({
        id: dataLaporan?.sslEntity?.id ?? 0,
        label: dataLaporan?.sslEntity?.nama ?? '',
      });
      setCaseCauseValue({
        id: dataLaporan?.penyebabKejadianEntity?.id ?? 0,
        label: dataLaporan?.penyebabKejadianEntity?.nama ?? '',
      });
      setCaseStatusValue({
        id: dataLaporan?.statusKejadian?.id ?? 0,
        label: dataLaporan?.statusKejadian?.nama ?? '',
      });
      setCaseCategoryValue({
        id: dataLaporan?.aktivitasEntity?.id ?? 0,
        label: dataLaporan?.aktivitasEntity?.nama ?? '',
      });
    }

    if (dataActionPlan) {
      const newData = dataActionPlan?.map((item) => {
        return {
          id: (item?.unitKerjaEntity?.idUnitKerja || item?.cabangEntity?.id) ?? 0,
          label: (item?.unitKerjaEntity?.namaUnitKerja || item?.cabangEntity?.namaCabang) ?? '',
        };
      });

      setWorkUnitValue(newData);
    }
  }, [dataLaporan, dataActionPlan]);

  const formik = useFormik({
    initialValues: {
      id: dataLaporan?.id,
      brief: dataLaporan?.kronologiSingkat ?? '',
      impact: dataLaporan?.dampak ?? '',
      reportId: dataLaporan?.idLaporan,
      followUp: dataLaporan?.tindakLanjut,
      caseCause: dataLaporan?.penyebabKejadianEntity?.id ?? null,
      actionPlan:
        dataActionPlan?.map((item) => {
          return {
            id: item.id ?? 0,
            PIC: item.penanggungJawab ?? '',
            file: item.namaFile ?? '',
            plan: item.actionPlan ?? '',
            email: item.email ?? '',
            isBranch: item.cabangEntity ? true : false,
            branch: item.cabangEntity
              ? { id: item.cabangEntity.id, label: item.cabangEntity.namaCabang }
              : { id: 0, label: '' },
            workUnit: item.unitKerjaEntity
              ? { id: item.unitKerjaEntity.idUnitKerja, label: item.unitKerjaEntity.namaUnitKerja }
              : { id: 0, label: '' },
            targetDate: item.targetPenyelesaian ?? '',
          };
        }) ?? [],
      caseStatus: dataLaporan?.statusKejadian?.id ?? null,
      costCentre: dataLaporan?.sslEntity?.id ?? null,
      chronology: dataLaporan?.kronologi ?? '',
      reportDate: dayjs(dataLaporan?.tanggalLapor) ?? '',
      actualLoss: String(dataLaporan?.nominalRealisasiKerugian) ?? '0',
      incidentEndDate: dayjs(dataLaporan?.tanggalKejadianEnd) ?? '',
      incidentStartDate: dayjs(dataLaporan?.tanggalKejadianStart) ?? '',
      caseCategory: dataLaporan?.aktivitasEntity?.id ?? null,
      potentialLoss: String(dataLaporan?.potensiKerugian) ?? '0',
      identifiedDate: dayjs(dataLaporan?.tanggalIdentifikasi) ?? '',
      recoveryAmount: String(dataLaporan?.nominalRecovery) ?? '0',
      recoverySource: dataLaporan?.sumberRecovery ?? '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      const res = await editFormLed(values, user);
      if (res.responseCode === 200) {
        navigate('/LED/list');
        showToast('success', 'berhasil submit laporan');
      } else {
        showToast('error', 'gagal koneksi ke server, mohon coba beberapa saat lagi');
      }
    },
  });

  const onCancel = () => {
    navigate(-1);
  };

  const onSaveAsDraft = async () => {
    const res = await createDraftLed(formik.values, user);
    if (res?.responseCode === 200) {
      navigate('/LED/list');
      showToast('success', 'laporan berhasil disimpan');
    } else {
      showToast('error', 'gagal koneksi ke server, mohon coba beberapa saat lagi');
    }
  };

  const onApprove = async (id) => {
    const res = await approveLED(id, user);
    if (res?.responseCode === 200) {
      navigate('/LED/list');
      showToast('success', 'laporan berhasil di approve');
    } else {
      showToast('error', 'gagal koneksi ke server, mohon coba beberapa saat lagi');
    }
  };

  const addRow = () => {
    const actionPlan = [
      ...rows,
      {
        PIC: '',
        plan: '',
        file: '',
        email: '',
        workUnit: 0,
        targetDate: '',
      },
    ];

    setRows(actionPlan);
    formik.setValues({ ...formik.values, actionPlan });
  };

  const deleteRowHandle = (index) => {
    if (rows.length > 1) {
      const newRows = rows.filter((item, i) => i !== index);
      const newForm = formik.values.actionPlan.filter((item, i) => i !== index);
      setRows(newRows);
      formik.setFieldValue('actionPlan', newForm);
    } else {
      showToast('error', 'setiap laporan harus memiliki setidaknya 1 action plan');
    }
  };

  const workUnitOption = createOption(masterData.dropdown.workUnit);
  const branchOption = createOption(masterData.dropdown.branch);

  return (
    <PageContainer
      customStyle={{
        maxWidth: customizer.isCollapse
          ? `calc(100vw - 152px)`
          : window.innerWidth > 1199
          ? `calc(100vw - 335px)`
          : '100%',
      }}
      title="Edit Laporan Loss Event Database (LED)"
      description="EditFormLED Page"
    >
      <Breadcrumb title="Edit Laporan LED" items={BCrumb} />

      <DashboardCard>
        {masterData?.isLoading || isLoading || (!dataLaporan && !dataActionPlan) ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit} className="form-sheet">
            <div className="form-title">
              <Typography variant="h4">Incident Number: {dataLaporan?.idLaporan || '-'}</Typography>
            </div>

            <div className="form-input-wrapper">
              <Typography variant="body1" sx={{ width: '20%' }}>
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
                    value={formik.values.caseStatus}
                    error={formik.touched.caseStatus && Boolean(formik.errors.caseStatus)}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.caseStatus && formik.errors.caseStatus}
                    placeholder="pilih status kejadian"
                  />
                )}
              />
            </div>

            <div className="form-input-wrapper">
              <Typography variant="body1" sx={{ width: '20%' }}>
                Tanggal lapor
              </Typography>

              <div className="input-date-section">
                <div className="form-input-date-wrapper">
                  <Typography variant="body1">Tanggal lapor</Typography>

                  <TextField
                    id="reportDate"
                    value={dayjs(formik.values.reportDate).format('DD - MMM - YYYY')}
                    disabled
                  />
                </div>

                <div style={{ width: '100%' }}>
                  <div className="form-input-date-wrapper">
                    <Typography variant="body1">Tanggal awal kejadian</Typography>

                    <MobileDatePicker
                      id="incidentStartDate"
                      value={dayjs(formik.values.incidentStartDate)}
                      error={
                        formik.touched.incidentStartDate && Boolean(formik.errors.incidentStartDate)
                      }
                      format=" DD - MMM - YYYY"
                      onBlur={formik.handleBlur}
                      onChange={(value) => {
                        formik.setFieldValue('incidentStartDate', dayjs(value));
                      }}
                      slotProps={{ textField: { placeholder: 'DD - MMM - YYYY' } }}
                      helperText={
                        formik.touched.incidentStartDate && formik.errors.incidentStartDate
                      }
                    />
                  </div>
                </div>

                <Typography sx={{ fontWeight: 'bold', alignSelf: 'flex-start', marginTop: '40px' }}>
                  s/d
                </Typography>

                <div className="form-input-date-wrapper">
                  <Typography variant="body1">Tanggal akhir kejadian</Typography>

                  <MobileDatePicker
                    id="incidentEndDate"
                    format="DD - MMM - YYYY"
                    value={dayjs(formik.values.incidentEndDate)}
                    error={formik.touched.incidentEndDate && Boolean(formik.errors.incidentEndDate)}
                    onBlur={formik.handleBlur}
                    slotProps={{ textField: { placeholder: 'DD - MMM - YYYY' } }}
                    helperText={formik.touched.incidentEndDate && formik.errors.incidentEndDate}
                    onChange={(value) => {
                      formik.setFieldValue('incidentEndDate', String(value));
                    }}
                  />
                </div>

                <div className="form-input-date-wrapper">
                  <Typography variant="body1">Tanggal identifikasi</Typography>

                  <MobileDatePicker
                    id="identifiedDate"
                    format="DD - MMM - YYYY"
                    value={dayjs(formik.values.identifiedDate)}
                    error={formik.touched.identifiedDate && Boolean(formik.errors.identifiedDate)}
                    onBlur={formik.handleBlur}
                    onChange={(value) => {
                      formik.setFieldValue('identifiedDate', String(value));
                      const diff = dateDiff(formik.values.reportDate, value);
                      if (diff > 5) {
                        setSLANotif('kejadian ini sudah melewati SLA');
                      } else {
                        setSLANotif('');
                      }
                    }}
                    slotProps={{ textField: { placeholder: 'DD - MMM - YYYY' } }}
                    helperText={formik.touched.identifiedDate && formik.errors.identifiedDate}
                  />
                  {slaNotif ? (
                    <Typography sx={{ marginLeft: 1, marginTop: '8px' }} color="error">
                      {slaNotif}
                    </Typography>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="form-input-wrapper">
              <Typography variant="body1" sx={{ width: '20%' }}>
                Penyebab kejadian
              </Typography>

              <Autocomplete
                disablePortal
                id="caseCause"
                sx={{ width: '80%' }}
                value={caseCauseValue}
                options={createOption(masterData.dropdown.caseCause)}
                onChange={(event, newValue) => {
                  if (newValue === null) {
                    setCaseCauseValue({ id: 0, label: '' });
                  } else {
                    setCaseCauseValue(newValue);
                    formik.setFieldValue('caseCause', newValue.id);
                  }
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="caseCause"
                    value={formik.values.caseCause}
                    error={formik.touched.caseCause && Boolean(formik.errors.caseCause)}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.caseCause && formik.errors.caseCause}
                    placeholder="pilih penyebab kejadian"
                  />
                )}
              />
            </div>

            <Divider sx={{ marginTop: 'px' }} />
            <Typography variant="h6" sx={{ width: '20%' }}>
              Kategori kejadian
            </Typography>

            <div className="form-input-wrapper">
              <Typography variant="body1" sx={{ width: '20%' }}>
                Aktivitas (level 3)
              </Typography>

              <Autocomplete
                disablePortal
                id="caseCategory"
                sx={{ width: '80%' }}
                value={caseCategoryValue}
                options={createGroupedOption(masterData.dropdown.caseCategory.levelThree).sort(
                  (a, b) => a.idCategory - b.idCategory,
                )}
                groupBy={(option) => option.labelCategory}
                onChange={(event, newValue) => {
                  if (newValue === null) {
                    setCaseCategoryValue({ id: 0, label: '' });
                  } else {
                    setCaseCategoryValue(newValue);
                    formik.setFieldValue('caseCategory', newValue.id);
                  }
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="caseCategory"
                    value={formik.values.caseCategory}
                    error={formik.touched.caseCategory && Boolean(formik.errors.caseCategory)}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.caseCategory && formik.errors.caseCategory}
                    placeholder="pilih kategori"
                  />
                )}
                renderGroup={(params) => {
                  return (
                    <li key={params.key}>
                      <GroupHeader>{params.group}</GroupHeader>
                      <GroupItems>{params.children}</GroupItems>
                    </li>
                  );
                }}
              />
            </div>

            <div className="form-input-wrapper">
              <Typography variant="body1" sx={{ width: '20%' }}>
                Sub kategori (level 2)
              </Typography>

              <TextField
                sx={{ width: '80%', color: 'black' }}
                id="subCategory"
                value={selectedCategory?.subKategori?.nama}
                variant="outlined"
                placeholder="sub kategori akan terpilih secara otomatis"
                disabled
              />
            </div>

            <div className="form-input-wrapper">
              <Typography variant="body1" sx={{ width: '20%' }}>
                Kategori (level 1)
              </Typography>

              <TextField
                sx={{ width: '80%' }}
                id="category"
                value={selectedCategory?.subKategori?.kategoriKejadian?.nama}
                variant="outlined"
                placeholder="kategori akan terpilih secara otomatis"
                disabled
              />
            </div>

            <Divider sx={{ marginTop: 'px' }} />
            <Typography variant="h6" sx={{ width: '20%' }}>
              Kronologi kejadian
            </Typography>

            <FormTextField
              id="brief"
              title="Kronologi singkat"
              formik={formik}
              placeholder="akar masalah dari kejadian tersebut"
            />

            <div className="form-input-wrapper">
              <Typography variant="body1" sx={{ width: '20%' }}>
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

            <div className="form-input-wrapper">
              <Typography variant="body1" sx={{ width: '20%' }}>
                Dampak
              </Typography>

              <QuillTextField
                id="impact"
                value={formik.values.impact}
                isError={formik.errors}
                onChange={(val) => formik.setFieldValue('impact', val)}
                helperText="dampak kejadian wajib diisi"
              />
            </div>

            <Divider sx={{ marginTop: 'px' }} />
            <Typography variant="h6" sx={{ width: '20%' }}>
              Kerugian finansial
            </Typography>

            <div className="form-input-wrapper">
              <Typography variant="body1" sx={{ width: '20%' }}>
                Nominal potensi kerugian
              </Typography>

              <TextField
                sx={{ width: '80%' }}
                id="potentialLoss"
                type="text"
                value={formatNumber(formik.values.potentialLoss)}
                error={formik.touched.potentialLoss && Boolean(formik.errors.potentialLoss)}
                onBlur={formik.handleBlur}
                variant="outlined"
                disabled={
                  caseStatusValue.label === 'Loss Event' || caseStatusValue.label === 'Near Miss'
                }
                onChange={(e) => {
                  const newValue = e.target.value.replace(/[^0-9.]/g, '');
                  formik.setFieldValue('potentialLoss', newValue);
                }}
                helperText={formik.touched.potentialLoss && formik.errors.potentialLoss}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Rp.</InputAdornment>,
                }}
                placeholder="nominal potensi kerugian finansial"
              />
            </div>

            <div className="form-input-wrapper">
              <Typography variant="body1" sx={{ width: '20%' }}>
                Gross loss
              </Typography>

              <TextField
                sx={{ width: '80%' }}
                id="actualLoss"
                type="text"
                value={formatNumber(formik.values.actualLoss)}
                error={
                  (formik.touched.actualLoss && Boolean(formik.errors.actualLoss)) || nettLossNotif
                }
                onBlur={formik.handleBlur}
                variant="outlined"
                disabled={
                  caseStatusValue.label === 'Risk Event' || caseStatusValue.label === 'Near Miss'
                }
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

            <div className="form-input-wrapper">
              <Typography variant="body1" sx={{ width: '20%' }}>
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
                disabled={
                  caseStatusValue.label === 'Risk Event' || caseStatusValue.label === 'Near Miss'
                }
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

            <div className="form-input-wrapper">
              <Typography variant="body1" sx={{ width: '20%' }}>
                Nett loss
                <br />
                (Gross loss - recovery)
              </Typography>

              <Typography variant="body1" sx={{ width: '80%', paddingLeft: '16px' }}>
                Rp. {formatNumber(formik.values.actualLoss - formik.values.recoveryAmount)}
              </Typography>
            </div>

            <div className="form-input-wrapper">
              <Typography variant="body1" sx={{ width: '20%' }}>
                Cost Centre
              </Typography>

              <Autocomplete
                disablePortal
                id="costCentre"
                sx={{ width: '80%' }}
                value={costCentreValue}
                options={createOption(masterData.dropdown.costCentre, true)}
                onChange={(event, newValue) => {
                  if (newValue === null) {
                    setCostCentreValue({ id: 0, label: '' });
                  } else {
                    setCostCentreValue(newValue);
                    formik.setFieldValue('costCentre', newValue.id);
                  }
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

            <div className="form-input-wrapper">
              <Typography variant="body1" sx={{ width: '20%' }}>
                Sumber recovery
              </Typography>

              <TextField
                sx={{ width: '80%' }}
                id="recoverySource"
                value={formik.values.recoverySource}
                error={formik.touched.recoverySource && Boolean(formik.errors.recoverySource)}
                onBlur={formik.handleBlur}
                variant="outlined"
                onChange={formik.handleChange}
                helperText={formik.touched.recoverySource && formik.errors.recoverySource}
                placeholder="tuliskan sumber disini"
              />
            </div>

            <div className="form-input-wrapper">
              <Typography variant="body1" sx={{ width: '20%' }}>
                Tindak Lanjut
              </Typography>

              <QuillTextField
                id="followUp"
                value={formik.values.followUp}
                isError={formik.errors}
                onChange={(val) => formik.setFieldValue('followUp', val)}
                helperText={formik.errors.followUp}
              />
            </div>

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
                  Rencana Tindakan
                </Typography>

                <Button variant="contained" onClick={addRow}>
                  Tambah Plan
                </Button>
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
                        <TableCell>hapus</TableCell>
                        <TableCell>no</TableCell>
                        <TableCell sx={{ width: '400px' }}>Penjelasan Rencana Tindakan*</TableCell>
                        <TableCell sx={{ width: '200px' }}>Unit Kerja*</TableCell>
                        <TableCell sx={{ width: '200px' }}>PIC*</TableCell>
                        <TableCell sx={{ width: '200px' }}>Email PIC*</TableCell>
                        <TableCell sx={{ width: '200px' }}>Tanggal target penyelesaian*</TableCell>
                        <TableCell sx={{ width: '200px' }}>Lampiran</TableCell>
                        <TableCell>Status Done</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows?.map((row, index) => {
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
                              <TextField
                                id={`actionPlan.${index}.plan`}
                                sx={{ width: '400px' }}
                                rows={4}
                                value={formik.values?.actionPlan?.[index]?.plan}
                                error={
                                  formik.touched?.actionPlan?.[index]?.plan &&
                                  Boolean(formik.errors?.actionPlan?.[index]?.plan)
                                }
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                onChange={formik.handleChange}
                                helperText={
                                  formik.touched?.actionPlan?.[index]?.plan &&
                                  formik.errors?.actionPlan?.[index]?.plan
                                }
                                placeholder="rencana penanggulangan"
                                multiline
                              />
                            </TableCell>
                            <TableCell>
                              <CustomAutoComplete
                                index={index}
                                formik={formik}
                                branchOption={branchOption}
                                workUnitOption={workUnitOption}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                id={`actionPlan.${index}.PIC`}
                                sx={{ width: '200px' }}
                                value={formik.values?.actionPlan?.[index]?.PIC}
                                error={
                                  formik.touched?.actionPlan?.[index]?.PIC &&
                                  Boolean(formik.errors?.actionPlan?.[index]?.PIC)
                                }
                                onBlur={formik.handleBlur}
                                variant="standard"
                                onChange={formik.handleChange}
                                helperText={
                                  formik.touched?.actionPlan?.[index]?.PIC &&
                                  formik.errors?.actionPlan?.[index]?.PIC
                                }
                                placeholder="penanggung jawab rencana"
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                id={`actionPlan.${index}.email`}
                                sx={{ width: '200px' }}
                                value={formik.values?.actionPlan?.[index]?.email}
                                error={
                                  formik.touched?.actionPlan?.[index]?.email &&
                                  Boolean(formik.errors?.actionPlan?.[index]?.email)
                                }
                                onBlur={formik.handleBlur}
                                variant="standard"
                                onChange={formik.handleChange}
                                helperText={
                                  formik.touched?.actionPlan?.[index]?.email &&
                                  formik.errors?.actionPlan?.[index]?.email
                                }
                                placeholder="email penanggung jawab"
                              />
                            </TableCell>
                            <TableCell>
                              <MobileDatePicker
                                id={`actionPlan.${index}.targetDate`}
                                sx={{ width: '200px' }}
                                error={
                                  formik.touched?.actionPlan?.[index]?.targetDate &&
                                  Boolean(formik.errors?.actionPlan?.[index]?.targetDate)
                                }
                                value={dayjs(formik.values?.actionPlan?.[index]?.targetDate)}
                                onBlur={formik.handleBlur}
                                format=" DD - MMM - YYYY"
                                variant="standard"
                                onChange={(value) =>
                                  formik.setFieldValue(
                                    `actionPlan.${index}.targetDate`,
                                    String(value),
                                  )
                                }
                                helperText={
                                  formik.touched?.actionPlan?.[index]?.targetDate &&
                                  formik.errors?.actionPlan?.[index]?.targetDate
                                }
                              />
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

              {role?.toLowerCase() === 'inputer' ? (
                <>
                  {dataLaporan.statusLaporanEntity?.nama === 'Draft' ? (
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={onSaveAsDraft}
                      disabled={!formik.dirty}
                    >
                      Draft
                    </Button>
                  ) : null}
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!formik.isValid || !formik.dirty || nettLossNotif}
                  >
                    Submit
                  </Button>
                </>
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
    getDropdown: (user, id) => dispatch(getDropdown(user, id)),
    editFormLed: (payload, user) => dispatch(editFormLed(payload, user)),
    getOneFormLed: (id) => dispatch(getOneFormLed(id)),
    createDraftLed: (payload, user) => dispatch(createDraftLed(payload, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFormLED);
