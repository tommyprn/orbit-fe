import React, { useEffect, useState } from 'react';
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
import {
  rejectIRM,
  approveLED,
  approveIRM,
  sendBackLED,
  getOneFormLed,
} from 'src/actions/formLEDActions';

import './detailLED.css';

// component
import Spinner from '../spinner/Spinner';
import AddComment from 'src/components/forms/add-comment';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import SimpleModal from 'src/components/modal/simpleModal';
import DetailWrapper from 'src/components/shared/detail-wrapper';
import DashboardCard from '../../components/shared/DashboardCard';
import PageContainer from 'src/components/container/PageContainer';

const BCrumb = [
  {
    title: 'Silahkan mengisi data dibawah ini untuk membuat laporan LED',
  },
];

const DetailLED = (props) => {
  const user = JSON.parse(localStorage.getItem('history'));
  const params = useParams();
  const navigate = useNavigate();
  const { detail, isLoading, approveIRM, rejectIRM, approveLED, sendBackLED, getOneFormLed } =
    props;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60vw',
    bgcolor: 'background.paper',
    p: 3,
  };

  const [rejectModal, setRejectModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);

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

  // reject function
  const onRejectReport = () => {
    setRejectModal(true);
  };

  const onRejectConfirm = async (comment) => {
    let res;
    if (user.role === 'approver') {
      res = await sendBackLED(detail.laporanLed.id, user, comment);
    } else if (user.role === 'IRM') {
      res = await approveLED(detail.laporanLed.id, user);
    }

    if (res?.responseCode === 200) {
      navigate('/LED/list');
    }
  };

  const onCancelReject = () => {
    setRejectModal(false);
  };

  // approve function
  const onApproveReport = () => {
    setApproveModal(true);
  };

  const onApproveConfirm = async () => {
    let res;
    if (user.role === 'approver') {
      res = await approveLED(detail.laporanLed.id, user);
    } else if (user.role === 'IRM') {
      res = await approveLED(detail.laporanLed.id, user);
    }

    if (res?.responseCode === 200) {
      navigate('/LED/list');
    }
  };

  const onCancelApprove = () => {
    setApproveModal(false);
  };

  const dataLaporan = detail?.laporanLed;
  const dataActionPlan = detail?.actionPlans;

  const hideButton =
    user?.role === 'inputer' || dataLaporan?.statusLaporanEntity?.nama !== 'Recorded';

  return (
    <PageContainer title="Buat Laporan Loss Event Database (LED)" description="EditFormLED Page">
      <Breadcrumb title="Buat Laporan LED" items={BCrumb} />

      <AddComment
        title="Alasan Laporan ditolak"
        isOpen={rejectModal}
        newStyle={style}
        onCloseHandler={onCancelReject}
        onSaveHandler={(value) => onRejectConfirm(value)}
      />

      <SimpleModal isOpen={approveModal} title="Konfirmasi" onCloseHandler={onCancelApprove} on>
        Apakah kamu yakin ingin menyetujui laporan ini, dan meneruskan ke IRM?
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '16px' }}
        >
          <Button variant="contained" color="error" onClick={onCancelApprove}>
            Batal
          </Button>
          <Button variant="contained" onClick={onApproveConfirm}>
            Simpan
          </Button>
        </div>
      </SimpleModal>

      <DashboardCard>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="form-sheet">
            <div className="form-title">
              <Typography variant="h4">Nomor Insiden: {dataLaporan?.idLaporan} </Typography>
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
                        <TableCell>Unit Kerja/ Cabang</TableCell>
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
                              {row?.namaFile ? (
                                <Button startIcon={<IconDownload />}>
                                  <a
                                    id={row.id}
                                    href={`http://10.80.240.45:1933/api/v1/download-lampiran?id=${row.id}`}
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
              <Button variant="contained" color="warning" onClick={backHandler}>
                Kembali
              </Button>

              {hideButton ? null : (
                <>
                  <Button variant="contained" color="error" onClick={onRejectReport}>
                    {user.role === 'IRM' ? 'Void' : 'Tolak'} Laporan
                  </Button>

                  <Button variant="contained" onClick={onApproveReport}>
                    {user.role === 'IRM' ? 'Terima' : 'Setujui'} Laporan
                  </Button>
                </>
              )}
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
    approveIRM: (id, user) => dispatch(approveIRM(id, user)),
    approveLED: (id, user) => dispatch(approveLED(id, user)),
    rejectIRM: (id, user, comment) => dispatch(rejectIRM(id, user, comment)),
    sendBackLED: (id, user, comment) => dispatch(sendBackLED(id, user, comment)),
    getOneFormLed: (id) => dispatch(getOneFormLed(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailLED);
