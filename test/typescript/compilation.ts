/// <reference path="../../lib/index.d.ts" />

import * as checker from '../../lib/main.js';

checker("./package.json").then((valid) => {
  console.log(valid ? "ok": "old versions detected");
}).catch((err) => {
  console.error(err);
});
