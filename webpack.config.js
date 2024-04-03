const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");

module.exports = {
  ...defaultConfig,
  // entry: {
  //   ...defaultConfig.entry,
  //   main: path.resolve(process.cwd(), "src", "main.js"),
  //   inputs: path.resolve(process.cwd(), "src", "inputs.js"),
  // },
};
