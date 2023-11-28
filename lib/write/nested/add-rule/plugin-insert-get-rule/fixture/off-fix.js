const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('add-function', 'off'),
    ...getRule('hello', 'off'),
};
