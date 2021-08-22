<!--传值类型和id-->
<template>
    <div>
      <v-toolbar-title> 
        <v-btn icon @click="$router.back(-1)">
        <v-icon>mdi-arrow-left</v-icon>
        </v-btn>{{title}}
        </v-toolbar-title>
      <v-spacer></v-spacer>

    <the-ckeditor :editconfig="config" ref="editorRef"></the-ckeditor>
    <button @click="setContent">设置内容</button>
    <button @click="getContent">获取内容</button>
        <p>{{id}}</p>{{type}}
    </div>
</template>
<script>
import TheCkeditor from "@/components/TheCkeditor";
import {initDetail} from "@/request/api"
export default{
    name:'TheDetail',
    props:['id','type'],
    data:()=>({
      title:'',
      config:{
      toolbar: ['heading','|','bold','italic','Link','bulletedList','numberedList','blockQuote','|','undo','redo',],
      placeholder:'请输入内容',
      language: 'zh-cn',
      ckfinder: {
        uploadUrl: '/'
      }
    }
      
    }),
    components:{
      TheCkeditor
    },
    mounted(){
      initDetail(this.id,this.type).then(
        res=>{
          //标题名
          this.title=res.title
        }
      )
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
