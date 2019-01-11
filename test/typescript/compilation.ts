/// <reference path="../../lib/index.d.ts" />

import checker = require("check-version-modules");

checker("./package.json").then((valid) => {
  console.log(valid ? "ok": "old versions detected");
}).catch((err) => {
  console.error(err);
});
