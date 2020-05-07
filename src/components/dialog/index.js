import React from 'react';

import styles from './dialog.module.css';

const Dialog = ({ highCpu, alerts, recoveries, hideDialog }) => {
  let mode = 'info';
  let content;
  if (highCpu) {
    mode = 'alert';
    content = (
      <p className={styles.alertText}>
        New Alert! {new Date(alerts[0].timeStamp).toUTCString()}
      </p>
    );
  } else if (
    !highCpu &&
    alerts.length > 0 &&
    alerts.length === recoveries.length
  ) {
    mode = 'recovery';
    content = (
      <p className={styles.recoveryText}>
        Recovered at {new Date(recoveries[0].timeStamp).toUTCString()}
      </p>
    );
  } else {
    return null;
  }

  const onClick = (e) => {
    e.preventDefault();
    hideDialog();
  };

  return (
    <div className={`${styles.dialogContainer} ${styles[mode]}`}>
      <div>
        {content}
        <button onClick={onClick}><span>X</span></button>
      </div>
    </div>
  );
};

export default Dialog;
