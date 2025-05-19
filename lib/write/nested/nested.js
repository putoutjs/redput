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
import process from 'node:process';
import rendy from 'rendy';
import {addRule} from './add-rule/add-rule.js';
import {insertTest} from './insert-test/insert-test.js';
import {prepareRule} from './prepare-rule/prepare-rule.js';

export const writeNestedRule = async (name, data) => {
    await mkdir(`./${name}`, {
        recursive: true,
    });
    
    const code = prepareRule(data);
    
    await writeFile(`./${name}/index.js`, code);
};

export const writeNestedFixtures = async (name, data, ext) => {
    await mkdir(`./${name}/fixture`, {
        recursive: true,
    });
    
    await writeFile(`./${name}/fixture/${name}.${ext}`, data);
    await writeFile(`./${name}/fixture/${name}-fix.${ext}`, data);
};

export const writeNestedTests = async (name, report) => {
    const templatePath = new URL('../../../templates/plugin.js', import.meta.url).pathname;
    const template = await readFile(templatePath, 'utf8');
    const nestedPluginName = basename(dirname(join(process.cwd())));
    const nested = nestedPluginName.replace('plugin-', '');
    
    await writeFile(`./${name}/index.spec.js`, rendy(template, {
        name,
        nested,
        report,
        importPath: './index.js',
    }));
};

export const updateNestedIndex = async (name, options) => {
    const source = await readFile('./index.js', 'utf8');
    const code = addRule(name, source, options);
    await writeFile(`./index.js`, code);
};

export const updateOverallNestedTest = async (name) => {
    const nestedPluginName = basename(dirname(join(process.cwd())));
    const plugin = nestedPluginName.replace('plugin-', '');
    
    const source = await readFile(`../test/${plugin}.js`, 'utf8');
    const code = insertTest(name, plugin, source);
    
    await writeFile(`../test/${plugin}.js`, code);
};

export const updateOverallNestedFixtures = async (name, data, ext) => {
    await writeFile(`../test/fixture/${name}.${ext}`, data);
    await writeFile(`../test/fixture/${name}-fix.${ext}`, data);
};
