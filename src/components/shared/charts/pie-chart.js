import { Pie } from 'react-chartjs-2';
import { Title, Legend, Tooltip, ArcElement, Chart as ChartJS } from 'chart.js';

const PieChart = ({ data, title, chosenMonth }) => {
  ChartJS.register(Title, Legend, Tooltip, ArcElement);
  const label = data
    ?.filter((item) => item.label.toLowerCase() !== 'grand total')
    .map((item) => item.label);
  const frekuensi = data
    ?.filter((item) => item.label.toLowerCase() !== 'grand total')
    .map((item) => item.frekuensi[chosenMonth - 1]);

  const generateData = {
    labels: label,
    datasets: [
      {
        data: frekuensi,
        label: 'Frekuensi kejadian',
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

    plugins: {
      title: {
        text: title,
        display: true,
      },
      legend: {
        position: 'bottom',
        align: 'start',
      },
    },
  };

  return (
    <div style={{ marginTop: '16px' }}>
      <Pie type="bar" data={generateData} options={config} />;
    </div>
  );
};

export default PieChart;
