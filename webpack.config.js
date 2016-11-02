module.exports = {
	entry: './src/js/index.js',
	output: {
    	path: __dirname,
    	filename: "bundle.js",
    	publicPath: "/build/"
  	},
	module: { 
		preLoaders: [
	        {
	            test: /\.js/,
	            loader: 'eslint',
	        }
	    ],
		loaders: [
			{
				test: /\.js/,
				loader: 'babel',
				exclude:/(node_modules)/,
                query: {
                    presets: ['es2015', 'react', 'react-hmre']
                }
			},
			{
				test: /\.scss/,
				loaders: ['style', 'css', 'sass']
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.es6']
	}
}