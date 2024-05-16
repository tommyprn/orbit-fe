import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from '@mui/material';
import {
  getCaseCause,
  updateCaseCause,
  deleteCaseCause,
  createCaseCause,
} from 'src/actions/masterDataActions';

// component
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import SimpleModal from 'src/components/modal/simpleModal';
import PageContainer from 'src/components/container/PageContainer';
import CaseMasterTable from 'src/components/table/CaseMasterTable';
import EditMasterFormName from 'src/components/forms/edit-master-form-name';
import CreateMasterFormName from 'src/components/forms/create-master-form-name';

const CaseCause = (props) => {
  const { getCaseCause, createCaseCause, updateCaseCause, deleteCaseCause, masterData } = props;
  const [keyword, setKeyword] = useState('');
  const [rowPerPage, setRowPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteMOdalOpen] = useState(false);
  const [selectedCase, setSelecetedCase] = useState({
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
      await getCaseCause({ perPage: rowPerPage, page: currentPage }, keyword);
    })();
  }, [getCaseCause, rowPerPage, currentPage, keyword]);

  // Create Controller
  const onCreateHandler = () => {
    setCreateModalOpen(true);
  };
  const onCreateSave = async (data) => {
    const dataToSend = { name: data.name };
    await createCaseCause(dataToSend);

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
    await updateCaseCause(dataToSend);

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
    await deleteCaseCause(dataToSend);
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
    <PageContainer title="Penyebab Kejadian" description="Case name page">
      {process.env.HEADER_SHOW ? <Breadcrumb title="Penyebab Kejadian" items={BCrumb} /> : null}

      <CaseMasterTable
        title="Data Master Penyebab Kejadian"
        master={masterData?.caseCause}
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
        title="Tambah Penyebab Kejadian"
        isOpen={createModalOpen}
        onCloseHandler={onCloseHandler}
      >
        <CreateMasterFormName
          masterTitle="penyebab kejadian"
          onSaveHandler={onCreateSave}
          onCloseHandler={onCloseHandler}
        />
      </SimpleModal>

      <SimpleModal
        title="Ubah Penyebab Kejadian"
        isOpen={editModalOpen}
        onCloseHandler={onCloseHandler}
      >
        <EditMasterFormName
          masterTitle="penyebab kejadian"
          selected={selectedCase}
          onSaveHandler={onEditSave}
          onCloseHandler={onCloseHandler}
        />
      </SimpleModal>

      <SimpleModal
        title="Hapus Penyebab Kejadian"
        isOpen={deleteModalOpen}
        onSaveHandler={onConfirmDelete}
        onCloseHandler={onCloseHandler}
      >
        <Typography>Apakah kamu yakin mau menghapus penyebab kejadian ini?</Typography>
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
    getCaseCause: (pagination, keyword) => dispatch(getCaseCause(pagination, keyword)),
    updateCaseCause: (payload) => dispatch(updateCaseCause(payload)),
    deleteCaseCause: (payload) => dispatch(deleteCaseCause(payload)),
    createCaseCause: (payload) => dispatch(createCaseCause(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CaseCause);
