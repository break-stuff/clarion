var ExtractTextPlugin = require("extract-text-webpack-plugin");

export default {
        entry: './src/scripts/main.js',
        output: {        filename: './build/scripts.js'
        },
        module: {
            loaders: [
            ]
        },
        devtool: "source-map",
        plugins: [
            new ExtractTextPlugin("./build/styles.css")
        ]
}