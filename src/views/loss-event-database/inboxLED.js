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
  TableContainer,
  TablePagination,
} from '@mui/material';
import { getAllInbox } from 'src/actions/formLEDActions';
import { IconFileDescription, IconPencil } from '@tabler/icons';

// component
import SearchBar from 'src/components/search-bar/SearchBar';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

import './inboxLED.css';

const BCrumb = [
  {
    title:
      'Pada halaman ini anda dapat melihat seluruh laporan yang telah dibuat dan membutuhkan persetujuan/ perubahan dari user',
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

const InboxLED = (props) => {
  const { LED, getAllInbox } = props;
  const navigation = useNavigate();
  const user = JSON.parse(localStorage.getItem('history'));

  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    (async () => {
      await getAllInbox({ page, perPage: rowsPerPage }, keyword, user);
    })();
  }, [page, keyword, rowsPerPage]);

  const onDetail = (id) => {
    navigation(`/LED/detailReport/${id}`);
  };

  const onEdit = (id) => {
    navigation(`/LED/editReport/${id}`);
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

  const data = LED.inbox;

  return (
    <PageContainer title="Inbox" description="Inbox LED Page">
      <Breadcrumb title="Inbox" items={BCrumb} />

      <DashboardCard>
        <div style={{ gap: '16px', display: 'flex', flexDirection: 'column' }}>
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
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.unitKerja.namaUnitKerja}</TableCell>
                      <TableCell>{row.statusKejadian.nama}</TableCell>
                      <TableCell>
                        {dayjs(row.tanggalLapor, 'DD-MM-YYYY').format('DD-MMM-YY')}
                      </TableCell>
                      <TableCell>{row.statusLaporan.nama}</TableCell>
                      <TableCell>
                        <Button
                          sx={{ marginRight: '8px' }}
                          size="small"
                          color={'primary'}
                          variant="contained"
                          startIcon={<IconFileDescription />}
                          onClick={() => {
                            onDetail(row.id);
                          }}
                        >
                          {'Detail'}
                        </Button>
                        <Button
                          size="small"
                          color="warning"
                          variant="contained"
                          startIcon={<IconPencil />}
                          onClick={() => {
                            onEdit(row.id);
                          }}
                        >
                          {'Edit'}
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

          {/* {LED.LED?.data?.map((item) => {
            return (
              <div key={item.id}>
                <ReportCard LED={item} list />
              </div>
            );
          })} */}
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
    getAllInbox: (pagination, keyword, role) => dispatch(getAllInbox(pagination, keyword, role)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InboxLED);
