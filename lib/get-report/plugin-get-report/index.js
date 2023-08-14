import {
    operator,
    types,
} from 'putout';

const {isStringLiteral} = types;
const {getTemplateValues} = operator;
const REPORT = 'export const report = () => __a';
const ASSIGN = 'export const report = __a';

export const report = ({value}) => value;
export const fix = () => {};
export const traverse = ({push}) => ({
    [REPORT](path) {
        const {__a} = getTemplateValues(path, REPORT);
        const value = parseValue(__a);
        
        push({
            path,
            value,
        });
        
        path.stop();
    },
    [ASSIGN](path) {
        const {__a} = getTemplateValues(path, ASSIGN);
        const value = parseValue(__a);
        
        push({
            path,
            value,
        });
        
        path.stop();
    },
});

function parseValue(a) {
    if (isStringLiteral(a))
        return a.value;
    
    return a.quasis[0].value.cooked;
}
