import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, App as AntApp } from 'antd';
import esES from 'antd/locale/es_ES';
import App from './App';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      locale={esES}
      theme={{
        token: {
          colorPrimary: '#6c63ff',
          borderRadius: 8,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        },
        components: {
          FloatButton: {
            colorPrimary: '#6c63ff',
          },
          Modal: {
            borderRadiusLG: 16,
          },
          Button: {
            colorPrimary: '#6c63ff',
          },
          Badge: {
            colorPrimary: '#6c63ff',
          },
        },
      }}
    >
      <AntApp>
        <App />
      </AntApp>
    </ConfigProvider>
  </React.StrictMode>
);