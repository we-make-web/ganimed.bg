import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv-webpack';

const config = (env, options): Configuration => {
  const devMode = options.mode !== 'production';

  return {
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      clean: true,
      publicPath: '/',
    },
    entry: './src/index.tsx',
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(scss|css)$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: require(path.join(__dirname, 'src/assets/scss/shared-scss-code.js')),
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: 'file-loader',
          options: {
            outputPath: 'img',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: 'file-loader',
          options: {
            outputPath: 'fonts',
          },
        },
      ],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
      new Dotenv(),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
      new HtmlWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: 'static',
            to: 'static',
          },
        ],
      }),
    ],
    devtool: devMode ? 'eval-source-map' : 'source-map',
    devServer: {
      static: path.join(__dirname, 'dist'),
      historyApiFallback: true,
      host: 'localhost',
      port: 8080,
      hot: true,
    },
  };
};

export default config;
