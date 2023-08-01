const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('add-function'),
    ...getRule('hello'),
};
