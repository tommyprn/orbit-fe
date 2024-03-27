import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from '@mui/material';
import {
  getCaseStatus,
  updateCaseStatus,
  deleteCaseStatus,
  createCaseStatus,
} from 'src/actions/masterDataActions';

// component
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import SimpleModal from 'src/components/modal/simpleModal';
import PageContainer from 'src/components/container/PageContainer';
import EditMasterForm from 'src/components/forms/edit-master-form';
import CaseMasterTable from 'src/components/table/CaseMasterTable';
import CreateMasterForm from 'src/components/forms/create-master-form';

const CaseStatus = (props) => {
  const { masterData, getCaseStatus, createCaseStatus, deleteCaseStatus, updateCaseStatus } = props;
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
    description: '',
  });

  const header = ['No', 'Status', 'Deskripsi', 'Aksi'];

  const BCrumb = [
    {
      title: 'Seluruh opsi pilihan akan tertera di halaman ini berserta keterangannya',
    },
  ];

  useEffect(() => {
    (async () => {
      await getCaseStatus({ perPage: rowPerPage, page: currentPage }, keyword);
    })();
  }, [getCaseStatus, rowPerPage, currentPage, keyword]);

  // Create Controller
  const onCreateHandler = () => {
    setCreateModalOpen(true);
  };
  const onCreateSave = async (data) => {
    const dataToSend = {
      name: data.name,
      description: data.description,
    };
    await createCaseStatus(dataToSend);
    setCreateModalOpen(false);
  };

  // Update Controller
  const onEditHandler = (item) => {
    setSelecetedCase({
      id: item.id,
      name: item.nama,
      isEnable: item.isEnable,
      description: item.deskripsi,
    });
    setEditModalOpen(true);
  };
  const onEditSave = async (data) => {
    const dataToSend = {
      id: selectedCase.id,
      name: data.name,
      isEnable: data.isEnable,
      description: data.description,
    };
    await updateCaseStatus(dataToSend);
    setEditModalOpen(false);
  };

  // Delete Controller
  const onDeleteHandler = (item) => {
    setSelecetedCase({
      id: item.id,
      name: item.nama,
      description: item.deskripsi,
    });
    setDeleteMOdalOpen(true);
  };
  const onConfirmDelete = async () => {
    const dataToSend = selectedCase.id;
    await deleteCaseStatus(dataToSend);
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
    <PageContainer title="Status Kejadian" description="Case Cause Page">
      {process.env.HEADER_SHOW ? <Breadcrumb title="Status Kejadian" items={BCrumb} /> : null}

      <CaseMasterTable
        title="Data Master Status Kejadian"
        master={masterData?.caseStatus}
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
        title="Tambah Status Kejadian"
        isOpen={createModalOpen}
        onCloseHandler={onCloseHandler}
      >
        <CreateMasterForm
          masterTitle="status kejadian"
          onSaveHandler={onCreateSave}
          onCloseHandler={onCloseHandler}
        />
      </SimpleModal>

      <SimpleModal
        title="Ubah Status Kejadian"
        isOpen={editModalOpen}
        onCloseHandler={onCloseHandler}
      >
        <EditMasterForm
          masterTitle="status kejadian"
          selected={selectedCase}
          onSaveHandler={onEditSave}
          onCloseHandler={onCloseHandler}
        />
      </SimpleModal>

      <SimpleModal
        title="Hapus Status Kejadian"
        isOpen={deleteModalOpen}
        onSaveHandler={onConfirmDelete}
        onCloseHandler={onCloseHandler}
      >
        <Typography>Apakah kamu yakin mau menghapus status kejadian ini?</Typography>
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
    getCaseStatus: (pagination, keyword) => dispatch(getCaseStatus(pagination, keyword)),
    updateCaseStatus: (payload) => dispatch(updateCaseStatus(payload)),
    deleteCaseStatus: (payload) => dispatch(deleteCaseStatus(payload)),
    createCaseStatus: (payload) => dispatch(createCaseStatus(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CaseStatus);
