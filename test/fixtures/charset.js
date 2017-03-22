const path = require('path');
const testWrap = require(path.resolve('./test/helpers/wrap'));

testWrap(
    'UTF-8 charset',
    `@charset "UTF-8";`,
    `module.insertRule('@charset "UTF-8";');`
);

testWrap(
    'iso-8859-15 charset',
    `@charset "iso-8859-15";`,
    `module.insertRule('@charset "iso-8859-15";');`
);
