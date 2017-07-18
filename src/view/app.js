import React from 'react';
import Log from './module/log.js';

class App extends React.Component {
    render() {
        return (
            <div className="app">
               <Log {...this.props.log} action={this.props.action} />
            </div>
        );
    }
}

export default App;
