import { makeActionCreator, makeAsyncActionCreator } from '../actionUtil.js';
import {
    LOG_INIT_COMPLETE,
    LOG_GET_CITY_COMPLETE,
    LOG_SEARCH_BEGIN,
    LOG_SEARCH_COMPLETE
} from '../actionType/log.js';

const hostApi = 'http://www.easy-mock.com/mock/596ccc11a1d30433d8359503/api';

// get city
const logGetCityComplete = makeActionCreator(LOG_GET_CITY_COMPLETE, 'data');
export const logGetCity = makeAsyncActionCreator((dispatch, getState) => provinceItem => {
    fetch(hostApi + '/city/list?provinceId=' + provinceItem.key)
        .then(res => res.json())
        .then(data => dispatch(logGetCityComplete(data)))
        .catch(e => console.log(e));
});

// search
const logSearchBegin = makeActionCreator(LOG_SEARCH_BEGIN);
const logSearchComplete = makeActionCreator(LOG_SEARCH_COMPLETE, 'data', 'filter');
export const logSearch = makeAsyncActionCreator((dispatch, getState) => params => {
    dispatch(logSearchBegin());

    let filter = Object.assign({}, getState().log.filter, params);

    let fn = function () {
        let qdata = {};
        if (!params || !params.page) {
            filter.page = 1;
        }
        qdata.page = filter.page;
        qdata.pageSize = filter.pageSize;
        if (filter.provinceName && filter.provinceName !== '全部') {
            qdata.provinceName = filter.provinceName;
        }
        if (filter.cityName && filter.cityName !== '全部') {
            qdata.cityName = filter.cityName;
        }
        if (filter.module && filter.module !== '-1') {
            qdata.module = filter.module;
        }
        if (filter.operatorName) {
            qdata.operatorName = filter.operatorName;
        }
        if (filter.projectName) {
            qdata.projectName = filter.projectName;
        }
        if (filter.startTime) {
            qdata.startTime = +new Date(filter.startTime);
        }
        if (filter.endTime) {
            qdata.endTime = +new Date(filter.endTime);
        }
        let querystring = require('querystring');
        return querystring.stringify(qdata);
    };

    let qs = fn();
    fetch(hostApi + '/record/list?' + qs)
        .then(res => res.json())
        .then(data => dispatch(logSearchComplete(data, filter)))
        .catch(e => dispatch(logSearchComplete(e, filter)));
});

// init
const logInitComplete = makeActionCreator(LOG_INIT_COMPLETE, 'data');
export const logInit = makeAsyncActionCreator((dispatch, getState) => () => {
    fetch(hostApi + '/city/province')
        .then(res => res.json())
        .then(data => {
            dispatch(logInitComplete(data))
            dispatch(logSearch())
        })
        .catch(e => console.log(e));
});
