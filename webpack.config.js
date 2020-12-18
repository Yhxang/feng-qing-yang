const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");


const config = {
  entry: {
    index: "./src/js/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js?[contenthash:5]",
    publicPath: "/dist/"
  },
  mode: "development",
  optimization: {
    //minimize: false
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
    
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    //compress: true,
    port: 9000,
    //publicPath: '/'
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env']
      //     }
      //   }
      // },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../', // 生成地址
            }
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: "expanded"
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|webp|svg)$/,
        exclude: [
          path.resolve(__dirname, "src/fonts")
        ],
        use: [{
          loader: "url-loader",
          options: {
            name: '[name].[ext]?[contenthash:5]',
            //publicpath: '/dist/',
            //publicPath: '../images',// 最终生成的css代码中,图片url前缀
            outputPath: 'images', // 图片输出的实际路径(相对于dist)
            limit: 0, // 当小于某KB时转为base64
            esModule: false // 否则就要require('src').default
          }
        }]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|svg)$/,
        include: [
          path.resolve(__dirname, "src/fonts")
        ],
        use: [{
          loader: "file-loader",
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts',
          }
        }]

      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              //pretty: true // 可能出错，后期删除此配置
            }
          }
        ]
      },

    ]
  },
  plugins: [
    // new CleanWebpackPlugin({
    //   cleanStaleWebpackAssets: false
    // }),
    new MiniCssExtractPlugin({
      filename: './css/[name].css?[contenthash:5]'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/images/favicon.ico"
        }
      ]
    }),
    new ImageMinimizerPlugin({
      severityError: 'warning', // Ignore errors on corrupted images
      exclude: /font/,
      minimizerOptions: {
        plugins: [
          [
            'svgo', 
            {
              plugins: [
                  // SVGO options is here "https://github.com/svg/svgo#what-it-can-do"
                  {
                    removeTitle: true,
                    removeViewBox: false,
                    removeXMLNS: true,
                    prefixIds: {
                      prefix: 'my_prefix'
                    }
                  }
                ]
              }
          ],
        ],
    }})
    // new HtmlWebpackPlugin({
    //     //filename: '[name].pug'
    //     //template: path.resolve(__dirname, `../pages/${page}.html`),
    // })
  ]
}

const pages = Object.keys(config.entry);
config.plugins = config.plugins.concat(pages.map(page => {
  return new HtmlWebpackPlugin({
    filename: page === "index" ? `${page}.html` : `${page}/index.html`,
    template: path.resolve(__dirname, `./src/templates/${page}.pug`),
    chunks: [page]
  })
}))
// .concat([
//     new HtmlWebpackPugPlugin()
// ])

module.exports = config;