# RedPut [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMURL]: https://npmjs.org/package/redput "npm"
[NPMIMGURL]: https://img.shields.io/npm/v/redput.svg?style=flat
[BuildStatusURL]: https://github.com/putoutjs/redput/actions/workflows/nodejs.yml "Build Status"
[BuildStatusIMGURL]: https://github.com/putoutjs/redput/actions/workflows/nodejs.yml/badge.svg
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[CoverageURL]: https://coveralls.io/github/putoutjs/redput?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/putoutjs/redput/badge.svg?branch=master&service=github

CLI tool to download source of a `rule` and `fixtures` from 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/33a75dce299788583a567e02f29828c8/7a97049f1c88ef9e3396d43b6a64246da0093670) and generate tests from it.

## Install

```
npm i redput -g
```

# Usage

```sh
GITHUB_TOKEN=github-token redput [putout-editor-url]
```

`redput` determines where it located and does one of next things:

- if it finds `index.js` - creates rule inside nested plugin;
- creates directory with a plugin name and fills directories `lib`, `test` and `fixture`;

example of input:

```js
// ["off", "write-all-files"]
export const report = () => `Write all files`;

export const fix = (file) => {
    const content = readFileContent(file);
    writeFileContent(file, content);
};

export const scan = (root, {push}) => {
    findFile(root, ['*']).map(push);
};
```

When you get your rule downloaded, use:

```sh
UPDATE=1 npm fix:lint test
```

to finish preparations of new rule and tests.

## License

MIT
