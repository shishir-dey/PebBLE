import React, { useEffect, useRef } from 'react';
import '../styles/global.css';

const isChrome = () => /chrome/.test(window.navigator.userAgent.toLowerCase());
const isEdge = () => /edge/.test(window.navigator.userAgent.toLowerCase());

const ConnectButton = ({ onClick }) => {
  const connectBtnRef = useRef(null);

  useEffect(() => {
    const connectBtn = connectBtnRef.current;
    if (!(isChrome() || isEdge())) {
      connectBtn.textContent = 'Unsupported Browser';
      connectBtn.style.backgroundColor = 'red';
      connectBtn.disabled = true;
    }
  }, []);

  return <button ref={connectBtnRef} onClick={onClick} className="connect-btn" id="connect-button">Connect</button>;

};

export default ConnectButton;
