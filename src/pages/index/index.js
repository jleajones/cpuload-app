import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const Index = () => {
  const [connected, setConnected] = useState(false);

  const [load, setLoad] = useState([]);
  const [averageLoad, setAverageLoad] = useState([]);
  const [cpuData, setCpuData] = useState([]);

  const socket = useRef({});

  useEffect(() => {
    socket.current = io('ws://localhost:3000');
    socket.current.on('connected', () => {
      setConnected(true);
    });

    return () => {
      socket.current.close();
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

  const handleMessage = (data) => {
    cpuData.unshift(data);

    // message every 10 secs
    // 6 messages === 1min
    // 10mins === 60 message
    // more than 10 mins worth, splice the extra off
    // if (cpuData.length > 60) {
    //   cpuData.splice(60, cpuData.length - 60);
    // }

    setLoad(data.load);
    setAverageLoad(data.loadAverage);
    setCpuData([...cpuData]);
  };

  return (
    <div>
      <h1>What's My Load</h1>
      <h2># CPUs: {cpuData[0]?.cpus.length}</h2>
      <h2>Current Load: {load}</h2>
      <h2>Current Average CPU Load: {averageLoad}</h2>
      <table data-testid="cpu-table">
        <thead>
          <tr>
            <th> </th>
            <th>model</th>
            <th>speed</th>
            <th>time (hrs)</th>
          </tr>
        </thead>
        <tbody>
          {cpuData.map((data, index) => {
            if (index <= 59) {
              return (
                <tr key={`cpu-${index}`}>
                  <td>{cpuData.length - index}</td>
                  <td>
                    <table>
                      <tbody>
                        {data.cpus.map((cpu, innerIndex) => (
                          <tr key={`cpu-model-${innerIndex}`}>
                            <td>{cpu.model}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                  <td>
                    <table>
                      <tbody>
                        {data.cpus.map((cpu, innerIndex) => (
                          <tr key={`cpu-speed-${innerIndex}`}>
                            <td>{cpu.speed}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                  <td>
                    <table>
                      <tbody>
                        {data.cpus.map((cpu, innerIndex) => (
                          <tr key={`cpu-times-${innerIndex}`}>
                            <td>
                              <table>
                                <thead>
                                  <tr>
                                    <th>Idle</th>
                                    <th>IRQ</th>
                                    <th>Nice</th>
                                    <th>Sys</th>
                                    <th>User</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      {parseFloat(
                                        `${cpu.times.idle / 1000 / 60 / 60}`
                                      ).toFixed(2)}
                                    </td>
                                    <td>
                                      {parseFloat(
                                        `${cpu.times.irq / 1000 / 60 / 60}`
                                      ).toFixed(2)}
                                    </td>
                                    <td>
                                      {parseFloat(
                                        `${cpu.times.nice / 1000 / 60 / 60}`
                                      ).toFixed(2)}
                                    </td>
                                    <td>
                                      {parseFloat(
                                        `${cpu.times.sys / 1000 / 60 / 60}`
                                      ).toFixed(2)}
                                    </td>
                                    <td>
                                      {parseFloat(
                                        `${cpu.times.user / 1000 / 60 / 60}`
                                      ).toFixed(2)}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
