<template lang="pug">
    div
        button  추가
        input(  
            v-bind:value="title"
            v-bind:placeholder="placeholder"
            type="text"
            v-on:input="title =$event.target.value"
            v-on:keypress.enter="createTodo"
        )
</template>
<script>
export default {
    data(){
        return {
            title :"",
            placeholder:"할일을 추가하세요!"
        }
    },
    methods:{
        createTodo(){
            const validatedTitle = this.title&& this.title.trim();

            if(!validatedTitle){
                alert('유효하지 않는 제목입니다!');
                this.title = this.title.trim();
                return;
            }
            this.$emit("create-todo",this.title);
            this.title="";

            
        }
    }
}
</script>