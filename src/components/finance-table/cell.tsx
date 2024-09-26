import React from 'react';
import cn from 'classnames';
import styles from './cell.module.css';

interface Props extends React.HTMLAttributes<HTMLTableCellElement> {
    className?: string;
    percent?: number;
    value?: number;
    color?: 'blue' | 'green' | 'red';
}

export const Cell: React.FC<Props> = ({ className, color, value, percent, ...props }) => {

  
  const mapStyleByColor = {
      'blue': styles.cell__blue,
      'green': styles.cell__green,
      'red': styles.cell__red,
  }



  return (
    <td className={cn(className, styles.cell, mapStyleByColor[color as keyof typeof mapStyleByColor])} {...props}>
      <div className={styles.cell__content}>
        <span className={styles.cell__text}>{value?.toLocaleString('ru-RU')}</span>
        {percent !== undefined && <span className={cn(className, styles.cell__percent, {
          [styles.cell__percent_green]: color === 'green',
          [styles.cell__percent_red]: color === 'red',
        })}>{percent}%</span>}
        </div>
    </td>
  );
};