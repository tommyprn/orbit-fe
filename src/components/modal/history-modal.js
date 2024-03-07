import { useEffect } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import {
  Paper,
  Table,
  styled,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableContainer,
} from '@mui/material';

import { getHistoryLED } from 'src/actions/formLEDActions';

import SimpleModal from './simpleModal';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const newStyle = {
  p: 3,
  top: '50%',
  left: '50%',
  width: '80vw',
  maxHeight: 400,
  bgcolor: 'background.paper',
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
};

const HistoryModal = ({ id, LED, title, isOpen, getHistoryLED, onCloseHandler }) => {
  useEffect(() => {
    (async () => {
      await getHistoryLED(id);
    })();
  }, [id]);

  const data = [
    {
      reportId: null,
      createdBy: 21193342,
      role: 'Inputer',
      status: 'D',
      startDate: new Date(),
      endDate: new Date(),
      comment: 'tidak ada',
      reportStatus: 'draft',
    },
    {
      reportId: 2000302,
      createdBy: 21193342,
      role: 'Inputer',
      status: 'D',
      startDate: new Date(),
      endDate: new Date(),
      comment: 'tidak ada',
      reportStatus: 'draft',
    },
    {
      reportId: 2000302,
      createdBy: 21193342,
      role: 'Inputer',
      status: 'D',
      startDate: new Date(),
      endDate: new Date(),
      comment: 'tidak ada',
      reportStatus: 'draft',
    },
    {
      reportId: 2000302,
      createdBy: 21193342,
      role: 'Inputer',
      status: 'D',
      startDate: new Date(),
      endDate: new Date(),
      comment: 'tidak ada',
      reportStatus: 'draft',
    },
  ];

  return (
    <SimpleModal title={title} isOpen={isOpen} newStyle={newStyle} onCloseHandler={onCloseHandler}>
      <Paper
        sx={{
          maxWidth: '100%',
          overflow: 'hidden',
        }}
        elevation={0}
        variant="outlined"
      >
        <TableContainer sx={{ maxHeight: '300px' }}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>no</TableCell>
                <TableCell>ID laporan</TableCell>
                <TableCell>NIP</TableCell>
                <TableCell>Posisi</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Tanggal mulai</TableCell>
                <TableCell>Tanggal berakhir</TableCell>
                <TableCell>Keterangan</TableCell>
                <TableCell>Status laporan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, index) => (
                <StyledTableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row?.reportId || 'DRAFT'}</TableCell>
                  <TableCell>{row.createdBy}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{dayjs(row.startDate).format('DD-MMM-YY')}</TableCell>
                  <TableCell>{dayjs(row.endDate).format('DD-MMM-YY')}</TableCell>
                  <TableCell>{row.comment}</TableCell>
                  <TableCell>{row.reportStatus}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </SimpleModal>
  );
};

const mapStateToProps = (state) => {
  return {
    LED: state.LED.history,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHistoryLED: (id) => dispatch(getHistoryLED(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryModal);
