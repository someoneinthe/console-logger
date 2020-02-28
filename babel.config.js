module.exports = api => {
    api.cache(true);

    return {
        plugins: [
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-transform-runtime',
        ],
        presets: ['@babel/preset-env']
    };
};
