<template>
<div>
    <v-toolbar flat>
        <v-toolbar-title>
            我的项目
        </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-tabs>
    <v-tab>待办项目</v-tab>
    <v-tab>完成项目</v-tab>
  </v-tabs>

  <div class="d-flex justify-start flex-wrap">
          <v-card
          class="pro"
          min-width="180px"
          max-width="180px"
          v-for="project in projectList"
          :key="project.id"
          @click="routerto(project.id)"
          >
          <img :src= project.url class="pic">
          <span style="margin-left:5px;">{{project.name}}</span>
          </v-card> 
          <v-card
          class="pro"
          min-width="180px"
          max-width="180px"
          @click="createDialog=!createDialog"
          >
          <img src="@/assets/添加.png" class="pic">
          <span style="margin-left:5px;">创建项目</span>
          </v-card>
          <v-dialog v-model=createDialog max-width="500px">
              <v-card>
          <v-card-title>
            创建项目
          </v-card-title>
          <v-card-text>
              <v-text-field
            label="项目名称"
            placeholder="项目名"
          ></v-text-field>
            <v-combobox
            chips
            multiple
            hint="请填写成员的ID"
            label="项目成员"
            placeholder="201830661298"
          ></v-combobox>
           <v-textarea
          outlined
          name=""
          label="项目描述"
          value=""
        ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="createDialog = false"
            >
              取消
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="createDialog = false"
            >
              确认创建
            </v-btn>
          </v-card-actions>
        </v-card>
          </v-dialog>
  </div>

</div>
</template>
<script>
export default{
    data:()=>({
        createDialog:false,
        projectList:[
            {id:1,name:'项目1',url:require("@/assets/img.jpg")},
            {id:2,name:'项目2',url:require("@/assets/img.jpg")},
           ],
    }),
    methods:{
        routerto(number){
            this.$router.push({
                name:"MyProject",
                params:{id:number}
            })
        }
    }
}
</script>
<style scoped>
.pic{
    width:100%;
}
.pro{
    margin-top: 20px;
    margin-left: 20px;
}
</style>
