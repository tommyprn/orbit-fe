import { Pie } from 'react-chartjs-2';
import { formatNumber, roundDecimal } from 'src/utils/use-formatter';
import { Title, Legend, Tooltip, ArcElement, Chart as ChartJS } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const PieChart = ({ data, title, chosenMonth }) => {
  ChartJS.register(Title, Legend, Tooltip, ArcElement, ChartDataLabels);
  const label = data
    ?.filter((item) => item.label.toLowerCase() !== 'grand total')
    .map((item) => item.label);
  const nominal = data
    ?.filter((item) => item.label.toLowerCase() !== 'grand total')
    .map((item) => item.realisasiKerugian[chosenMonth - 1]);
  const total = data.find((item) => item.label.toLowerCase() === 'grand total')?.realisasiKerugian[
    chosenMonth - 1
  ];

  const generateData = {
    labels: label,
    datasets: [
      {
        data: nominal,
        label: 'Nominal kerugian',
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)',
          'rgba(90, 240, 100)',
        ],
      },
    ],
  };

  const config = {
    responsive: true,
    aspectRatio: 2,
    plugins: {
      title: {
        text: title,
        display: true,
        padding: 30,
      },
      legend: {
        display: true,
        position: 'right',
      },
      datalabels: {
        formatter: (val, ctx) => {
          if (val !== null && val !== 0) {
            return (
              formatNumber(roundDecimal(val / 1000000)) + ` [${roundDecimal((val / total) * 100)}%]`
            );
          } else {
            return null;
          }
        },
        font: {
          weight: 'bold',
        },
        align: 'top',
        anchor: 'end',
        color: '#fffff',
      },
    },
  };

  return (
    <div style={{ marginTop: '16px' }}>
      <Pie type="bar" data={generateData} options={config} width={1000} height={1000} />
    </div>
  );
};

export default PieChart;
