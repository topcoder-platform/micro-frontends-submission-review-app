module.exports = {
  rootDir: "src",
  transform: {
    "^.+\\.(j|t)sx?$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/?!(react-dropzone)"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "\\.(png|eot|otf|ttf|woff|woff2|svg)$": "<rootDir>/__mocks__/fileMock.js",

  },
  setupFilesAfterEnv: [
    "../node_modules/@testing-library/jest-dom/dist/index.js",
    "../config/jest/setup.js",
  ],
};
