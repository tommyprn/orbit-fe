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

const BarChart = ({ data, label, title, period }) => {
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

  const generateData = {
    labels: label,
    datasets: [
      {
        type: 'line',
        data: chartValue(getSeries(data)?.frekuensi, period),
        fill: false,
        label: 'Frekuensi kejadian',
        order: 0,
        borderColor: '#FFB1C1',
        backgroundColor: '#FF6384',
      },
      {
        data: chartValue(getSeries(data)?.nominal, period, true),
        label: 'Rata-rata nominal kerugian 1 tahun terakhir (Rp Juta)',
        order: 1,
        backgroundColor: '#9BD0F5',
      },
    ],
  };

  const config = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        text: title,
        display: true,
        padding: 30,
      },
      datalabels: {
        font: {
          weight: 'bold',
        },
        formatter: (value, context) => {
          return value;
        },
        align: 'end',
        anchor: 'end',
      },
    },
  };

  return <Chart type="bar" data={generateData} options={config} />;
};

export default BarChart;
