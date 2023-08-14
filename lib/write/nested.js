import {
    mkdir,
    readFile,
    writeFile,
} from 'fs/promises';
import {
    basename,
    dirname,
    join,
} from 'path';
import rendy from 'rendy';

export const writeNestedRule = async (name, data) => {
    await mkdir(`./${name}`, {
        recursive: true,
    });
    
    await writeFile(`./${name}/index.js`, data);
};

export const writeNestedFixtures = async (name, data) => {
    await mkdir(`./${name}/fixture`, {
        recursive: true,
    });
    
    await writeFile(`./${name}/fixture/${name}.js`, data);
    await writeFile(`./${name}/fixture/${name}-fix.js`, data);
};

export const writeNestedTests = async (name, report) => {
    const templatePath = new URL('../../templates/plugin.js', import.meta.url).pathname;
    const template = await readFile(templatePath, 'utf8');
    const nestedPluginName = basename(dirname(join(process.cwd(), '..')));
    const nested = nestedPluginName.replace('plugin-', '');
    
    await writeFile(`./${name}/index.spec.js`, rendy(template, {
        name,
        nested,
        report,
        importPath: '.',
    }));
};
