module.exports={
    root: true,
    // parserOptions : 자바스크립트 버전, 모듈 사용 여부
    parserOptions: {
      parser: 'babel-eslint',
      ecmaVersion: 2015,
      sourceType: 'module'
    },
    //프로젝트의 사용 환경
    env: {
      browser: true,
      node: true
    },
    // 확장 설정 : 지켜야할 규칙(코드 스타일 등)
    extends: [
      // https://github.com/standard/eslint-config-standard
      'standard',
      // https://eslint.vuejs.org/rules/
      // 'plugin:vue/base'
      'plugin:vue/essential'
      // 'plugin:vue/strongly-recommended'
      // 'plugin:vue/recommended'
    ],
    plugins: [
      'vue'
    ],
    rules: {
      // 예외 규칙을 추가
      'vue/html-self-closing': ['error', {
        'html': {
          'void': 'always',
          'normal': 'always',
          'component': 'always'
        },
        'svg': 'always',
        'math': 'always'
      }],
      'no-new':0
    }
}