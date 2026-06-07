const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 1. Add this import


module.exports = (webpackConfigEnv, argv) => {
  const orgName = "raya-website";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    // 1. Remove the module rules for .html you added earlier
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        // 2. The '!!' tells webpack to ignore all other loaders
        // 'html-resouce-loader' or just the raw path usually works here
        template: "!!html-webpack-plugin/lib/loader.js!src/index.html",
      }),
      // 2. Add the Copy Plugin here
      new CopyWebpackPlugin({
        patterns: [
          { 
            from: "public", 
            to: ".", // This copies contents of public/ directly into dist/
            noErrorOnMissing: true // Prevents build crash if public is empty
          },
        ],
      }),
    ],
  });
};
