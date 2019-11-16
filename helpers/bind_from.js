
module.exports.bind_args_from_n = function (fn, context, n, ...bound_args) {
    fn = fn.bind(context);
    return function(...args) {
        return fn(...args.slice(0, n-1), ...bound_args);
    };
};
