import rendy from 'rendy';
import {
    readFile,
    writeFile,
    mkdir,
} from 'fs/promises';

import {
    dirname,
    basename,
    join,
} from 'path';

export const writeRule = async (name, data) => {
    await mkdir(`./${name}`, {
        recursive: true,
    });
    
    await writeFile(`./${name}/index.js`, data);
};

export const writeFixtures = async (name, data) => {
    await mkdir(`./${name}/fixture`, {
        recursive: true,
    });
    
    await writeFile(`./${name}/fixture/${name}.js`, data);
    await writeFile(`./${name}/fixture/${name}-fix.js`, data);
};

export const writeTestForNested = async (name, report) => {
    const templatePath = new URL('../templates/nested.js', import.meta.url).pathname;
    const template = await readFile(templatePath, 'utf8');
    const nestedPluginName = basename(dirname(join(process.cwd(), '..')));
    const nested = nestedPluginName.replace('plugin-', '');
    
    await writeFile(`./${name}/index.spec.js`, rendy(template, {
        name,
        nested,
        report,
    }));
};

