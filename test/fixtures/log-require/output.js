'use strict';

const _logRequireTimestamp = Date.now();

console.info(`Begin loading module: ${filename}`);

function foo() {}

foo();
console.info(`Finished loading module: ${filename}:`, Date.now() - _logRequireTimestamp, "ms");
