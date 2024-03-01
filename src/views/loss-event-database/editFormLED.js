import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { validationSchema } from './validationForm';
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
  Autocomplete,
  TableContainer,
  InputAdornment,
} from '@mui/material';
import { getDropdown } from 'src/actions/masterDataActions';
import { editFormLed, getOneFormLed } from 'src/actions/formLEDActions';

import './formLED.css';
import './detailLED.css';

// component
import Spinner from '../spinner/Spinner';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import QuillTextField from 'src/components/quil-text/quill-text';

const BCrumb = [
  {
    title: 'Mohon pastikan data yang telah anda ubah terisi dengan benar',
  },
];

const EditFormLED = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const { detail, isLoading, masterData, getDropdown, editFormLed, getOneFormLed } = props;

  const dataLaporan = detail?.laporanLed;
  const dataActionPlan = detail?.actionPlans;

  const [workUnitValue, setWorkUnitValue] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
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
      await getDropdown();
      await getOneFormLed(params.reportId);
    })();
  }, [getDropdown, getOneFormLed, params]);

  useEffect(() => {
    const newData = masterData?.caseCategory?.levelThree?.data?.find((item) => {
      return item.id === caseCategoryValue.id;
    });

    setSelectedCategory(newData);
  }, [caseCategoryValue]);
  useEffect(() => {
    if (dataLaporan) {
      setCostCentreValue({
        id: dataLaporan?.sslEntity?.id,
        label: dataLaporan?.sslEntity?.nama,
      });
      setCaseCauseValue({
        id: dataLaporan?.penyebabKejadianEntity?.id,
        label: dataLaporan?.penyebabKejadianEntity?.nama,
      });
      setCaseStatusValue({
        id: dataLaporan?.statusKejadian?.id,
        label: dataLaporan?.statusKejadian?.nama,
      });
      setCaseCategoryValue({
        id: dataLaporan?.aktivitasEntity?.id,
        label: dataLaporan?.aktivitasEntity?.nama,
      });
    }

    if (dataActionPlan) {
      const newData = dataActionPlan.map((item) => {
        return { id: item.unitKerjaEntity.idUnitKerja, label: item.unitKerjaEntity.namaUnitKerja };
      });

      setWorkUnitValue(newData);
    }
  }, [dataLaporan, dataActionPlan]);

  const formik = useFormik({
    initialValues: {
      id: dataLaporan?.idLaporan,
      impact: dataLaporan?.dampak ?? '',
      caseCause: dataLaporan?.penyebabKejadianEntity?.id ?? 0,
      brief: dataLaporan?.kronologiSingkat ?? '',
      actionPlan:
        dataActionPlan?.map((item) => {
          return {
            id: item.id ?? 0,
            PIC: item.penanggungJawab ?? '',
            file: item.namaFile ?? '',
            plan: item.actionPlan ?? '',
            email: item.email ?? '',
            workUnit: {
              id: item.unitKerjaEntity.idUnitKerja,
              label: item.unitKerjaEntity.namaUnitKerja,
            } ?? { id: 0, label: '' },
            targetDate: item.targetPenyelesaian ?? '',
          };
        }) ?? [],
      caseStatus: dataLaporan?.statusKejadian?.id ?? 0,
      costCentre: dataLaporan?.sslEntity?.id ?? 0,
      chronology: dataLaporan?.kronologi ?? '',
      reportDate: dayjs(dataLaporan?.tanggalLapor) ?? '',
      actualLoss: String(dataLaporan?.nominalRealisasiKerugian) ?? '0',
      incidentDate: dayjs(dataLaporan?.tanggalKejadian) ?? '',
      caseCategory: dataLaporan?.aktivitasEntity?.id ?? 0,
      potentialLoss: String(dataLaporan?.potensiKerugian) ?? '0',
      identifiedDate: dayjs(dataLaporan?.tanggalIdentifikasi) ?? '',
      recoveryAmount: String(dataLaporan?.nominalRecovery) ?? '0',
      recoverySource: dataLaporan?.sumberRecovery ?? '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      editFormLed(values);
      navigate('/LED/list');
    },
  });

  const createOption = (option) => {
    if (option === undefined) {
      return [];
    } else {
      return option?.map((item) => {
        return { id: item.id || item.idUnitKerja, label: item.nama || item.namaUnitKerja };
      });
    }
  };

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

  const recordedView = () => {
    return (
      <>
        <div className="form-input-wrapper">
          <Typography variant="body1" sx={{ width: '20%' }}>
            Status kejadian
          </Typography>

          <Autocomplete
            disablePortal
            id={'caseStatus'}
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
            placeholder="akar masalah dari kejadian tersebut"
          />
        </div>

        <div className="form-input-wrapper">
          <Typography variant="body1" sx={{ width: '20%' }}>
            Tanggal lapor
          </Typography>

          <DatePicker
            id="reportDate"
            sx={{ width: '80%' }}
            value={dayjs(formik.values.reportDate)}
            error={formik.touched.reportDate && Boolean(formik.errors.reportDate)}
            format=" DD - MMM - YYYY"
            onBlur={formik.handleBlur}
            onChange={(value) => {
              formik.setFieldValue('reportDate', dayjs(value));
            }}
            helperText={formik.touched.reportDate && formik.errors.reportDate}
          />
        </div>

        <div className="form-input-wrapper">
          <Typography variant="body1" sx={{ width: '20%' }}>
            Tanggal kejadian
          </Typography>

          <DatePicker
            id="incidentDate"
            sx={{ width: '80%' }}
            value={dayjs(formik.values.incidentDate)}
            error={formik.touched.incidentDate && Boolean(formik.errors.incidentDate)}
            format=" DD - MMM - YYYY"
            onBlur={formik.handleBlur}
            onChange={(value) => formik.setFieldValue('incidentDate', dayjs(value))}
            helperText={formik.touched.incidentDate && formik.errors.incidentDate}
          />
        </div>

        <div className="form-input-wrapper">
          <Typography variant="body1" sx={{ width: '20%' }}>
            Tanggal identifikasi
          </Typography>

          <DatePicker
            id="identifiedDate"
            sx={{ width: '80%' }}
            value={dayjs(formik.values.identifiedDate)}
            error={formik.touched.identifiedDate && Boolean(formik.errors.identifiedDate)}
            format=" DD - MMM - YYYY"
            onBlur={formik.handleBlur}
            onChange={(value) => formik.setFieldValue('identifiedDate', dayjs(value))}
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
            id={'caseCause'}
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
            id={'caseCategory'}
            sx={{ width: '80%' }}
            value={caseCategoryValue}
            options={createOption(masterData.dropdown.caseCategory.levelThree)}
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
            id={'costCentre'}
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
    );
  };

  const recordPlanView = (index) => {
    return (
      <>
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
              formik.touched?.actionPlan?.[index]?.plan && formik.errors?.actionPlan?.[index]?.plan
            }
            placeholder="rencana penanggulangan"
            multiline
          />
        </TableCell>
        <TableCell>
          <Autocomplete
            id={`actionPlan.${index}.workUnit`}
            sx={{ width: '200px' }}
            value={workUnitValue[index]}
            options={createOption(masterData.dropdown.workUnit)}
            onChange={(event, newValue) => {
              formik.setFieldValue(`actionPlan.${index}.workUnit`, newValue);
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                id={`actionPlan.${index}.workUnit`}
                value={formik.values?.actionPlan?.[index]?.workUnit}
                error={
                  formik.touched?.actionPlan?.[index]?.workUnit &&
                  Boolean(formik.errors?.actionPlan?.[index]?.workUnit)
                }
                onBlur={formik.handleBlur}
                variant="standard"
                helperText={
                  formik.touched?.actionPlan?.[index]?.workUnit &&
                  formik.errors?.actionPlan?.[index]?.workUnit
                }
                placeholder="pilih kode unit kerja"
              />
            )}
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
              formik.touched?.actionPlan?.[index]?.PIC && formik.errors?.actionPlan?.[index]?.PIC
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
            value={dayjs(formik.values?.actionPlan?.[index]?.targetDate)}
            onBlur={formik.handleBlur}
            format=" DD - MMM - YYYY"
            variant="standard"
            onChange={(value) =>
              formik.setFieldValue(`actionPlan.${index}.targetDate`, String(value))
            }
            helperText={
              formik.touched?.actionPlan?.[index]?.targetDate &&
              formik.errors?.actionPlan?.[index]?.targetDate
            }
          />
        </TableCell>
      </>
    );
  };

  const onProgressView = () => {
    return (
      <>
        <>
          <div className="detail-wrapper">
            <Typography variant="body1" sx={{ width: '20%', fontWeight: '500' }}>
              Status kejadian{' '}
            </Typography>
            <Typography variant="body1" sx={{ width: '80%' }}>
              {dataLaporan?.statusKejadian?.nama}
            </Typography>
          </div>

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

          <div className="detail-wrapper">
            <Typography variant="body1" sx={{ width: '20%', fontWeight: '500' }}>
              Kronologi singkat
            </Typography>

            <Typography variant="body1" sx={{ width: '80%' }}>
              {dataLaporan?.kronologiSingkat}
            </Typography>
          </div>

          <div className="detail-wrapper">
            <Typography variant="body1" sx={{ width: '20%', fontWeight: '500' }}>
              Tanggal lapor
            </Typography>
            <Typography variant="body1" sx={{ width: '80%' }}>
              {formatDate(dataLaporan?.tanggalLapor)}
            </Typography>
          </div>

          <div className="detail-wrapper">
            <Typography variant="body1" sx={{ width: '20%', fontWeight: '500' }}>
              Tanggal kejadian
            </Typography>
            <Typography variant="body1" sx={{ width: '80%' }}>
              {formatDate(dataLaporan?.tanggalKejadian)}
            </Typography>
          </div>

          <div className="detail-wrapper">
            <Typography variant="body1" sx={{ width: '20%', fontWeight: '500' }}>
              Tanggal identifikasi
            </Typography>{' '}
            <Typography variant="body1" sx={{ width: '80%' }}>
              {formatDate(dataLaporan?.tanggalIdentifikasi)}
            </Typography>
          </div>

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

          <div className="detail-wrapper">
            <Typography variant="body1" sx={{ width: '20%', fontWeight: '500' }}>
              Penyebab kejadian
            </Typography>
            <Typography variant="body1" sx={{ width: '80%' }}>
              {dataLaporan?.penyebabKejadianEntity?.nama}
            </Typography>
          </div>
        </>

        <Divider sx={{ marginTop: 'px' }} />
        <Typography variant="h6">Kategori kejadian</Typography>

        <>
          <div className="detail-wrapper">
            <Typography variant="body1" sx={{ width: '20%', fontWeight: '500' }}>
              Aktivitas (level 3)
            </Typography>

            <Typography variant="body1" sx={{ width: '80%' }}>
              {dataLaporan?.aktivitasEntity?.nama}
            </Typography>
          </div>

          <div className="detail-wrapper">
            <Typography variant="body1" sx={{ width: '20%', fontWeight: '500' }}>
              Sub kategori (level 2)
            </Typography>

            <Typography variant="body1" sx={{ width: '80%' }}>
              {dataLaporan?.aktivitasEntity?.subKategori?.nama}
            </Typography>
          </div>

          <div className="detail-wrapper">
            <Typography variant="body1" sx={{ width: '20%', fontWeight: '500' }}>
              Kategori (level 1)
            </Typography>

            <Typography variant="body1" sx={{ width: '80%' }}>
              {dataLaporan?.aktivitasEntity?.subKategori?.kategoriKejadian?.nama}
            </Typography>
          </div>
        </>

        <Divider sx={{ marginTop: 'px' }} />
        <Typography variant="h6">Kerugian finansial</Typography>

        <>
          <div className="detail-wrapper">
            <Typography variant="body1" sx={{ width: '20%', fontWeight: '500' }}>
              Nominal potensi kerugian
            </Typography>

            <Typography variant="body1" sx={{ width: '80%' }}>
              Rp. {formatNumber(dataLaporan?.potensiKerugian)}
            </Typography>
          </div>

          <div className="detail-wrapper">
            <Typography variant="body1" sx={{ width: '20%', fontWeight: '500' }}>
              Nominal recovery
            </Typography>

            <Typography variant="body1" sx={{ width: '80%' }}>
              Rp. {formatNumber(dataLaporan?.nominalRecovery)}
            </Typography>
          </div>

          <div className="detail-wrapper">
            <Typography variant="body1" sx={{ width: '20%', fontWeight: '500' }}>
              Nominal realisasi kerugian
            </Typography>

            <Typography variant="body1" sx={{ width: '80%' }}>
              Rp. {formatNumber(dataLaporan?.nominalRealisasiKerugian)}
            </Typography>
          </div>

          <div className="detail-wrapper">
            <Typography variant="body1" sx={{ width: '20%', fontWeight: '500' }}>
              Detail NO.GL/SSL/Cost Centre
            </Typography>

            <Typography variant="body1" sx={{ width: '80%' }}>
              {dataLaporan?.sslEntity?.kode} - {dataLaporan?.sslEntity?.nama}
            </Typography>
          </div>

          <div className="detail-wrapper">
            <Typography variant="body1" sx={{ width: '20%', fontWeight: '500' }}>
              Sumber recovery
            </Typography>

            <Typography variant="body1" sx={{ width: '80%' }}>
              {dataLaporan?.sumberRecovery}
            </Typography>
          </div>
        </>
      </>
    );
  };

  const onProgressPlanView = (row) => {
    return (
      <>
        <TableCell>
          <Typography variant="body1">{row?.actionPlan}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">
            {row?.unitKerjaEntity?.namaUnitKerja}
            {`(${row?.unitKerjaEntity?.kodeUnitKerja})`}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{row?.penanggungJawab}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{row?.email}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{formatDate(row?.targetPenyelesaian)}</Typography>
        </TableCell>
      </>
    );
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

            {/* {dataLaporan?.statusLaporanEntity?.nama === 'Recorded'
              ? recordedView()
              : onProgressView()} */}
            {onProgressView()}
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
                            {/* {dataLaporan?.statusLaporanEntity?.nama === 'Recorded'
                              ? recordPlanView(index)
                              : onProgressPlanView(row)} */}
                            {onProgressPlanView(row)}
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
                Batal
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
    detail: state.LED.detail.data,
    isLoading: state.LED.isLoading,
    masterData: state.masterData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDropdown: () => dispatch(getDropdown()),
    editFormLed: (payload) => dispatch(editFormLed(payload)),
    getOneFormLed: (id) => dispatch(getOneFormLed(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFormLED);
