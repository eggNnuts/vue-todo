const pathModule = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('@babel/polyfill');

module.exports={
    mode :'production',
    entry:{
        // __dirname => 현재파일의 위치(경로),node.js에서 제공하는 환경 전역변수
        todo:[
            '@babel/polyfill',
            pathModule.join(__dirname,'main.js')
        ]
    },
    output:{
        filename :'[name].js', // output file name => todo.js
        path : pathModule.join(__dirname,"dist")
    },
    module:{
        rules:[
           // vue-loader 추가 ,
           {
               test : /\.vue$/,
               loader :'vue-loader'
           },
           // pug(jade라고도함,html 전처리기) loader 추가
           {
               test: /\.pug$/,
               loader: 'pug-plain-loader'
           },
           {
              test : /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader'
           },
           {
              test : /\.css$/,
              use: [
                  // loader 체이닝
                  'vue-style-loader',
                  'css-loader'
              ]
           }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        // webpack이 동작해 번들링된 파일과 index.html을 자동으로 생성해주는 후처리 플러그인 
        new HtmlWebpackPlugin({
            template : pathModule.join(__dirname,"index.html")
        })
    ]
}