import React from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import { Card, Chip, Button, Divider, Typography } from '@mui/material';
import { IconPencilMinus, IconBan } from '@tabler/icons';

import './reportCard.css';

const ReportCard = ({ LED, list }) => {
  const navigate = useNavigate();

  const onEdit = (id) => {
    navigate(`/LED/editReport/${id}`);
  };

  const onDetail = (id) => {
    navigate(`/LED/detailReport/${id}`);
  };

  return (
    <Card variant="outlined">
      <div className="content-wrapper">
        <div className="report-card-header">
          <Typography variant="h5">IN: {LED?.id}</Typography>
          <Chip
            label={LED?.statusLaporan.nama}
            color={LED?.statusLaporan?.id === 2 ? 'success' : 'primary'}
            disabled={LED?.statusLaporan?.id === 3}
            variant={LED?.statusLaporan?.id === 3 ? 'contained' : 'outlined'}
          />
        </div>
        <Divider />

        <Typography variant="h2">{LED?.statusKejadian.nama}</Typography>

        <Typography
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '4',
            WebkitBoxOrient: 'vertical',
            fontSize: '14px',
          }}
          color="gray"
          // nowrap
        >
          {LED?.kronologi}
        </Typography>

        <Divider />

        <div className="report-card-footer">
          <div className="section-wrapper">
            <Typography>
              <span style={{ fontWeight: 'bold' }}> tgl lapor:</span>{' '}
              {dayjs(LED?.tanggalLapor, 'DD-MM-YYYY').format('DD-MMM-YY')}
            </Typography>

            <Typography>
              <span style={{ fontWeight: 'bold' }}>tgl kejadian:</span>{' '}
              {dayjs(LED?.tanggalKejadian, 'DD-MM-YYYY').format('DD-MMM-YY')}
            </Typography>

            <Typography>
              <span style={{ fontWeight: 'bold' }}>tgl identifikasi:</span>
              {dayjs(LED?.tanggalIdentifikasi, 'DD-MM-YYYY').format('DD-MMM-YY')}
            </Typography>
          </div>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ marginRight: '16px', marginLeft: '16px' }}
          />

          <div className="section-wrapper">
            <Typography>
              <span style={{ fontWeight: 'bold' }}>Kategori:</span>{' '}
              {LED?.aktivitas?.subKategori?.kategoriKejadian?.nama}
            </Typography>

            <Typography>
              <span style={{ fontWeight: 'bold' }}>Sub Kategori:</span>{' '}
              {LED?.aktivitas?.subKategori?.nama}
            </Typography>

            <Typography>
              <span style={{ fontWeight: 'bold' }}>Aktivitas:</span> {LED?.aktivitas?.nama}
            </Typography>
          </div>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ marginRight: '16px', marginLeft: '16px' }}
          />

          <div className="section-wrapper">
            <Typography>
              <span style={{ fontWeight: 'bold' }}>Kode Cost Centre:</span> {LED?.ssl?.kode}
            </Typography>

            <Typography>
              <span style={{ fontWeight: 'bold' }}>Nama Cost Centre:</span> {LED?.ssl?.nama}
            </Typography>
          </div>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ marginRight: '16px', marginLeft: '16px' }}
          />

          <div className="report-card-footer-button-wrapper">
            <Button
              color={list ? 'primary' : 'warning'}
              startIcon={<IconPencilMinus />}
              onClick={() => {
                list ? onDetail(LED.id) : onEdit(LED.id);
              }}
            >
              {list ? 'Detail' : 'Edit'}
            </Button>
            {/* <Button color="error" startIcon={<IconBan />}>
              Tolak
            </Button> */}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ReportCard;

// `${}`
