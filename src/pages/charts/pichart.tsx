import React, { useEffect, useState } from 'react';
import { CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';


interface Data {
  cases: { [key: string]: number };
  deaths: { [key: string]: number };
  // Add other properties if needed
}

export function PiChart() {
  const [datas, setDatas] = useState<Data | undefined>();

  const fetchData = async () => {
    try {
      const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: Data = await response.json();
      console.log(data, "data1111111111111");
      setDatas(data);
    } catch (error) {
      console.error(error, "111111111111");
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

  let chartContent: JSX.Element | null = null;
  if (datas) {
    const datasets = [
      {
        label: 'Dataset 1',
        data: Object.values(datas.cases),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: Object.values(datas.deaths),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ];

    const data = {
      labels: Object.keys(datas.cases),
      datasets: datasets,
    };

    chartContent = <Bar data={data} options={options} />;
  }

  return (
    <>
      <h1>Graph data for cases with date</h1>
      {chartContent}
    </>
  );
}
