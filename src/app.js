const postcss = require('postcss');
const parsers = require('./parsers');
const modulify = require('./utils').modulify;
const isSimple = require('./utils').isSimple;

const cssrules = (css) => {
    return postcss()
        .process(css)
        .then(result => {

            return parsers.root(result.root)
                .map(data => {

                    if (isSimple(data)) {
                        return modulify.simple(
                            data.selector,
                            data.params
                        );
                    } else {
                        return modulify.wrap(
                            data.selector,
                            data.props || data.rules
                        );
                    }
                })
                .join('\n');
        });
};

module.exports = cssrules;
