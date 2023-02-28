const { defineConfig } = require("@vue/cli-service");
// const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    // resolve: {
    //   alias: {
    //     "@": path.resolve(__dirname, "src"),
    //   },
    // },
    module: {
      rules: [
        {
          test: /\.glsl$/,
          use: ["webpack-glsl-loader"],
        },
      ],
    },
    plugins: [
      require("unplugin-auto-import/webpack")({
        imports: ["vue"],
      }),
    ],
  },
});
