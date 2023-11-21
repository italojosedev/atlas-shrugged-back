module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        root: ['.'],
        alias: {
          '@organization': ['./src/app/controllers/organization'],
          '@controllers': './src/app/controllers',
          '@interfaces': './src/app/interfaces',
          '@middlewares': './src/app/middlewares',
          '@models': './src/app/models',
          '@repositories': './src/app/repositories',
          '@routes': './src/app/routes',
          '@utils': './src/app/utils',
          '@validators': './src/app/validators',
          '@config': './src/config',
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
