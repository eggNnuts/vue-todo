const pathModule = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
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
        }),
        // 특정한 디렉토리와 파일을 from에 지정해줘서, 지정한 경로 to에 설정하여 이동시켜주는 플러그인 
        // to를 비워 두면 output에 설정된 디렉토리임
        new CopyPlugin({
            patterns:[{ from:"assets/", to:""}
        ]}),
        // 빌드를 할때마다 output에 지정된 모든 리소스들을 제거함
        new CleanWebpackPlugin()
    ]
}