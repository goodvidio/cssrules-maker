const path = require('path');
const testWrap = require(path.resolve('./test/helpers/wrap'));

testWrap(
    'comment 1',
    `/* hello world */`,
    ``
);

testWrap(
    'comment 2',
    `/* hello world */.a{color: red}`,
    `module.insertRule('.a{color: red;}');`
);
