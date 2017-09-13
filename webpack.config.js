var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/scripts/main.js',
    output: {
        filename: './build/scripts.js'
    },
    module: {
        loaders: [
            { test: /\.scss$/, loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'sass-loader']) }
        ]
    },
    devtool: "source-map",
    plugins: [
        new ExtractTextPlugin("./build/styles.css"),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
        })]
}