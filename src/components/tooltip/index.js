import React, { useEffect, useState } from 'react';
import styles from './tooltip.module.css';

const Tooltip = ({ children, data, show, onClose }) => {
  const [mouseOver, setMouseOver] = useState(true);
  const [hideTimeout, setHideTimeout] = useState(false);

  const displayData = [...data];
  displayData.reverse();

  useEffect(() => {
    if (mouseOver) {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        setHideTimeout(null);
      }
    } else {
      if (!hideTimeout) {
        const to = setTimeout(() => {
          onClose();
          clearTimeout(to);
          setHideTimeout(null);
        }, 700);
        setHideTimeout(to);
      }
    }
  }, [mouseOver]);

  let hideClass;
  if (!show) {
    hideClass = styles.hidden;
  }

  return (
    <div
      className={styles.tooltipContainer}
      onMouseOver={() => {
        setMouseOver(true);
      }}
      onMouseOut={() => {
        setMouseOver(false);
      }}
    >
      {children}
      {data.length > 0 && (
        <div className={hideClass}>
          <ul>
            {displayData.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
