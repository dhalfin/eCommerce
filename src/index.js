import React from 'react';
import ReactDOM from 'react-dom';
import '../src/assets/css/core-style.css';
// import '../src/assets/css/index.css' // try to use this if present appearance you don't like
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from './store/configure_store';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

ReactDOM.render(

  <React.StrictMode>
	  <Provider store={ store }>
      <App />
	  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();