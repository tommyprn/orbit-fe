import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { getRegion, createRegion, updateRegion, deleteRegion } from 'src/actions/masterDataActions';

// component
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import SimpleModal from 'src/components/modal/simpleModal';
import PageContainer from 'src/components/container/PageContainer';
import EditMasterForm from 'src/components/forms/edit-master-form';
import CaseMasterTable from 'src/components/table/CaseMasterTable';
import CreateMasterForm from 'src/components/forms/create-master-form';

const Region = (props) => {
  const { getRegion, createRegion, updateRegion, deleteRegion, masterData } = props;
  const [keyword, setKeyword] = useState('');
  const [rowPerPage, setRowPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteMOdalOpen] = useState(false);
  const [selectedReg, setSelecetedReg] = useState({
    id: 0,
    name: '',
    isEnable: true,
  });

  const header = ['No', 'Kode Region', 'Nama Region', 'Aksi'];

  const BCrumb = [
    {
      title: 'Seluruh opsi pilihan akan tertera di halaman ini berserta keterangannya',
    },
  ];

  useEffect(() => {
    (async () => {
      await getRegion({ perPage: rowPerPage, page: currentPage }, keyword);
    })();
  }, [getRegion, rowPerPage, currentPage, keyword]);

  // Create Controller
  const onCreateHandler = () => {
    setCreateModalOpen(true);
  };
  const onCreateSave = async (data) => {
    await createRegion(data);

    setCreateModalOpen(false);
  };

  // Update Controller
  const onEditHandler = (item) => {
    setSelecetedReg({
      id: item.id,
      code: item.kodeRegion,
      name: item.namaRegion,
      isEnable: item.isEnable,
    });
    setEditModalOpen(true);
  };
  const onEditSave = async (data) => {
    const dataToSend = {
      id: selectedReg.id,
      code: data.code,
      name: data.name,
      isEnable: data.isEnable,
    };
    await updateRegion(dataToSend);

    setEditModalOpen(false);
  };

  // Delete Controller
  const onDeleteHandler = (item) => {
    setSelecetedReg({
      id: item.id,
      name: item.namaRegion,
    });
    setDeleteMOdalOpen(true);
  };
  const onConfirmDelete = async () => {
    const dataToSend = selectedReg.id;
    await deleteRegion(dataToSend);
    setDeleteMOdalOpen(false);
  };

  const onCloseHandler = () => {
    setSelecetedReg({});
    setEditModalOpen(false);
    setCreateModalOpen(false);
    setDeleteMOdalOpen(false);
  };

  const onSearch = (values) => {
    setKeyword(values);
  };

  return (
    <PageContainer title="Region" description="Region page">
      {process.env.HEADER_SHOW ? <Breadcrumb title="Region" items={BCrumb} /> : null}

      <CaseMasterTable
        title="Data Master Region"
        master={masterData?.region}
        header={header}
        onSearch={onSearch}
        onUpdate={onEditHandler}
        onDelete={onDeleteHandler}
        onPageChange={(perPage, page) => {
          setRowPerPage(perPage);
          setCurrentPage(page);
        }}
        onOpenHandler={onCreateHandler}
      />

      <SimpleModal title="Tambah region" isOpen={createModalOpen} onCloseHandler={onCloseHandler}>
        <CreateMasterForm
          ssl={true}
          masterTitle="Region"
          onSaveHandler={onCreateSave}
          onCloseHandler={onCloseHandler}
        />
      </SimpleModal>

      <SimpleModal title="Ubah region" isOpen={editModalOpen} onCloseHandler={onCloseHandler}>
        <EditMasterForm
          ssl={true}
          masterTitle="region"
          selected={selectedReg}
          onSaveHandler={onEditSave}
          onCloseHandler={onCloseHandler}
        />
      </SimpleModal>

      <SimpleModal
        title="Hapus region"
        isOpen={deleteModalOpen}
        onSaveHandler={onConfirmDelete}
        onCloseHandler={onCloseHandler}
      >
        <Typography>Apakah kamu yakin mau menghapus region ini?</Typography>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '16px' }}
        >
          <Button variant="contained" color="error" onClick={onCloseHandler}>
            Batal
          </Button>
          <Button variant="contained" onClick={onConfirmDelete}>
            Lanjutkan
          </Button>
        </div>
      </SimpleModal>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    masterData: state.masterData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRegion: (pagination, keyword) => dispatch(getRegion(pagination, keyword)),
    updateRegion: (payload) => dispatch(updateRegion(payload)),
    deleteRegion: (payload) => dispatch(deleteRegion(payload)),
    createRegion: (payload) => dispatch(createRegion(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Region);
