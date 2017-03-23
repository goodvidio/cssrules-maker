const path = require('path');
const testWrap = require(path.resolve('./test/helpers/wrap'));

testWrap(
    'single class',
    `.a { color: blue; }`,
    `module.insertRule('.a{color: blue;}');`
);

testWrap(
    'coma separated classes',
    `.b, .c { color: red; }`,
    `module.insertRule('.b, .c{color: red;}');`
);

testWrap(
    'single id',
    `#a { color: red; }`,
    `module.insertRule('#a{color: red;}');`
);

testWrap(
    'coma separated ids',
    `#b, #c { color: red; }`,
    `module.insertRule('#b, #c{color: red;}');`
);

testWrap(
    'id and class',
    `#b .a { color: red; }`,
    `module.insertRule('#b .a{color: red;}');`
);

testWrap(
    '2 props',
    `.a { color: red; top: 0; }`,
    `module.insertRule('.a{color: red;top: 0;}');`
);

testWrap(
    '5 props',
    `.a { color: red; top: 0; bottom: 0; left: 0; right: 0; }`,
    `module.insertRule('.a{color: red;top: 0;bottom: 0;left: 0;right: 0;}');`
);
