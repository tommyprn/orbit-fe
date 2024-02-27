import * as yup from 'yup';
import { useFormik } from 'formik';
import { IconSearch } from '@tabler/icons';
import { OutlinedInput, InputAdornment } from '@mui/material';

const SearchBar = ({ onSubmit }) => {
  const validationSchema = yup.object({
    userInput: yup.string('input search keyword'),
  });

  const formik = useFormik({
    initialValues: {
      userInput: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values.userInput);
    },
  });

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '330px' }}
      onSubmit={formik.handleSubmit}
    >
      <OutlinedInput
        id="userInput"
        value={formik.values.userInput}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        startAdornment={
          <InputAdornment position="start">
            <IconSearch />
          </InputAdornment>
        }
      />
    </form>
  );
};

export default SearchBar;
