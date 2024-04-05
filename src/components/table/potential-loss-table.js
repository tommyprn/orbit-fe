import dayjs from 'dayjs';
import { CSVLink } from 'react-csv';
import {
  Table,
  styled,
  Button,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TextField,
  Typography,
  Autocomplete,
  TableContainer,
} from '@mui/material';
import { IconDownload } from '@tabler/icons';
import { useEffect, useState } from 'react';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const PotentialLossTable = ({ data, title, header, fileName, setValue }) => {
  const [csv, setCsv] = useState([]);

  const month = [
    { label: 'Januari', value: 1 },
    { label: 'Februari', value: 2 },
    { label: 'Maret', value: 3 },
    { label: 'April', value: 4 },
    { label: 'Mei', value: 5 },
    { label: 'Juni', value: 6 },
    { label: 'Juli', value: 7 },
    { label: 'Agustus', value: 8 },
    { label: 'September', value: 9 },
    { label: 'Oktober', value: 10 },
    { label: 'November', value: 11 },
    { label: 'Desember', value: 12 },
  ];

  useEffect(() => {
    const newHeader = header.map((item, i) => {
      const keyGen = {
        No: 'id',
        Region: 'namaCabang',
        'Nama Kantor': 'namaCabang',
        'Tanggal Kejadian': 'tglKejadian',
        'Tanggal Pelaporan': 'tglLapor',
        'Detail Aktivitas': 'namaAktivitas',
        'Potensi Kerugian': 'potensiKerugian',
        Recovery: 'nominalRecovery',
        Status: 'namaStatusLaporan',
        'Realisasi Kerugian': 'nominalRealisasiKerugian',
      };

      return {
        label: item,
        key: keyGen[item],
      };
    });

    setCsv(newHeader);
  }, [header]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Typography variant="h4">{title}</Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Autocomplete
          sx={{ width: '200px' }}
          options={month}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => <TextField {...params} label="Bulan" />}
        />
        {csv.length > 0 ? (
          <Button startIcon={<IconDownload size={18} />}>
            <CSVLink data={data} headers={csv} filename={fileName} style={{ color: 'inherit' }}>
              Unduh Laporan
            </CSVLink>
          </Button>
        ) : null}
      </div>
      <TableContainer
        sx={{ overflowY: 'hidden', border: '1px solid #e5eaef', borderRadius: '8px' }}
      >
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {header.map((item, i) => {
                return <TableCell key={i}>{item}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <StyledTableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{' - '}</TableCell>
                <TableCell>
                  {row.namaUnitKerja === 'CABANG' ? row.namaCabang : row.namaUnitKerja}
                </TableCell>
                <TableCell>{dayjs(row.tglKejadian).format('DD - MMM - YYYY')}</TableCell>
                <TableCell>{dayjs(row.tglLapor).format('DD - MMM - YYYY')}</TableCell>
                <TableCell>{row.namaAktivitas}</TableCell>
                <TableCell>Rp. {row?.potensiKerugian || row?.nominalRealisasiKerugian}</TableCell>
                <TableCell>Rp. {row?.nominalRecovery}</TableCell>
                <TableCell>{row.namaStatusLaporan}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PotentialLossTable;
