import React from 'react';
import LogFilter from './logFilter.js'
import LogTable from './logTable.js'
import '../css/log.css';

class Log extends React.Component {
    componentDidMount() {
        this.props.action.logInit();
    }

    render() {
        return (
            <div className="log">
                <LogFilter {...this.props} />
                <LogTable {...this.props} />
            </div>
        );
    }
}

export default Log;
