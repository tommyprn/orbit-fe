import { IconX } from '@tabler/icons';
import { Modal, Box, Typography, IconButton } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 3,
};

const SimpleModal = ({ title, isOpen, children, newStyle, onCloseHandler }) => {
  return (
    <Modal open={isOpen} onClose={onCloseHandler}>
      <Box sx={newStyle ? newStyle : style}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
            justifyContent: 'space-between',
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            {title}
          </Typography>

          <IconButton color="inherit" onClick={onCloseHandler}>
            <IconX size="1rem" />
          </IconButton>
        </div>

        {children}
      </Box>
    </Modal>
  );
};

export default SimpleModal;
