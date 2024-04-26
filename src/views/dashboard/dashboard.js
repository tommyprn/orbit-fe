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
import { getAllInbox } from 'src/actions/formLEDActions';
import { IconFileDescription, IconPencil } from '@tabler/icons';
import secureLocalStorage from 'react-secure-storage';

// component
import SearchBar from 'src/components/search-bar/SearchBar';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

import '../loss-event-database/inboxLED.css';

const BCrumb = [
  {
    title:
      'Pada halaman ini anda dapat melihat seluruh laporan yang membutuhkan perubahan/persetujuan dari anda',
  },
];

const menuDev = [
  {
    navlabel: true,
    subheader: 'Menu',
  },
  {
    id: '22',
    title: 'Master Data',
    icon: 'IconBoxMultiple',
    href: '/master-data/',
    children: [
      {
        id: '221',
        title: 'Status Kejadian',
        icon: 'IconPoint',
        href: '/master/case-status',
      },
      {
        id: '222',
        title: 'Penyebab kejadian',
        icon: 'IconPoint',
        href: '/master/case-cause',
      },
      {
        id: '223',
        title: 'Kategori',
        icon: 'IconPoint',
        href: '/master/case-category/level-one',
      },
      {
        id: '224',
        title: 'Sub kategori',
        icon: 'IconPoint',
        href: '/master/case-category/level-two',
      },
      {
        id: '225',
        title: 'Aktivitas',
        icon: 'IconPoint',
        href: '/master/case-category/level-three',
      },
      {
        id: '226',
        title: 'Cost centre',
        icon: 'IconPoint',
        href: '/master/cost-centre',
      },
      {
        id: '227',
        title: 'Unit kerja',
        icon: 'IconPoint',
        href: '/master/work-unit',
      },
      {
        id: '228',
        title: 'Cabang',
        icon: 'IconPoint',
        href: '/master/branch',
      },
      {
        id: '229',
        title: 'Status laporan',
        icon: 'IconPoint',
        href: '/master/report-status',
      },
    ],
  },
  {
    id: '26',
    title: 'Loss Event Database',
    icon: 'IconReport',
    href: '/LED',
    children: [
      {
        id: '261',
        title: 'Inbox',
        icon: 'IconPoint',
        href: '/LED/inbox',
      },
      {
        id: '262',
        title: 'List',
        icon: 'IconPoint',
        href: '/LED/list',
      },
      {
        id: '263',
        title: 'Input LED',
        icon: 'IconPoint',
        href: '/LED/report',
      },
      {
        id: '264',
        title: 'Laporan nihil',
        icon: 'IconPoint',
        href: '/LED/zero-report',
      },
    ],
  },
  {
    id: '27',
    title: 'Report',
    icon: 'IconHistory',
    children: [
      {
        id: '271',
        title: 'LED berdasarkan kantor',
        icon: 'IconPoint',
        href: 'report/office',
      },
      {
        id: '272',
        title: 'Laporan data',
        icon: 'IconPoint',
        href: '/report/LED',
      },
      {
        id: '273',
        title: 'Laporan top issue',
        icon: 'IconPoint',
        href: '/report/top-issue',
      },
      {
        id: '274',
        title: 'Laporan status IRM',
        icon: 'IconPoint',
        href: '/report/irm-action',
      },
      {
        id: '275',
        title: 'Database LED',
        icon: 'IconPoint',
        href: '/report/database',
      },
    ],
  },
];

