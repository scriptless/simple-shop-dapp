const webpack = require("webpack")

module.exports = function override(config, env) {
    // New config, e.g. config.plugins.push...
    config.plugins.push(
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
            process: "process/browser",
        }),
    );
    config.resolve.fallback = {
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        os: require.resolve("os-browserify/browser"),
        url: require.resolve("url"),
        assert: require.resolve("assert"),
    };
    return config
}