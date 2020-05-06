import React from 'react';
import { checkMonitor } from './index';

describe('LIB:', () => {
  describe('checkMonitor()', () => {
    const alertDataSet = [];
    const normalDataSet = [];
    const shortDataSet = [
      {
        loadAverage: 1.2,
        timeStamp: Date.now()
      },
      {
        loadAverage: 1.2,
        timeStamp: Date.now()
      },
      {
        loadAverage: 1.2,
        timeStamp: Date.now()
      }
    ];

    for (let i = 0; i < 12; i++) {
      alertDataSet.push({
        loadAverage: 1.2,
        timeStamp: Date.now()
      });

      normalDataSet.push({
        loadAverage: 0.9,
        timeStamp: Date.now()
      });
    }

    it('should only accept 20 data points', () => {
      expect(checkMonitor(shortDataSet, false)).toBeNull();
    });

    describe('Alerting', () => {
      it('should not trigger an alert if all data points are not above 1', () => {
        const { alertEvent, recoveryEvent } = checkMonitor(
          normalDataSet,
          false
        );
        expect(alertEvent).toBeUndefined();
        expect(recoveryEvent).toBeUndefined();
      });

      it('should not trigger alert if needs recovery', () => {
        const { alertEvent, recoveryEvent } = checkMonitor(alertDataSet, true);
        expect(alertEvent).toBeUndefined();
        expect(recoveryEvent).toBeUndefined();
      });

      it('should trigger an alert if all data points are above 1 and does not need recovery', () => {
        const { alertEvent, recoveryEvent } = checkMonitor(alertDataSet, false);
        expect(alertEvent).toBeDefined();
        expect(recoveryEvent).toBeUndefined();
      });
    });

    describe('Recovery', () => {
      it('should not trigger a recovery if all data points are not below 1', () => {
        const { alertEvent, recoveryEvent } = checkMonitor(alertDataSet, true);
        expect(alertEvent).toBeUndefined();
        expect(recoveryEvent).toBeUndefined();
      });

      it('should not trigger a recovery if needsRecovery === false', () => {
        const { alertEvent, recoveryEvent } = checkMonitor(
          normalDataSet,
          false
        );
        expect(alertEvent).toBeUndefined();
        expect(recoveryEvent).toBeUndefined();
      });

      it('should trigger a recovery if all data points are below 1 and in highCpu mode', () => {
        const { alertEvent, recoveryEvent } = checkMonitor(normalDataSet, true);
        expect(alertEvent).toBeUndefined();
        expect(recoveryEvent).toBeDefined();
      });
    });
  });
});
