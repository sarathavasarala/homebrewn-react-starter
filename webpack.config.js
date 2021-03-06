var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var purify = require("purifycss-webpack-plugin");

var PATHS = {
	source: path.join(__dirname, 'source'),
	build: path.join(__dirname, 'build'),
	assets: path.join(__dirname, 'assets')
}

module.exports = {
	entry: {
		app: path.join(__dirname, 'source','js'),
		vendor: ['react','react-dom', 'jquery']
	},
	output:{
		path: PATHS.build,
		publicPath: '/',
		filename: 'build.js'
	},
	module:{
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				query: {
	                    presets: ['react', 'es2015']
	            }
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader"),
				include: PATHS.source
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
				include: PATHS.source
			},
			{
			    test: /\.(eot|woff|woff2|ttf|svg|jpg|png)$/,
			    loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
			}
		]
	},
	resolve: {
		extensions: ['', '.js']
	},
	plugins: [
        new HtmlWebpackPlugin({
			template: './index.html',
			inject: 'body',
		}),
		new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: Infinity
        }),
        new ExtractTextPlugin("[name].css"),
	    new webpack.DefinePlugin({
		    'process.env': {
		        NODE_ENV: JSON.stringify("development"),
		    },
		})
    ]
}