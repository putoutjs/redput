import {
    operator,
    types,
    print,
} from 'putout';

const {isStringLiteral} = types;
const {getTemplateValues} = operator;

const REPORT = 'export const report = (__args) => __a';
const REPORT_COMMONJS = 'module.exports.report = (__args) => __a';
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
    
    let value;
    
    operator.traverse(a, {
        ReturnStatement(path) {
            value = print(path.get('argument'));
        },
    });
    
    if (!value)
        value = print(a).slice(1, -3);
    
    return value.replaceAll('${', '{');
}
