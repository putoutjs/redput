import process from 'node:process';
import {
    mkdir,
    readFile,
    writeFile,
} from 'node:fs/promises';
import {
    basename,
    dirname,
    join,
} from 'node:path';
import {rendy} from 'rendy';

export const writeRule = async (name, data) => {
    await mkdir(`./lib`, {
        recursive: true,
    });
    
    await writeFile(`./lib/${name}.js`, data);
};

export const writeFixtures = async (name, data) => {
    await mkdir(`./test/fixture`, {
        recursive: true,
    });
    
    await writeFile(`./test/fixture/${name}.js`, data);
    await writeFile(`./test/fixture/${name}-fix.js`, data);
};

export const writeTests = async (name, report) => {
    const templatePath = new URL('../../templates/plugin.js', import.meta.url).pathname;
    const template = await readFile(templatePath, 'utf8');
    const nestedPluginName = basename(dirname(join(process.cwd(), '..')));
    const nested = nestedPluginName.replace('plugin-', '');
    
    await writeFile(`./test/${name}.js`, rendy(template, {
        name,
        nested,
        report,
        importPath: '..',
    }));
};
