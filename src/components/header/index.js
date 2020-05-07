import React, { useState } from 'react';
import styles from './header.module.css';
import { HIGH_CPU_LOAD } from '../../constants';
import Tooltip from '../tooltip';

const Header = ({ cpuCount, totalLoad, averageLoad, alerts, recoveries }) => {
  const currentLoad = parseFloat(totalLoad).toFixed(4);
  const currentAvgLoad = parseFloat(averageLoad).toFixed(4);
  const alertClassName = currentAvgLoad > HIGH_CPU_LOAD ? styles.withAlert : '';

  const [showAlertTooltip, setShowAlertTooltip] = useState(false);
  const [showRecoveryTooltip, setShowRecoveryTooltip] = useState(false);

  const alertOnClick = () => {
    toolTipOnClose();
    setShowAlertTooltip(true);
  };

  const recoveryOnClick = () => {
    toolTipOnClose();
    setShowRecoveryTooltip(true);
  };

  const toolTipOnClose = () => {
    setShowAlertTooltip(false);
    setShowRecoveryTooltip(false);
  };

  return (
    <div data-testid="header" className={`${alertClassName} ${styles.header}`}>
      <h1>What's My Load</h1>
      <div>
        # of CPUs: <span data-testid="cpu-count">{cpuCount}</span> | Current CPU
        Load: <span data-testid="current-load">{currentLoad}</span> | Current
        Average CPU Load:{' '}
        <span data-testid="current-avg-load">{currentAvgLoad}</span> | # of
        Alerts:{' '}
        <span
          data-testid="alert-count"
          className={styles.clickable}
          onClick={alertOnClick}
        >
          <Tooltip
            data={alerts.map((a) => a.timeStamp)}
            show={showAlertTooltip}
            onClose={toolTipOnClose}
          >
            {alerts.length}
          </Tooltip>
        </span>{' '}
        | # of Recoveries:{' '}
        <span
          data-testid="recovery-count"
          className={styles.clickable}
          onClick={recoveryOnClick}
        >
          <Tooltip
            data={recoveries.map((r) => r.timeStamp)}
            show={showRecoveryTooltip}
            onClose={toolTipOnClose}
          >
            {recoveries.length}
          </Tooltip>
        </span>
      </div>
    </div>
  );
};

export default Header;
