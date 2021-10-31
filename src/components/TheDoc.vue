<template>

<div class="d-flex flex-column"> 

<div>
    <v-toolbar
    height="50px"
    color="#ECEFF1"
    light
    flat>
    <v-btn dark>新建文档</v-btn>

    <v-btn dark class="mx-3">
      上传
    </v-btn>
    <v-btn dark>
      删除
    </v-btn>
    <v-spacer></v-spacer>
    </v-toolbar>
</div>


<div class="d-flex flex-row root" style="background-color:#ECEFF1;">


<!--文档内容--> 
<div class="content d-flex flex-column root flex-grow-1" style="height:600px;">

<!--工具栏-->
  <v-card class="nav">
        <v-tabs height="45">
        <v-tab v-for="item in tabs"
        :key="item"
        @click="fliter(item.title)">
        {{item.title}}
        </v-tab>
        </v-tabs>
  </v-card>

  <v-card class="list overflow-y-auto overflow-x-hidden">
    <div v-if= "count == 0" class="placeholder d-flex justify-center align-center">
    <div style="text-align:center;">
    <img class="doc" src="@/assets/folder.svg"/>
    <div class="font-weight-light">暂无文档</div>
    <div class="font-weight-light">请点击左上角的“新建”按钮添加</div>
    </div>
      </div>
    <div v-else>
      <v-data-table
      :show-select="selectable"
      :headers="headers"
      :items="listItems"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
    >

    <template v-slot:[`item.title`]="{ item }">
      <v-icon v-if="item.type=='word'" color="primary" large>mdi-file-word-outline</v-icon>
      <v-icon v-if="item.type=='pdf'" color="error" large>mdi-file-pdf-outline</v-icon>
      <v-icon v-if="item.type=='pic'" color="dark" large>mdi-image-outline</v-icon>
      <v-icon v-if="item.type=='folder'" color="orange darken-2" large>mdi-folder-open</v-icon>
      <a @click="routerto(item.id,item.type)" style="font-size:13px;">{{item.title}}</a>
    </template>
    </v-data-table>

    <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
      ></v-pagination>
    </div>
    </div>
  </v-card>
<!--列表-->
  </div>

</div>

</div>


</template>
<script>


export default{
name:"TheDoc",
data: () => ({
    tabs:[
      {title:'所有文件'},
      {title:'图片'},
      {title:'文件'},
      {title:'文件夹'},
    ],
    count:1,
    selectable:true,
    page: 1,
        pageCount: 0,
        itemsPerPage: 9,
          headers: [
          { text: '标题', value: 'title'},
          { text: '创建人', value: 'creator'},
          { text: '最近修改时间', value: 'date'},
        ],
        listItems: [
          {
            id: 1,
            title: '需求文档',
            creator: '小王',
            date: '2021-2-15',
            type:'word'
          },
          {
            id: 2,
            title: '图片',
            creator: '小王',
            date: '2021-2-15',
            type:'pic'
          },
          {
            id: 3,
            title: 'pdf',
            creator: '小王',
            date: '2021-2-15',
            type:'pdf'
          },
          {
            id: 4,
            title: '文件夹',
            creator: '小王',
            date: '2021-2-15',
            type:'folder'
          },
        ],
}),

watch: {
},

methods: {
routerto(number,type){
     this.$router.push({
       name:'MyDoc',
       params:{id:number, type:type}
     })
   },
}

}
</script>

<style scoped>
.root{
  height: 100%;
}
.tab{
  margin-left:10px;
  margin-bottom: 7px;
}
.content{
  width:100%;
  margin-left: 10px;
  margin-right:10px;
  margin-bottom: 7px;
}
.list{
  margin-top: 7px;
  height:100%;
}
.list::-webkit-scrollbar
{
  width: 0px;
  background-color:white;
}
.doc{
    width:100px;
}
.placeholder{
    height: 100%;
}
a:link {color: #424242}
</style>
