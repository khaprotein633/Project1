import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần cần thiết
Chart.register(LinearScale, CategoryScale, LineElement, PointElement, Tooltip, Legend);

const LineChart = () => {
  // Dữ liệu cho biểu đồ đường
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"], // Nhãn trục x
    datasets: [
      {
        label: 'Profit (in USD)',  // Nhãn của đường biểu đồ
        data: [12000, 15000, 10000, 18000, 16000, 19000, 22000],  // Dữ liệu lợi nhuận
        fill: false,  // Không tô màu dưới đường
        borderColor: 'rgba(75,192,192,1)',  // Màu đường biểu đồ
        tension: 0.1  // Độ cong của đường
      }
    ]
  };

  // Tùy chỉnh hiển thị
  const options = {
    scales: {
      y: {
        beginAtZero: true,  // Bắt đầu trục y từ 0
        title: {
          display: true,
          text: 'Profit in USD'  // Nhãn trục y
        }
      },
      x: {
        title: {
          display: true,
          text: 'Months'  // Nhãn trục x
        }
      }
    }
  };

  return (
    <div className='bg-white border border-secondary'>
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart;
