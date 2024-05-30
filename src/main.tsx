import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components-materialUi/pages/index.tsx';
// import App from './components-antd/pages/index.tsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import './i18n.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);