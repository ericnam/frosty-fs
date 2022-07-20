const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "app.bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "less-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules/ag-grid-community/styles"),
        ],
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      // {
      //   test: /\.css$/i,
      //   include: path.resolve(
      //     __dirname,
      //     "node_modules/ag-grid-community/styles"
      //   ),
      //   use: ["style-loader", "css-loader"],
      // },
    ],
  },
  // resolve: {
  //   extensions: ["", ".js", ".tsx", ".jsx", ".ts", ".css"],
  // },
  devtool: "eval-source-map",
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, "public/index.html"),
    }),
  ],
});
