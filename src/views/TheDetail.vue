<!--传值类型和id-->
<template>
    <div>
      <v-toolbar-title> 
        <v-btn icon @click="$router.back(-1)">
        <v-icon>mdi-arrow-left</v-icon>
        </v-btn>{{title}}
        </v-toolbar-title>
      <v-spacer></v-spacer>

    <the-ckeditor ref="editorRef"></the-ckeditor>
    <button @click="setContent">设置内容</button>
    <button @click="getContent">获取内容</button>
        <p>{{id}}</p>
    </div>
</template>
<script>
import TheCkeditor from "@/components/TheCkeditor";
export default{
    name:'TheDetail',
    props:['id','title'],
    data:()=>({

    }),
    components:{
      TheCkeditor
    },
    mounted:{
    },
    methods: {
      setContent(){
        this.$refs.editorRef.setContent("<h1>这是ckEditor</h1>")
      },

      getContent(){
        console.log(this.$refs.editorRef.getContent())
      },
    }
}
</script>
<style scoped>

</style>
