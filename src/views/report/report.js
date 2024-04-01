import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import {
  Table,
  Paper,
  styled,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { getAllReport } from 'src/actions/reportActions';

// component
import SearchBar from 'src/components/search-bar/SearchBar';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const BCrumb = [
  {
    title: 'All your report will be recorded here',
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

const dummy = [
  {
    id: 2,
    idLaporan: '20240328002',
    kronologi: '<p>asdf</p>',
    kronologiSingkat: 'test 1 input flow',
    tanggalLapor: '27-03-2024',
    tanggalKejadian: '26-03-2024',
    tanggalIdentifikasi: '25-03-2024',
    dampak: '<p>asdf</p>',
    potensiKerugian: 0,
    nominalRecovery: 0,
    nominalRealisasiKerugian: 0,
    createdDate: '28-03-2024',
    aktivitas: {
      id: 1,
      nama: 'Transaksi tidak dilaporkan (disengaja)',
      subKategori: {
        id: 1,
        nama: 'Unauthorised activity (Aktivitas yang tidak sah)',
        isEnable: true,
        kategoriKejadian: {
          id: 1,
          kode: 'OIF',
          nama: 'Kecurangan intern (Internal Fraud)',
          isEnable: true,
        },
      },
    },
    penyebabKejadian: {
      id: 2,
      nama: 'Kesalahan Manusia',
    },
    statusKejadian: {
      id: 3,
      nama: 'Near Miss',
      deskripsi:
        'Kejadian risiko namun tidak mengakibatkan realisasi kerugian karena berfungsinya proses pengendalian internal dan kejadian risiko diselesaikan pada hari yang sama',
    },
    ssl: {
      id: 1,
      kode: '0100',
      nama: 'Board of Commissioners',
    },
    statusLaporan: {
      id: 3,
      nama: 'Closed',
      deskripsi: 'Berdasarkan Hasil Validasi IRM',
    },
    actionPlan: [
      {
        id: 3,
        actionPlan: 'asdffff',
        unitKerjaEntity: {
          idUnitKerja: 3,
          kodeUnitKerja: 'PRD',
          namaUnitKerja: 'PRESIDENT DIRECTOR',
          namaApproverUnit: 'Ryndra Putra Pratama Firdaus',
          emailApproverUnit: 'ryndrappf@gmail.com',
          isEnable: true,
          namaPic: 'Ryndra Putra Pratama Firdaus',
          emailPic: 'ryndrappf@gmail.com',
          emailUpperUnit: 'buwanhajanyahya@gmail.com',
        },
        cabangEntity: null,
        penanggungJawab: 'Ryndra Putra Pratama Firdaus',
        email: 'ryndrappf@gmail.com',
        isDone: null,
        targetPenyelesaian: 'Wed, 27 Mar 2024 17:00:00 GMT',
        namaFile: null,
      },
    ],
    unitKerja: {
      idUnitKerja: 58,
      kodeUnitKerja: 'CABANG',
      namaUnitKerja: 'CABANG',
      namaApproverUnit: 'Ryndra Putra Pratama Firdaus',
      emailApproverUnit: 'ryndrappf@gmail.com',
      isEnable: true,
      namaPic: 'Ryndra Putra Pratama Firdaus',
      emailPic: 'ryndrappf@gmail.com',
      emailUpperUnit: 'buwanhajanyahya@gmail.com',
    },
    cabang: {
      id: 335,
      kodeCabang: 512,
      namaCabang: 'KCU TEGAL',
      indukCabang: null,
      namaApproverCabang: 'Ryndra Putra Pratama Firdaus',
      emailApproverCabang: 'ryndrappf@gmail.com',
      namaPic: 'Ryndra Putra Pratama Firdaus',
      emailPic: 'ryndrappf@gmail.com',
      emailUpperCabang: 'buwanhajanyahya@gmail.com',
    },
  },
  {
    id: 3,
    idLaporan: '20240328003',
    kronologi: '<ul><li>test 1 demo 28 maret 2024</li><li>test 2 demo 28 maret 2024</li></ul>',
    kronologiSingkat: 'test 1 demo 28 maret 2024',
    tanggalLapor: '08-03-2024',
    tanggalKejadian: '02-03-2024',
    tanggalIdentifikasi: '03-03-2024',
    dampak: '<ul><li>test 1 demo 28 m<strong><em>aret 2024</em></strong></li></ul><p><br></p>',
    potensiKerugian: 3000000,
    nominalRecovery: 3002,
    nominalRealisasiKerugian: 0,
    createdDate: '28-03-2024',
    aktivitas: {
      id: 14,
      nama: 'Insider trading (transaksi diluar pembukuan Bank)',
      subKategori: {
        id: 2,
        nama: 'Theft and fraud (Pencurian dan Penipuan)',
        isEnable: true,
        kategoriKejadian: {
          id: 1,
          kode: 'OIF',
          nama: 'Kecurangan intern (Internal Fraud)',
          isEnable: true,
        },
      },
    },
    penyebabKejadian: {
      id: 2,
      nama: 'Kesalahan Manusia',
    },
    statusKejadian: {
      id: 2,
      nama: 'Loss Event',
      deskripsi: 'Kejadian risiko yang mengakibatkan realisasi kerugian',
    },
    ssl: {
      id: 6,
      kode: '0600',
      nama: 'Risk Monitoring Committtee',
    },
    statusLaporan: {
      id: 3,
      nama: 'Closed',
      deskripsi: 'Berdasarkan Hasil Validasi IRM',
    },
    actionPlan: [
      {
        id: 4,
        actionPlan: 'ini action 1 yang akan dilakukan',
        unitKerjaEntity: {
          idUnitKerja: 29,
          kodeUnitKerja: 'SAM',
          namaUnitKerja: 'Special Asset Management',
          namaApproverUnit: 'Ryndra Putra Pratama Firdaus',
          emailApproverUnit: 'ryndrappf@gmail.com',
          isEnable: true,
          namaPic: 'Ryndra Putra Pratama Firdaus',
          emailPic: 'ryndrappf@gmail.com',
          emailUpperUnit: 'buwanhajanyahya@gmail.com',
        },
        cabangEntity: null,
        penanggungJawab: 'Ryndra Putra Pratama Firdaus',
        email: 'ryndrappf@gmail.com',
        isDone: false,
        targetPenyelesaian: 'Tue, 12 Mar 2024 17:00:00 GMT',
        namaFile: null,
      },
      {
        id: 5,
        actionPlan: 'ini action 2 yang akan dilakukan',
        unitKerjaEntity: null,
        cabangEntity: {
          id: 84,
          kodeCabang: 229,
          namaCabang: 'KK PEKANBARU - SIAK SRI INDRAPURA',
          indukCabang: 221,
          namaApproverCabang: 'Ryndra Putra Pratama Firdaus',
          emailApproverCabang: 'ryndrappf@gmail.com',
          namaPic: 'Ryndra Putra Pratama Firdaus',
          emailPic: 'ryndrappf@gmail.com',
          emailUpperCabang: 'buwanhajanyahya@gmail.com',
        },
        penanggungJawab: 'Ryndra Putra Pratama Firdaus',
        email: 'ryndrappf@gmail.com',
        isDone: false,
        targetPenyelesaian: 'Thu, 14 Mar 2024 17:00:00 GMT',
        namaFile: null,
      },
    ],
    unitKerja: {
      idUnitKerja: 58,
      kodeUnitKerja: 'CABANG',
      namaUnitKerja: 'CABANG',
      namaApproverUnit: 'Ryndra Putra Pratama Firdaus',
      emailApproverUnit: 'ryndrappf@gmail.com',
      isEnable: true,
      namaPic: 'Ryndra Putra Pratama Firdaus',
      emailPic: 'ryndrappf@gmail.com',
      emailUpperUnit: 'buwanhajanyahya@gmail.com',
    },
    cabang: {
      id: 335,
      kodeCabang: 512,
      namaCabang: 'KCU TEGAL',
      indukCabang: null,
      namaApproverCabang: 'Ryndra Putra Pratama Firdaus',
      emailApproverCabang: 'ryndrappf@gmail.com',
      namaPic: 'Ryndra Putra Pratama Firdaus',
      emailPic: 'ryndrappf@gmail.com',
      emailUpperCabang: 'buwanhajanyahya@gmail.com',
    },
  },
  {
    id: 5,
    idLaporan: '20240328004',
    kronologi: '<p>demo sendback 28 maret 2024</p>',
    kronologiSingkat: 'demo sendback 28 maret 2024',
    tanggalLapor: '01-03-2024',
    tanggalKejadian: '02-03-2024',
    tanggalIdentifikasi: '03-03-2024',
    dampak: '<p>demo sendback 28 maret 2024</p>',
    potensiKerugian: 0,
    nominalRecovery: 0,
    nominalRealisasiKerugian: 0,
    createdDate: '28-03-2024',
    aktivitas: {
      id: 7,
      nama: ' Perusakan aset Bank yang disengaja',
      subKategori: {
        id: 2,
        nama: 'Theft and fraud (Pencurian dan Penipuan)',
        isEnable: true,
        kategoriKejadian: {
          id: 1,
          kode: 'OIF',
          nama: 'Kecurangan intern (Internal Fraud)',
          isEnable: true,
        },
      },
    },
    penyebabKejadian: {
      id: 4,
      nama: 'Kejadian Eksternal',
    },
    statusKejadian: {
      id: 3,
      nama: 'Near Miss',
      deskripsi:
        'Kejadian risiko namun tidak mengakibatkan realisasi kerugian karena berfungsinya proses pengendalian internal dan kejadian risiko diselesaikan pada hari yang sama',
    },
    ssl: {
      id: 5,
      kode: '0500',
      nama: 'Nomination & Remuneration Committee',
    },
    statusLaporan: {
      id: 15,
      nama: 'Need Update',
      deskripsi: 'Laporan direject oleh approver dan perlu direvisi oleh RTU',
    },
    actionPlan: [
      {
        id: 7,
        actionPlan: 'demo sendback 28 maret 2024',
        unitKerjaEntity: {
          idUnitKerja: 4,
          kodeUnitKerja: 'IAT',
          namaUnitKerja: 'Internal Audit',
          namaApproverUnit: 'Ryndra Putra Pratama Firdaus',
          emailApproverUnit: 'ryndrappf@gmail.com',
          isEnable: true,
          namaPic: 'Ryndra Putra Pratama Firdaus',
          emailPic: 'ryndrappf@gmail.com',
          emailUpperUnit: 'buwanhajanyahya@gmail.com',
        },
        cabangEntity: null,
        penanggungJawab: 'Ryndra Putra Pratama Firdaus',
        email: 'ryndrappf@gmail.com',
        isDone: false,
        targetPenyelesaian: 'Thu, 29 Feb 2024 17:00:00 GMT',
        namaFile: null,
      },
    ],
    unitKerja: {
      idUnitKerja: 58,
      kodeUnitKerja: 'CABANG',
      namaUnitKerja: 'CABANG',
      namaApproverUnit: 'Ryndra Putra Pratama Firdaus',
      emailApproverUnit: 'ryndrappf@gmail.com',
      isEnable: true,
      namaPic: 'Ryndra Putra Pratama Firdaus',
      emailPic: 'ryndrappf@gmail.com',
      emailUpperUnit: 'buwanhajanyahya@gmail.com',
    },
    cabang: {
      id: 335,
      kodeCabang: 512,
      namaCabang: 'KCU TEGAL',
      indukCabang: null,
      namaApproverCabang: 'Ryndra Putra Pratama Firdaus',
      emailApproverCabang: 'ryndrappf@gmail.com',
      namaPic: 'Ryndra Putra Pratama Firdaus',
      emailPic: 'ryndrappf@gmail.com',
      emailUpperCabang: 'buwanhajanyahya@gmail.com',
    },
  },
];

const Report = (props) => {
  const { report, getAllReport } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const header = [
    'No',
    'Bulan input LED',
    'Tahun',
    'Nama Divisi/Cabang',
    'No Led',
    'Jenis',
    'Tanggal Kejadian',
    'Tanggal Teridentifikasi',
    'Tanggal Lapor',
    'Penyebab Kejadian',
    'Kategori Kejadian (Level 1)',
    'Sub Kategori (Level2)',
    'Aktivitas (Level3)',
    'Kronologi Singkat',
    'Kronologi',
    'Rencana Tindakan',
    'Perkiraan Kerugian',
    'Recovery',
    'Realisasi Kerugian',
    'Rencana Tindakan',
    'Status LED',
    'Target Date',
    'Sumber Recovery',
    'Status Approval',
    'Catatan',
    'Nama PIC',
    'Action Plan',
    'Status Akhir',
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // onPageChange(rowsPerPage, newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const RPP = parseInt(event.target.value, 10);
    setRowsPerPage(RPP);
    setPage(0);
    // onPageChange(RPP, 0);
  };

  useEffect(() => {
    (async () => {
      await getAllReport();
    })();
  }, []);

  const onSearch = (values) => {
    // setKeyword(values);
  };
  console.log(report);
  return (
    <PageContainer title="Report" description="Report Page">
      <Breadcrumb title="Report" items={BCrumb} />

      <DashboardCard>
        <div
          style={{
            gap: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {report?.length > 0 ? (
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
                        {header?.map((item, index) => (
                          <TableCell sx={{ textWrap: 'noWrap' }} key={index}>
                            {item}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {report?.map((row, index) => {
                        return (
                          <StyledTableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              {dayjs(row.tanggalLapor, 'DD-MM-YYYY').format('MMMM')}
                            </TableCell>
                            <TableCell>
                              {dayjs(row.tanggalLapor, 'DD-MM-YYYY').format('YYYY')}
                            </TableCell>
                            <TableCell>
                              {row.unitKerja.namaUnitKerja !== 'CABANG'
                                ? row.unitKerja.namaUnitKerja
                                : row.cabang.namaCabang}
                            </TableCell>
                            <TableCell>{row.idLaporan}</TableCell>
                            <TableCell>{row.statusKejadian?.nama}</TableCell>
                            <TableCell>{row.tanggalKejadian}</TableCell>
                            <TableCell>{row.tanggalIdentifikasi}</TableCell>
                            <TableCell>{row.tanggalLapor}</TableCell>
                            <TableCell>{row.penyebabKejadian?.nama}</TableCell>
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
                  count={report.length ?? 0}
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
    report: state.report.report,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllReport: () => dispatch(getAllReport()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
