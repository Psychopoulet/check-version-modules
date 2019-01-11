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

  * ``` (file: string) => Promise\<void\> ``` extract & compare data

## Examples

### Command line

```bash
$ cd ./myProject/ && npx check-version-modules
```

### Native

```javascript
const checker = require("check-version-modules");

checker("./package.json").then((valid) => {
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
