import Vue from 'vue';
import App from "./App.vue"

new Vue({
    el:"#todo",
    /* 
       보통 vue는 singpage component방식으로 template javasript css가 한 파일에 존재하여
        template(html)태그에 직접 vue instance을 연결시켜주지만 

        webpack의 entry로 지정된 main.js에서 tempate(html)을 작성할수 없어 vue 내장 함수인 render함수를 통해
        App.vue에 명시된 template에  vue instace를 연결시켜줌

    */
    render:createElement=> createElement(App)
})