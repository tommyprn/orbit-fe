import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { getBranch, updateBranch, deleteBranch, createBranch } from 'src/actions/masterDataActions';

// component
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import SimpleModal from 'src/components/modal/simpleModal';
import PageContainer from 'src/components/container/PageContainer';
import WorkUnitTable from 'src/components/table/workUnitTable';
import EditMasterForm from 'src/components/forms/edit-master-form';
import CreateMasterForm from 'src/components/forms/create-master-form';

const Branch = (props) => {
  const { masterData, getBranch, updateBranch, deleteBranch, createBranch } = props;
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

  const header = ['No', 'Kode cabang', 'Nama cabang', 'PIC', 'Approver', 'Upper Level', 'Aksi'];

  const BCrumb = [
    {
      title: 'Seluruh opsi pilihan akan tertera di halaman ini berserta keterangannya',
    },
  ];

  useEffect(() => {
    (async () => {
      await getBranch({ perPage: rowPerPage, page: currentPage }, keyword);
    })();
  }, [rowPerPage, currentPage, keyword]);

  // Create Controller
  const onCreateHandler = () => {
    setCreateModalOpen(true);
  };
  const onCreateSave = async (data) => {
    await createBranch(data);
    setCreateModalOpen(false);
  };

  // Update Controller
  const onEditHandler = (item) => {
    setSelecetedUnit({
      id: item.id,
      pic: item.namaPic,
      code: item.kodeCabang,
      name: item.namaCabang,
      email: item.emailPic,
      parent: item.indukCabang,
      isEnable: item.isEnable,
      approver: item.namaApproverCabang,
      emailApprover: item.emailApproverCabang,
      emailUpperLevel: item.emailUpperCabang,
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
      parent: data.parent,
      isEnable: data.isEnable,
      approver: data.approver,
      emailApprover: data.emailApprover,
      emailUpperLevel: data.emailUpperLevel,
    };
    await updateBranch(dataToSend);
    setEditModalOpen(false);
  };

  // Delete Controller
  const onDeleteHandler = (item) => {
    setSelecetedUnit({
      id: item.id,
    });
    setDeleteMOdalOpen(true);
  };
  const onConfirmDelete = async () => {
    const dataToSend = selectedUnit.id;
    await deleteBranch(dataToSend);
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
    <PageContainer title="Cabang/ Business Lines" description="Branches Page">
      {process.env.HEADER_SHOW ? (
        <Breadcrumb title="Cabang/ Business Lines" items={BCrumb} />
      ) : null}

      <WorkUnitTable
        title="Data Master Cabang/ Business Lines"
        master={masterData?.branch}
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

      <SimpleModal title="Tambah Cabang" isOpen={createModalOpen} onCloseHandler={onCloseHandler}>
        <CreateMasterForm
          workUnit="branch"
          masterTitle="Cabang"
          onSaveHandler={onCreateSave}
          onCloseHandler={onCloseHandler}
        />
      </SimpleModal>

      <SimpleModal title="Ubah Cabang" isOpen={editModalOpen} onCloseHandler={onCloseHandler}>
        <EditMasterForm
          workUnit="branch"
          masterTitle="Cabang"
          selected={selectedUnit}
          onSaveHandler={onEditSave}
          onCloseHandler={onCloseHandler}
        />
      </SimpleModal>

      <SimpleModal
        title="Hapus Cabang"
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
    getBranch: (pagination, keyword) => dispatch(getBranch(pagination, keyword)),
    updateBranch: (payload) => dispatch(updateBranch(payload)),
    deleteBranch: (payload) => dispatch(deleteBranch(payload)),
    createBranch: (payload) => dispatch(createBranch(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Branch);
