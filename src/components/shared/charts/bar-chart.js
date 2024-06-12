import {
  Title,
  Legend,
  Tooltip,
  BarElement,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
  BarController,
  LineController,
  Chart as ChartJS,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { chartValue, getSeries } from 'src/utils/use-chart-utils';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BarChart = ({ data, label, title, period, filter }) => {
  ChartJS.register(
    Title,
    Legend,
    Tooltip,
    BarElement,
    LinearScale,
    LineElement,
    PointElement,
    CategoryScale,
    BarController,
    LineController,
    ChartDataLabels,
  );

  const categoryDataSets = [
    {
      type: 'line',
      data: chartValue(getSeries(data, 'Grand Total')?.frekuensi, period),
      fill: false,
      label: 'Frekuensi kejadian',
      order: 0,
      borderColor: '#fc95ab',
      backgroundColor: '#ff6384',
      yAxisID: 'frekuensi',
    },
    {
      data: chartValue(getSeries(data, data[0]?.label)?.realisasiKerugian, period, true),
      label: data[0]?.label,
      order: 1,
      backgroundColor: '#ff9f40',
      yAxisID: 'nominal',
    },
    {
      data: chartValue(getSeries(data, data[1]?.label)?.realisasiKerugian, period, true),
      label: data[1]?.label,
      order: 2,
      backgroundColor: '#ffcd56',
      yAxisID: 'nominal',
    },
    {
      data: chartValue(getSeries(data, data[2]?.label)?.realisasiKerugian, period, true),
      label: data[2]?.label,
      order: 3,
      backgroundColor: '#4bc0c0',
      yAxisID: 'nominal',
    },
    {
      data: chartValue(getSeries(data, data[3]?.label)?.realisasiKerugian, period, true),
      label: data[3]?.label,
      order: 4,
      backgroundColor: '#36a2eb',
      yAxisID: 'nominal',
    },
    {
      data: chartValue(getSeries(data, data[4]?.label)?.realisasiKerugian, period, true),
      label: data[4]?.label,
      order: 5,
      backgroundColor: '#9966ff',
      yAxisID: 'nominal',
    },
    {
      data: chartValue(getSeries(data, data[5]?.label)?.realisasiKerugian, period, true),
      label: data[5]?.label,
      order: 6,
      backgroundColor: '#6ec338',
      yAxisID: 'nominal',
    },
    {
      data: chartValue(getSeries(data, data[6]?.label)?.realisasiKerugian, period, true),
      label: data[6]?.label,
      order: 7,
      backgroundColor: '#c9cbcf',
      yAxisID: 'nominal',
    },
  ];

  const causeDataSets = [
    {
      type: 'line',
      data: chartValue(getSeries(data, 'Grand Total')?.frekuensi, period),
      fill: false,
      label: 'Frekuensi kejadian',
      order: 0,
      borderColor: '#fc95ab',
      backgroundColor: '#ff6384',
      yAxisID: 'frekuensi',
    },
    {
      data: chartValue(getSeries(data, data[0]?.label)?.realisasiKerugian, period, true),
      label: data[0]?.label,
      order: 1,
      backgroundColor: '#ff9f40',
      yAxisID: 'nominal',
    },
    {
      data: chartValue(getSeries(data, data[1]?.label)?.realisasiKerugian, period, true),
      label: data[1]?.label,
      order: 2,
      backgroundColor: '#ffcd56',
      yAxisID: 'nominal',
    },
    {
      data: chartValue(getSeries(data, data[2]?.label)?.realisasiKerugian, period, true),
      label: data[2]?.label,
      order: 3,
      backgroundColor: '#4bc0c0',
      yAxisID: 'nominal',
    },
    {
      data: chartValue(getSeries(data, data[3]?.label)?.realisasiKerugian, period, true),
      label: data[3]?.label,
      order: 4,
      backgroundColor: '#36a2eb',
      yAxisID: 'nominal',
    },
  ];

  const generateData = {
    labels: label,
    datasets: filter === 'kategori' ? categoryDataSets : causeDataSets,
  };

  const config = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        text: title,
        display: true,
        padding: 30,
      },
      datalabels: {
        color: 'black',
        font: {
          weight: 'bold',
        },
        align: 'end',
        anchor: 'end',
      },
    },
    scales: {
      nominal: {
        type: 'linear',
        display: false,
        position: 'left',
        grid: {
          drawOnChartArea: true,
        },
      },
      frekuensi: {
        type: 'linear',
        display: false,
        position: 'right',
        grid: {
          drawOnChartArea: true,
        },
      },
    },
  };

  return <Chart type="bar" data={generateData} options={config} />;
};

export default BarChart;
