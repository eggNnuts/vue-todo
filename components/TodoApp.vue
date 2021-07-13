<template lang="pug">
    div
        todo-item
        todo-creator
</template>
<script>
 
import {LocalStorage,Low} from 'lowdb'
import lodash from 'lodash' 

//uuid 생성 외부 라이브러리
import crytoRandomString from 'crypto-random-string' 

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
        initDB(isClick){
            let self = this;
            // todo-app라는 adapter 생성 rdbms에 테이블 개념으로 이해
         
            let adapter = new LocalStorage('todo-app');

            self.db = new Low(adapter);

          
            self.db.data ||= { todos: [] }
            self.db.chain = lodash.chain(self.db.data);
            self.db.write();
            
          
            // // lowdb는 마지막에 write 메소드를 호출해야함
            

           
           self.createTodo();
         
          
        },
        createTodo(){
            let self= this;
            const newTodo ={
                id :crytoRandomString({length:10}),
                title :'',
                createdAt : new Date(),
                updatedAt : new Date(),
                done : false
            }

           self.db.chain.get('todos').push(newTodo).value();
           self.db.write(); 
          

        }
    },
}
</script>
