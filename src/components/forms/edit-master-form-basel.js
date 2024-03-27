import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button,
  Radio,
  Typography,
  TextField,
  RadioGroup,
  Autocomplete,
  FormControlLabel,
} from '@mui/material';

const EditMasterFormBasel = ({
  options,
  selected,
  levelThree,
  masterTitle,
  onSaveHandler,
  onCloseHandler,
}) => {
  const [value, setValue] = useState({
    id: levelThree ? selected?.subKategori?.id : selected?.kategoriKejadian?.id,
    label: levelThree
      ? `${selected?.subKategori?.nama} - ${selected?.subKategori?.kategoriKejadian?.nama}`
      : selected?.kategoriKejadian?.nama,
  });

  // yup validation
  const validationLevelTwoSchema = yup.object({
    name: yup.string(`masukkan nama ${masterTitle}`).required(`Nama ${masterTitle} wajib diisi`),
    isEnable: yup.boolean('harap memilih salah satu status'),
    idLevelOne: yup.number(`masukkan nama ${masterTitle}`).required(`Kategori wajib diisi`),
  });
  const validationLevelThreeSchema = yup.object({
    name: yup.string(`masukkan nama ${masterTitle}`).required(`Nama ${masterTitle} wajib diisi`),
    isEnable: yup.boolean('harap memilih salah satu status'),
    idLevelTwo: yup.number(`masukkan nama ${masterTitle}`).required(`Sub kategori wajib diisi`),
  });

  const formikLevelTwo = useFormik({
    initialValues: {
      name: selected.nama,
      isEnable: selected?.isEnable,
      idLevelOne: selected?.kategoriKejadian?.id,
    },
    validationSchema: validationLevelTwoSchema,
    onSubmit: (values) => {
      onSaveHandler(values);
    },
  });

  const formikLevelThree = useFormik({
    initialValues: {
      name: selected.nama,
      isEnable: selected?.isEnable,
      idLevelTwo: selected?.subKategori?.id,
    },
    validationSchema: validationLevelThreeSchema,
    onSubmit: (values) => {
      onSaveHandler(values);
    },
  });

  const newOption = options.data.map((item) => {
    if (levelThree) {
      return {
        id: item.id,
        label: `${item.nama} - ${item.kategoriKejadian.nama}`,
      };
    } else {
      return { id: item.id, label: item.nama };
    }
  });

  const subCategory = (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      onSubmit={formikLevelTwo.handleSubmit}
    >
      <Autocomplete
        disablePortal
        id="idLevelOne"
        options={newOption}
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
        label={`nama ${masterTitle}`}
        variant="outlined"
        required
        value={formikLevelTwo.values.name}
        error={formikLevelTwo.touched.name && Boolean(formikLevelTwo.errors.name)}
        onBlur={formikLevelTwo.handleBlur}
        onChange={formikLevelTwo.handleChange}
        helperText={formikLevelTwo.touched.name && formikLevelTwo.errors.name}
      />

      <div>
        <Typography>Status {masterTitle}</Typography>
        <RadioGroup
          id="isEnable"
          value={formikLevelTwo.values.isEnable}
          onChange={(e, value) => {
            value === 'true'
              ? formikLevelTwo.setFieldValue('isEnable', true)
              : formikLevelTwo.setFieldValue('isEnable', false);
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

  const activity = (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      onSubmit={formikLevelThree.handleSubmit}
    >
      <Autocomplete
        disablePortal
        id="idLevelTwo"
        options={newOption}
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
            label="Sub Kategori"
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
        label={`nama ${masterTitle}`}
        variant="outlined"
        required
        value={formikLevelThree.values.name}
        error={formikLevelThree.touched.name && Boolean(formikLevelThree.errors.name)}
        onBlur={formikLevelThree.handleBlur}
        onChange={formikLevelThree.handleChange}
        helperText={formikLevelThree.touched.name && formikLevelThree.errors.name}
      />

      <div>
        <Typography>Status {masterTitle}</Typography>
        <RadioGroup
          id="isEnable"
          value={formikLevelThree.values.isEnable}
          onChange={(e, value) => {
            value === 'true'
              ? formikLevelThree.setFieldValue('isEnable', true)
              : formikLevelThree.setFieldValue('isEnable', false);
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

  return levelThree ? activity : subCategory;
};

export default EditMasterFormBasel;
