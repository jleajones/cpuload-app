import React from 'react';

import styles from './table.module.css';
import { HIGH_CPU_LOAD } from '../../lib';

const Table = ({ cpuData, tableRef, windowHeight }) => {
  const height = tableRef.current?.offsetTop
    ? windowHeight - tableRef.current.offsetTop
    : windowHeight - 200;
  return (
    <div className={styles.tableContainer}>
      <div
        style={{
          height: height - 20
        }}
      >
        <table id="table-content" data-testid="cpu-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Total Load</th>
              <th>Average Load</th>
            </tr>
          </thead>
          <tbody>
            {cpuData.map((data, index) => {
              if (index <= 59) {
                return (
                  <tr
                    key={data.timeStamp}
                    className={
                      data.loadAverage > HIGH_CPU_LOAD
                        ? `${styles.tableRowHigh}`
                        : `${styles.tableRowLow}`
                    }
                  >
                    <td>{data.timeStamp}</td>
                    <td>{data.load}</td>
                    <td>{data.loadAverage}</td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
