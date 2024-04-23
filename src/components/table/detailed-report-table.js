import { useRef } from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import {
  Table,
  styled,
  Button,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Typography,
  TableContainer,
} from '@mui/material';
import { IconDownload } from '@tabler/icons';
import { useDownloadExcel } from 'react-export-table-to-excel';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const DetailedReportTable = ({ data, title }) => {
  const tableRef = useRef();
  const customizer = useSelector((state) => state.customizer);

  const header = [
    'Bulan Input LED',
    'Tahun',
    'Divisi/ Cabang',
    'No LED',
    'Jenis',
    'Tanggal Kejadian',
    'Tanggal Teridentifikasi',
    'Tanggal Lapor',
    'Penyebab Kejadian',
    'Kategori Kejadian (level 1)',
    'Kategori Kejadian (level 2)',
    'Kategori Kejadian (level 3)',
    'Highlight Kronologis',
    'Kronologis',
    'Rencana Tindakan',
    'Perkiraan Kerugian',
    'Recovery',
    'Realisasi Kerugian',
    'Status LED',
    'Target Date',
    'Sumber Recovery',
    'Status Approval',
    'Catatan',
    'Nama PIC/ Email',
    'Action Plan',
    'Status Akhir',
  ];

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `detail-laporan-LED`,
    sheet: 'LED',
  });

  const formatNumber = (value) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      return numericValue.toLocaleString('en-US');
    }
    return '0';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Typography variant="h4">{title}</Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div />
        <Button startIcon={<IconDownload size={18} />} onClick={onDownload}>
          Unduh Laporan
        </Button>
      </div>
      <TableContainer
        sx={{
          overflowY: 'hidden',
          border: '1px solid #e5eaef',
          borderRadius: '8px',
          maxHeight: '350px',
          maxWidth: customizer.isCollapse
            ? `calc(100vw - 202px)`
            : window.innerWidth > 1199
            ? `calc(100vw - 385px)`
            : '100%',
        }}
        ref={tableRef}
      >
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {header?.map((item, i) => {
                return <TableCell key={i}>{item}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => (
              <StyledTableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  {dayjs(row.createdDate, 'DD-MM-YYYY').format('DD - MMM - YYYY')}
                </TableCell>
                <TableCell>{dayjs(row.createdDate, 'DD-MM-YYYY').get('year')}</TableCell>
                <TableCell>
                  {row.unitKerja.namaUnitKerja === 'CABANG'
                    ? row.cabang.namaCabang
                    : row.unitKerja.namaUnitKerja}
                </TableCell>
                <TableCell>{row.idLaporan}</TableCell>
                <TableCell>{row.statusKejadian.nama}</TableCell>
                <TableCell>{dayjs(row.tglKejadian).format('DD - MMM - YYYY')}</TableCell>
                <TableCell>{dayjs(row.tglIdentifikasi).format('DD - MMM - YYYY')}</TableCell>
                <TableCell>{dayjs(row.tglLapor).format('DD - MMM - YYYY')}</TableCell>
                <TableCell>{row.penyebabKejadian.nama}</TableCell>
                <TableCell>{row.aktivitas.subKategori.kategoriKejadian.nama}</TableCell>
                <TableCell>{row.aktivitas.subKategori.nama}</TableCell>
                <TableCell>{row.aktivitas.nama}</TableCell>
                <TableCell>{row.kronologiSingkat}</TableCell>
                <TableCell>{row.kronologi}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>Rp. {formatNumber(row?.potensiKerugian)}</TableCell>
                <TableCell>Rp. {formatNumber(row?.nominalRecovery)}</TableCell>
                <TableCell>Rp. {formatNumber(row?.nominalRealisasiKerugian)}</TableCell>
                <TableCell>{row.statusLaporan.nama}</TableCell>
                <TableCell>
                  {dayjs(row.actionPlan[row.actionPlan.length - 1].targetPenyelesaian).format(
                    'DD - MMM - YYYY',
                  )}
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  {row.unitKerja.namaUnitKerja === 'CABANG'
                    ? row.cabang.emailPic
                    : row.unitKerja.emailPic}
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DetailedReportTable;
