const path                    = require('path')
const webpack                 = require('webpack')
const ExtractTextPlugin       = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: './app/js/ClientApp.js',
  devtool: 'cheap-module-source-map', // eval
  output: {
    // filename: path.join(__dirname, './public/bundle.js')
    filename: './app/public/bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, '/')
  },
  resolve: {
    extensions: ['.css', '.js', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        include: path.resolve(__dirname, 'js'),
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.(jpe?g|gif|png)$/,
        loader: 'url-loader'
		}
    ]
  },
  plugins: [
    new ExtractTextPlugin(path.resolve(__dirname, '/app/public/bundle.css')),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
  	}),
  	new webpack.optimize.UglifyJsPlugin({
	  compressor: {
		  warnings: false
	  }
  })
  ]
}