import React from 'react';
import CharacteristicView from './CharacteristicView'; // Assuming CharacteristicView is in a separate file

const ServiceView = async ({ uuid, characteristics }) => {
  // Assuming characteristics is an array of objects with relevant props

  if (!uuid || !uuid.length) {
    return <p>No services found.</p>;
  }

  const resolvedCharacteristics = await characteristics;
  console.log("Chars = ", resolvedCharacteristics);
  const characteristicViews = resolvedCharacteristics?.map((characteristic) => (
    <CharacteristicView
      key={characteristic.uuid} // Assuming each characteristic object has a unique uuid prop
      uuid={characteristic.uuid}
      permissionString={characteristic.permissionString} // Assuming permissionString exists in characteristic
      readBtnClick={characteristic.readBtnClick} // Assuming read button click handler exists
      writeBtnClick={characteristic.writeBtnClick} // Assuming write button click handler exists
      notifyBtnClick={characteristic.notifyBtnClick} // Assuming notify button click handler exists
      waitForNotificationClick={characteristic.waitForNotificationClick} // Assuming wait button click handler exists
      value={characteristic.value}  // Assuming value prop exists
      onValueChange={characteristic.onValueChange} // Assuming value change handler exists
    />
  ));

  


  return (
    <section className="card">
      <h2>Unknown Service</h2>
      <p>UUID: {uuid}</p>
      {characteristicViews}
    </section>
  );
};

export default ServiceView;
