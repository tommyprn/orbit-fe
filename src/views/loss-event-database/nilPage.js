import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { showToast } from 'src/utils/use-snackbar';
import {
  Table,
  Paper,
  styled,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TextField,
  TableHead,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { getZeroReport, createZeroReport, updateWorkingDays } from 'src/actions/formLEDActions';
import secureLocalStorage from 'react-secure-storage';

// component
// import SearchBar from 'src/components/search-bar/SearchBar';
import Spinner from '../spinner/Spinner';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import SimpleModal from 'src/components/modal/simpleModal';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

import './inboxLED.css';

const BCrumb = [
  {
    title:
      'Pada halaman ini anda dapat melihat semua laporan nihil yang pernah dibuat, dan mengumpulkan laporan nihil baru untuk dilaporkan ke IRM',
  },
];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const NilPage = (props) => {
  const { LED, getZeroReport, createZeroReport, updateWorkingDays } = props;
  const user = JSON.parse(secureLocalStorage.getItem('history'));
  const role = JSON.parse(secureLocalStorage.getItem('selectedRoleName'))?.toLowerCase();

  // const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [workingDays, setWorkingDays] = useState(false);
  const [workingDaysModal, setWorkingDaysModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  useEffect(() => {
    (async () => {
      await getZeroReport({ page, perPage: rowsPerPage }, user);
    })();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const RPP = parseInt(event.target.value, 10);
    setRowsPerPage(RPP);
    setPage(0);
  };

  // const onSearch = (values) => {
  //   setKeyword(values);
  // };

  const onClose = () => {
    setWorkingDaysModal(false);
    setConfirmationModal(false);
  };

  // create zero report
  const onOpenModal = () => {
    setConfirmationModal(true);
  };

  const onGenerateNil = async () => {
    const dataToSend = {
      branch: user.branchCode,
      workUnit: user.division,
    };

    const res = await createZeroReport(dataToSend);
    setConfirmationModal(false);

    if (res?.responseCode === 200) {
      showToast('success', 'berhasil submit laporan nihil');
    } else {
      showToast('error', 'gagal koneksi ke server, mohon coba beberapa saat lagi');
    }
  };

  // create zero report
  const openWorkingDaysModal = () => {
    setWorkingDaysModal(true);
  };

  const changeWorkingDays = async () => {
    const res = await updateWorkingDays(workingDays);
    setWorkingDaysModal(false);

    if (res?.responseCode === 200) {
      showToast('success', 'berhasil mengubah hari kerja laporan nihil');
    } else {
      showToast('error', 'gagal koneksi ke server, mohon coba beberapa saat lagi');
    }
  };

  const data = LED.nil;

  return (
    <PageContainer titdatae="Laporan Nihil" description="zero report Page">
      <Breadcrumb title="Laporan Nihil" items={BCrumb} />
      <SimpleModal isOpen={confirmationModal} title="Konfirmasi" onCloseHandler={onClose}>
        <Typography>
          Kami akan mengirimkan laporan nihil bulan{' '}
          <strong>{dayjs().subtract(1, 'month').format('MMMM')} </strong>
          secara otomatis ke IRM, lanjutkan proses pembuatan laporan nihil?
        </Typography>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '16px' }}
        >
          <Button variant="contained" color="error" onClick={onClose}>
            Batal
          </Button>
          <Button variant="contained" onClick={onGenerateNil}>
            Simpan
          </Button>
        </div>
      </SimpleModal>

      <SimpleModal
        title="Ubah jangka waktu pembuatan laporan nihil"
        isOpen={workingDaysModal}
        onCloseHandler={onClose}
      >
        <TextField
          defaultValue={LED?.workDays}
          onChange={(e) => setWorkingDays(e.target.value)}
          sx={{ width: '100%' }}
        />

        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '16px' }}
        >
          <Button variant="contained" color="error" onClick={onClose}>
            Batal
          </Button>
          <Button variant="contained" onClick={changeWorkingDays}>
            Simpan
          </Button>
        </div>
      </SimpleModal>

      {LED.loading || !role ? (
        <Spinner />
      ) : (
        <DashboardCard>
          <div
            style={{
              gap: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {/* <SearchBar onSubmit={(val) => onSearch(val)} /> */}
              <div />
              {(role === 'approver' || role === 'validatorfraud') && (
                <Button variant="contained" onClick={onOpenModal} disabled={!data?.isButtonEnable}>
                  Submit laporan nihil
                </Button>
              )}
              {role === 'admin' && (
                <Button variant="contained" onClick={openWorkingDaysModal}>
                  <Typography>
                    Periode submit laporan nihil:{' '}
                    <span style={{ color: '#ffcd56', fontWeight: 'bold' }}>{LED.workDays} </span>
                    hari kerja
                  </Typography>
                </Button>
              )}
            </div>

            <Paper
              sx={{
                maxWidth: '100%',
                overflow: 'hidden',
              }}
              elevation={0}
              variant="outlined"
            >
              <TableContainer>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>no</TableCell>
                      <TableCell>Tanggal Lapor</TableCell>
                      <TableCell>Nama Orion</TableCell>
                      <TableCell>Unit Kerja</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.data?.map((row, index) => {
                      return (
                        <StyledTableRow
                          key={index}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{dayjs(row.tanggalLapor).format('DD-MMM-YY')}</TableCell>
                          <TableCell>{row.unitKerjaEntity.namaApproverUnit}</TableCell>
                          <TableCell>
                            {row.unitKerjaEntity.namaUnitKerja !== 'CABANG' ? (
                              <>
                                {row.unitKerjaEntity.kodeUnitKerja} -{' '}
                                {row.unitKerjaEntity.namaUnitKerja}
                              </>
                            ) : (
                              <>
                                {row.cabangEntity.kodeCabang} - {row.cabangEntity.namaCabang}
                              </>
                            )}
                          </TableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                sx={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 1,
                }}
                page={page}
                count={data?.totalData ?? 0}
                component="div"
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                labelRowsPerPage="Baris per halaman"
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </DashboardCard>
      )}
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    LED: state.LED,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getZeroReport: (pagination, user) => dispatch(getZeroReport(pagination, user)),
    createZeroReport: (user) => dispatch(createZeroReport(user)),
    updateWorkingDays: (workingDays) => dispatch(updateWorkingDays(workingDays)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NilPage);
