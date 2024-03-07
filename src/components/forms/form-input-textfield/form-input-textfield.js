import { TextField, Typography } from '@mui/material';

const FormTextField = ({ id, title, formik, placeholder }) => {
  return (
    <div className="form-input-wrapper">
      <Typography variant="body1" sx={{ width: '20%' }}>
        {title}
      </Typography>

      <TextField
        sx={{ width: '80%' }}
        id={id}
        value={formik.values[id]}
        error={formik.touched[id] && Boolean(formik.errors[id])}
        onBlur={formik.handleBlur}
        variant="outlined"
        onChange={formik.handleChange}
        helperText={formik.touched[id] && formik.errors[id]}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormTextField;
