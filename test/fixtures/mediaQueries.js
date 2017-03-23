const path = require('path');
const testWrap = require(path.resolve('./test/helpers/wrap'));

testWrap(
    'media print 1',
    `@media print {
        body {
            font-size: 16px;
        }

        p {
            padding: 1em;
        }
    }`,
    `module.insertRule('@media print{body{font-size: 16px;},p{padding: 1em;}}');`
);

testWrap(
    'media list',
    `@media screen, projection {
        body {
            font-size: 16px;
        }
    }`,
    `module.insertRule('@media screen, projection{body{font-size: 16px;}}');`
);

testWrap(
    'media query 1',
    `@media screen and (max-device-width: 480px), screen and (max-width: 480px) {
        .a {
            display: block;
        }
    }`,
    `module.insertRule('@media screen and (max-device-width: 480px), screen and (max-width: 480px){.a{display: block;}}');`
);

testWrap(
    'media query 2',
    `@media only screen
        and (min-device-width: 320px)
        and (max-device-width: 480px)
        and (-webkit-min-device-pixel-ratio: 2) {
            body { line-height: 1.4 }
    }`,
    `module.insertRule('@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2){body{line-height: 1.4;}}');`
);
