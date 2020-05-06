import styles from './header.module.css';
import React from 'react';
import { HIGH_CPU_LOAD } from '../../lib';

const Header = ({ cpuCount, totalLoad, averageLoad, alerts, recoveries }) => {
  const currentLoad = parseFloat(totalLoad).toFixed(4);
  const currentAvgLoad = parseFloat(averageLoad).toFixed(4);
  const alertClassName = currentAvgLoad > HIGH_CPU_LOAD ? styles.withAlert : '';

  // TODO: Improve UX
  const onClickBuilder = (data) => {
    return () => {
      if (data.length > 0) {
        alert(data.map((d) => new Date(d.timeStamp).toUTCString()));
      }
    };
  };

  return (
    <div data-testid="header" className={`${alertClassName} ${styles.header}`}>
      <h1>What's My Load</h1>
      <p>
        # of CPUs: <span data-testid="cpu-count">{cpuCount}</span> | Current CPU
        Load: <span data-testid="current-load">{currentLoad}</span> | Current
        Average CPU Load:{' '}
        <span data-testid="current-avg-load">{currentAvgLoad}</span> | # of
        Alerts:{' '}
        <span data-testid="alert-count" onClick={onClickBuilder(alerts)}>
          {alerts.length}
        </span>{' '}
        | # of Recoveries:{' '}
        <span data-testid="recovery-count" onClick={onClickBuilder(recoveries)}>
          {recoveries.length}
        </span>
      </p>
    </div>
  );
};

export default Header;
