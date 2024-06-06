import { createOption } from 'src/utils/use-options';
import { Typography, TextField, Autocomplete } from '@mui/material';

// component
import QuillTextField from 'src/components/forms/quil-text/quill-text';

const BaseInput = ({ id, type, title, formik, option, helperText, placeholder, ...props }) => {
  const Basic = (
    <TextField
      {...props}
      sx={{ minWidth: '200px' }}
      id={id}
      size="small"
      value={formik.values[id]}
      error={formik.touched[id] && Boolean(formik.errors[id])}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      helperText={formik.touched[id] && formik.errors[id]}
      placeholder={placeholder}
    />
  );

  const QuillText = (
    <QuillTextField
      id={id}
      value={formik.values[id]}
      width="100%"
      isError={formik.errors}
      onChange={(val) => formik.setFieldValue(id, val)}
      helperText={helperText}
    />
  );

  const AutoInput = (
    <Autocomplete
      disablePortal
      id={id}
      sx={{ minWidth: '200px' }}
      size="small"
      value={formik.values.id}
      options={option}
      onChange={(event, newValue) => {
        if (newValue !== null) {
          formik.setFieldValue(id, newValue.id);
        }
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          id={id}
          value={formik.values[id]}
          error={formik.touched[id] && Boolean(formik.errors[id])}
          onBlur={formik.handleBlur}
          helperText={formik.touched[id] && formik.errors[id]}
          placeholder={placeholder}
        />
      )}
    />
  );

  const getRender = () => {
    switch (type) {
      case 'quill':
        return QuillText;
      case 'select':
        return AutoInput;

      default:
        return Basic;
    }
  };

  return (
    <div
      style={{
        gap: '8px',
        height: type === 'quill' ? 'auto' : '4rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="body1">{title}</Typography>

      {getRender()}
    </div>
  );
};

export default BaseInput;
