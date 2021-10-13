const config = require("config");

global.process.env = {...global.process.env, ...config};
