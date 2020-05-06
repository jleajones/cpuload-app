import styles from './chart.module.css';
import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';

const Chart = ({ data }) => {
  const [loadData, setData] = useState(null);
  const [labels, setLabels] = useState(null);

  useEffect(() => {
    if (data.loadAverage && data.timeStamp) {
      if (!loadData) {
        setData([data.loadAverage]);
        setLabels([data.timeStamp]);
      } else {
        loadData.push(data.loadAverage);
        labels.push(data.timeStamp);
        if (loadData.length > 60) {
          loadData.splice(0, loadData.length - 60);
          labels.splice(0, labels.length - 60);
        }

        setData([...loadData]);
        setLabels([...labels]);
      }
    }
  }, [data]);

  return (
    <div data-testid="chart" className={styles.chart}>
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              label: 'Average CPU Load',
              data: loadData,
              pointBackgroundColor: (context) => {
                const index = context.dataIndex;
                const value = context.dataset.data[index];
                return value > 1 ? '#880000' : '#008800';
              }
            }
          ]
        }}
        height={500}
        options={{
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0
                }
              }
            ],
            xAxes: [
              {
                display: false
              }
            ]
          }
        }}
      />
    </div>
  );
};

export default Chart;
