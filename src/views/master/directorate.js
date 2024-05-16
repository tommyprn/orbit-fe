import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from '@mui/material';
import {
  getDirectorate,
  createDirectorate,
  updateDirectorate,
  deleteDirectorate,
} from 'src/actions/masterDataActions';

// component
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import SimpleModal from 'src/components/modal/simpleModal';
import PageContainer from 'src/components/container/PageContainer';
import CaseMasterTable from 'src/components/table/CaseMasterTable';
import EditMasterFormName from 'src/components/forms/edit-master-form-name';
import CreateMasterFormName from 'src/components/forms/create-master-form-name';

const Directorate = (props) => {
  const { getDirectorate, createDirectorate, updateDirectorate, deleteDirectorate, masterData } =
    props;
  const [keyword, setKeyword] = useState('');
  const [rowPerPage, setRowPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteMOdalOpen] = useState(false);
  const [selectedDir, setSelecetedDir] = useState({
    id: 0,
    name: '',
    isEnable: true,
  });

  const header = ['No', 'Penyebab', ' ', 'Aksi'];

  const BCrumb = [
    {
      title: 'Seluruh opsi pilihan akan tertera di halaman ini berserta keterangannya',
    },
  ];

  useEffect(() => {
    (async () => {
      await getDirectorate({ perPage: rowPerPage, page: currentPage }, keyword);
    })();
  }, [getDirectorate, rowPerPage, currentPage, keyword]);

  // Create Controller
  const onCreateHandler = () => {
    setCreateModalOpen(true);
  };
  const onCreateSave = async (data) => {
    await createDirectorate(data.name);

    setCreateModalOpen(false);
  };

  // Update Controller
  const onEditHandler = (item) => {
    setSelecetedDir({
      id: item.id,
      name: item.nama,
      isEnable: item.isEnable,
    });
    setEditModalOpen(true);
  };
  const onEditSave = async (data) => {
    const dataToSend = { id: selectedDir.id, name: data.name, isEnable: data.isEnable };
    await updateDirectorate(dataToSend);

    setEditModalOpen(false);
  };

  // Delete Controller
  const onDeleteHandler = (item) => {
    setSelecetedDir({
      id: item.id,
      name: item.nama,
    });
    setDeleteMOdalOpen(true);
  };
  const onConfirmDelete = async () => {
    const dataToSend = selectedDir.id;
    await deleteDirectorate(dataToSend);
    setDeleteMOdalOpen(false);
  };

  const onCloseHandler = () => {
    setSelecetedDir({});
    setEditModalOpen(false);
    setCreateModalOpen(false);
    setDeleteMOdalOpen(false);
  };

  const onSearch = (values) => {
    setKeyword(values);
  };

  return (
    <PageContainer title="Direktorat" description="Directorate page">
      {process.env.HEADER_SHOW ? <Breadcrumb title="Direktorat" items={BCrumb} /> : null}

      <CaseMasterTable
        title="Data Master Direktorat"
        master={masterData?.directorate}
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

      <SimpleModal
        title="Tambah direktorat"
        isOpen={createModalOpen}
        onCloseHandler={onCloseHandler}
      >
        <CreateMasterFormName
          masterTitle="Direktorat"
          onSaveHandler={onCreateSave}
          onCloseHandler={onCloseHandler}
        />
      </SimpleModal>

      <SimpleModal title="Ubah direktorat" isOpen={editModalOpen} onCloseHandler={onCloseHandler}>
        <EditMasterFormName
          masterTitle="direktorat"
          selected={selectedDir}
          onSaveHandler={onEditSave}
          onCloseHandler={onCloseHandler}
        />
      </SimpleModal>

      <SimpleModal
        title="Hapus direktorat"
        isOpen={deleteModalOpen}
        onSaveHandler={onConfirmDelete}
        onCloseHandler={onCloseHandler}
      >
        <Typography>Apakah kamu yakin mau menghapus direktorat ini?</Typography>
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
    getDirectorate: (pagination, keyword) => dispatch(getDirectorate(pagination, keyword)),
    updateDirectorate: (payload) => dispatch(updateDirectorate(payload)),
    deleteDirectorate: (payload) => dispatch(deleteDirectorate(payload)),
    createDirectorate: (payload) => dispatch(createDirectorate(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Directorate);
