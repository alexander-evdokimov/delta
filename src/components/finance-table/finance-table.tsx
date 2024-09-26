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
    chartData: [0, 270000, 270000, 240000, 480521, 500521], // по дням
    today: 500521,
    yesterday: 480521,
    thisWeek: 4805121,
  },
  {
    factor: 'Наличные',
    chartData: [300000, 280000, 250000, 250000, 300000, 300000],
    today: 300000,
    yesterday: 300000,
    thisWeek: 300000,
  },
  {
    factor: 'Безналичный расчет',
    chartData: [100000, 100000, 1200, 2000, 100000, 100000],
    today: 100000,
    yesterday: 100000,
    thisWeek: 100000,
  },
  {
    factor: 'Кредитные карты',
    chartData: [0, 500, 1200, 2000, 100521, 100521],
    today: 100521,
    yesterday: 100521,
    thisWeek: 100521,
  },
  {
    factor: 'Средний чек, руб',
    chartData: [0, 500, 800, 900, 900, 1300],
    today: 1300,
    yesterday: 900,
    thisWeek: 900,
  },
  {
    factor: 'Средний гость, руб',
    chartData: [0, 500, 800, 900, 800, 1200],
    today: 1200,
    yesterday: 800,
    thisWeek: 800,
  },
  {
    factor: 'Удаления из чека (после оплаты), руб',
    chartData: [0, 500, 800, 1300, 1100, 1000],
    today: 1000,
    yesterday: 1100,
    thisWeek: 1300,
  },
  {
    factor: 'Удаления из чека (до оплаты), руб',
    chartData: [0, 500, 800, 900, 1300, 1300],
    today: 1300,
    yesterday: 1300,
    thisWeek: 900,
  },
  {
    factor: 'Количество чеков',
    chartData: [0, 500, 800, 34, 36, 34],
    today: 34,
    yesterday: 36,
    thisWeek: 34,
  },
  {
    factor: 'Количество гостей',
    chartData: [0, 500, 800, 34, 36, 34],
    today: 34,
    yesterday: 36,
    thisWeek: 32,
  },
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
          <th style={{ width: '20%', backgroundColor: 'var(--color-bg-cell-blue)' }} className={styles.table__cell}>Текущий день</th>
          <th style={{ width: '20%' }} className={styles.table__cell}>Вчера</th>
          <th style={{ width: '20%' }} className={styles.table__cell}>Этот день недели</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <>
            <tr onClick={() => toggleRow(index)}>
              <td style={{ textAlign: 'left' }} className={styles.table__cell}>{item.factor}</td>
              <Cell value={item.today} color='blue'/>
              <Cell value={item.yesterday} percent={calcPercent(item.today, item.yesterday)} color={calcColor(item.today, item.yesterday)}/>
              <Cell value={item.thisWeek} color={calcColor(item.today, item.yesterday)}/>
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
