import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { } from "antd";
import { BrowserRouter } from 'react-router-dom';
import AppHeader from './components/Header/header';
import PageContent from './components/PageContent';
import AppFooter from './components/Footer/footer';
import store from './store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <AppHeader />
      <PageContent />
      <AppFooter />
    </Provider>
  </BrowserRouter>
);


