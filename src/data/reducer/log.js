import format from '../../lib/format.js';
import {
    LOG_INIT_COMPLETE,
    LOG_GET_CITY_COMPLETE,
    LOG_SEARCH_BEGIN,
    LOG_SEARCH_COMPLETE
} from '../actionType/log.js';

const initialState = {
    filter: {
        provinceId: '-1',
        provinceName: '全部',
        provinceList: [],
        cityId: '',
        cityName: '',
        cityList: [],
        projectName: '',
        module: '-1',
        moduleText: '全部',
        moduleList: [
            {
              "key": -1,
              "value": "全部"
            },
            {
              "key": 0,
              "value": "楼盘管理"
            },
            {
              "key": 1,
              "value": "spider数据校对"
            },
            {
              "key": 2,
              "value": "新建楼盘审核"
            },
            {
              "key": 3,
              "value": "楼盘信息审核"
            },
            {
              "key": 4,
              "value": "spider楼盘更新监控"
            },
            {
              "key": 5,
              "value": "楼盘点评审核"
            },
            {
              "key": 6,
              "value": "点评审核记录"
            }
        ],
        operatorName: '',
        startTime: '',
        endTime: '',
        page: 0,
        pageSize: 10
    },
    table: {
        loading: false,
        list: []
    },
    page: {
        current: 1,
        total: 0
    }
};

const log = (state = initialState, action) => {
    if (action.type === LOG_INIT_COMPLETE) {
        let nstate = Object.assign({}, state);
        nstate.filter.provinceList = action.data.data;
        nstate.filter.provinceList.unshift({ provinceId: -1, provinceName: '全部' });
        return nstate;
    }

    if (action.type === LOG_GET_CITY_COMPLETE) {
        let nstate = Object.assign({}, state);
        state.filter.cityList = action.data.data;
        state.filter.cityList.unshift({ cityId: -1, cityName: '全部' });
        return nstate;
    }

    if (action.type === LOG_SEARCH_BEGIN) {
        let nstate = Object.assign({}, state);
        nstate.table.loading = true;
        return nstate;
    }

    if (action.type === LOG_SEARCH_COMPLETE) {
        let nstate = Object.assign({}, state);
        let fn = function (mid) {
            let mtext = '';
            nstate.filter.moduleList.forEach(item => {
                if (item.key === mid) {
                    mtext = item.value;
                }
            });
            return mtext;
        };
        let data = action.data;
        let filter = action.filter;
        try {
            nstate.page.total = data.data.total;
            nstate.page.current = filter.page;
            nstate.filter = filter;
            nstate.table.list = data.data.list.map(item => {
                item.operateTime = format.dateToString(item.operateTime);
                item.moduleText = fn(item.module);
                return item;
            });
        } catch(e) {
            console.log('系统提示', '数据加载失败！');
        } finally {
            nstate.table.loading = false;
        }
        return nstate;
    }

    return initialState;
};

module.exports = log;
