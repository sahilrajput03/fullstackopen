const path = require("path");
const webpack = require("webpack");
const config = (env, argv) => {
  const backend_url =
    argv.mode === "production"
      ? "https://blooming-atoll-75500.herokuapp.com/api/notes"
      : "http://localhost:3001/notes";

  return {
    performance: { hints: false },
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "main.js",
    },
    devServer: {
      contentBase: path.resolve(__dirname, "build"),
      compress: true,
      port: 3001,
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          query: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
        {
          test: /\.css$/,
          loaders: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url),
      }),
    ],
  };
};

module.exports = config;
