import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import App from './App/App';

const entryId = 'root';
const appEntry = document.getElementById(entryId);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  appEntry,
);
