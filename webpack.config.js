const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var OptimizeJsPlugin = require('optimize-js-plugin');

var env = process.env.NODE_ENV || 'development';
console.log('NODE_ENV: ', env);

var plugins = [
	new HtmlWebpackPlugin({
		template: 'client/index.html',
		filename: 'index.html',
		inject: 'body'
	})
];

if (env === 'production') {
	plugins.push(
		new webpack.optimize.UglifyJsPlugin(),
		new OptimizeJsPlugin({
			sourceMap: false
		})
	);
}

module.exports = {
    entry: [ 
		'react-hot-loader/patch',
		'./client/index.js'
	],
	output: {
			path: path.resolve(__dirname, 'public'),
			filename: 'app.boundle.js'
	},
	module: {
		rules: [ 
			{
				test: /\.js$/,
				exclude: '/node_modules',
                loader: "babel-loader",
                // query: {
                //     babelrc: false,
                // }
			},
			{
				test: /\.css$/,
				use: [
					{loader: 'style-loader'}, 
					{
						loader: 'css-loader',
						options: {
							modules: true
						}
					},
				]
			}
		]
	},

devServer: {
	proxy: {
		'/socket.io': {
			target: 'http://localhost:3000',
			ws: true
		}
	}
},	
	plugins: plugins
};