const path = require('path');
const testWrap = require(path.resolve('./test/helpers/wrap'));

testWrap(
    'import css file',
    `@import 'custom.css';`,
    `module.insertRule('@import 'custom.css';');`
);

testWrap(
    'import url print',
    `@import url("fineprint.css") print;`,
    `module.insertRule('@import url("fineprint.css") print;');`
);

testWrap(
    'import chrome:// urls',
    `@import url("chrome://communicator/skin/");`,
    `module.insertRule('@import url("chrome://communicator/skin/");');`
);

testWrap(
    'complex import 1',
    `@import url("bluish.css") projection, tv;`,
    `module.insertRule('@import url("bluish.css") projection, tv;');`
);

testWrap(
    'complex import 2',
    `@import "common.css" screen, projection;`,
    `module.insertRule('@import "common.css" screen, projection;');`
);

testWrap(
    'complex import 3',
    `@import url('landscape.css') screen and (orientation:landscape);`,
    `module.insertRule('@import url('landscape.css') screen and (orientation:landscape);');`
);
