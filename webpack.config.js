// 개발용과 제품용에 공통된 옵션
const { merge } = require('webpack-merge')
const pathModule = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
require('@babel/polyfill')

module.exports = (env, opts) => {
  const isDevMode = 'WEBPACK_SERVE' in env && env.WEBPACK_SERVE
  const config = {
    // 생략할 확장자를 명시하기 위한 설정
    resolve: {
      extensions: [
        '.vue', '.js', '.css'
      ],
      fallback:{
        "path": require.resolve("path-browserify")
      }
    },
    
    entry: {
      // __dirname => 현재파일의 위치(경로),node.js에서 제공하는 환경 전역변수
      todo: [
        '@babel/polyfill',
        pathModule.join(__dirname, 'main.js')
      ]
    },
    output: {
      filename: '[name].js', // output file name => todo.js
      path: pathModule.join(__dirname, 'dist')
    },
    module: {
      rules: [
        // vue-loader 추가 ,
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        // pug(jade라고도함,html 전처리기) loader 추가
        {
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            // loader 체이닝
            'vue-style-loader',
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      // webpack이 동작해 번들링된 파일과 index.html을 자동으로 생성해주는 후처리 플러그인
      new HtmlWebpackPlugin({
        template: pathModule.join(__dirname, 'index.html')
      }),
      // 특정한 디렉토리와 파일을 from에 지정해줘서, 지정한 경로 to에 설정하여 이동시켜주는 플러그인
      // to를 비워 두면 output에 설정된 디렉토리임
      new CopyPlugin({
        patterns: [{ from: 'assets/', to: '' }
        ] })
    ]
  }

  let webpackOption = {}

  if (isDevMode) {
    webpackOption = merge(config, {
      mode: 'development',
      // 추가 개발용 옵션
      // eval => webpack 돌아갈때 build시간 최소화, 디버깅이 가능한 방식으로 webpack이 동작하여 dist디렉토리 생성, 파일의 용량이 커짐 , 개발용으로 적합
      devtool: 'eval',
      devServer: {
        // webpack dev 서버 실행시 브라우저를 바로 열기 설정
        open: false,
        //  hotReload설정, 수정사항 바로 반영 여부 설정, 기본값으로 true 설정
        hot: true
      }
    })
  } else {
    webpackOption = merge(config, {
      mode: 'production',
      // 추가 제품용 옵션
      //  cheap-module-source-map => 용량이 최소화 및 최적화가 잘 되있는 번들파일 생성, build 시간 길어지고  디버깅 불가능, 배포용으로 적합
      devtool: 'cheap-module-source-map',
      plugins: [
        // 빌드를 할때마다 output에 지정된 모든 리소스들을 제거함
        new CleanWebpackPlugin()
      ]
    })
  }

  return webpackOption
}
