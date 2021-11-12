const path = require("path");

const commonConfig = {
	output: {
		path: path.resolve(__dirname, "lib"),
		filename: "[name].js",
		assetModuleFilename: '[name][ext]'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "ts-loader"
			},
			{
				test: /\.css$/,
				type: "asset/resource"
			}
		],
		parser: {
			javascript: {
				commonjsMagicComments: true,
			},
		},
	},
	resolve: {
		extensions: [".js", ".ts", ".tsx", ".jsx", ".json", ".css"],
		fallback: {
			"fs": false,
			"path": false
		}
	},
	devtool: "source-map",
	experiments: {
		topLevelAwait: true,
	}
}

module.exports = [
	Object.assign(
		{
			target: "electron-main",
			entry: {
				index: "./src/index.ts"
			}
		},
		commonConfig
	)
]