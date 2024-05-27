import secureLocalStorage from 'react-secure-storage';
import { useState } from 'react';
import { IconTrash, IconEdit, IconPlus } from '@tabler/icons';
import { Typography, IconButton, Button, TablePagination } from '@mui/material';

// component
import BaseCard from '../shared/BaseCard';
import AntSwitch from '../shared/AntSwitch';
import SearchBar from 'src/components/search-bar/SearchBar';

export const CategoryTable = ({
  ssl,
  title,
  master,
  header,
  disabled,
  onSearch,
  onUpdate,
  onDelete,
  onPageChange,
  onOpenHandler,
}) => {
  const role = JSON.parse(secureLocalStorage.getItem('selectedRoleName'));
  const isAdmin = role === 'admin';

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onPageChange(rowsPerPage, newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const RPP = parseInt(event.target.value, 10);
    setRowsPerPage(RPP);
    setPage(0);
    onPageChange(RPP, 0);
  };

  const CardHeader = (
    <>
      <div
        style={{
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: 14,
          paddingTop: 14,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3">{title}</Typography>
        <Button
          variant="contained"
          startIcon={<IconPlus />}
          onClick={onOpenHandler}
          disabled={disabled || !isAdmin}
        >
          Add
        </Button>
      </div>

      <div
        style={{
          paddingBottom: 24,
          paddingLeft: 24,
        }}
      >
        {disabled ? null : <SearchBar onSubmit={(val) => onSearch(val)} />}
      </div>
    </>
  );

  return (
    <BaseCard title={title} CustomHeader={CardHeader}>
      <table
        style={{ width: '100%', backgroundColor: '', borderBottom: '1px solid rgba(0,0,0,0.1)' }}
      >
        <thead style={{ width: '100%' }}>
          <tr
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              borderBottom: '1px solid rgba(0,0,0,0.1)',
              paddingBottom: '8px',
              marginBottom: '8px',
            }}
          >
            {header.map((item, index) => {
              return (
                <td
                  key={index}
                  style={{
                    width: index === 0 ? '3%' : index < header.length - 1 ? '25%' : '15%',
                  }}
                >
                  <Typography>{item}</Typography>
                </td>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {master?.data?.map((item, index) => {
            return (
              <tr
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                }}
              >
                <td style={{ width: '3%' }}>
                  <Typography>{page * 10 + index + 1}</Typography>
                </td>
                <td style={{ width: '25%' }}>
                  <Typography> {item?.nama}</Typography>
                </td>
                <td style={{ width: '25%' }}>
                  <Typography>{item?.subKategori?.nama || item?.kategoriKejadian?.nama}</Typography>
                </td>
                <td style={{ width: '25%' }}>
                  <Typography>{item?.subKategori?.kategoriKejadian?.nama || ''}</Typography>
                </td>
                <td style={{ width: '15%', display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    aria-label="edit"
                    onClick={() => onUpdate(item)}
                    disabled={disabled || !isAdmin}
                  >
                    <IconEdit />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => onDelete(item)}
                    disabled={disabled || !isAdmin}
                  >
                    <IconTrash />
                  </IconButton>
                  <AntSwitch checked={item.isEnable} disabled />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <TablePagination
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 1,
        }}
        page={page}
        count={master?.totalData ?? 0}
        component="div"
        rowsPerPage={master?.perPage ?? rowsPerPage}
        onPageChange={handleChangePage}
        labelRowsPerPage="Baris per halaman"
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </BaseCard>
  );
};

export default CategoryTable;
