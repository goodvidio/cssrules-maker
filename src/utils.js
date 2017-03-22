const utils = {};

const modulify = {
    simple: (selector, params) => {
        const stringified = stringify.simple(selector, params);
        return `module.insertRule('${stringified}');`;
    },
    wrap: (selector, props) => {
        const stringified = stringify.wrap(selector, props);
        return `module.insertRule('${stringified}');`;
    }
};

const isSimple = function (data) {
    return !!data.params;
};

const stringify = {
    simple: function (a, b) {
        return `${a} ${b};`;
    },
    wrap: function (a, b) {
        return `${a}{${b}}`;
    }
};

const cleanupTokens = str => {
    return str
        .split('\n')
        .map(a => a.trim())
        .join(' ');
};

const notSupportedYet = function (feature) {
    throw new Error(`cannot parse ${feature} type of rule, visit this url to request this feature:\nhttps://github.com/goodvidio/cssrules-maker/issues/new`
    );
};

module.exports = {
    modulify,
    stringify,
    isSimple,
    notSupportedYet,
    cleanupTokens
};
