const path = require('path');
const test = require('ava');

const cssrules = require(path.resolve('./src/app'));

test('multiple rules 1', t => {
    const actual = `
      .a { content: " "; display: table; }
      #b { color: red; }
    `;
    const expected = [
        '.a{content: " ";display: table;}',
        '#b{color: red;}'
    ];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('multiple rules 2', t => {
    const actual = `
      .a { color: red; top: 0; bottom: 0; left: 0; right: 0; }
      @keyframes loading {
        0% { top: 0; left: 0; }
        2% { top: 50px; left: 25px; }
        100% { top: 100px; left: 100%; }
      }
    `;
    const expected = [
        '.a{color: red;top: 0;bottom: 0;left: 0;right: 0;}',
        '@keyframes loading{0%{top: 0;left: 0;} 2%{top: 50px;left: 25px;} 100%{top: 100px;left: 100%;}}'
    ];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('complex selector 1', t => {
    const actual = `.a#b.d .e::before,
    .f#b.d .e::before,
    .a#c.g .e::before,
    .a#b.g .e::before,
    .f#c.g .e::before,
    .f#b.g .e::before,
    .a#b.h .e::before,
    .f#b.h .e::before,
    #c .i::before,
    #b .i::before,
    .a#b.d .e::after,
    .f#b.d .e::after,
    .a#c.g .e::after,
    .a#b.g .e::after,
    .f#c.g .e::after,
    .f#b.g .e::after,
    .a#b.h .e::after,
    .f#b.h .e::after,
    #c .i::after,
    #b .i::after {
      content: " ";
      display: table; }`;
    const expected = ['.a#b.d .e::before, .f#b.d .e::before, .a#c.g .e::before, .a#b.g .e::before, .f#c.g .e::before, .f#b.g .e::before, .a#b.h .e::before, .f#b.h .e::before, #c .i::before, #b .i::before, .a#b.d .e::after, .f#b.d .e::after, .a#c.g .e::after, .a#b.g .e::after, .f#c.g .e::after, .f#b.g .e::after, .a#b.h .e::after, .f#b.h .e::after, #c .i::after, #b .i::after{content: " ";display: table;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('complex selector 2', t => {
    const actual = `.a#b.d .e:before,
    .f#b.d .e:before,
    .a#c.g .e:before,
    .a#b.g .e:before,
    .f#c.g .e:before,
    .f#b.g .e:before,
    .a#b.h .e:before,
    .f#b.h .e:before,
    #c .i:before,
    #b .i:before,
    .a#b.d .e:after,
    .f#b.d .e:after,
    .a#c.g .e:after,
    .a#b.g .e:after,
    .f#c.g .e:after,
    .f#b.g .e:after,
    .a#b.h .e:after,
    .f#b.h .e:after,
    #c .i:after,
    #b .i:after {
      content: " ";
      display: table; }`;
    const expected = ['.a#b.d .e:before, .f#b.d .e:before, .a#c.g .e:before, .a#b.g .e:before, .f#c.g .e:before, .f#b.g .e:before, .a#b.h .e:before, .f#b.h .e:before, #c .i:before, #b .i:before, .a#b.d .e:after, .f#b.d .e:after, .a#c.g .e:after, .a#b.g .e:after, .f#c.g .e:after, .f#b.g .e:after, .a#b.h .e:after, .f#b.h .e:after, #c .i:after, #b .i:after{content: " ";display: table;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('complex selector 3', t => {
    const actual = `.a#c.d .e::after,
    .f#c.d .e::after,
    .a#b.g .e::after,
    .a#c.g .e::after,
    .f#b.g .e::after,
    .f#c.g .e::after,
    .a#c.h .e::after,
    .f#c.h .e::after,
    #b .i::after,
    #c .i::after {
        clear: both;
    }`;
    const expected = ['.a#c.d .e::after, .f#c.d .e::after, .a#b.g .e::after, .a#c.g .e::after, .f#b.g .e::after, .f#c.g .e::after, .a#c.h .e::after, .f#c.h .e::after, #b .i::after, #c .i::after{clear: both;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('complex selector 4', t => {
    const actual = `.a#b.c .d,
    .e#b.c .d,
    .a#f.g .d,
    .a#b.g .d,
    .e#f.g .d,
    .e#b.g .d,
    .a#b.h .d,
    .e#b.h .d {
        list-style: none outside none;
        margin: 0;
        padding: 0;
    }`;
    const expected = ['.a#b.c .d, .e#b.c .d, .a#f.g .d, .a#b.g .d, .e#f.g .d, .e#b.g .d, .a#b.h .d, .e#b.h .d{list-style: none outside none;margin: 0;padding: 0;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('complex selector 5', t => {
    const actual = `.a#b.c .d>li,
    .f#b.c .d>li,
    .a#g.h .d>li,
    .a#b.h .d>li,
    .f#g.h .d>li,
    .f#b.h .d>li,
    .a#b.i .d>li,
    .f#b.i .d>li {
        display: inline-block;
    }`;
    const expected = ['.a#b.c .d>li, .f#b.c .d>li, .a#g.h .d>li, .a#b.h .d>li, .f#g.h .d>li, .f#b.h .d>li, .a#b.i .d>li, .f#b.i .d>li{display: inline-block;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('complex selector 6', t => {
    const actual = `.a.b#c.d:nth-last-child(2),
    .a.e#c.d:nth-last-child(2),
    .a.b#f.g:nth-last-child(2),
    .a.b#c.g:nth-last-child(2),
    .a.e#f.g:nth-last-child(2),
    .a.e#c.g:nth-last-child(2),
    .a.b#c.h:nth-last-child(2),
    .a.e#c.h:nth-last-child(2),
    .a#c.i:nth-last-child(2),
    .a.b#c.d:last-child,
    .a.e#c.d:last-child,
    .a.b#f.g:last-child,
    .a.b#c.g:last-child,
    .a.e#f.g:last-child,
    .a.e#c.g:last-child,
    .a.b#c.h:last-child,
    .a.e#c.h:last-child,
    .a#c.i:last-child {
      margin-right: 0;
    }`;
    const expected = ['.a.b#c.d:nth-last-child(2), .a.e#c.d:nth-last-child(2), .a.b#f.g:nth-last-child(2), .a.b#c.g:nth-last-child(2), .a.e#f.g:nth-last-child(2), .a.e#c.g:nth-last-child(2), .a.b#c.h:nth-last-child(2), .a.e#c.h:nth-last-child(2), .a#c.i:nth-last-child(2), .a.b#c.d:last-child, .a.e#c.d:last-child, .a.b#f.g:last-child, .a.b#c.g:last-child, .a.e#f.g:last-child, .a.e#c.g:last-child, .a.b#c.h:last-child, .a.e#c.h:last-child, .a#c.i:last-child{margin-right: 0;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('complex selector 7', t => {
    const actual = `.a#b.c .d button .e.f .e,
    .g#b.c .d button .e.f .e,
    .a#h.i .d button .e.f .e,
    .a#b.i .d button .e.f .e,
    .g#h.i .d button .e.f .e,
    .g#b.i .d button .e.f .e,
    .a#b.j .d button .e.f .e,
    .g#b.j .d button .e.f .e,
    .a#b.c .k button .e.f .e,
    .g#b.c .k button .e.f .e,
    .a#h.i .k button .e.f .e,
    .a#b.i .k button .e.f .e,
    .g#h.i .k button .e.f .e,
    .g#b.i .k button .e.f .e,
    .a#b.j .k button .e.f .e,
    .g#b.j .k button .e.f .e,
    .a#b.c .d button .e:hover .e,
    .g#b.c .d button .e:hover .e,
    .a#h.i .d button .e:hover .e,
    .a#b.i .d button .e:hover .e,
    .g#h.i .d button .e:hover .e,
    .g#b.i .d button .e:hover .e,
    .a#b.j .d button .e:hover .e,
    .g#b.j .d button .e:hover .e,
    .a#b.c .k button .e:hover .e,
    .g#b.c .k button .e:hover .e,
    .a#h.i .k button .e:hover .e,
    .a#b.i .k button .e:hover .e,
    .g#h.i .k button .e:hover .e,
    .g#b.i .k button .e:hover .e,
    .a#b.j .k button .e:hover .e,
    .g#b.j .k button .e:hover .e,
    .a#b.c .d button .e:focus .e,
    .g#b.c .d button .e:focus .e,
    .a#h.i .d button .e:focus .e,
    .a#b.i .d button .e:focus .e,
    .g#h.i .d button .e:focus .e,
    .g#b.i .d button .e:focus .e,
    .a#b.j .d button .e:focus .e,
    .g#b.j .d button .e:focus .e,
    .a#b.c .k button .e:focus .e,
    .g#b.c .k button .e:focus .e,
    .a#h.i .k button .e:focus .e,
    .a#b.i .k button .e:focus .e,
    .g#h.i .k button .e:focus .e,
    .g#b.i .k button .e:focus .e,
    .a#b.j .k button .e:focus .e,
    .g#b.j .k button .e:focus .e {
        color: red;
    }`;
    const expected = ['.a#b.c .d button .e.f .e, .g#b.c .d button .e.f .e, .a#h.i .d button .e.f .e, .a#b.i .d button .e.f .e, .g#h.i .d button .e.f .e, .g#b.i .d button .e.f .e, .a#b.j .d button .e.f .e, .g#b.j .d button .e.f .e, .a#b.c .k button .e.f .e, .g#b.c .k button .e.f .e, .a#h.i .k button .e.f .e, .a#b.i .k button .e.f .e, .g#h.i .k button .e.f .e, .g#b.i .k button .e.f .e, .a#b.j .k button .e.f .e, .g#b.j .k button .e.f .e, .a#b.c .d button .e:hover .e, .g#b.c .d button .e:hover .e, .a#h.i .d button .e:hover .e, .a#b.i .d button .e:hover .e, .g#h.i .d button .e:hover .e, .g#b.i .d button .e:hover .e, .a#b.j .d button .e:hover .e, .g#b.j .d button .e:hover .e, .a#b.c .k button .e:hover .e, .g#b.c .k button .e:hover .e, .a#h.i .k button .e:hover .e, .a#b.i .k button .e:hover .e, .g#h.i .k button .e:hover .e, .g#b.i .k button .e:hover .e, .a#b.j .k button .e:hover .e, .g#b.j .k button .e:hover .e, .a#b.c .d button .e:focus .e, .g#b.c .d button .e:focus .e, .a#h.i .d button .e:focus .e, .a#b.i .d button .e:focus .e, .g#h.i .d button .e:focus .e, .g#b.i .d button .e:focus .e, .a#b.j .d button .e:focus .e, .g#b.j .d button .e:focus .e, .a#b.c .k button .e:focus .e, .g#b.c .k button .e:focus .e, .a#h.i .k button .e:focus .e, .a#b.i .k button .e:focus .e, .g#h.i .k button .e:focus .e, .g#b.i .k button .e:focus .e, .a#b.j .k button .e:focus .e, .g#b.j .k button .e:focus .e{color: red;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('complex props 1', t => {
    const actual = `#a #b {
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        opacity: 0;
        /* lib-disable value */
        height: 1rem;
        width: 100%;
        margin-top: 0.5rem;
        /* lib-enable value */
        background: transparent;
    }`;
    const expected = ['#a #b{-moz-box-sizing: border-box;box-sizing: border-box;position: relative;opacity: 0;height: 1rem;width: 100%;margin-top: 0.5rem;background: transparent;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});

test('complex props 2', t => {
    const actual = `#a {
      opacity: 0.5;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      /* lib-disable val1 */
      -webkit-transition: all 0.15s;
      transition: all 0.15s;
      /* lib-enable val */
      border-bottom: 3px solid transparent;
      /* lib-disable val2 */
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      -webkit-perspective: 1000;
      perspective: 1000; }`;
    const expected = ['#a{opacity: 0.5;-webkit-transform: translate3d(0, 0, 0);transform: translate3d(0, 0, 0);-webkit-transition: all 0.15s;transition: all 0.15s;border-bottom: 3px solid transparent;-webkit-backface-visibility: hidden;backface-visibility: hidden;-webkit-perspective: 1000;perspective: 1000;}'];

    return cssrules(actual)
        .then(result => t.deepEqual(result, expected));
});
