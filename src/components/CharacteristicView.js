import React from 'react';

const CharacteristicView = ({
  uuid,
  permissionString, // New prop for combined permissions
  readBtnClick,
  writeBtnClick,
  notifyBtnClick,
  waitForNotificationClick, // Prop for wait button click
  value, // New prop for input value
  onValueChange, // New prop for input change handler
}) => {
  const handleInputChange = (event) => {
    onValueChange(event.target.value);
  };

  const handleSelectionChange = (event) => {
    onValueChange(event.target.value);
  };

  const hasReadPermission = permissionString.charAt(0) === 'r';
  const hasWritePermission = permissionString.charAt(1) === 'w';
  const hasNotifyPermission = permissionString.charAt(2) === 'n';

  return (
    <section className="sub-card">
      <h4>Unknown characteristics</h4>
      <p>UUID: {uuid}</p>
      <div className="horizontal-row-compressed">
        <select value={value} onChange={handleSelectionChange}>
          <option value="hex">Hex</option>
          <option value="decimal">Decimal</option>
          <option value="ascii">ASCII</option>
        </select>
        <input
          className="flex-input"
          id={`userInput-${uuid}`}
          onChange={handleInputChange}
        />
      </div>
      <div className="horizontal-row" style={{ justifyContent: 'center' }}>
        <button
          className="action-btn"
          id={`readBtn-${uuid}`}
          disabled={!hasReadPermission}
          style={{ backgroundColor: hasReadPermission ? '#fff' : '#ccc' }}
          onClick={readBtnClick}
        >
          Read
        </button>
        <button
          className="action-btn"
          id={`writeBtn-${uuid}`}
          disabled={!hasWritePermission}
          style={{ backgroundColor: hasWritePermission ? '#fff' : '#ccc' }}
          onClick={writeBtnClick}
        >
          Write
        </button>
        <button
          className="action-btn"
          id={`notifyBtn-${uuid}`}
          disabled={!hasNotifyPermission}
          style={{ backgroundColor: hasNotifyPermission ? '#fff' : '#ccc' }}
          onClick={notifyBtnClick}
        >
          Notify
        </button>
        <button
          className="action-btn"
          id={`waitForNotificationBtn-${uuid}`}
          disabled={!hasNotifyPermission}
          style={{ backgroundColor: hasNotifyPermission ? '#fff' : '#ccc' }}
          onClick={waitForNotificationClick}
        >
          Wait for Notification
        </button>
      </div>
    </section>
  );
};

export default CharacteristicView;
