import { IconSquare, IconSquareCheck } from '@tabler/icons';
import { Checkbox, TextField, Autocomplete } from '@mui/material';

const MultiSelect = ({ data, label, setItem, disabled }) => {
  const icon = <IconSquare />;
  const checkedIcon = <IconSquareCheck />;

  return (
    <Autocomplete
      disabled={disabled}
      multiple
      limitTags={3}
      options={data}
      disableCloseOnSelect
      getOptionLabel={(option) =>
        option.namaCabang || option.namaRegion || option.namaUnitKerja || option.namaDirektorat
      }
      onChange={(event, newValue) => {
        setItem(newValue);
      }}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.namaCabang || option.namaRegion || option.namaUnitKerja || option.namaDirektorat}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => <TextField {...params} label={label} placeholder={label} />}
    />
  );
};

export default MultiSelect;
