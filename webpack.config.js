const pathModule = require('path');

module.exports={
    mode :'production',
    entry:{
        // __dirname => 현재파일의 위치(경로),node.js에서 제공하는 환경 전역변수
        todo:path.join(__dirname,'main.js')
    },
    output:{
        filename :'[name].js', // output file name => todo.js
        path : path.join(__dirname,"dist")
    },
    module:{},
    plugins:[]
}