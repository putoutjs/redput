import halts, {loopProtect} from 'halting-problem';

const TIMEOUT = 10 * 1000;

export default function protectFromLoops(jsCode) {
    halts(jsCode);

    const start = Date.now();

    jsCode = loopProtect(jsCode, [
        '(function (line) {',
        'if (Date.now() > ' + (start + TIMEOUT) + ') {',
        '  throw new Error("Infinite loop detected on line " + line);',
        '}',
        '})',
    ].join(''));

    return jsCode;
}