import { useRef } from 'react';
import dayjs from 'dayjs';
import { month } from '../../utils/get-dropdown-data';
import { IconDownload } from '@tabler/icons';
import { formatNumber } from 'src/utils/use-formatter';
import { useDownloadExcel } from 'react-export-table-to-excel';

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TopIssueTable = ({ data, title, header, fileName, setValue }) => {
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: fileName,
    sheet: 'LED',
  });

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
        <Button startIcon={<IconDownload size={18} />} onClick={onDownload}>
          Unduh Laporan
        </Button>
      </div>

      <TableContainer
        sx={{ overflowY: 'hidden', border: '1px solid #e5eaef', borderRadius: '8px' }}
        ref={tableRef}
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
                  {row.namaUnitKerja?.toLowerCase() !== 'cabang'
                    ? row.namaCabang
                    : row.namaUnitKerja}
                </TableCell>
                <TableCell>{dayjs(row.tglKejadian).format('DD - MMM - YYYY')}</TableCell>
                <TableCell>{dayjs(row.tglLapor).format('DD - MMM - YYYY')}</TableCell>
                <TableCell>{row.namaAktivitas}</TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                  {formatNumber(
                    row?.potensiKerugian || row?.nominalRealisasiKerugian - row?.nominalRecovery,
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                  {formatNumber(row?.nominalRecovery)}
                </TableCell>
                <TableCell>{row.namaStatusLaporan}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TopIssueTable;
