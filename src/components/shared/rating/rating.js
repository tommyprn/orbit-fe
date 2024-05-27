import { styled, Rating } from '@mui/material';

import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';

const InputRating = ({}) => {
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });

  return (
    <div>
      <StyledRating
        name="customized-color"
        defaultValue={2}
        icon={<LocalFireDepartmentIcon fontSize="inherit" />}
        emptyIcon={<LocalFireDepartmentOutlinedIcon fontSize="inherit" />}
      />
    </div>
  );
};

export default InputRating;
