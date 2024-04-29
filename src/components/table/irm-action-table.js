import { useRef } from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Link,
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

const IrmActionTable = ({ data }) => {
  const customizer = useSelector((state) => state.customizer);
  const tableRef = useRef(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                    return (
                      <TableCell key={i} sx={{ textWrap: 'noWrap' }}>
                        {key}
                      </TableCell>
                    );
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
                            {row[key]?.map((item, index) => {
                              return (
                                <Link
                                  key={index}
                                  underline="none"
                                  component={NavLink}
                                  to={`/LED/detail-report/null/${item}`}
                                >
                                  <Typography>{item}</Typography>
                                </Link>
                              );
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

export default IrmActionTable;