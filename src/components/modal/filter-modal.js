import React, { useState } from 'react';
import { Button, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';

// component
import SimpleModal from './simpleModal';
import MultiSelect from '../shared/multi-select/multi-select';

const newStyle = {
  p: 3,
  top: '50%',
  left: '50%',
  bgcolor: 'background.paper',
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
};

const FilterModal = ({ data, isOpen, setLine, onCloseHandler, setSelectedLine }) => {
  const [filter, setFilter] = useState('region');
  const [branch, setBranch] = useState([]);
  const [region, setRegion] = useState([]);
  const [division, setDivison] = useState([]);
  const [directorate, setDirectorate] = useState([]);

  const changeFilter = (e, value) => {
    setLine([]);
    setBranch([]);
    setRegion([]);
    setDivison([]);
    setDirectorate([]);
    setSelectedLine('');
    setFilter(value);
  };

  const closeModal = () => {
    setBranch([]);
    setRegion([]);
    setDivison([]);
    setDirectorate([]);
    onCloseHandler();
  };

  const onSubmit = () => {
    if (branch.length > 0) {
      setLine(branch.map((item) => item.id));
    } else if (region.length > 0) {
      setLine(region.map((item) => item.id));
    } else if (division.length > 0) {
      setLine(division.map((item) => item.idUnitKerja));
    } else if (directorate.length > 0) {
      setLine(directorate.map((item) => item.id));
    } else {
      setLine([]);
    }
    setSelectedLine(filter);
    onCloseHandler();
    setBranch([]);
    setRegion([]);
    setDivison([]);
    setDirectorate([]);
  };

  return (
    <SimpleModal title="" isOpen={isOpen} newStyle={newStyle} onCloseHandler={closeModal}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <ToggleButtonGroup exclusive value={filter} onChange={changeFilter}>
          <ToggleButton value="branch">
            <Typography sx={{ fontWeight: 'bold' }}>Cabang</Typography>
          </ToggleButton>
          <ToggleButton value="region">
            <Typography sx={{ fontWeight: 'bold' }}>Region</Typography>
          </ToggleButton>
          <ToggleButton value="directorate">
            <Typography sx={{ fontWeight: 'bold' }}>Direktorat</Typography>
          </ToggleButton>
          <ToggleButton value="division">
            <Typography sx={{ fontWeight: 'bold' }}>Divisi</Typography>
          </ToggleButton>
        </ToggleButtonGroup>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Typography variant="h5">Filter Cabang/ Region</Typography>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <MultiSelect
            data={data?.branch}
            label="Cabang"
            setItem={setBranch}
            stateValue={branch}
            disabled={filter !== 'branch'}
          />
          <MultiSelect
            data={data?.region}
            label="Region"
            setItem={setRegion}
            stateValue={region}
            disabled={filter !== 'region'}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Typography variant="h5">Filter Direktorat/ Divisi</Typography>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <MultiSelect
            data={data?.directorate}
            label="Direktorat"
            setItem={setDirectorate}
            stateValue={directorate}
            disabled={filter !== 'directorate'}
          />
          <MultiSelect
            data={data?.workUnit}
            label="Divisi"
            setItem={setDivison}
            stateValue={division}
            disabled={filter !== 'division'}
          />
        </div>
        <Button onClick={onSubmit}>Simpan</Button>
      </div>
    </SimpleModal>
  );
};

export default FilterModal;
