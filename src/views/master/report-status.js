import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from '@mui/material';
import {
  getReportStatus,
  updateReportStatus,
  deleteReportStatus,
  createReportStatus,
} from 'src/actions/masterDataActions';

// component
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import SimpleModal from 'src/components/modal/simpleModal';
import PageContainer from 'src/components/container/PageContainer';
import EditMasterForm from 'src/components/forms/edit-master-form';
import CaseMasterTable from 'src/components/table/CaseMasterTable';
import CreateMasterForm from 'src/components/forms/create-master-form';

const ReportStatus = (props) => {
  const {
    masterData,
    getReportStatus,
    updateReportStatus,
    createReportStatus,
    deleteReportStatus,
  } = props;
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
      await getReportStatus({ perPage: rowPerPage, page: currentPage }, keyword);
    })();
  }, [getReportStatus, rowPerPage, currentPage, keyword]);

  // Create Controller
  const onCreateHandler = () => {
    setCreateModalOpen(true);
  };
  const onCreateSave = async (data) => {
    const dataToSend = { name: data.name, description: data.description };
    await createReportStatus(dataToSend);
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
    await updateReportStatus(dataToSend);
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
    await deleteReportStatus(dataToSend);
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
    <PageContainer title="Status Laporan" description="Report Status Page">
      {process.env.HEADER_SHOW ? <Breadcrumb title="Status Laporan" items={BCrumb} /> : null}

      <CaseMasterTable
        title="Data Master Status Laporan"
        master={masterData?.reportStatus}
        header={header}
        onSearch={onSearch}
        onUpdate={onEditHandler}
        disabled={true}
        onDelete={onDeleteHandler}
        onPageChange={(perPage, page) => {
          setRowPerPage(perPage);
          setCurrentPage(page);
        }}
        onOpenHandler={onCreateHandler}
      />

      <SimpleModal
        title="Tambah Status Laporan"
        isOpen={createModalOpen}
        onCloseHandler={onCloseHandler}
      >
        <CreateMasterForm
          masterTitle="laporan kejadian"
          onSaveHandler={onCreateSave}
          onCloseHandler={onCloseHandler}
        />
      </SimpleModal>

      <SimpleModal
        title="Ubah Status Laporan"
        isOpen={editModalOpen}
        onCloseHandler={onCloseHandler}
      >
        <EditMasterForm
          masterTitle="laporan kejadian"
          selected={selectedCase}
          onSaveHandler={onEditSave}
          onCloseHandler={onCloseHandler}
        />
      </SimpleModal>

      <SimpleModal
        title="Hapus Status Laporan"
        isOpen={deleteModalOpen}
        onSaveHandler={onConfirmDelete}
        onCloseHandler={onCloseHandler}
      >
        <Typography>Apakah kamu yakin mau menghapus status laporan ini?</Typography>
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
    getReportStatus: (pagination, keyword) => dispatch(getReportStatus(pagination, keyword)),
    updateReportStatus: (payload) => dispatch(updateReportStatus(payload)),
    deleteReportStatus: (payload) => dispatch(deleteReportStatus(payload)),
    createReportStatus: (payload) => dispatch(createReportStatus(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportStatus);
