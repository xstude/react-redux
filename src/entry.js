import React from 'react';
import ReactDom from 'react-dom';
import { createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import App from './view/app.js';
import reducers from './data/reducers.js';
import * as actionsLog from './data/actionCreator/log.js';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    action: bindActionCreators(actionsLog, dispatch)
});

const RootApp = connect(mapStateToProps, mapDispatchToProps)(App);
const store = createStore(reducers);

// todo
window._store = store;
// todo end

ReactDom.render(
    <Provider store={store}>
        <RootApp />
    </Provider>,
    document.getElementById('root')
);
