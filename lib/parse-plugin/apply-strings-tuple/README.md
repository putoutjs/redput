# @putout/plugin-apply-strings-tuple [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-strings-tuple.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-strings-tuple "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds abilit to apply strings tuple. Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/34ea476503a1ffd981abd85882383ba5/67774fba230669fd88cf6b1d870743e051706f8b).

## Install

```
npm i @putout/plugin-apply-strings-tuple
```

## Rule

```json
{
    "rules": {
        "apply-strings-tuple": "on"
    }
}
```

## ❌ Example of incorrect code

```js
[off, remove-useless];
['off', remove-useless];
['off', 'remove-useless'];
```

## ✅ Example of correct code

```js
['off', 'remove-useless'];
['off', 'remove-useless'];
['off', 'remove-useless'];
```

## License

MIT
