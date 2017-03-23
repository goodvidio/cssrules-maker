const path = require('path');
const fs = require('fs');

const testWrap = require(path.resolve('./test/helpers/wrap'));

const files = [
    'sample_1',
];

files.map(file => {
    const actual = fs.readFileSync(path.resolve(`./test/fixtures/files/${file}.css`), 'utf8');
    const expected = fs.readFileSync(path.resolve(`./test/fixtures/files/${file}.js`), 'utf8');

    testWrap(
        file + '.css',
        actual,
        `@font-face {font-family: "Open Sans";font-style: normal;font-weight: 400;src: local("Open Sans"), local("OpenSans"), url("data:application/x-font-woff;base64,AAA=") format("woff"); }`
    );
});
