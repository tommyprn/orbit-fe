import { useRef } from 'react';
import dayjs from 'dayjs';
import Workbook from 'react-excel-workbook';
import { DatePicker } from '@mui/x-date-pickers';
import { useSelector } from 'react-redux';
import { formatNumber, formatText } from 'src/utils/use-formatter';
import { IconDownload } from '@tabler/icons';
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

const DetailedReportTable = ({
  data,
  title,
  endDate,
  startDate,
  actionPlan,
  setEndDate,
  setStartDate,
}) => {
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

  const generateGeneralData = (data) => {
    return data.map((item) => {
      return {
        bulanInputLed: item.createdDate,
        Tahun: dayjs(item.createdDate, 'DD-MM-YYYY').get('year'),
        divisiCabang:
          item?.unitKerja?.namaUnitKerja === 'CABANG'
            ? item.cabang?.namaCabang
            : item?.unitKerja?.namaUnitKerja,
        noLed: item.idLaporan,
        statusKejadian: item.statusKejadian.nama,
        tanggalKejadian: item.tanggalKejadian,
        tanggalTeridentifikasi: item.tanggalIdentifikasi,
        tanggalLapor: item.tanggalLapor,
        penyebabKejadian: item.penyebabKejadian?.nama,
        kategori: item.aktivitas?.subKategori?.kategoriKejadian.nama,
        subKategori: item.aktivitas?.subKategori?.nama,
        aktivitas: item.aktivitas?.nama,
        highlight: item.kronologiSingkat,
        kronologis: formatText(item?.kronologi),
        rencanaTindakan: formatText(item?.tindakLanjut),
        potensiKerugian: String(item?.potensiKerugian),
        recovery: String(item?.nominalRecovery),
        grossLoss: String(item?.nominalRealisasiKerugian),
        netLoss: String(item?.nominalRealisasiKerugian - item?.nominalRecovery),
        statusLed: item.statusLaporan.nama,
        targetDate: item.actionPlan[item.actionPlan?.length - 1].targetPenyelesaian,
        sumberRecovery: item?.sumberRecovery,
        statusOtorisasi:
          item.statusKejadian.nama !== 'Recorded' ? 'Telah Disetujui' : 'Belum Disetujui',
        catatan: item.catatan,
        picAndMail:
          item.unitKerja?.namaUnitKerja === 'CABANG'
            ? item.cabang.emailPic
            : item.unitKerja?.emailPic,
        tindakLanjut: item.actionPlan[item.actionPlan?.length - 1].actionPlan,
        statusAkhir:
          item.statusLaporan.nama === 'Void' || item.statusLaporan.nama === 'Closed'
            ? item.statusLaporan.nama
            : null,
      };
    });
  };

  const generateActionData = (data) => {
    return data.map((item) => {
      return {
        nomorLed: item.laporanLed?.idLaporan,
        plan: item?.actionPlan,
        divisi:
          item?.unitKerjaEntity?.namaUnitKerja !== 'CABANG'
            ? item?.unitKerjaEntity?.namaUnitKerja
            : item?.cabangEntity?.namaCabang,
        PIC: item?.penanggungJawab,
        email: item?.email,
        targetPenyelesaian: item?.targetPenyelesaian,
      };
    });
  };

  const DownloadButton = () => (
    <Workbook
      filename={`Laporan Database LED (${dayjs(startDate).format('DD/MMM/YYYY')} - ${dayjs(
        endDate,
      ).format('DD/MMM/YYYY')}).xlsx`}
      element={<Button startIcon={<IconDownload size={18} />}>Unduh Laporan</Button>}
    >
      <Workbook.Sheet data={generateGeneralData(data)} name="LED">
        <Workbook.Column label="Bulan Input LED" value="bulanInputLed" />
        <Workbook.Column label="Tahun" value="Tahun" />
        <Workbook.Column label="Divisi/ Cabang" value="divisiCabang" />
        <Workbook.Column label="No LED" value="noLed" />
        <Workbook.Column label="Status Kejadian" value="statusKejadian" />
        <Workbook.Column label="Tanggal Kejadian" value="tanggalKejadian" />
        <Workbook.Column label="Tanggal Teridentifikasi" value="tanggalTeridentifikasi" />
        <Workbook.Column label="Tanggal Lapor" value="tanggalLapor" />
        <Workbook.Column label="Penyebab Kejadian" value="penyebabKejadian" />
        <Workbook.Column label="Kategori Kejadian (level 1)" value="kategori" />
        <Workbook.Column label="Kategori Kejadian (level 2)" value="subKategori" />
        <Workbook.Column label="Kategori Kejadian (level 3)" value="aktivitas" />
        <Workbook.Column label="Highlight Kronologis" value="highlight" />
        <Workbook.Column label="Kronologis" value="kronologis" />
        <Workbook.Column label="Rencana Tindakan" value="rencanaTindakan" />
        <Workbook.Column label="Potensi Kerugian (Rp)" value="potensiKerugian" />
        <Workbook.Column label="Recovery (Rp)" value="recovery" />
        <Workbook.Column label="Gross Loss (Rp)" value="grossLoss" />
        <Workbook.Column label="Net Loss (Rp)" value="netLoss" />
        <Workbook.Column label="Status LED" value="statusLed" />
        <Workbook.Column label="Target Penyelesaian" value="targetDate" />
        <Workbook.Column label="Sumber Recovery" value="sumberRecovery" />
        <Workbook.Column label="Status Otorisasi" value="statusOtorisasi" />
        <Workbook.Column label="Catatan" value="catatan" />
        <Workbook.Column label="Nama PIC/ Email" value="picAndMail" />
        <Workbook.Column label="Tindak Lanjut" value="tindakLanjut" />
        <Workbook.Column label="Status Akhir" value="statusAkhir" />
      </Workbook.Sheet>
      <Workbook.Sheet data={generateActionData(actionPlan)} name="Action Plan">
        <Workbook.Column label="Nomor Laporan" value="nomorLed" />
        <Workbook.Column label="Action Plan" value="plan" />
        <Workbook.Column label="Divisi" value="divisi" />
        <Workbook.Column label="PIC" value="PIC" />
        <Workbook.Column label="Email PIC" value="email" />
        <Workbook.Column label="Target Penyelesaian" value="targetPenyelesaian" />
      </Workbook.Sheet>
    </Workbook>
  );

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

        <DownloadButton />
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
