// eslint-disable-next-line strict
"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
  throw err;
});

// Ensure environment variables are read.
require("../config/env");

const fs = require("fs");
const webpack = require("webpack");
const { createCompiler } = require("react-dev-utils/WebpackDevServerUtils");
const paths = require("../config/paths");
const configFactory = require("../config/webpack.config");
const _makeCommomResources = require("./_make-commom-resources");

const useYarn = fs.existsSync(paths.yarnLockFile);

// Warn and crash if required files are missing
// if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
//   process.exit(1);
// }

const config = configFactory("development");
const appName = require(paths.appPackageJson).name;

const useTypeScript = fs.existsSync(paths.appTsConfig);
// Create a webpack compiler that is configured with custom messages.
createCompiler({
  appName,
  config,
  urls: { localUrlForTerminal: "Only compiled" },
  useYarn,
  useTypeScript,
  webpack,
}).watch({}, (errors, stats) => {
  if (errors) {
    console.error(errors);
  }

  console.log(
    stats.toString({
      assets: false,
      chunks: false,
      colors: true,
    })
  );
  if (errors) {
    return;
  }
  _makeCommomResources();
});
