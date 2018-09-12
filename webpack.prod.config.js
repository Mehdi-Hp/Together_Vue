const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const postcssPlugins = require('./postcss.prod.config');

require('pretty-error').start();

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const productionPath = path.resolve(__dirname, '../', 'wwwroot');
const mainJSPath = path.resolve(__dirname, 'dev', 'main.js');

module.exports = {
	entry: [mainJSPath],
	context: path.resolve(__dirname),
	output: {
		path: productionPath,
		publicPath: './',
		filename: 'bundle.js'
	},
	stats: {
		children: false
	},
	module: {
		rules: [
			{
				test: /\.(ttf|otf|eot|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: './fonts/[name].[ext]'
				},
				exclude: [nodeModulesPath]
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				loaders: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name].[ext]'
						}
					}
				],
				exclude: [nodeModulesPath]
			},
			{
				test: /\.svg$/,
				loader: 'svg-sprite-loader'
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				exclude: [nodeModulesPath]
			},
			{
				test: /(\.scss|\.pcss|\.css)$/,
				use: [
					{
						loader: 'vue-style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 4,
							import: false,
							minimize: false
						}
					},
					'sass-loader',
					{
						loader: 'postcss-loader',
						options: {
							syntax: 'postcss-scss',
							map: false,
							plugins: postcssPlugins
						}
					},
					{
						loader: 'sass-resources-loader',
						options: {
							resources: ['./dev/assets/notcss/_utils/_all-utils.scss']
						}
					}
				],
				exclude: [nodeModulesPath]
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader'
				},
				exclude: [nodeModulesPath]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: 'index.prod.html',
			inject: false,
			filename: 'index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'bundle.css'
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			quiet: true
		}),
		new CopyWebpackPlugin([
			{
				from: 'favicons/',
				to: 'favicons/',
				toType: 'dir'
			}
		]),
		new BundleAnalyzerPlugin()
	],
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js'
		}
	},
	optimization: {
		namedModules: true
	},
	performance: {
		hints: false
	},
	mode: 'production'
};
