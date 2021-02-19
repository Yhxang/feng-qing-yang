/* eslint-disable max-len */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const request = require('request');

// const tinyPngWebpackPlugin = require('tinypng-webpack-plugin');
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin');
// const { request } = require('express');

const config = {
  entry: {
    index: './src/js/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js?[contenthash:5]',
    publicPath: '/dist/',
  },
  mode: 'development',
  optimization: {
    // minimize: false
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  devServer: {
    // contentBase: path.join(__dirname, 'cn/'),
    // compress: true,
    port: 9000,
    publicPath: '/dist/',
    // index: 'cn/index.html',
    // publicPath: '/'
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /((?<!^en\/).)*$/, to: '/dist/cn/index.html' },
    //     { from: /en\/.*/, to: '/dist/en/index.html' },
    //     // { from: /^\/dist\/(home|G-POWER|products-service|applications|media|partner|footer)$/, to: 'cn/index.html' },
    //   ],
    // },
    // eslint-disable-next-line no-unused-vars
    before(app, server, compiler) {
      app.get('/api.php', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'Authorization,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,RequestID,X-Content-Type-Options,X-Content-Type-Options,X-Frame-Options,X-Powered-By,X-Version,x-xss-protection,Strict-Transport-Security'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If neede

        const redirectURL = `http://g-powertech.com.cn${req.path}`;
        delete req.headers.host;
        request.get({
          url: redirectURL,
          qs: req.query,
        }, (error, response) => {
          if (response) {
            if (response.statusCode !== 200 && response.statusCode !== 201) {
              res.status(response.statusCode).send(response.body ? response.body : '');
            } else {
              let resMsg = response.body;
              resMsg = resMsg.replace(new RegExp('(?=\\\\/uploadfile)', 'g'), `http:\\/\\/${req.query.lang === 'en' ? 'en.' : ''}g-powertech.com.cn`);
              res.send(resMsg);
            }
          } else {
            // next(createError(404));
          }
        });
      });
    },
  },
  resolve: {
    alias: {
      path: require.resolve('path-browserify'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   cacheDirectory: true,
          //   babelrc: false,
          //   rootMode: 'upward',
          // },
        },
        // exclude: /(node_modules|bower_components)/,
        exclude: [
          /node_modules[\\/]core-js/,
          /node_modules[\\/]webpack[\\/]buildin/,
          // /node_modules\/(?!(swiper|dom7)\/).*/,
        ],
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      // options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../', // 生成地址
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                    {
                      // options
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: 'expanded',
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|webp|svg|mp4)$/,
        exclude: [
          path.resolve(__dirname, 'src/fonts'),
        ],
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name].[ext]?[contenthash:5]',
            // publicpath: '/dist/',
            // publicPath: '../images',// 最终生成的css代码中,图片url前缀
            outputPath: 'images', // 图片输出的实际路径(相对于dist)
            limit: 0, // 当小于某KB时转为base64
            esModule: false, // 否则就要require('src').default
          },
        }],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|svg)$/,
        include: [
          path.resolve(__dirname, 'src/fonts'),
        ],
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts',
          },
        }],
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              // pretty: true // 可能出错，后期删除此配置
              envir: 'Destination',
            },
          },
        ],
      },

    ],
  },
  plugins: [
    // new CleanWebpackPlugin({
    //   cleanStaleWebpackAssets: false
    // }),
    new MiniCssExtractPlugin({
      filename: './css/[name].css?[contenthash:5]',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/images/favicon.ico',
        },
        {
          from: './src/images/news_img',
          to: 'news_img',
        },
      ],
    }),
    new ImageMinimizerPlugin({
      severityError: 'warning', // Ignore errors on corrupted images
      exclude: /font/,
      minimizerOptions: {
        plugins: [
          // ['jpegtran', { progressive: true }],
          // ['optipng', { optimizationLevel: 5 }],
          [
            'svgo',
            {
              plugins: [
                // SVGO options is here 'https://github.com/svg/svgo#what-it-can-do'
                {
                  removeTitle: true,
                  removeViewBox: false,
                  removeXMLNS: true,
                  prefixIds: {
                    prefix: 'my_prefix',
                  },
                },
              ],
            },
          ],
        ],
      },
    }),
    // new tinyPngWebpackPlugin({
    //   key:'nDcZv7CzHYV25bVBW6mjPDjvx3RL8PrX',
    //   //proxy:'http://user:pass@192.168.0.1:8080'
    // })
    // new HtmlWebpackPlugin({
    //     //filename: '[name].pug'
    //     //template: path.resolve(__dirname, `../pages/${page}.html`),
    // })
    // new BundleAnalyzerPlugin(), // 依赖分析
  ],
};

module.exports = (env, argv) => {
  // console.log(env, argv)
  config.mode = argv.mode;

  const langs = ['cn', 'en'];
  const pages = Object.keys(config.entry);
  langs.forEach((lang) => {
    config.plugins = config.plugins.concat(pages.map((page) => new HtmlWebpackPlugin({
      filename: page === 'index' ? `${lang}/${page}.html` : `${lang}/${page}/index.html`,
      template: path.resolve(__dirname, `./src/templates/${page}_${lang}.pug`),
      chunks: [page],
      lang,
      PRODUCTION: JSON.stringify(config.mode === 'production'),
    })));
  });

  if (argv.mode === 'development') {
    // config.devtool = false; //????
  }

  if (argv.mode === 'production') {
    config.devtool = 'cheap-module-source-map';
    config.output.publicPath = '/';
    config.plugins.unshift(
      new CleanWebpackPlugin(),
      // new tinyPngWebpackPlugin({
      //   key:'nDcZv7CzHYV25bVBW6mjPDjvx3RL8PrX',
      //   //proxy:'http://user:pass@192.168.0.1:8080'
      // })
    );
  }

  return config;
};
