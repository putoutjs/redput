import {operator} from 'putout';

const {stringify} = JSON;
const {assign, keys} = Object;
const {fromJS, toJS} = operator;

export function maybeInsertRuleToJson(name, json) {
    if (!json)
        return [];
    
    if (json.extension !== 'json')
        return [];
    
    const result = toJS(insertRuleToJson(name, fromJS(json.source)));
    
    return [result];
}

function insertRuleToJson(name, json) {
    const object = JSON.parse(json);
    const [plugin] = keys(object.rules)[0].split('/');
    
    assign(object.rules, {
        [`${plugin}/${name}`]: 'on',
    });
    
    return stringify(object, null, 4);
}

