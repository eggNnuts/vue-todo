<template lang="pug">
    div
        todo-item
        todo-creator(
            v-on:create-todo="createTodo"
        )
</template>
<script>
 
import {LocalStorage,Low} from 'lowdb'
import lodash from 'lodash' 

//uuid 생성 외부 라이브러리
import { v4 as uuidv4 } from 'uuid'

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
            
        
           
           self.createTodo();
         
          
        },
        createTodo(title){
            let self= this;
            let id =uuidv4();

            id = id.includes("-") ? id.replace(/-/g,"") : id;

            
            const newTodo ={
                id,
                title :title,
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
