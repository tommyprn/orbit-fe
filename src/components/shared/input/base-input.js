import { createOption } from 'src/utils/use-options';
import { Typography, TextField, Autocomplete } from '@mui/material';

// component
import QuillTextField from 'src/components/forms/quil-text/quill-text';

const BaseInput = ({ id, type, title, formik, option, ...props }) => {
  const Basic = (
    <TextField
      {...props}
      id={id}
      size="small"
      value={formik.values.brief}
      error={formik.touched.brief && Boolean(formik.errors.brief)}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      helperText={formik.touched.brief && formik.errors.brief}
    />
  );

  const QuillText = (
    <QuillTextField
      id={id}
      value={formik.values.chronology}
      width="100%"
      isError={formik.errors}
      onChange={(val) => formik.setFieldValue(id, val)}
      helperText="Kolom ini wajib diisi"
    />
  );

  const AutoInput = (
    <Autocomplete
      disablePortal
      id={id}
      size="small"
      value={formik.values.id}
      options={createOption(option)}
      onChange={(event, newValue) => {
        if (newValue !== null) {
          // setCaseStatusValue(newValue);
          formik.setFieldValue(id, newValue.id);
        }
        // else {
        // setCaseStatusValue({ id: 0, label: '' });
        // }
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
          placeholder="pilih status kejadian"
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
