import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { getAllDatabaseReport, getAllActionPlanReport } from 'src/actions/reportActions';

// component
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import DetailedReportTable from 'src/components/table/detailed-report-table';
import ActionPlanReportTable from 'src/components/table/action-plan-report-table';

import './report.css';

const DatabaseReport = (props) => {
  const { report, getAllDatabaseReport, getAllActionPlanReport } = props;

  const [endDate, setEndDate] = useState(dayjs());
  const [startDate, setStartDate] = useState(dayjs().subtract(5, 'day'));

  useEffect(() => {
    (async () => {
      await getAllDatabaseReport(
        dayjs(startDate).format('DD-MM-YYYY'),
        dayjs(endDate).format('DD-MM-YYYY'),
      );
      await getAllActionPlanReport(
        dayjs(startDate).format('DD-MM-YYYY'),
        dayjs(endDate).format('DD-MM-YYYY'),
      );
    })();
  }, [endDate, startDate]);

  const generateGeneralData = (data) => {
    return data.map((item) => {
      return {
        'Bulan Input LED': item.createdDate,
        Tahun: dayjs(item.createdDate, 'DD-MM-YYYY').get('year'),
        'Divisi/ Cabang':
          item?.unitKerja?.namaUnitKerja === 'CABANG'
            ? item.cabang?.namaCabang
            : item?.unitKerja?.namaUnitKerja,
        'No LED': item.idLaporan,
        'Status Kejadian': item.statusKejadian.nama,
        'Tanggal Kejadian': item.tanggalKejadian,
        'Tanggal Teridentifikasi': item.tanggalIdentifikasi,
        'Tanggal Lapor': item.tanggalLapor,
        'Penyebab Kejadian': item.penyebabKejadian?.nama,
        'Kategori Kejadian (level 1)': item.aktivitas?.subKategori?.kategoriKejadian.nama,
        'Kategori Kejadian (level 2)': item.aktivitas?.subKategori?.nama,
        'Kategori Kejadian (level 3)': item.aktivitas?.nama,
        'Highlight Kronologis': item.kronologiSingkat,
        Kronologis: item?.kronologi,
        'Rencana Tindakan': item?.tindakLanjut,
        'Potensi Kerugian (Rp)': item?.potensiKerugian,
        'Recovery (Rp)': item?.nominalRecovery,
        'Gross Loss (Rp)': item?.nominalRealisasiKerugian,
        'Net Loss (Rp)': item?.nominalRealisasiKerugian - item?.nominalRecovery,
        'Status LED': item.statusLaporan.nama,
        'Target Date': item.actionPlan[item.actionPlan?.length - 1].targetPenyelesaian,
        'Sumber Recovery': item?.sumberRecovery,
        'Status Otorisasi':
          item.statusKejadian.nama !== 'Recorded' ? 'Telah Disetujui' : 'Belum Disetujui',
        Catatan: item.catatan,
        'Nama PIC/ Email':
          item.unitKerja?.namaUnitKerja === 'CABANG'
            ? item.cabang.emailPic
            : item.unitKerja?.emailPic,
        'Tindak Lanjut': item.actionPlan[item.actionPlan?.length - 1].actionPlan,
        'Status Akhir':
          item.statusLaporan.nama === 'Void' || item.statusLaporan.nama === 'Closed'
            ? item.statusLaporan.nama
            : null,
      };
    });
  };

  const generateActionData = (data) => {
    return data.map((item) => {
      return {
        'Nomor Laporan': item.laporanLed?.idLaporan,
        'Action Plan': item?.actionPlan,
        Divisi:
          item?.unitKerjaEntity?.namaUnitKerja !== 'CABANG'
            ? item?.unitKerjaEntity?.namaUnitKerja
            : item?.cabangEntity?.namaCabang,
        PIC: item?.penanggungJawab,
        'Email PIC': item?.email,
        'Target Penyelesaian': item?.targetPenyelesaian,
      };
    });
  };

  const dataToExcel = [
    { sheetName: 'LED', data: generateGeneralData(report.database.general) },
    { sheetName: 'Action Plan', data: generateActionData(report.database.actionPlan) },
  ];

  return (
    <PageContainer title="Database Report" description="Database Report Page">
      <DashboardCard>
        <div>
          <DetailedReportTable
            data={report.database?.general}
            title="Database LED"
            endDate={endDate}
            startDate={startDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
          />

          <ActionPlanReportTable data={report.database?.actionPlan} />
        </div>
      </DashboardCard>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    report: state.report,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDatabaseReport: (start, end) => dispatch(getAllDatabaseReport(start, end)),
    getAllActionPlanReport: (start, end) => dispatch(getAllActionPlanReport(start, end)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseReport);
