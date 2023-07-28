# redput [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

![image](https://user-images.githubusercontent.com/1573141/223524904-4175548f-1e30-4745-bf2e-c2f4ea39fef5.png)

[NPMURL]: https://npmjs.org/package/redput "npm"
[NPMIMGURL]: https://img.shields.io/npm/v/redput.svg?style=flat
[BuildStatusURL]: https://github.com/coderaiser/redput/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/redput/workflows/Node%20CI/badge.svg
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[CoverageURL]: https://coveralls.io/github/coderaiser/redput?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/redput/badge.svg?branch=master&service=github

CLI tool to download rule and fixture from 🐊**Putout Editor**.

## Install

```
npm i redput -g
```

# Usage

```sh
GITHUB_TOKEN=github-token redput [putout-editor-url]
```

`redput` determines where it located and does one of two:
- when finds `index.js` it creates rule inside nested plugin;
- create directory with a plugin name and fiils `lib`, `test` and `fixture`;

## License

MIT
