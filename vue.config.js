
const path = require('path')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { defineConfig } = require('@vue/cli-service')

 

require('dotenv').config()


const plugins = [new NodePolyfillPlugin()]

//do not copy files on vercel because it may break build process
if(!process.env.VERCEL_HOSTED){
  plugins.push(new CopyWebpackPlugin({
    patterns: [
      
      {
      from: path.join(__dirname, '/imagestorage'),
      to: path.join(__dirname, '/dist/imagestorage')
      }
  
  
  ],
  options:{concurrency:5}
  }
  ))
}

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins 
  }
})


/*const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
module.exports = {
    runtimeCompiler: true,
    configureWebpack: {
      plugins: [
        new NodePolyfillPlugin()
      ],
      resolve: {
     
        fallback: {
          "fs": false,
          "tls": false,
          "net": false,
          "path": false,
          "assert": false,
          "http": require.resolve("stream-http") ,
          "https": require.resolve("https-browserify") ,
          "url": false,
          "stream": false,
          "crypto": require.resolve('crypto-browserify'),
          "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
        } 
      },
      module: {
        rules: [
          {
            test: /\.(scss|css)$/,
            use: ['style-loader', 'css-loader','postcss-loader' ],
          },

        ]
      }
    }
  }
  */