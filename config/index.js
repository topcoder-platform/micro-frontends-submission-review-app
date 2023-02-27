/* global process */

module.exports = (() => {
  const env = process.env.NODE_ENV || "development";

  // for security reason don't let to require any arbitrary file defined in process.env
  if (["production", "development", "qa"].indexOf(env) < 0) {
    return require("./development");
  }

  return require("./" + env);
})();
