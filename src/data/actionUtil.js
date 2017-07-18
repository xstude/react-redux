export const makeActionCreator = function (type, ...argNames) {
    return function(...args) {
        let action = { type };
            argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index];
        });
        return action;
    };
};

export const makeAsyncActionCreator = function (fn) {
    return function () {
        let { dispatch, getState } = window._store;
        fn(dispatch, getState).apply(undefined, arguments);

        return {
            type: 'ASYNC'
        };
    };
};
