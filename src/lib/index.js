import {HIGH_CPU_LOAD, MAX_MONITORS} from "../constants";

/**
 * @param {Object[]} monitor - data points to be evaluated
 * @param {float} monitor.loadAverage - value to compare
 * @param {string} monitor.timeStamp - timestamp when value was recorded
 * @param {Boolean} needsRecovery - indicates we are looking for a recovery
 * @returns {{}|null}
 */
export const checkMonitor = (monitor, needsRecovery) => {
  // If we don't have enough data point (2minutes worth)
  if (monitor.length !== MAX_MONITORS) return null;

  const returnObj = {};

  if (!needsRecovery) {
    const isAlert = monitor.every((m) => m.loadAverage > HIGH_CPU_LOAD);
    if (isAlert) {
      returnObj.alertEvent = monitor[monitor.length - 1];
    }
  } else {
    const isRecovered = monitor.every((m) => m.loadAverage < HIGH_CPU_LOAD);
    if (isRecovered) {
      returnObj.recoveryEvent = monitor[monitor.length - 1];
    }
  }

  return {
    ...returnObj
  };
};
