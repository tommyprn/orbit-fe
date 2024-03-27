import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from '@mui/material';
import {
  getLevelOne,
  updateLevelOne,
  deleteLevelOne,
  createLevelOne,
} from 'src/actions/masterDataActions';

// component
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import SimpleModal from 'src/components/modal/simpleModal';
import PageContainer from 'src/components/container/PageContainer';
import CaseMasterTable from 'src/components/table/CaseMasterTable';
import EditMasterFormName from 'src/components/forms/edit-master-form-name';
import CreateMasterFormName from 'src/components/forms/create-master-form-name';

const LevelOne = (props) => {
  const { masterData, getLevelOne, updateLevelOne, createLevelOne, deleteLevelOne } = props;
  const [keyword, setKeyword] = useState('');
  const [rowPerPage, setRowPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteMOdalOpen] = useState(false);
  const [selectedCase, setSelecetedCase] = useState({
    id: 0,
    nama: '',
  });

  const header = ['No', 'Kategori', 'Kode', 'Aksi'];

  const BCrumb = [
    {
      title: 'Seluruh opsi pilihan akan tertera di halaman ini berserta keterangannya',
    },
  ];

  useEffect(() => {
    (async () => {
      await getLevelOne({ perPage: rowPerPage, page: currentPage }, keyword);
    })();
  }, [getLevelOne, rowPerPage, currentPage, keyword]);

  // Create Controller
  const onCreateHandler = () => {
    setCreateModalOpen(true);
  };
  const onCreateSave = async (data) => {
    const dataToSend = { name: data.name };
    await createLevelOne(dataToSend);
    setCreateModalOpen(false);
  };

  // Update Controller
  const onEditHandler = (item) => {
    setSelecetedCase({
      id: item.id,
      name: item.nama,
      isEnable: item.isEnable,
    });
    setEditModalOpen(true);
  };
  const onEditSave = async (data) => {
    const dataToSend = { id: selectedCase.id, name: data.name, isEnable: data.isEnable };
    await updateLevelOne(dataToSend);
    setEditModalOpen(false);
  };

  // Delete Controller
  const onDeleteHandler = (item) => {
    setSelecetedCase({
      id: item.id,
      name: item.nama,
    });
    setDeleteMOdalOpen(true);
  };
  const onConfirmDelete = async () => {
    const dataToSend = selectedCase.id;
    await deleteLevelOne(dataToSend);
    setDeleteMOdalOpen(false);
  };

  const onCloseHandler = () => {
    setSelecetedCase({});
    setEditModalOpen(false);
    setCreateModalOpen(false);
    setDeleteMOdalOpen(false);
  };

  const onSearch = (values) => {
    setKeyword(values);
  };

  return (
    <PageContainer title="Kategori Kejadian" description="level 1 Case Category Page">
      {process.env.HEADER_SHOW ? <Breadcrumb title="Kategori Kejadian" items={BCrumb} /> : null}

      <CaseMasterTable
        title="Kategori Kejadian"
        master={masterData?.caseCategory?.levelOne}
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
        title="Tambah Kategori Kejadian"
        isOpen={createModalOpen}
        onCloseHandler={onCloseHandler}
      >
        <CreateMasterFormName
          masterTitle="kategori kejadian"
          onSaveHandler={onCreateSave}
          onCloseHandler={onCloseHandler}
        />
      </SimpleModal>

      <SimpleModal
        title="Ubah Kategori Kejadian"
        isOpen={editModalOpen}
        onCloseHandler={onCloseHandler}
      >
        <EditMasterFormName
          masterTitle="kategori kejadian"
          selected={selectedCase}
          onSaveHandler={onEditSave}
          onCloseHandler={onCloseHandler}
        />
      </SimpleModal>

      <SimpleModal
        title="Hapus Kategori Kejadian"
        isOpen={deleteModalOpen}
        onSaveHandler={onConfirmDelete}
        onCloseHandler={onCloseHandler}
      >
        <Typography>Apakah kamu yakin mau menghapus Kategori kejadian ini?</Typography>
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
    getLevelOne: (pagination, keyword) => dispatch(getLevelOne(pagination, keyword)),
    updateLevelOne: (payload) => dispatch(updateLevelOne(payload)),
    deleteLevelOne: (payload) => dispatch(deleteLevelOne(payload)),
    createLevelOne: (payload) => dispatch(createLevelOne(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelOne);
