import {
    types,
    operator,
    template,
} from 'putout';

const {
    spreadElement,
    stringLiteral,
    isSpreadElement,
} = types;
const {traverse} = operator;

export const report = () => `Insert 'getRule()'`;

const createRule = template('getRule(%%name%%)');
const createRuleWithOptions = template('getRule(%%name%%, "off")');

export const match = ({options}) => {
    const check = createCheck(options);
    
    return {
        'module.exports.rules = __object': check,
        'export const rules = __object': check,
    };
};

export const replace = ({options}) => {
    const addRule = createAddRule(options);
    
    return {
        'module.exports.rules = __object': addRule,
        'export const rules = __object': addRule,
    };
};

const createAddRule = (options) => ({__object}, path) => {
    const {name, ruleOptions} = options;
    
    if (ruleOptions) {
        const node = spreadElement(createRuleWithOptions({
            name: stringLiteral(name),
        }));
        
        __object.properties.push(node);
        return path;
    }
    
    const node = spreadElement(createRule({
        name: stringLiteral(name),
    }));
    
    __object.properties.push(node);
    
    return path;
};

const createCheck = (options) => ({__object}) => {
    let exists = false;
    const {name} = options;
    
    for (const prop of __object.properties) {
        if (isSpreadElement(prop))
            continue;
        
        if (prop.key.value === name)
            return false;
    }
    
    traverse(__object, {
        [`getRule('${name}')`]: () => {
            exists = true;
        },
        [`getRule('${name}', 'off')`]: () => {
            exists = true;
        },
    });
    
    return !exists;
};

