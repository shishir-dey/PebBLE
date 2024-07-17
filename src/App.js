import React, { useState, useEffect } from 'react';
import ServiceView from './components/ServiceView'; // Assuming ServiceView is in a separate file
import './styles/global.css';
import ServiceListView from './components/ServiceListView';
import ShortcutListView from './components/ShortcutListView'; // Might not be needed
import ConnectButton from './components/ConnectButton';

function App() {
  const [connected, setConnected] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Handle potential cleanup on unmount (optional)
    return () => {
      // Disconnect or perform cleanup actions
    };
  }, []);

  const handleConnect = async () => {
    setConnected(true);
    console.log('Connecting...');

    const storedServices = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('service-')) {
        storedServices.push(localStorage.getItem(key).slice(1, -1));
      }
    }

    try {
      console.log(storedServices);
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: storedServices
      });

      const server = await device.gatt.connect();
      console.log("Connected");
      const gattServices = await server.getPrimaryServices();

      const processedServices = gattServices.map(service => {
        return {
          uuid: service.uuid,
          characteristics: service.getCharacteristics().then(characteristics => {
            return characteristics.map(characteristic => {
              const permissions = [];
              if (characteristic.properties.read) permissions.push('r');
              if (characteristic.properties.write) permissions.push('w');
              if (characteristic.properties.notify) permissions.push('n');
              const rwnString = permissions.join('');
              console.log("Permission = ", rwnString);

              return {
                uuid: characteristic.uuid,
                permissionString: rwnString,
                readBtnClick: () => {
                  characteristic.readValue()
                    .then(tempValue => {
                      const decodedValue = new TextDecoder().decode(tempValue);
                      console.log("Characteristic value:", decodedValue);
                    })
                    .catch(error => {
                      console.error('Error reading characteristic value:', error);
                    });
                },
                writeBtnClick: () => console.log('Write Button Clicked'),
                notifyBtnClick: () => console.log('Notify Button Clicked'),
                waitForNotificationClick: () => console.log('Wait for Notification Clicked'),
                value: "",
                onValueChange: () => console.log('Value Changed'),
              };
            });
          })
        };
      });

      const firstServiceUUID = processedServices[0].uuid;
      const firstServiceCharacteristics = await processedServices[0].characteristics;
      console.log("Passed chars = ", firstServiceCharacteristics);
      setServices([firstServiceUUID, firstServiceCharacteristics]);
    } catch (error) {
      console.error('Error connecting to device:', error);
      setConnected(false);
    }
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <h1 style={{ fontSize: '2rem' }}>PebBLE</h1>
        <h5>*Works on Chrome and Edge</h5>

        <ServiceListView />

        <p style={{ fontSize: '0.8rem' }}>
          Automatic discovery of services is not supported in Web Bluetooth.
        </p>
        <ConnectButton connected={connected} onClick={handleConnect} />

        <div style={{ marginTop: 50 }} />
        <ShortcutListView />
      </aside>

      <main className="content">
        <section className="">
          <h2 id="device-name" style={{ fontSize: '2rem' }}>
            Device
          </h2>
          <div className="horizontal-row">
            <p id="mac" style={{ fontSize: '1rem' }}>
              MAC: (not supported)
            </p>
            <p id="rssi">RSSI: (not supported)</p>
            <p id="conn-interval">Connection Interval: (not supported)</p>
          </div>
        </section>
        <div className="card-container" id="main">
          {services.length > 0 && (
            <ServiceView
              uuid={services[0]}
              characteristics={services[1]} // Access the promise from the service object
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
