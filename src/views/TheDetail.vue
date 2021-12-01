<!--传值类型和id-->
<template>
<div class="d-flex flex-column"> 
 <!--执行内容--> 
<div class="content d-flex flex-column root" style="height:710px;">

<!--工具栏-->
  <v-card class="nav">
    <v-toolbar
      flat
      height="45"
    >
    <v-toolbar-title> 
        <v-btn small icon @click="$router.go(-1)">
        <v-icon>mdi-arrow-u-left-top</v-icon>
        </v-btn>
        <span style="margin-right:20px;">需求一</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="collectReq()" >
        <v-icon>{{collect}}</v-icon>
        <!-- <v-icon>mdi-star-minus</v-icon> -->
        </v-btn>
        <v-btn icon @click="setAlarm()">
        <v-icon>{{alarm}}</v-icon>
        <!-- <v-icon>mdi-bell-minus</v-icon> -->
        </v-btn>
    </v-toolbar>
  </v-card>

  <v-card class="list overflow-y-auto overflow-x-hidden d-flex flex-row">
    <v-card class="list-card overflow-y-auto overflow-x-hidden flex-grow-1" tile>

      <v-toolbar dense flat height="40">
      <v-toolbar-title class="subtitile" style="font-size:15px;">需求详情</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="editShow=!editShow;edit.icon=!editShow?'mdi-square-edit-outline':'mdi-content-save-outline'
      ;edit.title=!editShow?'编辑':'保存'">
        <v-icon small>{{edit.icon}}</v-icon><span style="font-size:5px;">{{edit.title}}</span>
      </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <div class="reqDetail">
        <div v-show='!editShow'>{{requirement.detail}}</div>
        <div v-show="editShow">
        <the-ckeditor ref="editorRef" class="editor"></the-ckeditor>
        </div>
      </div>

      <v-divider></v-divider>

      <!--子需求-->

      <v-toolbar dense flat height="40">
      <v-toolbar-title class="subtitile" style="font-size:15px;">子需求</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon small>mdi-plus</v-icon><span style="font-size:5px;">添加</span>
      </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <div>
        <v-data-table></v-data-table>
      </div>

      <v-divider></v-divider>
      
      <!--添加附件-->
      <v-toolbar dense flat height="40">
      <v-toolbar-title class="subtitile" style="font-size:15px;">补充文件</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon small>mdi-upload</v-icon><span style="font-size:5px;">上传</span>
      </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <div style="height:200px;">
        <v-list width="100%">
          <v-list-item >
          <v-list-item-content>
          <v-row justify="space-around">
            <v-col lg="3">
            <v-list-item-subtitle>上传者</v-list-item-subtitle>
            </v-col>
              <v-col lg="5">
                <v-list-item-subtitle>文件</v-list-item-subtitle>
              </v-col>
              <v-col lg="4">
                <v-list-item-subtitle>上传时间</v-list-item-subtitle>
              </v-col>
            </v-row>
          </v-list-item-content>
            </v-list-item>
          <v-list-item v-for="item in 4" :key=item>
          <v-list-item-content>
          <v-row justify="space-around">
            <v-col lg="3">
            <div style="font-size:10px;">用户1</div>
                <v-list-item-subtitle>
                <span style="font-size:12px">&nbsp;ID：201830661298</span>
                </v-list-item-subtitle>
            </v-col>
              <v-col lg="5">
                <div><a href="#" style="font-size:10px;">文件一</a></div>
                <v-list-item-subtitle>
                <span style="font-size:12px">&nbsp;文件描述</span>
                </v-list-item-subtitle>
              </v-col>
              <v-col lg="4">
                <v-list-item-subtitle style="font-size:10px;">2021-5-10 11:00:22</v-list-item-subtitle>
              </v-col>
            </v-row>
          </v-list-item-content>
            </v-list-item>
         </v-list>
      </div>

    </v-card>
    
    <v-card class="list-card overflow-y-auto overflow-x-hidden flex-grow-1" tile flat>
      <p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p>
    </v-card>
  </v-card>
<!--列表-->
  </div>

</div>
  
</template>
<script>
import TheCkeditor from "@/components/TheCkeditor";
export default{
    name:'TheDetail',
    props:['id','type'],
    data:()=>({
      title:'',
      items:[],
      edit:{
        icon:"mdi-square-edit-outline",
        title:"编辑"
        },
      collect:"mdi-star-plus-outline",
      alarm:"mdi-bell-outline",
      editShow:false,
      requirement:{
        detail:'这里是详情',
      }
    }),
    components:{
      TheCkeditor
    },
    mounted(){
      this.getContent()
    },
    //设置内容函数
    methods: {
      setContent(){
        this.$refs.editorRef.setContent(this.requirement.detail)
      },
    //获取内容函数
      getContent(){
        console.log(this.$refs.editorRef.getContent())
      },
      collectReq(){

      },
      setAlarm(){
        
      },
      edit(){

      }
    }
}
</script>
<style scoped>
.root{
  height: 100%;
}
.nav{
  margin-top: 10px;
}
.content{
  margin-left: 10px;
  margin-right:10px;
  margin-bottom: 7px;
}
.list{
  margin-top: 7px;
  height:100%;
}
.list-card{
  height:100%;
}
.list .list-card::-webkit-scrollbar
{
  width: 0px;
  background-color:white;
}
</style>
