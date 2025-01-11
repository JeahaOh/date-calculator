const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: "./src/main.js", // 엔트리 파일 경로
  output: {
    filename: "bundle.js", // 번들 파일 이름
    path: path.resolve(__dirname, "dist"), // 번들 파일이 생성될 경로
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm-bundler.js",
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  plugins: [new VueLoaderPlugin()],
  mode: "production", // 또는 'development'
};
