# check-version-modules
Check modules's version for the package.

[![Build Status](https://api.travis-ci.org/Psychopoulet/check-version-modules.svg?branch=master)](https://travis-ci.org/Psychopoulet/check-version-modules)
[![Coverage Status](https://coveralls.io/repos/github/Psychopoulet/check-version-modules/badge.svg?branch=master)](https://coveralls.io/github/Psychopoulet/check-version-modules)
[![Dependency Status](https://david-dm.org/Psychopoulet/check-version-modules/status.svg)](https://david-dm.org/Psychopoulet/check-version-modules)
[![Dev dependency Status](https://david-dm.org/Psychopoulet/check-version-modules/dev-status.svg)](https://david-dm.org/Psychopoulet/check-version-modules?type=dev)

## Installation

```bash
$ npm install check-version-modules
```

## Features

  * Extract package's dependencies & dev dependencies
  * Extract there versions
  * Compare them to the latest package's version

## Doc

### Methods

  * ``` (file: string, options?: iOptions) => Promise<boolean> ``` extract & compare data

### Interfaces

```typescript
interface iOptions {
	"failAtMajor": boolean; // default: true => used for the returned boolean
	"failAtMinor": boolean; // default: true => used for the returned boolean
	"failAtPatch": boolean; // default: false => used for the returned boolean
	"dev": boolean; // default: true => analyse dev deps too
	"console": boolean; // default: true => print analyse's result in the terminal
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
	* ``` --console ``` => console = true
	* ``` --no-console ``` => console = false
	* ``` --file ``` => specify analysed file with next argument, if not set analyse the "package.json" in the working directory

## Examples

### Command line

```bash
$ cd ./myProject/ && npx check-version-modules --file /etc/tests/package.json --fail-at-patch --no-dev
$ cd ./myProject/ && npx check-version-modules --no-console --no-fail-at-minor
```

### Native

```javascript
const checker = require("check-version-modules");

checker("/etc/tests/package.json", {
	"failAtPatch": true,
	"dev": false
}).then((valid) => {
  console.log(valid ? "ok": "old versions detected");
}).catch((err) => {
  console.error(err);
});
```

### Typescript

```typescript
import checker = require("check-version-modules");

checker("./package.json").then((valid) => {
  console.log(valid ? "ok": "old versions detected");
}).catch((err) => {
  console.error(err);
});
```

## Tests

```bash
$ npm run-script tests
```

## License

  [ISC](LICENSE)
