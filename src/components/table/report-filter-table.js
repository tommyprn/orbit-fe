import {
  Paper,
  Table,
  styled,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
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

const ReportFilterTable = ({ data, header, tableRef }) => {
  return (
    <Paper
      sx={{
        maxWidth: '100%',
        overflow: 'hidden',
      }}
      elevation={0}
      variant="outlined"
    >
      <TableContainer sx={{ maxHeight: '350px' }} className="table-filter" ref={tableRef}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell rowSpan={3} sx={{ borderRight: '1px solid #e5eaef' }}>
                Kategori Jenis Kejadian
              </TableCell>
              <TableCell colSpan={8} align="center">
                Triwulan
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} align="center" sx={{ border: '1px solid #e5eaef' }}>
                TW1
              </TableCell>
              <TableCell colSpan={2} align="center" sx={{ border: '1px solid #e5eaef' }}>
                TW2
              </TableCell>
              <TableCell colSpan={2} align="center" sx={{ border: '1px solid #e5eaef' }}>
                TW3
              </TableCell>
              <TableCell colSpan={2} align="center" sx={{ border: '1px solid #e5eaef' }}>
                TW4
              </TableCell>
            </TableRow>
            <TableRow>
              {header?.map((item, i) => {
                return i !== 0 ? (
                  <TableCell key={i} sx={{ border: '1px solid #e5eaef' }}>
                    {item}
                  </TableCell>
                ) : null;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => {
              return (
                <StyledTableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{row.kategori}</TableCell>
                  <TableCell>{row.triwulan1?.frekuensi || 0}</TableCell>
                  <TableCell>{row.triwulan1?.nominal || 0}</TableCell>
                  <TableCell>{row.triwulan2?.frekuensi || 0}</TableCell>
                  <TableCell>{row.triwulan2?.nominal || 0}</TableCell>
                  <TableCell>{row.triwulan3?.frekuensi || 0}</TableCell>
                  <TableCell>{row.triwulan3?.nominal || 0}</TableCell>
                  <TableCell>{row.triwulan4?.frekuensi || 0}</TableCell>
                  <TableCell>{row.triwulan4?.nominal || 0}</TableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ReportFilterTable;
