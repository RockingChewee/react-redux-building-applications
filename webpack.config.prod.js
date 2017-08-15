import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// PROD: Defining a Node environment variable (NODE_ENV) that sets React for production.
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

export default {
  debug: true,
  devtool: 'source-map', // PROD: changing from the inline-source-map
  noInfo: false,
  entry: path.resolve(__dirname, 'src/index'), // PROD: removing entry points for hot-reloading
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist') // PROD: changing from 'src' to 'dist'
  },
  plugins: [ // PROD: removing references to both HotModuleReplacementPlugin() and NoErrorsPlugin() plugins, and added the following
    // OccurenceOrderPlugin - Optimizes the order that our files are bundled in for optimal minification.
    new webpack.optimize.OccurenceOrderPlugin(),
    // DefinePlugin - Lets us define variables that are then made available to the libraries that Webpack is bundling, e.g. GLOBALS variable for React.
    new webpack.DefinePlugin(GLOBALS),
    // ExtractTextPlugin - Lets us extract CSS to a separate file, instead of bundling it together with JavaScript.
    new ExtractTextPlugin('styles.css'),
    // DedupePlugin - Eliminates duplicate packages that helps keeping the size of the bundle as small as possible.
    new webpack.optimize.DedupePlugin(),
    // UglifyJsPlugin - Minifies the JavaScript file.
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel'] },
      // PROD: since we want to extract our CSS to a separate file, we're using ExtractTextPlugin here.
      // It accepts file type (css) and a query string parameter (sourceMap) tells it to generate a source-map as well.
      { test: /(\.css)$/, loader: ExtractTextPlugin.extract("css?sourceMap") }, // we could tell webpack to handle SaaS and LESS files here also
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' }, // the following 4 instructions are necessary for the file types Bootstrap utilizes for fonts
      { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  }
};
