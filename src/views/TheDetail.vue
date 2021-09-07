<!--传值类型和id-->
<template>
    <div class="root d-flex flex-column">
      <v-toolbar-title> 
        <v-btn icon @click="$router.go(-1)">
        <v-icon>mdi-keyboard-backspace</v-icon>
        </v-btn>
        {{title}}
        </v-toolbar-title>
    <div class="content flex-grow-1 d-flex">
    <v-card class="flex-grow-1 d-flex flex-row">
      <div class="flex-grow-1">
      <the-ckeditor :editconfig="config" ref="editorRef"></the-ckeditor>
      </div>
      <div class="detail">
        <span class="h">基本信息</span>
        <hr style="red;"/>
        <div class="detailcontent">
        <v-row 
        v-for="item in items"
        :key="item"
        >
        <v-col cols=4>{{item.title}}</v-col>
        <v-col cols=8>{{item.content}}</v-col>
        </v-row>
        </div>
      </div>
    </v-card>
    </div>
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
      items:[],
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
          this.items=res.items
        }
      )
    },
    //设置内容函数
    methods: {
      setContent(){
        this.$refs.editorRef.setContent("<h1>这是ckEditor</h1>")
      },
    //获取内容函数
      getContent(){
        console.log(this.$refs.editorRef.getContent())
      },
    }
}
</script>
<style scoped>

.content{
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
}
.root{
  height: 100%;
}
.detail{
  width:300px;
  padding: 10px;
  font-size:14px;
}
.detailcontent{
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
