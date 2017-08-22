import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import MainContainer from './containers/MainContainer';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import 'normalize.css';

import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import configureStore from './store';
export const store = configureStore();
export const history = createHistory();
const root = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <LocaleProvider locale={enUS}>
        <AppContainer>
          <MainContainer />
        </AppContainer>
      </LocaleProvider>
    </Provider>,
    root
  );
};

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./containers/MainContainer', () => {
    const NextApp = require('./containers/MainContainer').default;
    ReactDOM.render(
      <Provider store={store}>
        <LocaleProvider locale={enUS}>
          <AppContainer>
            <NextApp />
          </AppContainer>
        </LocaleProvider>
      </Provider>,
      root
    );
  });
}

render();
