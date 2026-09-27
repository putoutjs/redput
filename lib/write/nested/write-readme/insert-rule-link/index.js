import {template, operator} from 'putout';

const {compare, __markdown} = operator;

export const report = ({name}) => `insert '#${name}' link to Rules`;

export const fix = ({name, list}) => {
    const nodeLink = template.ast(`li('✅ ', link('${name}', '#${name}'), ';')`);
    list.node.arguments.push(nodeLink);
};

export const traverse = ({options, push}) => {
    const {name = 'hello'} = options;
    
    return {
        [__markdown]: (path) => {
            const elements = path.get('arguments.0.elements');
            
            const {
                rules,
                heading,
                list,
            } = parseElements(elements);
            
            if (!heading)
                return;
            
            if (!list)
                return;
            
            if (hasLink(list, name))
                return;
            
            push({
                path,
                name,
                list,
                rules,
            });
        },
    };
};

function hasLink(list, name) {
    for (const link of list.node.arguments) {
        if (compare(link, `li('✅ ', link('${name}', '#${name}'), ';')`))
            return true;
    }
}

function parseElements(elements) {
    let list;
    let heading;
    
    for (const element of elements) {
        if (compare(element, `ul(__args)`)) {
            list = element;
            continue;
        }
        
        if (compare(element, `heading(2, 'Rules')`))
            heading = element;
    }
    
    return {
        list,
        heading,
    };
}
