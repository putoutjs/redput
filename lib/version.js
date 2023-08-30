import {readFile} from 'fs/promises';

const {parse} = JSON;
const {pathname} = new URL('../package.json', import.meta.url);

export const version = async () => {
    const data = await readFile(pathname, 'utf8');
    const {version} = parse(data);
    
    return `v${version}`;
};

