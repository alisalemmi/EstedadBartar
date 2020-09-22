const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const entry = `frontend/${argv.n}`;
  const output = `backend/public/${argv.n}`;

  // eslint-disable-next-line no-console
  console.log(
    `📂 \u001b[32m${entry}`,
    '\u001b[30;1m→\u001b[34m',
    output,
    '\u001b[0m\n'
  );

  return {
    entry: `./${entry}/js/index.js`,
    output: {
      filename: './js/bundle.js',
      path: path.resolve(__dirname, output)
    },
    devServer: {
      contentBase: `./${output}`
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: `./${entry}/pug/index.pug`
      }),
      new MiniCssExtractPlugin({
        filename: 'css/main.css'
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.pug$/,
          exclude: /node_modules/,
          loader: ['html-loader', 'pug-html-loader']
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: [
            argv.mode !== 'production'
              ? 'style-loader'
              : {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: '../'
                  }
                },
            'css-loader',
            'postcss-loader',
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: '@epegzz/sass-vars-loader',
              options: {
                syntax: 'scss',
                files: [path.resolve(__dirname, entry, 'config.json')]
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|svg|ttf|woff|woff2|wav)$/i,
          loader: 'file-loader',
          options: {
            name: '[folder]/[name].[ext]'
          }
        }
      ]
    }
  };
};
