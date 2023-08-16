import {template} from 'putout';

export const report = () => 'Insert test';

export const fix = ({path, nodeTest}) => {
    path.node.body.push(nodeTest);
};

export const traverse = ({push, pathStore, options}) => {
    const {plugin = 'github', rule = 'insert-test'} = options;
    const strTest = `
        test('plugin-${plugin}: transform: ${rule}', (t) => {
            t.transform('${rule}');
            t.end();
        });
    `;
    
    const nodeTest = template.ast(strTest);
    
    return {
        [strTest]: pathStore,
        Program: {
            exit(path) {
                !pathStore().length && push({
                    path,
                    nodeTest,
                });
            },
        },
    };
};
