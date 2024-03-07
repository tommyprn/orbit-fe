import { Typography } from '@mui/material';

const DetailWrapper = ({ title, content }) => {
  return (
    <div className="detail-wrapper">
      <Typography variant="body1" sx={{ width: '20%', fontWeight: '500' }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ width: '80%' }}>
        {content}
      </Typography>
    </div>
  );
};

export default DetailWrapper;
