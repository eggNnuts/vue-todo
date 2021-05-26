const pathModule = require('path');
const { VueLoaderPlugin } = require('vue-loader');
module.exports={
    mode :'production',
    entry:{
        // __dirname => 현재파일의 위치(경로),node.js에서 제공하는 환경 전역변수
        todo:pathModule.join(__dirname,'main.js')
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
           }   
        ]
    },
    plugins:[
        new VueLoaderPlugin()
    ]
}