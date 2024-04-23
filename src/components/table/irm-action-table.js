import { useRef } from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import {
  Paper,
  Table,
  styled,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
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

const ReportFilterTable = ({ data }) => {
  const customizer = useSelector((state) => state.customizer);
  const tableRef = useRef(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Typography variant="h4">Laporan History IRM</Typography>

      <Paper
        sx={{
          maxWidth: '100%',
          marginBottom: '20px',
        }}
        elevation={0}
        variant="outlined"
      >
        <TableContainer
          sx={{
            maxWidth: customizer.isCollapse
              ? `calc(100vw - 202px)`
              : window.innerWidth > 1199
              ? `calc(100vw - 385px)`
              : '100%',
          }}
          className="table-filter"
          ref={tableRef}
        >
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Status User</TableCell>
                {Object?.keys(data[0] ?? {})
                  .sort((a, b) => dayjs(a) - dayjs(b))
                  .filter((item) => item !== 'label')
                  .map((key, i) => {
                    return <TableCell key={i}>{key}</TableCell>;
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
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.label}</TableCell>
                    {Object?.keys(data[0])
                      .sort((a, b) => dayjs(a) - dayjs(b))
                      .filter((item) => item !== 'label')
                      .map((key, i) => {
                        return (
                          <TableCell key={i}>
                            {row[key]?.map((item) => {
                              return <Typography>{item}</Typography>;
                            })}
                          </TableCell>
                        );
                      })}
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default ReportFilterTable;
