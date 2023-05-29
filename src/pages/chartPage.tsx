import React from 'react'
import ChartComponent from './charts/chartpage'
import { PiChart } from './charts/pichart'
import Navbar from './navbar'
import { CountryChart } from './charts/data'


const chartPage = () => {

  return (
    <div>
      <Navbar/>
      <PiChart />
      <CountryChart />
      <ChartComponent />
    </div>
  )
}

export default chartPage
