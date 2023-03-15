import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from 'react-auth-kit'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import refreshApi from './refreshApi';

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider authType={'cookie'}
        authName={'_auth'}
        cookieDomain={window.location.hostname}
        cookieSecure={false}
        // refresh={refreshApi}
      >

        {/* cookieSecure={window.location.protocol === "https:"}> */}
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,

);