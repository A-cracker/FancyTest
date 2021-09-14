<template>
 <div class="d-flex flex-row root">
     <v-card class="drawer" min-width="150px"
      v-show="hidden">
      <v-tabs vertical>
        <v-tab @click="switchDetail(item.id)"
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

      <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
         <v-btn icon
          v-bind="attrs"
          v-on="on"><v-icon small>mdi-filter-menu</v-icon></v-btn>
      </template>
      <v-list>
        <v-list-item dense link
          v-for="(item, index) in ['缺陷','执行','用例','需求']"
          :key="index"
          @click="fliter(item)"
        >
          <v-list-item-subtitle>{{ item }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-menu>
    </v-toolbar>
  </v-card>

     <v-card class="detail flex-grow-1 overflow-y-auto overflow-x-auto">
    <v-data-table
      
      :headers="headers"
      :items="listItems"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
    >
    <template v-slot:[`item.priority`]="{ item }">
      <v-chip small
        :color="getColorP(item.priority)"
        dark
      >
        {{ item.priority }}
      </v-chip>
    </template>

    <template v-slot:[`item.status`]="{ item }">
      <v-chip small outlined
        :color="getColorS(item.status)"
        dark
      >
        {{ item.status }}
      </v-chip>
    </template>

    <template v-slot:[`item.title`]="{ item }">
     
      <a @click="routerto(item.id,item.type)">{{item.title}}</a>
    </template>
    </v-data-table>

    <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
      ></v-pagination>
    </div>
  </v-card>
     </div>
 </div>
</template>
<script>
export default{
  data:()=>({
    hidden:true,
    items:[
      {id:0,icon:"mdi-pencil-outline",title:"我的创建"},
      {id:1,icon:"mdi-alarm",title:"我的待办"},
      {id:2,icon:"mdi-calendar-check",title:"我已完成"},
      {id:3,icon:"mdi-calendar-clock",title:"我的提醒"},
      {id:4,icon:"mdi-file",title:"我的文档"}
    ],
    currentDetail:{
      title:"我的创建",
      project:"软件项目管理",
      listCount:10,
    },
    page: 1,
    pageCount: 0,
    itemsPerPage: 11,
    headers: [
    {
      text: 'ID',
      align: 'center',
      sortable: false,
      value: 'id',
    },
    { text: '标题', value: 'title', align: 'center'},
    { text: '状态', value: 'status',align: 'center'},
    { text: '优先级', value: 'priority',align: 'center'},
    { text: '处理人', value: 'processor',align: 'center'},
    { text: '创建人', value: 'creator',align: 'center' },
    { text: '预计开始', value: 'begin' ,align: 'center'},
    { text: '预估结束', value: 'end' ,align: 'center'},
  ],
  listItems: [
    {
      id: 1,
      title: '需求1',
      status:'未执行',
      priority:'LOW',
      processor: '小梁',
      creator: '小王',
      begin: '2021-2-15',
      end:'2021-3-20',
      type:'usecase'
    },
    {
      id: 2,
      title: '需求2',
      status:'实现中',
      priority:'HIGH',
      processor: '小梁',
      creator: '小王',
      begin: '2021-2-15',
      end:'2021-3-20',
      type:'usecase'
    },
  ],
  }),
  mounted:{
    
  },
  methods:{
    fliter(type){
      switch(type){
        case '需求':
        break;
        case '用例':
        break;
        case '执行':
        break;
        case '缺陷':
        break;
        default:
          break;
      }
    },
    switchDetail(id){
      this.currentDetail.title=this.items[id].title
      },
    routerto(number,type){
     this.$router.push({
       name:'TheDetail',
       params:{id:number, type:type}
     })
   },
    getColorP (priority) {
        if (priority == "HIGH") return 'red'
        else if (priority == "MIDDLE") return 'orange'
        else return 'green'
    },
    getColorS (priority) {
        if (priority == "未执行") return 'primary'
        else if (priority == "实现中") return 'green'
        else return 'grey'
    },
  },
    
}
</script>
<style scoped>
.root{
  height:100%;
}
.content{
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom:10px;
  margin-right: 20px;
}
.drawer{
  margin-top: 10px;
  margin-bottom:10px;
  margin-left: 20px;
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