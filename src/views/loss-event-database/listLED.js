import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import {
  Table,
  Paper,
  Button,
  styled,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { getAllList } from 'src/actions/formLEDActions';
import { IconFileDescription, IconHistory } from '@tabler/icons';

// component
import SearchBar from 'src/components/search-bar/SearchBar';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import HistoryModal from 'src/components/modal/history-modal';

import './inboxLED.css';

const BCrumb = [
  {
    title:
      'Pada halaman ini anda dapat melihat semua laporan yang sudah dibuat dan saat ini sedang membutuhkan persetujuan/ perubahan oleh user lain',
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

const ListLED = (props) => {
  const { LED, getAllList } = props;
  const navigation = useNavigate();
  const user = JSON.parse(localStorage.getItem('history'));

  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [selected, setSelected] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [historyModal, setHistoryModal] = useState(false);

  useEffect(() => {
    (async () => {
      await getAllList({ page, perPage: rowsPerPage }, keyword, user);
    })();
  }, [page, keyword, rowsPerPage]);

  const onDetail = (id) => {
    navigation(`/LED/detailReport/${id}`);
  };

  const openHistory = (id, reportId) => {
    setSelected({ id: id, reportId: reportId });
    setHistoryModal(true);
  };

  const closeHistory = () => {
    setSelected(0);
    setHistoryModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const RPP = parseInt(event.target.value, 10);
    setRowsPerPage(RPP);
    setPage(0);
  };

  const onSearch = (values) => {
    setKeyword(values);
  };

  const data = LED.list;

  return (
    <PageContainer titdatae="List" description="List LED Page">
      <Breadcrumb title="List" items={BCrumb} />

      <HistoryModal
        id={selected.id}
        reportId={selected.reportId}
        title="History laporan"
        isOpen={historyModal}
        onCloseHandler={closeHistory}
      />

      <DashboardCard>
        <div
          style={{
            gap: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {data?.totalData > 0 ? (
            <>
              <SearchBar onSubmit={(val) => onSearch(val)} />

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
                        <TableCell>ID</TableCell>
                        <TableCell>Divisi/ Cabang</TableCell>
                        <TableCell>Status Kejadian</TableCell>
                        <TableCell>Tanggal Lapor</TableCell>
                        <TableCell>Status Laporan</TableCell>
                        <TableCell>Aksi</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.data?.map((row, index) => (
                        <StyledTableRow
                          key={index}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{row.idLaporan}</TableCell>
                          <TableCell>{row.unitKerja.namaUnitKerja}</TableCell>
                          <TableCell>{row.statusKejadian.nama}</TableCell>
                          <TableCell>
                            {dayjs(row.tanggalLapor, 'DD-MM-YYYY').format('DD-MMM-YY')}
                          </TableCell>
                          <TableCell>{row.statusLaporan.nama}</TableCell>
                          <TableCell>
                            <Button
                              sx={{ marginRight: 1 }}
                              size="small"
                              color="primary"
                              variant="contained"
                              startIcon={<IconFileDescription />}
                              onClick={() => {
                                onDetail(row.id);
                              }}
                            >
                              Detail
                            </Button>
                            <Button
                              size="small"
                              color="success"
                              variant="contained"
                              startIcon={<IconHistory />}
                              onClick={() => {
                                openHistory(row.id, row.idLaporan);
                              }}
                            >
                              History
                            </Button>
                          </TableCell>
                        </StyledTableRow>
                      ))}
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
                  count={data.totalData ?? 0}
                  component="div"
                  rowsPerPage={rowsPerPage}
                  onPageChange={handleChangePage}
                  labelRowsPerPage={'Baris per halaman'}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </>
          ) : (
            <Typography textAlign={'center'} variant="h2">
              Belum ada laporan pending saat ini
            </Typography>
          )}
        </div>
      </DashboardCard>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    // user: state.user.user,
    LED: state.LED,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllList: (pagination, keyword, role) => dispatch(getAllList(pagination, keyword, role)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListLED);
