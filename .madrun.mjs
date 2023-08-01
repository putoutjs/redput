import {run} from 'madrun';

const NODE_OPTIONS = `'--loader escover --no-warnings'`;

const env = {
    ESCOVER_FORMAT: 'lines',
    NODE_OPTIONS,
};

export default {
    'lint': () => 'putout .',
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'test': () => `tape 'test/**/*.js' '{lib,bin}/**/*.spec.{js,mjs}'`,
    'test:mock': async () => [env, await run('test:only')],
    'watch:test': async () => await run('watcher', await run('test')),
    'watch:tape': () => 'nodemon -w test -w lib --exec tape',
    'watch:lint': async () => await run('watcher', await run('lint')),
    'watcher': () => 'nodemon -w test -w lib -w bin --exec',
    'coverage:c8': async () => `c8 ${await run('test')}`,
    'coverage': async () => [env, `escover ${await run('test')}`],
    'report': () => 'c8 report --reporter=lcov',
    'postpublish': () => 'npm i -g',
};
