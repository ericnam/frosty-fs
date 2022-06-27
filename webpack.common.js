const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    app: "./src/index.tsx",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src"),
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp|ico)$/i,
        // type: 'asset/resource',
        include: path.resolve(__dirname, "src"),
        use: [
          { loader: "file-loader", options: { name: "./img/[hash].[ext]" } },
        ],
      },
      {
        test: /\.otf$/,
        include: path.resolve(__dirname, "src/styles/fonts"),
        use: [
          {
            loader: "url-loader",
            options: {
              name: "./font/[hash].[ext]",
            },
          },
        ],
      },
      {
        test: /\.woff2$/,
        // type: 'asset/resource',
        include: path.resolve(__dirname, "src/styles/fonts"),
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./font/[hash].[ext]",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [new TsconfigPathsPlugin({ baseUrl: "./src" })],
  },
};
