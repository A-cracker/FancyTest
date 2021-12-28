<!--传值类型和id-->
<template>
<div class="d-flex flex-column"> 
 <!--执行内容--> 
<div class="content d-flex flex-column root" style="height:740px;">

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
    <v-card class="list-card overflow-y-auto overflow-x-hidden" width="70%" min-width="70%">

      <v-toolbar dense flat height="40">
      <v-toolbar-title class="subtitile" style="font-size:15px;">需求详情</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn style="padding-right:10px;" icon @click="editShow=!editShow;edit.icon=!editShow?'mdi-square-edit-outline':'mdi-content-save-outline'
      ;edit.title=!editShow?'编辑':'保存'">
        <v-icon small>{{edit.icon}}</v-icon><span style="font-size:5px;">{{edit.title}}</span>
      </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <div class="reqDetail">
        <div v-show='!editShow' style="font-size:14px;">
          <v-container>
          {{requirement.detail}}
          </v-container>
          </div>
        <div v-show="editShow">
        <the-ckeditor ref="editorRef" class="editor"></the-ckeditor>
        </div>
      </div>

      <v-divider></v-divider>

      <!--子需求-->

      <v-toolbar dense flat height="40">
      <v-toolbar-title class="subtitile" style="font-size:15px;">子需求</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn style="padding-right:10px;" icon>
        <v-icon small>mdi-plus</v-icon><span style="font-size:5px;">添加</span>
      </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <div>
        <v-data-table></v-data-table>
      </div>

      <v-divider></v-divider>

      <!--绑定用例-->

      <v-toolbar dense flat height="40">
      <v-toolbar-title class="subtitile" style="font-size:15px;">绑定用例</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn style="padding-right:10px;" icon>
        <v-icon small>mdi-link</v-icon><span style="font-size:5px;">绑定</span>
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
      <v-btn style="padding-right:10px;" icon>
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
    
    <v-card class="list-card overflow-y-auto overflow-x-hidden flex-grow-1" tile width="30%" min-width="30%">
      <v-tabs light height="40" fixed-tabs>
          <v-tab>基本信息</v-tab>
          <v-tab>动态</v-tab>
          <v-tab>评论</v-tab>
      <!--基本信息模块-->
      <v-tab-item>
        <div>
        <v-list dense right>
            <v-list-item v-for="item in items" :key="item">
            <v-list-item-content style="font-size:13px;">{{item.name}}:</v-list-item-content>
              <v-list-item-content class="align-end" style="font-size:13px;">
                {{item.content}}
              </v-list-item-content>
        </v-list-item>
        </v-list>
        <div style="text-align:center">
        <v-btn dark small>修改信息</v-btn>
        </div>
        </div>
      </v-tab-item>
      <!--动态模块-->
      <v-tab-item>
        <div>
        <v-list>
          <!--创建需求的动态-->
        <div>
          <v-list-item>
            <v-list-item-avatar><v-img src="../assets/img.jpg"></v-img></v-list-item-avatar>
            <v-list-item-content>
            <v-list-item-title style="font-size:13px;">张三</v-list-item-title>
            <v-list-item-subtitle style="font-size:13px;">创建</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
          <v-list-item-action-text>2021-01-02</v-list-item-action-text>
        </v-list-item-action>
          </v-list-item>
        <div style="margin:10px;">
          <div class="d-flex flex-row align-center">
              <div style="font-size:13px;">需求名：</div>
              <v-chip style="font-size:13px;" small outlined color="green" label>需求1</v-chip>
          </div>
        </div>
        <v-divider></v-divider>
        </div>
        <!--变更需求的动态-->
        <div>
        <v-list-item>
            <v-list-item-avatar><v-img src="../assets/img.jpg"></v-img></v-list-item-avatar>
            <v-list-item-content>
            <v-list-item-title style="font-size:13px;">张三</v-list-item-title>
            <v-list-item-subtitle style="font-size:13px;">变更</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
          <v-list-item-action-text>2021-01-02</v-list-item-action-text>
        </v-list-item-action>
          </v-list-item>
        <div style="margin:10px;">
          <div class="d-flex flex-row align-center">
              <div style="font-size:13px;">变更字段：</div>
              <v-chip style="font-size:13px;" small outlined color="warning" label>需求详情</v-chip>
          </div>
          <div class="d-flex flex-column">
              <div style="font-size:13px;"><v-chip color="primary" outlined label x-small>变更前</v-chip></div>
              <div>b</div>
              </div>
              <div class="d-flex flex-column">
              <div style="font-size:13px;"><v-chip color="primary" outlined label x-small>变更后</v-chip></div>
              <div>a</div>
              </div>
        </div>
          <v-divider></v-divider>
        </div>
        <!--删除需求的动态-->
        <div>
          <v-list-item>
            <v-list-item-avatar><v-img src="../assets/img.jpg"></v-img></v-list-item-avatar>
            <v-list-item-content>
            <v-list-item-title style="font-size:13px;">张三</v-list-item-title>
            <v-list-item-subtitle style="font-size:13px;">删除</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
          <v-list-item-action-text>2021-01-02</v-list-item-action-text>
        </v-list-item-action>
          </v-list-item>
        <div style="margin:10px;">
          <div class="d-flex flex-row align-center">
              <div style="font-size:13px;">需求名：</div>
              <v-chip style="font-size:13px;" small outlined color="error" label>需求1</v-chip>
          </div>
        </div>
        <v-divider></v-divider>
        </div>
        </v-list>
        </div>
      </v-tab-item>
      
      <!--评论模块-->
      <v-tab-item>
      <div>
        <v-list>
        <div v-for="item in 10" :key="item">
          <v-list-item>
            <v-list-item-avatar><v-img src="../assets/img.jpg"></v-img></v-list-item-avatar>
            <v-list-item-content>
            <v-list-item-title style="font-size:14px;">评论标题</v-list-item-title>
            <v-list-item-subtitle style="font-size:13px;">张三</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
          <v-list-item-action-text>发表时间：2021-01-02</v-list-item-action-text>
        </v-list-item-action>
          </v-list-item>
        <v-container style="font-size:13px;">评论内容</v-container>   

          
        <div style="text-align:right;font-size:11px;padding:5px;">
          <v-btn icon x-small>
        <v-icon>mdi-delete</v-icon>
        </v-btn></div>
 
         <v-divider></v-divider>
        </div>
        </v-list>
      </div>
      </v-tab-item>
      </v-tabs>
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
      items:[
        {name:"需求名",content:"需求一"},
        {name:"创建人",content:"张三"},
        {name:"处理人",content:"张三"},
        {name:"优先级",content:"HIGH"},
        {name:"状态",content:"执行中"},
        {name:"预计开始时间",content:"2020.10.1"},
        {name:"预计结束时间",content:"2020.10.1"},
      ],
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
