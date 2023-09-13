# check-version-modules
Check modules's version for the package.

[![Build status](https://api.travis-ci.org/Psychopoulet/check-version-modules.svg?branch=master)](https://travis-ci.org/Psychopoulet/check-version-modules)
[![Coverage status](https://coveralls.io/repos/github/Psychopoulet/check-version-modules/badge.svg?branch=master)](https://coveralls.io/github/Psychopoulet/check-version-modules)
[![Dependency status](https://david-dm.org/Psychopoulet/check-version-modules/status.svg)](https://david-dm.org/Psychopoulet/check-version-modules)
[![Dev dependency status](https://david-dm.org/Psychopoulet/check-version-modules/dev-status.svg)](https://david-dm.org/Psychopoulet/check-version-modules?type=dev)
[![Issues](https://img.shields.io/github/issues/Psychopoulet/check-version-modules.svg)](https://github.com/Psychopoulet/check-version-modules/issues)
[![Pull requests](https://img.shields.io/github/issues-pr/Psychopoulet/check-version-modules.svg)](https://github.com/Psychopoulet/check-version-modules/pulls)

## Installation

```bash
$ npm install check-version-modules
```

## Features

  * Extract package's dependencies & dev dependencies
  * Extract there versions
  * Compare them to the latest package's version

## Doc

### Supported patterns

> does not support artifacts like "-beta"
> each "*" character will be understood like a "x"'
> here, "n" is a whatever number sample, like "1"

Does support following patterns:

  * x (=> x.x.x)
  * x.x.n (=> x.x.x)
  * x.n.n (=> x.x.x)
  * n (=> n.x.x)
  * n.x (=> n.x.x)
  * n.n (=> n.n.x)
  * n.n.n
  * ^n.n.n (=> n.x.x)
  * ~n.n.n (=> n.n.x)

### Methods

  * ``` (file: string, options?: iOptions) => Promise<boolean> ``` extract & compare data

### Interfaces

```typescript
interface iOptions {
  "failAtMajor": boolean; // default: true => if no pattern, used for the returned boolean
  "failAtMinor": boolean; // default: true => if no pattern, used for the returned boolean
  "failAtPatch": boolean; // default: false => if no pattern, used for the returned boolean
  "dev": boolean; // default: true => analyze dev deps too
}
```

### Command line options

  * ``` --fail-at-major ``` => failAtMajor = true
  * ``` --no-fail-at-major ``` => failAtMajor = false
  * ``` --fail-at-minor ``` => failAtMinor = true
  * ``` --no-fail-at-minor ``` => failAtMinor = false
  * ``` --fail-at-patch ``` => failAtPatch = true
  * ``` --no-fail-at-patch ``` => failAtPatch = false
  * ``` --dev ``` => dev = true
  * ``` --no-dev ``` => dev = false
  * ``` --file ``` => specify analyzed file with next argument, if not set analyze the "package.json" in the working directory

## Examples

### Command line

```bash
$ cd ./myProject/ && npx check-version-modules --file /etc/tests/package.json --fail-at-patch --no-dev
$ cd ./myProject/ && npx check-version-modules --no-fail-at-minor
```

### Native

```javascript
const checker = require("check-version-modules");

checker("/etc/tests/package.json", {
  "failAtPatch": true,
  "dev": false
}).then((analyze) => {
  console.log(analyze.result ? "ok": "old versions detected");
}).catch((err) => {
  console.error(err);
});
```

### Typescript

```typescript
import checker = require("check-version-modules");

checker("./package.json").then((analyze) => {
  console.log(analyze.result ? "ok": "old versions detected");
}).catch((err) => {
  console.error(err);
});
```

## Tests

```bash
$ npm run-script tests
$ git clone git://github.com/Psychopoulet/check-version-modules.git
$ cd ./check-version-modules
$ npm install
$ npm run-script tests
```

## License

  [ISC](LICENSE)
