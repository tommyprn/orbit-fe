import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router';
import { validationSchema } from './validationForm';
import { useSelector, connect } from 'react-redux';
import { IconX, IconCloudUpload } from '@tabler/icons';
import {
  Card,
  Table,
  Paper,
  styled,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Typography,
  IconButton,
  Autocomplete,
  TableContainer,
  InputAdornment,
} from '@mui/material';
import { showToast } from 'src/utils/use-snackbar';
import { getDropdown } from 'src/actions/masterDataActions';
import { createFormLed, createDraftLed } from 'src/actions/formLEDActions';
import { createOption, createGroupedOption } from 'src/utils/use-options';
import secureLocalStorage from 'react-secure-storage';

// component
import Spinner from '../spinner/Spinner';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import QuillTextField from 'src/components/forms/quil-text/quill-text';
import CustomAutoComplete from 'src/components/shared/custom-auto-complete';

import './formLED.css';

const BCrumb = [
  {
    title: 'Silahkan mengisi data dibawah ini untuk membuat laporan LED',
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

const CreateFormLED = (props) => {
  const user = JSON.parse(secureLocalStorage.getItem('history'));
  const navigate = useNavigate();
  const customizer = useSelector((state) => state.customizer);
  const { masterData, getDropdown, createFormLed, createDraftLed } = props;

  const [slaNotif, setSLANotif] = useState('');

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
  const [caseCauseValue, setCaseCauseValue] = useState({
    id: 0,
    label: '',
  });
  const [costCentreValue, setCostCentreValue] = useState({
    id: 0,
    label: '',
  });
  const [caseStatusValue, setCaseStatusValue] = useState({
    id: 0,
    label: '',
  });
  const [selectedCategory, setSelectedCategory] = useState({
    id: 0,
    nama: '',
    subKategori: {
      id: 0,
      nama: '',
      kategoriKejadian: {
        id: 0,
        nama: '',
      },
    },
  });
  const [caseCategoryValue, setCaseCategoryValue] = useState({
    id: 0,
    label: '',
  });

  useEffect(() => {
    (async () => {
      await getDropdown();
    })();
  }, [getDropdown]);

  useEffect(() => {
    const newData = masterData?.dropdown?.caseCategory?.levelThree?.find((item) => {
      return item.id === caseCategoryValue.id;
    });
    setSelectedCategory(newData);
  }, [caseCategoryValue]);

  const formik = useFormik({
    initialValues: {
      brief: '',
      impact: '',
      caseCause: 0,
      actionPlan: [
        {
          PIC: '',
          plan: '',
          file: '',
          email: '',
          branch: { id: 0, label: '' },
          workUnit: { id: 0, label: '' },
          isBranch: false,
          targetDate: '',
        },
      ],
      caseStatus: 0,
      costCentre: 0,
      chronology: '',
      reportDate: '',
      actualLoss: '0',
      incidentDate: '',
      caseCategory: 0,
      potentialLoss: '0',
      identifiedDate: '',
      recoveryAmount: '0',
      recoverySource: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res = await createFormLed(values, user);
      if (res?.responseCode === 200) {
        navigate('/LED/list');
        showToast('success', 'berhasil submit laporan');
      } else {
        showToast(
          'error',
          'terjadi kesalahan saat mensubmit laporan, mohon cek kembali input anda',
        );
      }
    },
  });

  const workUnitOption = createOption(masterData.dropdown.workUnit);
  const branchOption = createOption(masterData.dropdown.branch);

  const addRow = () => {
    const actionPlan = [
      ...formik?.values?.actionPlan,
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

  const onSaveAsDraft = async () => {
    const res = await createDraftLed(formik.values, user);
    if (res?.responseCode === 200) {
      navigate('/LED/inbox');
      showToast('success', 'laporan disimpan sebagai draft');
    } else {
      showToast(
        'error',
        'terjadi kesalahan laporan tidak dapat disimpan, mohon mencoba beberapa saat lagi',
      );
    }
  };

  const backHandler = () => {
    navigate(-1);
  };

  //utils
  const dateDiff = (start, end) => {
    const diff = dayjs(start).diff(end, 'day');
    return diff;
  };

  const formatNumber = (value) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      return numericValue.toLocaleString('en-US');
    }
    return '0';
  };

  return (
    <PageContainer
      customStyle={{
        maxWidth: customizer.isCollapse ? `calc(100vw - 152px)` : `calc(100vw - 335px)`,
      }}
      title="Buat Laporan Loss Event Database (LED)"
      description="CreateFormLED Page"
    >
      <Breadcrumb title="Buat Laporan LED" items={BCrumb} />

      <DashboardCard>
        {masterData?.isLoading ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit} className="form-sheet">
            {/* <div className="form-title">
              <Typography variant="h4">Incident Number: IN-ITY-00001</Typography>
            </div> */}
            <>
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
                  Kronologi singkat
                </Typography>

                <TextField
                  sx={{ width: '80%' }}
                  id="brief"
                  value={formik.values.brief}
                  error={formik.touched.brief && Boolean(formik.errors.brief)}
                  onBlur={formik.handleBlur}
                  variant="outlined"
                  onChange={formik.handleChange}
                  helperText={formik.touched.brief && formik.errors.brief}
                  placeholder="ringkasan dari kronologi kejadian tersebut"
                />
              </div>

              <div className="form-input-wrapper">
                <Typography variant="body1" sx={{ width: '20%' }}>
                  Tanggal lapor
                </Typography>

                <DatePicker
                  id="reportDate"
                  sx={{ width: '80%' }}
                  format=" DD - MMM - YYYY"
                  error={formik.touched.reportDate && Boolean(formik.errors.reportDate)}
                  onBlur={formik.handleBlur}
                  onChange={(value) => {
                    formik.setFieldValue('reportDate', String(value));
                    const diff = dateDiff(value, formik.values.incidentDate);
                    if (diff > 5) {
                      setSLANotif('kejadian ini sudah melewati SLA');
                    } else {
                      setSLANotif('');
                    }
                  }}
                  helperText={formik.touched.reportDate && formik.errors.reportDate}
                />
              </div>

              <div className="form-input-wrapper">
                <Typography variant="body1" sx={{ width: '20%' }}>
                  Tanggal kejadian
                </Typography>

                <div style={{ width: '80%' }}>
                  <DatePicker
                    id="incidentDate"
                    sx={{ width: '100%' }}
                    format=" DD - MMM - YYYY"
                    error={formik.touched.incidentDate && Boolean(formik.errors.incidentDate)}
                    onBlur={formik.handleBlur}
                    onChange={(value) => {
                      formik.setFieldValue('incidentDate', String(value));
                      const diff = dateDiff(value, formik.values.reportDate);
                      if (diff > 5) {
                        setSLANotif('kejadian ini sudah melewati SLA');
                      } else {
                        setSLANotif('');
                      }
                    }}
                    helperText={formik.touched.incidentDate && formik.errors.incidentDate}
                  />
                  {slaNotif ? (
                    <Typography sx={{ marginLeft: 1, marginTop: '8px' }} color="error">
                      {slaNotif}
                    </Typography>
                  ) : null}
                </div>
              </div>

              <div className="form-input-wrapper">
                <Typography variant="body1" sx={{ width: '20%' }}>
                  Tanggal identifikasi
                </Typography>

                <DatePicker
                  id="identifiedDate"
                  sx={{ width: '80%' }}
                  format=" DD - MMM - YYYY"
                  error={formik.touched.identifiedDate && Boolean(formik.errors.identifiedDate)}
                  onBlur={formik.handleBlur}
                  onChange={(value) => formik.setFieldValue('identifiedDate', String(value))}
                  helperText={formik.touched.identifiedDate && formik.errors.identifiedDate}
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
                    formik.setFieldValue('recoveryAmount', newValue);
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
                  Nominal realisasi kerugian
                </Typography>

                <TextField
                  sx={{ width: '80%' }}
                  id="actualLoss"
                  type="text"
                  value={formatNumber(formik.values.actualLoss)}
                  error={formik.touched.actualLoss && Boolean(formik.errors.actualLoss)}
                  onBlur={formik.handleBlur}
                  variant="outlined"
                  disabled={
                    caseStatusValue.label === 'Risk Event' || caseStatusValue.label === 'Near Miss'
                  }
                  onChange={(e) => {
                    const newValue = e.target.value.replace(/[^0-9.]/g, '');
                    formik.setFieldValue('actualLoss', newValue);
                  }}
                  helperText={formik.touched.actualLoss && formik.errors.actualLoss}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Rp.</InputAdornment>,
                  }}
                  placeholder="nominal kerugian aktual"
                />
              </div>

              <div className="form-input-wrapper">
                <Typography variant="body1" sx={{ width: '20%' }}>
                  Detail NO.GL/SSL/Cost Centre
                </Typography>

                <Autocomplete
                  disablePortal
                  id="costCentre"
                  sx={{ width: '80%' }}
                  value={costCentreValue}
                  options={createOption(masterData.dropdown.costCentre)}
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
                <TableContainer sx={{ paddingBottom: '20px', maxHeight: '500px' }}>
                  <Table size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>hapus</TableCell>
                        <TableCell>no</TableCell>
                        <TableCell sx={{ width: '400px' }}>Action Plan*</TableCell>
                        <TableCell sx={{ width: '200px' }}>Unit Kerja/ cabang*</TableCell>
                        <TableCell sx={{ width: '200px' }}>PIC*</TableCell>
                        <TableCell sx={{ width: '200px' }}>Email PIC*</TableCell>
                        <TableCell sx={{ width: '200px' }}>Tanggal target penyelesaian*</TableCell>
                        <TableCell sx={{ width: '200px' }}>Lampiran</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, index) => {
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
                                value={formik?.values?.actionPlan?.[index]?.plan}
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
                                unitValue={formik.values.actionPlan[index]?.workUnit}
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
                              <DatePicker
                                id={`actionPlan.${index}.targetDate`}
                                sx={{ width: '200px' }}
                                error={
                                  formik.touched?.actionPlan?.[index]?.targetDate &&
                                  Boolean(formik.errors?.actionPlan?.[index]?.targetDate)
                                }
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
              <Button variant="contained" type="button" color="error" onClick={backHandler}>
                Batal
              </Button>
              <Button
                type="button"
                color="warning"
                variant="contained"
                onClick={onSaveAsDraft}
                disabled={!formik.dirty}
              >
                Draft
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!formik.isValid || !formik.dirty}
              >
                Submit
              </Button>
            </div>
          </form>
        )}
      </DashboardCard>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    masterData: state.masterData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDropdown: () => dispatch(getDropdown()),
    createFormLed: (payload, user) => dispatch(createFormLed(payload, user)),
    createDraftLed: (payload, user) => dispatch(createDraftLed(payload, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateFormLED);
