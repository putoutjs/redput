import {
    types,
    operator,
    template,
} from 'putout';

const {StringLiteral, SpreadElement} = types;
const {traverse} = operator;

export const report = () => `Insert 'getRule()'`;

const createRule = template('getRule(%%name%%)');
const createRuleWithOptions = template('getRule(%%name%%, "off")');

export const match = ({options}) => ({
    'module.exports.rules = __object': ({__object}) => {
        let exists = false;
        const {name} = options;
        
        traverse(__object, {
            [`getRule('${name}')`]: () => {
                exists = true;
            },
            [`getRule('${name}', 'off')`]: () => {
                exists = true;
            },
        });
        
        return !exists;
    },
});

export const replace = ({options}) => ({
    'module.exports.rules = __object': ({__object}, path) => {
        const {name, ruleOptions} = options;
        
        if (ruleOptions) {
            const node = SpreadElement(createRuleWithOptions({
                name: StringLiteral(name),
            }));
            
            __object.properties.push(node);
            return path;
        }
        
        const node = SpreadElement(createRule({
            name: StringLiteral(name),
        }));
        
        __object.properties.push(node);
        
        return path;
    },
});
