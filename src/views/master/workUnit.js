import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from '@mui/material';
import {
  getWorkUnit,
  updateWorkUnit,
  deleteWorkUnit,
  createWorkUnit,
} from 'src/actions/masterDataActions';

// component
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import SimpleModal from 'src/components/modal/simpleModal';
import PageContainer from 'src/components/container/PageContainer';
import EditMasterForm from 'src/components/forms/edit-master-form';
import CaseMasterTable from 'src/components/table/CaseMasterTable';
import CreateMasterForm from 'src/components/forms/create-master-form';

const WorkUnit = (props) => {
  const { masterData, getWorkUnit, createWorkUnit, updateWorkUnit, deleteWorkUnit } = props;
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

  const header = ['No', 'Kode Unit Kerja', 'Nama Unit Kerja', 'Aksi'];

  const BCrumb = [
    {
      title: 'Seluruh opsi pilihan akan tertera di halaman ini berserta keterangannya',
    },
  ];

  useEffect(() => {
    (async () => {
      await getWorkUnit({ perPage: rowPerPage, page: currentPage }, keyword);
    })();
  }, [getWorkUnit, rowPerPage, currentPage, keyword]);

  // Create Controller
  const onCreateHandler = () => {
    setCreateModalOpen(true);
  };
  const onCreateSave = async (data) => {
    const dataToSend = { name: data.name, code: data.code };
    await createWorkUnit(dataToSend);
    setCreateModalOpen(false);
  };

  // Update Controller
  const onEditHandler = (item) => {
    setSelecetedCase({
      id: item.idUnitKerja,
      code: item.kodeUnitKerja,
      name: item.namaUnitKerja,
      isEnable: item.isEnable,
    });
    setEditModalOpen(true);
  };
  const onEditSave = async (data) => {
    const dataToSend = {
      id: selectedCase.id,
      name: data.name,
      code: data.code,
      isEnable: data.isEnable,
    };

    await updateWorkUnit(dataToSend);
    setEditModalOpen(false);
  };

  // Delete Controller
  const onDeleteHandler = (item) => {
    setSelecetedCase({
      id: item.idUnitKerja,
      code: item.kodeUnitKerja,
      name: item.namaUnitKerja,
    });
    setDeleteMOdalOpen(true);
  };
  const onConfirmDelete = async () => {
    const dataToSend = selectedCase.id;
    await deleteWorkUnit(dataToSend);
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
    <PageContainer title="Unit Kerja/ Business Lines" description="Business Lines Page">
      {process.env.HEADER_SHOW ? (
        <Breadcrumb title="Unit Kerja/ Business Lines" items={BCrumb} />
      ) : null}

      <CaseMasterTable
        title={'Data Master Unit Kerja/ Business Lines'}
        master={masterData?.workUnit}
        header={header}
        onSearch={onSearch}
        onDelete={onDeleteHandler}
        onUpdate={onEditHandler}
        onPageChange={(perPage, page) => {
          setRowPerPage(perPage);
          setCurrentPage(page);
        }}
        onOpenHandler={onCreateHandler}
      />

      <SimpleModal
        title={'Tambah Unit Kerja'}
        isOpen={createModalOpen}
        onCloseHandler={onCloseHandler}
      >
        <CreateMasterForm
          workUnit
          masterTitle="unit kerja"
          onSaveHandler={onCreateSave}
          onCloseHandler={onCloseHandler}
        />
      </SimpleModal>

      <SimpleModal title={'Ubah Unit Kerja'} isOpen={editModalOpen} onCloseHandler={onCloseHandler}>
        <EditMasterForm
          workUnit
          masterTitle="unit kerja"
          selected={selectedCase}
          onSaveHandler={onEditSave}
          onCloseHandler={onCloseHandler}
        />
      </SimpleModal>

      <SimpleModal
        title={'Hapus Unit Kerja'}
        isOpen={deleteModalOpen}
        onSaveHandler={onConfirmDelete}
        onCloseHandler={onCloseHandler}
      >
        <Typography>Apakah kamu yakin mau menghapus unit kerja ini?</Typography>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '16px' }}
        >
          <Button variant="contained" color="error" onClick={onCloseHandler}>
            Batal
          </Button>
          <Button variant="contained" onClick={onConfirmDelete}>
            Lanjutkan
          </Button>
        </div>{' '}
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
    getWorkUnit: (pagination, keyword) => dispatch(getWorkUnit(pagination, keyword)),
    updateWorkUnit: (payload) => dispatch(updateWorkUnit(payload)),
    deleteWorkUnit: (payload) => dispatch(deleteWorkUnit(payload)),
    createWorkUnit: (payload) => dispatch(createWorkUnit(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkUnit);
