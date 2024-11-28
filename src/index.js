import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />,
    document.getElementById('root'),
    document.getElementById('root').style.setProperty('display', 'flex'),
    document.getElementById('root').style.setProperty('flex-direction', 'column'),
    document.getElementById('root').style.setProperty('height', '100vh'),
    // document.getElementById('root').style.setProperty('margin', '0'),
    // document.getElementById('root').style.setProperty('padding', '0'),
    document.getElementById('root').style.setProperty('background-color', '#222'),
);



