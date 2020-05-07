import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import Header from '../../components/header';
import Chart from '../../components/chart';
import Table from '../../components/table';

import { checkMonitor } from '../../lib';
import Dialog from '../../components/dialog';
import {MAX_MONITORS} from "../../constants";

const Index = () => {
  // TODO: New component for webSocket connection; useContext or custom hook
  const [connected, setConnected] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const [offsetTop, setOffsetTop] = useState(0);
  const [windowHeight, setWindowHeight] = useState(500);

  const [load, setLoad] = useState(0);
  const [averageLoad, setAverageLoad] = useState(0);
  const [cpuData, setCpuData] = useState([]);
  const [monitor, setMonitor] = useState([]);

  const [highCpu, setHighCpu] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [recoveries, setRecoveries] = useState([]);

  const table = useRef({});
  const socket = useRef({});

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    table.current = document.getElementById('table-content');
    setOffsetTop(table.current.offsetTop);
    setWindowHeight(window.innerHeight);

    socket.current = io(process.env.WEBSOCKET_URL);
    socket.current.on('connected', () => {
      setConnected(true);
    });

    return () => {
      socket.current.close();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // no websocket yet, cannot create handler
    if (!socket.current) return;

    socket.current.on('message', (data) => {
      const parsedData = JSON.parse(data);
      handleMessage(parsedData);
    });
  }, [connected]);

  useEffect(() => {
    if (monitor.length === MAX_MONITORS) {
      const { alertEvent, recoveryEvent } = checkMonitor(monitor, highCpu);
      if (alertEvent) {
        alerts.push(alertEvent);
        setAlerts([...alerts]);
        setHighCpu(true);
        setShowDialog(true);
      } else if (recoveryEvent) {
        recoveries.push(recoveryEvent);
        setRecoveries([...recoveries]);
        setHighCpu(false);
        setShowDialog(true);
      }
    }
  }, [monitor]);

  const handleResize = () => {
    setWindowHeight(window.innerHeight);
  };

  const handleMessage = (data) => {
    monitor.push({ loadAverage: data.loadAverage, timeStamp: data.timeStamp });
    cpuData.unshift(data);

    if (offsetTop < table.current.offsetTop) {
      setOffsetTop(table.current.offsetTop);
    }

    // TODO: Investigate useReducer
    setLoad(data.load);
    setAverageLoad(data.loadAverage);
    setCpuData([...cpuData]);
    if (monitor.length > MAX_MONITORS) {
      monitor.splice(0, monitor.length - MAX_MONITORS);
    }
    setMonitor([...monitor]);
  };

  const handleHideDialog = () => {
    setShowDialog(false);
  };

  return (
    <div data-testid="dashboard-page">
      {showDialog && (
        <Dialog
          highCpu={highCpu}
          alerts={alerts}
          recoveries={recoveries}
          hideDialog={handleHideDialog}
        />
      )}

      <Header
        cpuCount={cpuData[0]?.cpus.length}
        totalLoad={load}
        averageLoad={averageLoad}
        alerts={alerts}
        recoveries={recoveries}
      />
      {cpuData[0] && <Chart data={cpuData[0]} />}
      <Table tableRef={table} windowHeight={windowHeight} cpuData={cpuData} />
    </div>
  );
};

export default Index;
