process.env.NODE_ENV = process.env.APPENV;

const config = require("config");
const _ = require("lodash");
const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const autoprefixer = require("autoprefixer");
const path = require("path");
const webpack = require("webpack");

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "topcoder",
    projectName: "micro-frontends-submission-review-app",
    webpackConfigEnv,
    disableHtmlGeneration: true,
  });

  const unusedFilesWebpackPlugin = defaultConfig.plugins.find(
    (p) => p.constructor.name === "UnusedFilesWebpackPlugin"
  );
  unusedFilesWebpackPlugin.globOptions.ignore.push(
    "assets/icons/*.svg",
    "__mocks__/**"
  );

  let cssLocalIdent;
  if (process.env.APPMODE === "production") {
    cssLocalIdent = "[hash:base64:6]";
  } else {
    cssLocalIdent = "challenges_[path][name]___[local]___[hash:base64:6]";
  }

  // modify the webpack config however you'd like to by adding to this object
  return webpackMerge.smart(defaultConfig, {
    // we have to list here all the microapps which we would like to use in imports
    // so webpack doesn't tries to import them
    externals: {
      "@topcoder/micro-frontends-navbar-app":
        "@topcoder/micro-frontends-navbar-app",
      react: "react",
      "react-dom": "react-dom",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: "submission-review-app",
    },
    module: {
      rules: [
        {
          /* Loads jsx */
          test: /\.(jsx?|svg)$/,
          exclude: [
            /node_modules/,
            /[/\\]assets[/\\]fonts/,
            /[/\\]assets[/\\]images/,
          ],
          loader: "babel-loader",
        },
        {
          /* Loads images */
          test: /\.(svg|gif|jpe?g|png)$/,
          exclude: [/[/\\]assets[/\\]fonts/],
          loader: "file-loader",
          options: {
            outputPath: "images",
          },
        },
        {
          /* Loads fonts */
          test: /\.(eot|otf|svg|ttf|woff2?)$/,
          exclude: [/[/\\]assets[/\\]images/],
          loader: "file-loader",
          options: {
            outputPath: "fonts",
          },
        },
        {
          /* Loads scss stylesheets. */
          test: /\.scss$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: cssLocalIdent,
                  mode: "local",
                },
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [autoprefixer],
                },
              },
            },
            "resolve-url-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          ..._.mapValues(config, (value) => JSON.stringify(value)),
          APPENV: JSON.stringify(process.env.APPENV),
          APPMODE: JSON.stringify(process.env.APPMODE),
        },
      }),
    ],
    resolve: {
      alias: {
        styles: path.resolve(__dirname, "src/styles"),
        assets: path.resolve(__dirname, "src/assets"),
      },
    },
    devServer: {
      hot: true,
      port: 8011,
      host: "0.0.0.0",
    },
  });
};
