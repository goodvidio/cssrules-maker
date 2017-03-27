const utils = {};

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
    stringify,
    isSimple,
    notSupportedYet,
    cleanupTokens
};
