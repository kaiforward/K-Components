// very useful, recommended! <--- TS POLYFILL
import 'ts-polyfill'; // why doesnt this work on ie!
// import 'ts-polyfill/lib/es2015-core';
// import 'ts-polyfill/lib/es2015-promise';
// import 'ts-polyfill/lib/es2015-collection';
// import 'ts-polyfill/lib/es2016-array-include';
// import 'ts-polyfill/lib/es2017-string';
// import 'ts-polyfill/lib/es2017-object';
// import 'ts-polyfill/lib/es2018-promise';
// // can be useful for certain apps...
// import 'ts-polyfill/lib/es2015-reflect';
// import 'ts-polyfill/lib/es2017-typed-arrays';
// ////////////////////////////////////////////////
// import 'promise-polyfill/src/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store/store';

import App from './App';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
