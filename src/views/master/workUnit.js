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
import WorkUnitTable from 'src/components/table/workUnitTable';
import EditMasterForm from 'src/components/forms/edit-master-form';
import CreateMasterForm from 'src/components/forms/create-master-form';

const WorkUnit = (props) => {
  const { masterData, getWorkUnit, createWorkUnit, updateWorkUnit, deleteWorkUnit } = props;
  const [keyword, setKeyword] = useState('');
  const [rowPerPage, setRowPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteMOdalOpen] = useState(false);
  const [selectedUnit, setSelecetedUnit] = useState({
    id: 0,
    pic: '',
    code: '',
    name: '',
    email: '',
    isEnable: true,
  });

  const header = [
    'No',
    'Kode Unit Kerja',
    'Nama Unit Kerja',
    'PIC',
    'Approver',
    'Upper Level',
    'Aksi',
  ];

  const BCrumb = [
    {
      title: 'Seluruh opsi pilihan akan tertera di halaman ini berserta keterangannya',
    },
  ];

  useEffect(() => {
    (async () => {
      await getWorkUnit({ perPage: rowPerPage, page: currentPage }, keyword);
    })();
  }, [rowPerPage, currentPage, keyword]);

  // Create Controller
  const onCreateHandler = () => {
    setCreateModalOpen(true);
  };
  const onCreateSave = async (data) => {
    await createWorkUnit(data);
    setCreateModalOpen(false);
  };

  // Update Controller
  const onEditHandler = (item) => {
    setSelecetedUnit({
      id: item.idUnitKerja,
      pic: item.namaPic,
      code: item.kodeUnitKerja,
      name: item.namaUnitKerja,
      email: item.emailPic,
      isEnable: item.isEnable,
      approver: item.namaApproverUnit,
      emailApprover: item.emailApproverUnit,
      emailUpperLevel: item.emailUpperUnit,
    });
    setEditModalOpen(true);
  };
  const onEditSave = async (data) => {
    const dataToSend = {
      id: selectedUnit.id,
      pic: data.pic,
      name: data.name,
      code: data.code,
      email: data.email,
      isEnable: data.isEnable,
      approver: data.approver,
      emailApprover: data.emailApprover,
      emailUpperLevel: data.emailUpperLevel,
    };

    await updateWorkUnit(dataToSend);
    setEditModalOpen(false);
  };

  // Delete Controller
  const onDeleteHandler = (item) => {
    setSelecetedUnit({
      id: item.idUnitKerja,
    });
    setDeleteMOdalOpen(true);
  };
  const onConfirmDelete = async () => {
    const dataToSend = selectedUnit.id;
    await deleteWorkUnit(dataToSend);
    setDeleteMOdalOpen(false);
  };
  const onCloseHandler = () => {
    setSelecetedUnit({});
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

      <WorkUnitTable
        title="Data Master Unit Kerja/ Business Lines"
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
        title="Tambah Unit Kerja"
        isOpen={createModalOpen}
        onCloseHandler={onCloseHandler}
      >
        <CreateMasterForm
          workUnit="unit"
          masterTitle="unit kerja"
          onSaveHandler={onCreateSave}
          onCloseHandler={onCloseHandler}
        />
      </SimpleModal>

      <SimpleModal title="Ubah Unit Kerja" isOpen={editModalOpen} onCloseHandler={onCloseHandler}>
        <EditMasterForm
          workUnit="unit"
          masterTitle="unit kerja"
          selected={selectedUnit}
          onSaveHandler={onEditSave}
          onCloseHandler={onCloseHandler}
        />
      </SimpleModal>

      <SimpleModal
        title="Hapus Unit Kerja"
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
    getWorkUnit: (pagination, keyword) => dispatch(getWorkUnit(pagination, keyword)),
    updateWorkUnit: (payload) => dispatch(updateWorkUnit(payload)),
    deleteWorkUnit: (payload) => dispatch(deleteWorkUnit(payload)),
    createWorkUnit: (payload) => dispatch(createWorkUnit(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkUnit);
