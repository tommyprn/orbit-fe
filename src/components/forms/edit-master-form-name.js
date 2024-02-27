import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, Radio, TextField, RadioGroup, FormControlLabel, Typography } from '@mui/material';

const EditMasterFormName = ({ masterTitle, selected, onSaveHandler, onCloseHandler }) => {
  // yup validation
  const validationSchema = yup.object({
    id: yup.number(),
    name: yup.string(`masukkan nama ${masterTitle}`).required(`Nama ${masterTitle} wajib diisi`),
    isEnable: yup.boolean('harap memilih salah satu status'),
  });

  const formik = useFormik({
    initialValues: {
      id: selected.id,
      name: selected.name,
      isEnable: selected.isEnable,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSaveHandler(values);
    },
  });

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        sx={{ width: '100%' }}
        id="name"
        label={`Nama ${masterTitle}`}
        variant="outlined"
        value={formik.values.name}
        error={formik.touched.name && Boolean(formik.errors.name)}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        helperText={formik.touched.name && formik.errors.name}
      />

      <div>
        <Typography>Status {masterTitle}</Typography>
        <RadioGroup
          id="isEnable"
          value={formik.values.isEnable}
          onChange={(e, value) => {
            formik.setFieldValue('isEnable', value);
          }}
          sx={{ flexDirection: 'row' }}
        >
          <FormControlLabel value={true} control={<Radio />} label="Aktif" />
          <FormControlLabel value={false} control={<Radio />} label="Non-Aktif" />
        </RadioGroup>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
        <Button variant="contained" color="error" onClick={onCloseHandler}>
          Batal
        </Button>
        <Button variant="contained" type="submit">
          Simpan
        </Button>
      </div>
    </form>
  );
};

export default EditMasterFormName;
