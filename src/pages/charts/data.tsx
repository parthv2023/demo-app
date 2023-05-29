import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
export function CountryChart() {
  const [datas, setDatas] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://disease.sh/v3/covid-19/countries');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setDatas(data);
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart',
      },
    },
  };

  const labels = datas.map((dataItem: any) => dataItem.country);

  const datasets = [
    {
      label: 'Dataset 1',
      data: datas.map((dataItem: any) => dataItem.cases),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: datas.map((dataItem: any) => dataItem.active),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ];

  return (
    <>
    <h1>Country Specific data of cases</h1>
    <Bar options={options} data={{ labels, datasets }} />;
    </>
  )
}
