import {
    operator,
    types,
} from 'putout';

const {isStringLiteral} = types;
const {getTemplateValues} = operator;

const REPORT = 'export const report = () => __a';
const REPORT_COMMONJS = 'module.exports.report = () => __a';
const ASSIGN = 'export const report = __a';

const templates = [
    REPORT,
    REPORT_COMMONJS,
    ASSIGN,
];

export const report = ({value}) => value;
export const fix = () => {};
export const traverse = ({push}) => {
    const visitors = {};
    
    for (const template of templates) {
        visitors[template] = process({
            push,
            template,
        });
    }
    
    return visitors;
};

const process = ({push, template}) => (path) => {
    const {__a} = getTemplateValues(path, template);
    
    if (!__a)
        return;
    
    const value = parseValue(__a);
    
    push({
        path,
        value,
    });
    
    path.stop();
};

function parseValue(a) {
    if (isStringLiteral(a))
        return a.value;
    
    return a.quasis[0].value.cooked;
}
