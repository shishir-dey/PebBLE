import React, { useState, useEffect } from 'react';
import CharacteristicView from './CharacteristicView'; // Assuming CharacteristicView is in a separate file

const ServiceView = ({ uuid, characteristics }) => {
  if (!uuid || !uuid.length) {
    return <p>No services found.</p>;
  }

  console.log("Resolved chars = ", characteristics);

  // Move characteristicViews creation inside a conditional rendering based on characteristics length
  const characteristicViews = characteristics.length > 0 ? characteristics.map((characteristic) => (
    <CharacteristicView
      key={characteristic.uuid} // Assuming each characteristic object has a unique uuid prop
      uuid={characteristic.uuid}
      permissionString={characteristic.permissionString} // Assuming permissionString exists in characteristic
      readBtnClick={characteristic.readBtnClick} // Assuming read button click handler exists
      writeBtnClick={characteristic.writeBtnClick} // Assuming write button click handler exists
      notifyBtnClick={characteristic.notifyBtnClick} // Assuming notify button click handler exists
      waitForNotificationClick={characteristic.waitForNotificationClick} // Assuming wait button click handler exists
      value={characteristic.value}  // Assuming value prop exists
      onValueChange={characteristic.onValueChange} // Assuming value change handler exists
    />
  )) : null;

  return (
    <section className="card">
      <h2 style={{ marginTop: '0.2rem', marginBottom: '0.2rem'}}>Unknown Service</h2>
      <p style={{ marginTop: '0.2rem'}}>UUID: {uuid}</p>
      {characteristicViews}
    </section>
  );
};

export default ServiceView;
