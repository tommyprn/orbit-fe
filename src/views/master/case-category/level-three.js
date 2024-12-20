import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from '@mui/material';
import {
  getLevelTwo,
  getLevelThree,
  updateLevelThree,
  deleteLevelThree,
  createLevelThree,
} from 'src/actions/masterDataActions';

// component
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import SimpleModal from 'src/components/modal/simpleModal';
import PageContainer from 'src/components/container/PageContainer';
import CategoryTable from 'src/components/table/categoryTable';
import EditMasterFormBasel from 'src/components/forms/edit-master-form-basel';
import CreateMasterFormBasel from 'src/components/forms/create-master-form-basel';

const LevelThree = (props) => {
  const {
    masterData,
    getLevelTwo,
    getLevelThree,
    updateLevelThree,
    createLevelThree,
    deleteLevelThree,
  } = props;
  const [keyword, setKeyword] = useState('');
  const [rowPerPage, setRowPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteMOdalOpen] = useState(false);
  const [selectedCase, setSelecetedCase] = useState({
    id: 0,
    nama: '',
    isEnable: true,
  });

  const header = ['No', 'Aktivitas', 'Sub Kategori', 'Kategori', 'Aksi'];

  const BCrumb = [
    {
      title: 'Seluruh opsi pilihan akan tertera di halaman ini berserta keterangannya',
    },
  ];

  useEffect(() => {
    (async () => {
      await getLevelTwo();
      await getLevelThree({ perPage: rowPerPage, page: currentPage }, keyword);
    })();
  }, [getLevelThree, rowPerPage, currentPage, keyword]);

  // Create Controller
  const onCreateHandler = () => {
    setCreateModalOpen(true);
  };
  const onCreateSave = async (data) => {
    const dataToSend = { name: data.name, parentId: data.idLevelTwo };
    await createLevelThree(dataToSend);
    setCreateModalOpen(false);
  };

  // Update Controller
  const onEditHandler = (item) => {
    setSelecetedCase(item);
    setEditModalOpen(true);
  };
  const onEditSave = async (data) => {
    const dataToSend = {
      id: selectedCase.id,
      name: data.name,
      parentId: data.idLevelTwo,
      isEnable: data.isEnable,
    };
    await updateLevelThree(dataToSend);
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
    await deleteLevelThree(dataToSend);
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
    <PageContainer title="Aktivitas" description="level 3 Case Category Page">
      {process.env.HEADER_SHOW ? <Breadcrumb title="Aktivitas" items={BCrumb} /> : null}

      <CategoryTable
        title="Aktivitas"
        master={masterData?.caseCategory?.levelThree}
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

      <SimpleModal title="Tambah Basel 2" isOpen={createModalOpen} onCloseHandler={onCloseHandler}>
        <CreateMasterFormBasel
          levelThree
          options={masterData?.caseCategory?.levelTwo}
          masterTitle="aktivitas"
          onSaveHandler={onCreateSave}
          onCloseHandler={onCloseHandler}
        />
      </SimpleModal>

      <SimpleModal
        title="Ubah Kategori Kejadian"
        isOpen={editModalOpen}
        onCloseHandler={onCloseHandler}
      >
        <EditMasterFormBasel
          levelThree
          options={masterData?.caseCategory?.levelTwo}
          masterTitle="aktivitas"
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
    getLevelTwo: () => dispatch(getLevelTwo({ perPage: 10, page: 0 }, '')),
    getLevelThree: (pagination, keyword) => dispatch(getLevelThree(pagination, keyword)),
    updateLevelThree: (payload) => dispatch(updateLevelThree(payload)),
    deleteLevelThree: (payload) => dispatch(deleteLevelThree(payload)),
    createLevelThree: (payload) => dispatch(createLevelThree(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelThree);
