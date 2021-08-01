const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

const babel = {
    loader: 'babel-loader',
    options: {
        babelrc: false,
        presets: ['react'],
    },
};

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public")
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [babel, 'source-map-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                loader: [babel, "awesome-typescript-loader"]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.less$/,
                loader: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html',}),
        new TsConfigPathsPlugin({tsconfig: __dirname + '/tsconfig.json', compiler: 'typescript' })
    ],
    devServer: {
        contentBase: "./public/",
        inline: true,
        port: 8080,
        open: true,
        openPage:''
  },
};