const transformFileSync = require('@babel/core').transformFileSync;
const path = require('path');
const fs = require('fs');
const assert = require('chai').assert;

const plugin = require('../dist/babel-plugin-log-require').default;

describe('Test require-logging injection', function() {
	it('Transform', function() {
		const inputFile = path.join(__dirname, 'fixtures', 'log-require', 'input.js');
		const outputFile = path.join(__dirname, 'fixtures', 'log-require', 'output.js');

		const transformed = transformFileSync(inputFile, {
			plugins: [[plugin]]
		}).code;

		const expectedCode = fs.readFileSync(outputFile, 'utf8')
			.replace(/\$\{filename\}/g, path.resolve(inputFile))
			.replace(/`/g, '"');
		assert.equal(transformed.trim(), expectedCode.trim());
	});
});
