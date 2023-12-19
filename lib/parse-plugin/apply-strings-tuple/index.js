import {types} from 'putout';

const {isStringLiteral} = types;

export const report = () => `Apply strings tuple`;

export const replace = () => ({
    '[__a, __b]': ({__a, __b}, path) => {
        const [__aPath, __bPath] = path.get('elements');
        const status = isStringLiteral(__a) ? __a.value : __aPath.toString();
        const name = isStringLiteral(__b) ? __b.value : __bPath
            .toString()
            .replace(/\s/g, '') + '';
        
        return `["${status}", "${name}"]`;
    },
});
