const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          name: 'vendors'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public'),
          to: path.resolve(__dirname, 'dist'),
          globOptions: {
            ignore: ['**/images/heros/**'],
          },
        },
        {
          from: path.resolve(__dirname, 'dist/images/heros'),
          to: path.resolve(__dirname, 'dist/images/heros'),
          noErrorOnMissing: true,
        },
      ],
    }),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurants-api',
            cacheableResponse: {
              statuses: [0, 200],
            },
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 hari
            },
            plugins: [
              {
                handlerDidError: async () => {
                  return new Response(JSON.stringify({
                    error: true,
                    message: 'Network error occurred'
                  }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                  });
                },
              },
            ],
          },
        },
        {
          urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/large/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurants-image-api',
            cacheableResponse: {
              statuses: [0, 200],
            },
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 hari
            },
            plugins: [
              {
                handlerDidError: async () => {
                  return new Response(
                    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">Image Not Found</text></svg>',
                    {
                      headers: { 'Content-Type': 'image/svg+xml' },
                    }
                  );
                },
              },
            ],
          },
        },
      ],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
};