let cssLocalIdent;
if (process.env.APPMODE === 'production') {
  cssLocalIdent = '[hash:base64:6]';
} else {
  cssLocalIdent = 'challenges_[path][name]___[local]___[hash:base64:6]';
}

const config = {
  presets: [
    ['@babel/preset-env', { targets: { 'browsers': ['> 1%', 'not dead'] } }],
    '@babel/preset-react'
  ],
  plugins: [
    ['module-resolver', {
      extensions: ['.js', '.jsx'],
      root: [
        './src',
      ],
    }],
    [
      'inline-react-svg',
      {
        ignorePattern: '[/\/]assets[/\/]images'
      }
    ],
    [
      "@babel/plugin-transform-runtime",
      {
        useESModules: true,
        regenerator: false,
      },
    ],
    ['react-css-modules', {
      filetypes: {
        '.scss': {
          syntax: 'postcss-scss',
        },
      },
      generateScopedName: cssLocalIdent
    }],
  ]
};

module.exports = config;
