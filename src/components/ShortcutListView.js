import React, { useState, useEffect } from 'react';

const SHORTCUT_KEY_PREFIX = 'shortcut-';

const ShortcutListView = () => {
  const [shortcuts, setShortcuts] = useState([]);

  useEffect(() => {
    const storedShortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];
    setShortcuts(storedShortcuts);
  }, []);

  const handleAddShortcut = () => {
    setShortcuts((prevShortcuts) => [...prevShortcuts, ""]);
  };

  const handleSaveShortcut = (index, value) => {
    const newShortcuts = [...shortcuts];
    newShortcuts[index] = value;
    setShortcuts(newShortcuts);
    localStorage.setItem(SHORTCUT_KEY_PREFIX + (index + 1), JSON.stringify(value));
    localStorage.setItem('shortcuts', JSON.stringify(newShortcuts)); // Update the whole shortcuts array in local storage
  };

  const handleDeleteShortcut = (index) => {
    setShortcuts((prevShortcuts) =>
      prevShortcuts.filter((_, i) => i !== index)
    );
    localStorage.removeItem(SHORTCUT_KEY_PREFIX + (index + 1));
    const updatedShortcuts = shortcuts.filter((_, i) => i !== index);
    localStorage.setItem('shortcuts', JSON.stringify(updatedShortcuts)); // Update the whole shortcuts array in local storage
  };

  const handleKeyPress = (index, e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newValue = e.target.value.trim();
      handleSaveShortcut(index, newValue);
    }
  };

  return (
    <div className="shortcut-list-container">
      <div className="shortcut-heading" style={{ display: 'flex', alignItems: 'center', padding: '0px' }}>
        <h4>Shortcut</h4>
        <div style={{ marginRight: '10px' }}></div>
        <button id="add-shortcut-button" onClick={handleAddShortcut}>
          +
        </button>
      </div>
      <ul className="vertical-row" style={{ padding: '0px' }}>
        {shortcuts.map((shortcut, index) => (
          <li key={index}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '5px 10px' }}>
              <input
                type="text"
                value={shortcut}
                onChange={(e) => handleSaveShortcut(index, e.target.value)}
                onKeyPress={(e) => handleKeyPress(index, e)}
                style={{ flex: 1 }}
              />
              <div style={{ width: '10px' }}></div>
              <button onClick={() => handleDeleteShortcut(index)} style={{ margin: 0 }}>
                -
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShortcutListView;
