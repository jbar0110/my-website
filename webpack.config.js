const path = require('path')
const join = str => path.join(__dirname, 'app/js/' + str)

module.exports = {
  entry: {
    app: './app/js/app.js'
  },

  output: {
      path: path.join(__dirname, 'public/scripts'),
      filename: '[name].js'
  },

  resolve: {
    alias: {
      modules: join('modules')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
}