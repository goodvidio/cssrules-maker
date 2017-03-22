const path = require('path');
const testWrap = require(path.resolve('./test/helpers/wrap'));

testWrap(
    'counter-style 1',
    `@counter-style nums {
        system: fixed;
        symbols: 1 2 3 4 5;
        suffix: " ";
    }`,
    `module.insertRule('@counter-style nums{system: fixed;symbols: 1 2 3 4 5;suffix: " ";}');`
);

testWrap(
    'counter-style 2',
    `@counter-style svg {
        system: fixed;
        symbols: url(a.svg) url(b.svg) url(c.svg);
        suffix: " ";
    }`,
    `module.insertRule('@counter-style svg{system: fixed;symbols: url(a.svg) url(b.svg) url(c.svg);suffix: " ";}');`
);