const userDev = {
  isMcb: true,
  isLdap: false,
  idUser: '2',
  nikUser: '20150213',
  idDivisi: '21',
  nameUser: 'CS-IN',
  emailUser: 'test@mail.com',
  divisiUser: 'CABANG',
  kodeCabangUser: '512',
  kodeRegionUser: '004',
  namaCabangUser: 'TEGAL',
  departementUser: 'CABANG',
  statusCabangUser: 'KCP',
  idDepartementUser: '4',
  kodeCabangKcuUser: '511',
  namaCabangKcuUser: 'PEKALONGAN',
  apps: [
    {
      id: 1,
      url: 'http://10.55.54.152/maps-admin',
      name: 'MAPS',
      logo: '/static/media/logoDIN.791ea0fc31567e4e539fa461d1ba2482.svg',
      isActive: true,
      loginType: null,
      roles: [
        {
          id: 1,
          name: 'Administrators',
        },
        {
          id: 2,
          name: 'Customer Care',
        },
      ],
    },
    {
      id: 2,
      url: 'https://smartops.bankmuamalat.co.id/appn/session/signin',
      name: 'APPN',
      logo: '/static/media/logoDIN.791ea0fc31567e4e539fa461d1ba2482.svg',
      isActive: true,
      loginType: null,
      roles: [
        {
          id: 1,
          name: 'Administrators',
        },
      ],
    },
    {
      id: 6,
      url: 'https://google.co.id',
      logo: '/static/media/logoDIN.791ea0fc31567e4e539fa461d1ba2482.svg',
      name: 'Google Indonesia',
      loginType: null,
      isActive: true,
      roles: [
        {
          id: 3,
          name: 'Customer Service',
        },
        {
          id: 4,
          name: 'Approver',
        },
        {
          id: 5,
          name: 'Checker',
        },
      ],
    },
  ],
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Dashboard = (props) => {
  const { LED, getAllInbox } = props;
  const navigation = useNavigate();
  const user = JSON.parse(secureLocalStorage.getItem('user'));
  const role = JSON.parse(secureLocalStorage.getItem('selectedRoleName'));

  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [history, setHistory] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(10);

  if (process.env.REACT_APP_DEPLOY_STATE === 'false') {
    secureLocalStorage.setItem('user', JSON.stringify(userDev));
    secureLocalStorage.setItem('menuItem', JSON.stringify(menuDev));
  }

  useEffect(() => {
    const dataToSave = {
      nip: user?.nikUser,
      role: role,
      name: user?.nameUser,
      email: user?.emailUser,
      division: user?.divisiUser,
      branchCode: user.kodeCabangUser,
      branchName: user?.namaCabangUser,
      department: user?.departementUser,
    };

    secureLocalStorage.setItem('history', JSON.stringify(dataToSave));
    setHistory(JSON.parse(secureLocalStorage.getItem('history')));
  }, []);

  useEffect(() => {
    (async () => {
      if (history) {
        await getAllInbox({ page, perPage: rowsPerPage }, keyword, history);
      }
    })();
  }, [page, keyword, history, rowsPerPage]);

  const onDetail = (id) => {
    navigation(`/LED/detail-report/${id}`);
  };

  const onEdit = (id) => {
    navigation(`/LED/edit-report/${id}`);
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
    <PageContainer title="Dashboard" description="Dashboard Page">
      <Breadcrumb title="Dashboard" items={BCrumb} />

      <DashboardCard>
        <div style={{ gap: '16px', display: 'flex', flexDirection: 'column' }}>
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
                          <TableCell>{row.unitKerja?.namaUnitKerja}</TableCell>
                          <TableCell>{row.statusKejadian?.nama}</TableCell>
                          <TableCell>
                            {dayjs(row.tanggalLapor, 'DD-MM-YYYY').format('DD-MMM-YY')}
                          </TableCell>
                          <TableCell>{row.statusLaporan?.nama}</TableCell>
                          <TableCell>
                            <Button
                              sx={{ marginRight: '8px' }}
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
                            {user.role === 'inputer' ? (
                              <Button
                                sx={{ marginRight: '8px' }}
                                size="small"
                                color="warning"
                                variant="contained"
                                startIcon={<IconPencil />}
                                onClick={() => {
                                  onEdit(row.id, row.statusLaporan.nama);
                                }}
                              >
                                Edit
                              </Button>
                            ) : null}
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
                  labelRowsPerPage="Baris per halaman"
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </>
          ) : (
            <Typography textAlign="center" variant="h2">
              Belum ada laporan dalam kotak masuk
            </Typography>
          )}

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
    getAllInbox: (pagination, keyword, user) => dispatch(getAllInbox(pagination, keyword, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
