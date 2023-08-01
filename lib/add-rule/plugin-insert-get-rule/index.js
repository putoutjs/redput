import {
    operator,
    types,
    template,
} from 'putout';

const {getTemplateValues} = operator;
const {StringLiteral, SpreadElement} = types;
const RULES = 'module.exports.rules = __object';
const GET_RULE = template('getRule(%%name%%)');

export const report = () => `Insert 'getRule()'`;

export const fix = ({__object}, {options}) => {
    const {name} = options;
    const getRuleNode = SpreadElement(GET_RULE({
        name: StringLiteral(name),
    }));
    
    __object.properties.push(getRuleNode);
};

export const traverse = ({push, options}) => ({
    [RULES](path) {
        const {__object} = getTemplateValues(path, RULES);
        const {name} = options;
        
        if (!check(name, __object))
            return;
        
        push({
            path,
            __object,
        });
    },
});

function check(name, {properties}) {
    for (const {argument} of properties) {
        const [first] = argument.arguments;
        
        if (first.value === name)
            return false;
    }
    
    return true;
}
