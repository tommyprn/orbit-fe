import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from '@mui/material';
import {
  getCostCentre,
  updateCostCentre,
  deleteCostCentre,
  createCostCentre,
} from 'src/actions/masterDataActions';

// component
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import SimpleModal from 'src/components/modal/simpleModal';
import PageContainer from 'src/components/container/PageContainer';
import EditMasterForm from 'src/components/forms/edit-master-form';
import CaseMasterTable from 'src/components/table/CaseMasterTable';
import CreateMasterForm from 'src/components/forms/create-master-form';

const CostCentre = (props) => {
  const { masterData, getCostCentre, createCostCentre, updateCostCentre, deleteCostCentre } = props;
  const [keyword, setKeyword] = useState('');
  const [rowPerPage, setRowPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteMOdalOpen] = useState(false);
  const [selectedCase, setSelecetedCase] = useState({
    id: 0,
    code: '',
    name: '',
    isEnable: true,
  });

  const header = ['No', 'Kode SSL', 'Deskripsi', 'Aksi'];

  const BCrumb = [
    {
      title: 'Seluruh opsi pilihan akan tertera di halaman ini berserta keterangannya',
    },
  ];

  useEffect(() => {
    (async () => {
      await getCostCentre({ perPage: rowPerPage, page: currentPage }, keyword);
    })();
  }, [getCostCentre, rowPerPage, currentPage, keyword]);

  // Create Controller
  const onCreateHandler = () => {
    setCreateModalOpen(true);
  };
  const onCreateSave = async (data) => {
    const dataToSend = { code: data.code, name: data.name };
    await createCostCentre(dataToSend);
    setCreateModalOpen(false);
  };

  // Update Controller
  const onEditHandler = (item) => {
    setSelecetedCase({
      id: item.id,
      code: item.kode,
      name: item.nama,
      isEnable: item.isEnable,
    });
    setEditModalOpen(true);
  };
  const onEditSave = async (data) => {
    const dataToSend = {
      id: selectedCase.id,
      code: data.code,
      name: data.name,
      isEnable: data.isEnable,
    };
    await updateCostCentre(dataToSend);
    setEditModalOpen(false);
  };

  // Delete Controller
  const onDeleteHandler = (item) => {
    setSelecetedCase({
      id: item.id,
      code: item.kode,
      name: item.nama,
    });
    setDeleteMOdalOpen(true);
  };
  const onConfirmDelete = async () => {
    const dataToSend = selectedCase.id;
    await deleteCostCentre(dataToSend);
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
    <PageContainer title="Kode SSL" description="SSL Code page">
      {process.env.HEADER_SHOW ? <Breadcrumb title="Kode SSL" items={BCrumb} /> : null}

      <CaseMasterTable
        ssl={true}
        title="Data Master Kode SSL"
        header={header}
        master={masterData?.costCentre}
        onSearch={onSearch}
        onDelete={onDeleteHandler}
        onUpdate={onEditHandler}
        onPageChange={(perPage, page) => {
          setRowPerPage(perPage);
          setCurrentPage(page);
        }}
        onOpenHandler={onCreateHandler}
      />

      <SimpleModal title="Tambah Kode SSL" isOpen={createModalOpen} onCloseHandler={onCloseHandler}>
        <CreateMasterForm
          ssl={true}
          masterTitle="kode SSL"
          onSaveHandler={onCreateSave}
          onCloseHandler={onCloseHandler}
        />
      </SimpleModal>

      <SimpleModal title="Ubah Kode SSL" isOpen={editModalOpen} onCloseHandler={onCloseHandler}>
        <EditMasterForm
          ssl={true}
          masterTitle="kode SSL"
          selected={selectedCase}
          onSaveHandler={onEditSave}
          onCloseHandler={onCloseHandler}
        />
      </SimpleModal>

      <SimpleModal
        title="Hapus Kode SSL"
        isOpen={deleteModalOpen}
        onSaveHandler={onConfirmDelete}
        onCloseHandler={onCloseHandler}
      >
        <Typography>Apakah kamu yakin mau menghapus kode SSL ini?</Typography>
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
    getCostCentre: (pagination, keyword) => dispatch(getCostCentre(pagination, keyword)),
    updateCostCentre: (payload) => dispatch(updateCostCentre(payload)),
    deleteCostCentre: (payload) => dispatch(deleteCostCentre(payload)),
    createCostCentre: (payload) => dispatch(createCostCentre(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CostCentre);
