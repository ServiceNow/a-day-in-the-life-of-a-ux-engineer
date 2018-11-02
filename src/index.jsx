import React from 'react'
import ReactDOM from 'react-dom'

import { AppContainer } from 'react-hot-loader'

import './web_components'

ReactDOM.render(
  <AppContainer>
    <x-app></x-app>
  </AppContainer>,
  document.getElementById('app'),
);
module.hot.accept();