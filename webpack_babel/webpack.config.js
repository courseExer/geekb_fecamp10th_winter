// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  target: ["web", "node"], // 默认值“browserslist”导致hotReload失败，所以这里直接指定为web
  devServer: {
    open: true,
    host: "localhost",
    hot: true,
  },
  // https://webpack.js.org/configuration/plugins/
  plugins: [
    new HtmlWebpackPlugin({
      title: "main",
      template: "index.html",
    }),
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
  ],
  // https://webpack.js.org/loaders/
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.less$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    config.plugins.push(new MiniCssExtractPlugin());
    config.devtool = "source-map";
  } else {
    config.mode = "development";
    config.devtool = "eval-cheap-source-map";
  }
  return config;
};
