import React, { useState, useEffect } from 'react';

const SERVICE_KEY_PREFIX = 'service-';

const ServiceListView = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem('services')) || [];
    setServices(storedServices);
  }, []);

  const handleAddService = () => {
    setServices((prevServices) => [...prevServices, ""]);
  };

  const handleSaveService = (index, value) => {
    const newServices = [...services];
    newServices[index] = value;
    setServices(newServices);
    localStorage.setItem(SERVICE_KEY_PREFIX + (index + 1), JSON.stringify(value));
    localStorage.setItem('services', JSON.stringify(newServices)); // Update the whole services array in local storage
  };

  const handleDeleteService = (index) => {
    setServices((prevServices) =>
      prevServices.filter((_, i) => i !== index)
    );
    localStorage.removeItem(SERVICE_KEY_PREFIX + (index + 1));
    const updatedServices = services.filter((_, i) => i !== index);
    localStorage.setItem('services', JSON.stringify(updatedServices)); // Update the whole services array in local storage
  };

  const handleKeyPress = (index, e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newValue = e.target.value.trim();
      handleSaveService(index, newValue);
    }
  };

  return (
    <div className="service-list-container">
      <div className="service-heading" style={{ display: 'flex', alignItems: 'center', padding: '0px' }}>
        <h4>Service</h4>
        <div style={{ marginRight: '10px' }}></div>
        <button id="add-service-button" onClick={handleAddService}>
          +
        </button>
      </div>
      <ul className="vertical-row" style={{padding: '0px'}}>
        {services.map((service, index) => (
          <li key={index}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '5px 10px' }}>
              <input
                type="text"
                value={service}
                onChange={(e) => handleSaveService(index, e.target.value)}
                onKeyPress={(e) => handleKeyPress(index, e)}
                style={{ flex: 1 }}
              />
              <div style={{ width: '10px' }}></div>
              <button onClick={() => handleDeleteService(index)} style={{ margin: 0 }}>
                -
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceListView;
