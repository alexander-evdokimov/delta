import React from 'react';

import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import styles from './high-chart.module.css'


const chartData = [0, 500, 1200, 2000, 1500, 1700]

const axisOptions: Highcharts.XAxisOptions = {
  lineWidth: 2,
  startOnTick: true,
  tickLength: 8,
  tickWidth: 8,
  min: 0,
  gridLineWidth: 0,
  labels: {
    enabled: false
  },
  title: {
    text: ''
  }
}

const defaultOptions: Highcharts.Options = {
  title: {
    text: ''
  },
  credits: {
    enabled: false
  },
  legend: {
    enabled: false,
  },
  tooltip: {
    formatter: function () {
      return `
        <span style="color: ${this.color}">\u25CF</span> ${this.series.name}: ${this.point.y}`;
    }
  },
  // series: [{
  //   name: 'Выручка, руб',
  //   color: 'green',
  //   type: 'line',
  //   data: chartData,
  // },
  // ]
};


type ChartData = {
  name: string;
  color: string;
  type: string;
  data: number[]
}

interface Props {
  className?: string;
  chartData: ChartData;


}


export const HighChart: React.FC<Props> = ({chartData}) => {


  const options = {
    ...defaultOptions,
    xAxis: { ...axisOptions, tickPositions: chartData.data.map((_, index) => index) },
    yAxis: { ...axisOptions },
    series: [chartData],
  }



  return (
    <HighchartsReact
        className={styles.chart}
        highcharts={Highcharts}
        options={options}
    />
  );
};