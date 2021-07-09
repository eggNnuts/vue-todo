<template lang="pug">
    div
        todo-item
        todo-creator
</template>
<script>
 
import {LocalStorage,Low,LowSync} from 'lowdb'
 

import TodoCreator from './TodoCreator'
import TodoItem from './TodoItem'


export default {
    components:{
        TodoCreator,
        TodoItem
    },
    data(){
        return {
            db:null,
            dbData:{}
        }
    },
    created() {
        this.initDB();
    },
    methods: {
        initDB(){
            // todo-app라는 adapter 생성 rdbms에 테이블 개념으로 이해
            console.log("Hello")
            let adapter = new LocalStorage('todo-app');

            this.db = new Low(adapter);
            this.db.data = {
                "todo":[]
            }

           
            // // lowdb는 마지막에 write 메소드를 호출해야함
            this.db.write();
            
        }
    },
}
</script>
