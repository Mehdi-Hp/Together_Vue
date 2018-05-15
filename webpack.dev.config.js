const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const postcssPlugins = require('./postcss.dev.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

require('pretty-error').start();

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const productionPath = path.resolve(__dirname, 'build');
const mainJSPath = path.resolve(__dirname, 'dev', 'main.js');

module.exports = smp.wrap({
	entry: [mainJSPath],
	context: path.resolve(__dirname),
	output: {
		path: productionPath,
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(ttf|otf|eot|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]'
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
					loader: 'babel-loader',
					options: {
						plugins: ['@babel/plugin-syntax-object-rest-spread', 'lodash'],
						presets: [
							[
								'@babel/preset-env',
								{
									targets: {
										browsers: ['last 2 versions']
									},
									spec: true
								}
							]
						]
					}
				},
				exclude: [nodeModulesPath]
			}
		]
	},
	mode: 'development',
	optimization: {
		namedModules: true
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: 'index.dev.html',
			filename: 'index.html'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new DashboardPlugin()
	],
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js'
		}
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'build'),
		publicPath: '/',
		noInfo: true,
		compress: false,
		historyApiFallback: true,
		disableHostCheck: true,
		hot: true,
		watchOptions: {
			ignored: nodeModulesPath
		},
		progress: true,
		proxy: {
			'/api': 'http://192.168.1.207:81'
		},
		overlay: {
			warnings: true,
			errors: true
		},
		open: false,
		stats: 'minimal',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
		}
	},
	performance: {
		hints: false
	},
	devtool: 'cheap-module-source-map'
});
