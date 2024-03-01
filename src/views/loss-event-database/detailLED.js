import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router';
import { connect } from 'react-redux';
import {
  Card,
  Table,
  Paper,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material';
import { IconDownload } from '@tabler/icons';
import { getOneFormLed } from 'src/actions/formLEDActions';

import './detailLED.css';

// component
import Spinner from '../spinner/Spinner';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const BCrumb = [
  {
    title: 'Silahkan mengisi data dibawah ini untuk membuat laporan LED',
  },
];

const DetailLED = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const { detail, isLoading, getOneFormLed } = props;

  useEffect(() => {
    (async () => {
      await getOneFormLed(params.reportId);
    })();
  }, [getOneFormLed]);

  const formatNumber = (value) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue > 0) {
      return numericValue?.toLocaleString('ID-id');
    }
    return '-';
  };

  const formatDate = (value) => {
    return dayjs(value).format('DD MMMM YYYY');
  };

  const backHandler = () => {
    navigate(-1);
  };
  const dataLaporan = detail?.laporanLed;
  const dataActionPlan = detail?.actionPlans;

  return (
    <PageContainer title="Buat Laporan Loss Event Database (LED)" description="EditFormLED Page">
      <Breadcrumb title="Buat Laporan LED" items={BCrumb} />

      <DashboardCard>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="form-sheet">
            <div className="form-title">
              <Typography variant="h4">Nomor Insiden: {dataLaporan?.idLaporan} </Typography>
            </div>

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
                <Typography variant="body1" sx={{ width: '80%' }}>
                  {dataLaporan?.kronologi}
                </Typography>
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
                <Typography variant="body1" sx={{ width: '80%' }}>
                  {dataLaporan?.dampak}
                </Typography>
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
                <Typography variant="h6">Tindak Lanjut</Typography>
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
                        <TableCell>Action Plan</TableCell>
                        <TableCell>Unit Kerja</TableCell>
                        <TableCell>PIC</TableCell>
                        <TableCell>Email PIC</TableCell>
                        <TableCell>Target penyelesaian</TableCell>
                        <TableCell>Lampiran</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataActionPlan?.map((row, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
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
                              <Typography variant="body1">
                                {formatDate(row?.targetPenyelesaian)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {row?.namaFile ? (
                                <Button startIcon={<IconDownload />}>
                                  <a
                                    id={row.id}
                                    href={`http://10.80.240.45:1933/api/v1/download-lampiran?id=${row.id}`}
                                    // target="_blank"
                                  >
                                    {row.namaFile}
                                  </a>
                                </Button>
                              ) : (
                                <Typography variant="body1">Tidak ada File</Typography>
                              )}
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
              <Button variant="contained" onClick={backHandler}>
                Kembali
              </Button>
            </div>
          </div>
        )}
      </DashboardCard>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    detail: state.LED.detail.data,
    isLoading: state.LED.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOneFormLed: (id) => dispatch(getOneFormLed(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailLED);
