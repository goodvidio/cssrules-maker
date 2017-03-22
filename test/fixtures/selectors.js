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
);testWrap(
    '[dir="rtl"]',
    `#a [dir="rtl"] .b {float: right}`,
    `module.insertRule('#a [dir="rtl"] .b{float: right;}');`
);

testWrap(
    'type selector',
    `form input { color: blue; }`,
    `module.insertRule('form input{color: blue;}');`
);

testWrap(
    'universal selector',
    `* { color: blue; }`,
    `module.insertRule('*{color: blue;}');`
);

testWrap(
    'id and universal selector',
    `#el * { color: blue; }`,
    `module.insertRule('#el *{color: blue;}');`
);

// Attribute selectors

    testWrap(
        '[attr] selector',
        `[attr] { color: blue; }`,
        `module.insertRule('[attr]{color: blue;}');`
    );

    testWrap(
        '[attr=val] selector',
        `[attr=val] { color: blue; }`,
        `module.insertRule('[attr=val]{color: blue;}');`
    );

    testWrap(
        '[attr~=val] selector',
        `[attr~=val] { color: blue; }`,
        `module.insertRule('[attr~=val]{color: blue;}');`
    );

    testWrap(
        '[attr|=val] selector',
        `[attr|=val] { color: blue; }`,
        `module.insertRule('[attr|=val]{color: blue;}');`
    );

    testWrap(
        '[attr^=val] selector',
        `[attr^=val] { color: blue; }`,
        `module.insertRule('[attr^=val]{color: blue;}');`
    );

    testWrap(
        '[attr$=val] selector',
        `[attr$=val] { color: blue; }`,
        `module.insertRule('[attr$=val]{color: blue;}');`
    );

    testWrap(
        '[attr*=val] selector',
        `[attr*=val] { color: blue; }`,
        `module.insertRule('[attr*=val]{color: blue;}');`
    );

    testWrap(
        '[attr i] case insensitive selector',
        `[attr i] { color: blue; }`,
        `module.insertRule('[attr i]{color: blue;}');`
    );

// Sibling selectors

testWrap(
    'Adjacent sibling selector',
    `div + p { color: blue; }`,
    `module.insertRule('div + p{color: blue;}');`
);

testWrap(
    'General sibling selector',
    `div ~ p { color: blue; }`,
    `module.insertRule('div ~ p{color: blue;}');`
);

testWrap(
    'Child selector',
    `div > p { color: blue; }`,
    `module.insertRule('div > p{color: blue;}');`
);

testWrap(
    'Descendant selector',
    `div > p { color: blue; }`,
    `module.insertRule('div > p{color: blue;}');`
);

// Pseudo element selectors

    testWrap(
        'before pseudo-element (CSS3 syntax)',
        `.a::before { color: blue; }`,
        `module.insertRule('.a::before{color: blue;}');`
    );

    testWrap(
        'after pseudo-element (CSS3 syntax)',
        `.a::after { color: blue; }`,
        `module.insertRule('.a::after{color: blue;}');`
    );

    testWrap(
        'before pseudo-element (CSS3 syntax) with content',
        `.a::before { content: ""; color: blue; }`,
        `module.insertRule('.a::before{content: "";color: blue;}');`
    );

    testWrap(
        'after pseudo-element (CSS3 syntax) with content',
        `.a::after { content: ""; color: blue; }`,
        `module.insertRule('.a::after{content: "";color: blue;}');`
    );

    testWrap(
        'before pseudo-element (CSS2 syntax)',
        `.a:before { color: blue; }`,
        `module.insertRule('.a:before{color: blue;}');`
    );

    testWrap(
        'after pseudo-element (CSS2 syntax)',
        `.a:after { color: blue; }`,
        `module.insertRule('.a:after{color: blue;}');`
    );

// Pseudo class selectors

    testWrap(
        ':active pseudo class selector',
        `a:active { color: blue; }`,
        `module.insertRule('a:active{color: blue;}');`
    );


    testWrap(
        ':checked pseudo class selector',
        `input:checked { color: blue; }`,
        `module.insertRule('input:checked{color: blue;}');`
    );
