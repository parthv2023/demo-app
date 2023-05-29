import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import Navbar from '../navbar';
import { useQuery } from 'react-query';




function ChartComponent() {
  const chartRef = useRef(null);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('https://disease.sh/v3/covid-19/all');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      // console.log(data);
      setData(data);
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current && data) { 
      const ctx = chartRef.current.getContext('2d');

      const chartConfig = {
        type: 'bar',
        data: {
          labels: [
            'Active',
            'activePerOneMillion',
            'Deaths',
            'affectedCountries',
            'Recovered',
            'cases',
            'casesPerOneMillion',
            'critical',
            'criticalPerOneMillion',
            'deaths',
            'deathsPerOneMillion',
            'oneCasePerPeople',
            'population',
            'recovered',
            'recoveredPerOneMillion',
            'tests',
            'testsPerOneMillion',
            'todayCases',
            'todayDeaths',
            'todayRecovered',
            'updated',
          ],
          datasets: [
            {
              label: 'COVID-19 Data',
              data: [
                data.active,
                data.activePerOneMillion,
                data.deaths,
                data.affectedCountries,
                data.recovered,
                data.cases,
                data.casesPerOneMillion,
                data.critical,
                data.criticalPerOneMillion,
                data.deaths,
                data.deathsPerOneMillion,
                data.oneCasePerPeople,
                data.population,
                data.recovered,
                data.recoveredPerOneMillion,
                data.tests,
                data.testsPerOneMillion,
                data.todayCases,
                data.todayDeaths,
                data.todayRecovered,
              ],
              backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 205, 86, 0.2)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 205, 86, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      const chart = new Chart(ctx, chartConfig);

      return () => {
        chart.destroy();
      };
    }
  }, [data]);

  return (
    <>
      <div style={{ maxWidth: '100%', marginTop: '50px' }}>
        {data ? (
          <>
          <h1>World wide data of cases</h1>
          <canvas ref={chartRef} />
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}

export default ChartComponent;
