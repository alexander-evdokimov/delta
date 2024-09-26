import React, { useState } from 'react';
import cn from 'classnames';
import { HighChart } from '../high-chart/high-chart';
import styles from './finance-table.module.css';
import { Cell } from './cell';


interface Props {
  className?: string;
}


const items = [
  {
    factor: 'Выручка, руб',
    chartData: [0, 500, 1200, 2000, 1500, 1700],
    today: 1700,
    yesterday: 1500,
    thisWeek: 1700,
  },
  {
    factor: 'Наличные',
    chartData: [0, 200, 800, 500, 1400, 1200],
    today: 1200,
    yesterday: 1400,
    thisWeek: 2000,
  },
  {
    factor: 'Безналичный расчет',
    chartData: [0, 500, 1200, 2000, 1500, 1700],
    today: 1700,
    yesterday: 1500,
    thisWeek: 1700,
  },
  {
    factor: 'Средний чек, руб',
    chartData: [0, 500, 1200, 2000, 1700, 1700],
    today: 1700,
    yesterday: 1700,
    thisWeek: 1700,
  },
  {
    factor: 'Средний гость, руб',
    chartData: [0, 500, 800, 900, 800, 900],
    today: 900,
    yesterday: 800,
    thisWeek: 1200,
  }
]



export const FinanceTable: React.FC<Props> = ({ className }) => {

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleRow = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  const calcPercent = (a: number, b: number) => {
    const result = ((a / b) * 100) - 100;
    return Math.round(result);
  }


  const calcColor = (a: number, b: number) => {
    const result = ((a / b) * 100) - 100;

    if (result === 0) {
      return undefined;
    }

    return result > 0 ? 'green' : 'red';
  }

  return (
    <table className={cn(className, styles.table)}>
      <thead>
        <tr>
          <th style={{ width: '40%' }} className={styles.table__cell}>Показатель</th>
          <th style={{ width: '20%' }} className={styles.table__cell}>Текущий день</th>
          <th style={{ width: '20%' }} className={styles.table__cell}>Вчера</th>
          <th style={{ width: '20%' }} className={styles.table__cell}>Этот день недели</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <>
            <tr onClick={() => toggleRow(index)}>
              <td style={{ textAlign: 'left' }} className={styles.table__cell}>{item.factor}</td>
              <Cell text={item.today} color='blue'/>
              <Cell text={item.yesterday} percent={calcPercent(item.today, item.yesterday)} color={calcColor(item.today, item.yesterday)}/>
              <Cell text={item.thisWeek} color={calcColor(item.today, item.yesterday)}/>
            </tr>
            {openIndex === index && <tr>
              <td colSpan={4}>
                <HighChart chartData={{
                  name: item.factor,
                  color: 'green',
                  type: 'line',
                  data: item.chartData,
                }} />
              </td>
            </tr>}
          </>
        ))}
      </tbody>
    </table>
  )
}
