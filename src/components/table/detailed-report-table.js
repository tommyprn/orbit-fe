import { useRef } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { useSelector } from 'react-redux';
import { formatNumber } from 'src/utils/use-formatter';
import { IconDownload } from '@tabler/icons';
import { useDownloadExcel } from 'react-export-table-to-excel';
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const DetailedReportTable = ({ data, title, endDate, startDate, setEndDate, setStartDate }) => {
  const tableRef = useRef();
  const customizer = useSelector((state) => state.customizer);

  const header = [
    'Bulan Input LED',
    'Tahun',
    'Divisi/ Cabang',
    'No LED',
    'Status Kejadian',
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
    'Potensi Kerugian (Rp)',
    'Recovery (Rp)',
    'Gross Loss (Rp)',
    'Net Loss (Rp)',
    'Status LED',
    'Target Date',
    'Sumber Recovery',
    'Status Otorisasi',
    'Catatan',
    'Nama PIC/ Email',
    'Tindak Lanjut',
    'Status Akhir',
  ];

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `detail-laporan-LED`,
    sheet: 'LED',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Typography variant="h4">{title}</Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '16px' }}>dari</Typography>

          <DatePicker
            id="startDate"
            value={dayjs(startDate)}
            format=" DD - MMM - YYYY"
            onChange={(value) => {
              setStartDate(dayjs(value));
            }}
          />
          <Typography sx={{ fontSize: '16px' }}>s/d</Typography>
          <DatePicker
            id="endDate"
            value={dayjs(endDate)}
            format=" DD - MMM - YYYY"
            onChange={(value) => {
              setEndDate(dayjs(value));
            }}
          />
        </div>

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
                return (
                  <TableCell key={i} sx={{ textWrap: 'noWrap' }}>
                    {item}
                  </TableCell>
                );
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
                  {row?.unitKerja?.namaUnitKerja === 'CABANG'
                    ? row.cabang?.namaCabang
                    : row?.unitKerja?.namaUnitKerja}
                </TableCell>
                <TableCell>{row.idLaporan}</TableCell>
                <TableCell>{row.statusKejadian.nama}</TableCell>
                <TableCell>{dayjs(row.tanggalKejadian).format('DD - MMM - YYYY')}</TableCell>
                <TableCell>{dayjs(row.tanggalIdentifikasi).format('DD - MMM - YYYY')}</TableCell>
                <TableCell>{dayjs(row.tanggalLapor).format('DD - MMM - YYYY')}</TableCell>
                <TableCell>{row.penyebabKejadian?.nama}</TableCell>
                <TableCell>{row.aktivitas?.subKategori?.kategoriKejadian.nama}</TableCell>
                <TableCell>{row.aktivitas?.subKategori?.nama}</TableCell>
                <TableCell>{row.aktivitas?.nama}</TableCell>
                <TableCell>
                  <Typography sx={{ maxWidth: '200px', fontSize: '12px' }} noWrap>
                    {row.kronologiSingkat}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: '12px', maxWidth: '200px' }}
                    noWrap
                    dangerouslySetInnerHTML={{ __html: row?.kronologi }}
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{ fontSize: '12px' }}
                    dangerouslySetInnerHTML={{ __html: row?.tindakLanjut }}
                  />
                </TableCell>
                <TableCell sx={{ textWrap: 'noWrap', textAlign: 'right' }}>
                  {formatNumber(row?.potensiKerugian)}
                </TableCell>
                <TableCell sx={{ textWrap: 'noWrap', textAlign: 'right' }}>
                  {formatNumber(row?.nominalRecovery)}
                </TableCell>
                <TableCell sx={{ textWrap: 'noWrap', textAlign: 'right' }}>
                  {formatNumber(row?.nominalRealisasiKerugian)}
                </TableCell>
                <TableCell sx={{ textWrap: 'noWrap', textAlign: 'right' }}>
                  {formatNumber(row?.nominalRealisasiKerugian - row?.nominalRecovery)}
                </TableCell>
                <TableCell>{row.statusLaporan.nama}</TableCell>
                <TableCell>
                  {dayjs(row.actionPlan[row.actionPlan?.length - 1].targetPenyelesaian).format(
                    'DD - MMM - YYYY',
                  )}
                </TableCell>
                <TableCell>{row?.sumberRecovery}</TableCell>
                <TableCell>
                  {row.statusKejadian.nama !== 'Recorded' ? 'Telah Disetujui' : 'Belum Disetujui'}
                </TableCell>
                <TableCell>
                  <Typography sx={{ maxWidth: '200px', fontSize: '12px' }} noWrap>
                    {row.catatan}
                  </Typography>
                </TableCell>
                <TableCell>
                  {row.unitKerja?.namaUnitKerja === 'CABANG'
                    ? row.cabang.emailPic
                    : row.unitKerja?.emailPic}
                </TableCell>
                <TableCell>
                  <Typography sx={{ maxWidth: '200px', fontSize: '12px' }} noWrap>
                    {row.actionPlan[row.actionPlan?.length - 1].actionPlan}
                  </Typography>
                </TableCell>
                <TableCell>
                  {row.statusLaporan.nama === 'Void' || row.statusLaporan.nama === 'Closed'
                    ? row.statusLaporan.nama
                    : '-'}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DetailedReportTable;
