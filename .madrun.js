import {run, cutEnv} from 'madrun';

const env = {
    SUPERTAPE_TIMEOUT: 2000,
};

export default {
    'lint': () => 'putout .',
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'test': () => [env, `tape 'test/**/*.js' '{lib,bin}/**/*.spec.{js,mjs}'`],
    'watch:test': async () => [env, await run('watcher', `"${await cutEnv('test')}"`)],
    'watch:tape': () => 'nodemon -w test -w lib --exec tape',
    'watch:lint': async () => await run('watcher', await run('lint')),
    'watcher': () => 'nodemon -w test -w lib -w bin --exec',
    'coverage': async () => [env, `c8 ${await cutEnv('test')}`],
    'report': () => 'c8 report --reporter=lcov',
    'wisdom': () => run(['lint', 'coverage']),
};
