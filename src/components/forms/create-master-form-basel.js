import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Autocomplete } from '@mui/material';

const CreateMasterFormBasel = ({
  options,
  levelOne,
  levelThree,
  masterTitle,
  onSaveHandler,
  onCloseHandler,
}) => {
  const [value, setValue] = useState({ id: 0, label: '' });

  // yup validation
  const validationLevelOneSchema = yup.object({
    name: yup.string(`masukkan nama ${masterTitle}`).required(`Nama ${masterTitle} wajib diisi`),
    code: yup.string(`masukkan kode`).required(`kode wajib diisi`).max(3),
  });
  const validationLevelTwoSchema = yup.object({
    name: yup.string(`masukkan nama ${masterTitle}`).required(`Nama ${masterTitle} wajib diisi`),
    idLevelOne: yup.number(`masukkan kategori`).required(`kategori wajib diisi`),
  });
  const validationLevelThreeSchema = yup.object({
    name: yup.string(`masukkan nama ${masterTitle}`).required(`Nama ${masterTitle} wajib diisi`),
    idLevelTwo: yup.number(`masukkan sub kategori`).required(`sub kategori wajib diisi`),
  });

  const formikLevelOne = useFormik({
    initialValues: {
      name: '',
      code: '',
    },
    validationSchema: validationLevelOneSchema,
    onSubmit: (values) => {
      onSaveHandler(values);
    },
  });
  const formikLevelTwo = useFormik({
    initialValues: {
      name: '',
      idLevelOne: 0,
    },
    validationSchema: validationLevelTwoSchema,
    onSubmit: (values) => {
      onSaveHandler(values);
    },
  });

  const formikLevelThree = useFormik({
    initialValues: {
      name: '',
      idLevelTwo: 0,
    },
    validationSchema: validationLevelThreeSchema,
    onSubmit: (values) => {
      onSaveHandler(values);
    },
  });

  const newOption = options?.data?.map((item) => {
    return {
      id: item.id,
      label: levelThree ? `${item.nama} - ${item.kategoriKejadian.nama}` : item.nama,
    };
  });

  const category = (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      onSubmit={formikLevelOne.handleSubmit}
    >
      <TextField
        sx={{ width: '100%' }}
        id="code"
        label={`Kode ${masterTitle} baru`}
        variant="outlined"
        required
        value={formikLevelOne.values.code}
        error={formikLevelOne.touched.code && Boolean(formikLevelOne.errors.code)}
        onBlur={formikLevelOne.handleBlur}
        onChange={formikLevelOne.handleChange}
        helperText={formikLevelOne.touched.code && formikLevelOne.errors.code}
      />

      <TextField
        sx={{ width: '100%' }}
        id="name"
        label={`Nama ${masterTitle} baru`}
        variant="outlined"
        required
        value={formikLevelOne.values.name}
        error={formikLevelOne.touched.name && Boolean(formikLevelOne.errors.name)}
        onBlur={formikLevelOne.handleBlur}
        onChange={formikLevelOne.handleChange}
        helperText={formikLevelOne.touched.name && formikLevelOne.errors.name}
      />

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

  const subCategory = (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      onSubmit={formikLevelTwo.handleSubmit}
    >
      <Autocomplete
        disablePortal
        id="idLevelOne"
        options={newOption ? newOption : []}
        value={value}
        onChange={(event, newValue) => {
          if (newValue === null) {
            setValue({ id: 0, label: '' });
          } else {
            setValue(newValue);
            formikLevelTwo.setFieldValue('idLevelOne', newValue.id);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            id="idLevelOne"
            label="Kategori"
            value={formikLevelTwo.values.idLevelOne}
            error={formikLevelTwo.touched.idLevelOne && Boolean(formikLevelTwo.errors.idLevelOne)}
            onBlur={formikLevelTwo.handleBlur}
            helperText={formikLevelTwo.touched.idLevelOne && formikLevelTwo.errors.idLevelOne}
          />
        )}
      />

      <TextField
        sx={{ width: '100%' }}
        id="name"
        label={`${masterTitle} baru`}
        variant="outlined"
        required
        value={formikLevelTwo.values.name}
        error={formikLevelTwo.touched.name && Boolean(formikLevelTwo.errors.name)}
        onBlur={formikLevelTwo.handleBlur}
        onChange={formikLevelTwo.handleChange}
        helperText={formikLevelTwo.touched.name && formikLevelTwo.errors.name}
      />

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

  const activity = (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      onSubmit={formikLevelThree.handleSubmit}
    >
      <Autocomplete
        disablePortal
        id="idLevelTwo"
        options={newOption ? newOption : []}
        value={value}
        onChange={(event, newValue) => {
          if (newValue === null) {
            setValue({ id: 0, label: '' });
          } else {
            setValue(newValue);
            formikLevelThree.setFieldValue('idLevelTwo', newValue.id);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            id="idLevelTwo"
            label="Sub kategori"
            value={formikLevelThree.values.idLevelTwo}
            error={
              formikLevelThree.touched.idLevelTwo && Boolean(formikLevelThree.errors.idLevelTwo)
            }
            onBlur={formikLevelThree.handleBlur}
            helperText={formikLevelThree.touched.idLevelTwo && formikLevelThree.errors.idLevelTwo}
          />
        )}
      />

      <TextField
        sx={{ width: '100%' }}
        id="name"
        label={`${masterTitle} baru`}
        variant="outlined"
        required
        value={formikLevelThree.values.name}
        error={formikLevelThree.touched.name && Boolean(formikLevelThree.errors.name)}
        onBlur={formikLevelThree.handleBlur}
        onChange={formikLevelThree.handleChange}
        helperText={formikLevelThree.touched.name && formikLevelThree.errors.name}
      />

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

  return levelOne ? category : levelThree ? activity : subCategory;
};

export default CreateMasterFormBasel;
