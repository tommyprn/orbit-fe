import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from '@mui/material';
import {
  getLevelOne,
  getLevelTwo,
  updateLevelTwo,
  deleteLevelTwo,
  createLevelTwo,
} from 'src/actions/masterDataActions';

// component
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import SimpleModal from 'src/components/modal/simpleModal';
import PageContainer from 'src/components/container/PageContainer';
import CategoryTable from 'src/components/table/categoryTable';
import EditMasterFormBasel from 'src/components/forms/edit-master-form-basel';
import CreateMasterFormBasel from 'src/components/forms/create-master-form-basel';

const LevelTwo = (props) => {
  const { masterData, getLevelOne, getLevelTwo, updateLevelTwo, createLevelTwo, deleteLevelTwo } =
    props;
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
    kategoriKejadian: {
      id: 0,
      nama: '',
    },
  });

  const header = ['No', 'Sub Kategori', 'Kategori', '', 'Aksi'];

  const BCrumb = [
    {
      title: 'Seluruh opsi pilihan akan tertera di halaman ini berserta keterangannya',
    },
  ];

  useEffect(() => {
    (async () => {
      await getLevelOne();
      await getLevelTwo({ perPage: rowPerPage, page: currentPage }, keyword);
    })();
  }, [getLevelTwo, rowPerPage, currentPage, keyword]);

  // Create Controller
  const onCreateHandler = () => {
    setCreateModalOpen(true);
  };
  const onCreateSave = async (data) => {
    const dataToSend = { name: data.name, parentId: data.idLevelOne };
    await createLevelTwo(dataToSend);
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
      parentId: data.idLevelOne,
      isEnable: data.isEnable,
    };
    await updateLevelTwo(dataToSend);
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
    await deleteLevelTwo(dataToSend);
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
    <PageContainer title="Sub Kategori Kejadian" description="Level 2 Case Category Page">
      {process.env.HEADER_SHOW ? <Breadcrumb title="Sub Kategori Kejadian" items={BCrumb} /> : null}

      <CategoryTable
        title="Sub Kategori"
        master={masterData?.caseCategory?.levelTwo}
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
        title="Tambah Sub Kategori Kejadian"
        isOpen={createModalOpen}
        onCloseHandler={onCloseHandler}
      >
        <CreateMasterFormBasel
          options={masterData?.caseCategory?.levelOne}
          masterTitle="sub kategori"
          onSaveHandler={(data) => onCreateSave(data)}
          onCloseHandler={onCloseHandler}
        />
      </SimpleModal>

      <SimpleModal
        title="Ubah Kategori Kejadian"
        isOpen={editModalOpen}
        onCloseHandler={onCloseHandler}
      >
        <EditMasterFormBasel
          options={masterData?.caseCategory?.levelOne}
          masterTitle="sub kategori"
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
    getLevelOne: () => dispatch(getLevelOne({ perPage: 10, page: 0 }, '')),
    getLevelTwo: (pagination, keyword) => dispatch(getLevelTwo(pagination, keyword)),
    updateLevelTwo: (payload) => dispatch(updateLevelTwo(payload)),
    deleteLevelTwo: (payload) => dispatch(deleteLevelTwo(payload)),
    createLevelTwo: (payload) => dispatch(createLevelTwo(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelTwo);
