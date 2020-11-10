import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App.jsx';
import Route from '@/routers/Route.jsx'

import {Provider} from 'react-redux'
import store  from '@/store/index.js'

ReactDOM.render(
  <Provider store={store}>
     <Route/>
  </Provider>
 ,
  document.getElementById('root')
);
