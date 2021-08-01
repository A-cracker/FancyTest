<template>
 <div class="d-flex flex-row root">
     <v-card class="drawer" min-width="150px"
      v-show="hidden">
      <v-tabs vertical>
        <v-tab @click="switchDetail()"
        v-for="item in items"
        :key="item">
        <v-icon left small>
          {{item.icon}}
        </v-icon>
        <span class="tabTitle">{{item.title}}</span>
      </v-tab>
      </v-tabs>
     </v-card>

    <div class="content flex-grow-1 d-flex flex-column">
     <v-card class="titleBar">
       <v-toolbar flat>
         <v-btn icon @click="hidden=!hidden"><v-icon small>mdi-menu</v-icon></v-btn>
      <v-toolbar-subtitle>{{currentDetail.title}}</v-toolbar-subtitle>
      <v-spacer></v-spacer>
      <a class="projectName">{{currentDetail.project}}({{currentDetail.listCount}})</a>
       <v-btn icon><v-icon small>mdi-filter-menu</v-icon></v-btn>
       </v-toolbar>
     </v-card>

     <v-card class="detail flex-grow-1">
       QWQ
     </v-card>
     </div>

 </div>
</template>
<script>
export default{
  data:()=>({
    hidden:true,
    items:[
      {id:1,icon:"mdi-pencil-outline",title:"我的创建"},
      {id:2,icon:"mdi-alarm",title:"我的待办"},
      {id:3,icon:"mdi-calendar-check",title:"我已完成"},
      {id:4,icon:"mdi-calendar-clock",title:"我的提醒"},
      {id:5,icon:"mdi-file",title:"我的文档"}
    ],
    currentDetail:{
      title:"我的创建",
      project:"软件项目管理",
      listCount:10,
    }
  }),
  mounted:{
    
  },
  methods:{
    switchDetail(){
      //写对应tab的请求,接口参数为tabId
      }
    },
}
</script>
<style scoped>
.root{
  margin-left: 20px;
  margin-right: 20px;
  height:100%;
}
.content{
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom:10px;
}
.drawer{
  margin-top: 10px;
  margin-bottom:10px;
}
.titleBar{
  margin-bottom: 10px;
}
.tabTitle{
  font-size: 13px;
}
.projectName{
  font-size: 13px;
}
</style>