import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Auth0Provider
          domain="dev-q87g7wu5wa7qdee6.us.auth0.com"
          clientId="qaP0kGdJZqrZPQqL8tbxDtpM7ZOvZUXK"
          authorizationParams={{
              redirect_uri: window.location.origin
          }}
      >
          <App />
      </Auth0Provider>

  </React.StrictMode>,
)
