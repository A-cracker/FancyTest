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
    <v-spacer></v-spacer>
    </v-toolbar>
</div>


<div class="d-flex flex-row root" style="background-color:#ECEFF1;">


<!--文档内容--> 
<div class="content d-flex flex-column root flex-grow-1" style="height:600px;">

<!--工具栏-->
  <v-card class="nav">
        <v-tabs height="45">
        <v-tab>所有文件</v-tab>
        <v-tab>图片</v-tab>
        <v-tab>文档</v-tab>
        <v-tab>文件夹</v-tab>
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
    count:0,
}),

watch: {
},

methods: {

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
.doc{
    width:100px;
}
.placeholder{
    height: 100%;
}
</style>
