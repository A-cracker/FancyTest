<template>
<div>
    <v-toolbar flat>
        <v-toolbar-title>
            我的项目
        </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-tabs>
    <v-tab @click="changeProjectList()">待办项目</v-tab>
    <v-tab @click="changeProjectList()">完成项目</v-tab>
  </v-tabs>

  <div class="d-flex justify-start flex-wrap flex-row">
            <v-card v-show="show1"
            class="pro"
            min-width="180px"
            max-width="180px"
            v-for="project in projectList"
            :key="project.id"
            @click="routerto(project.projectId)"
            >
            <img :src= project.url class="pic">
            <span style="margin-left:5px;">{{project.name}}</span>
            </v-card>
          
            <v-card v-show="show2"
            class="pro"
            min-width="180px"
            max-width="180px"
            v-for="project in projectList2"
            :key="project.id"
            @click="routerto(project.projectId)"
            >
            <img :src= project.url class="pic">
            <span style="margin-left:5px;">{{project.name}}</span>
            </v-card>

          <v-card
          v-show="show1"
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
            <v-form>
              <v-text-field
            label="项目名称"
            placeholder="项目名"
          ></v-text-field>
            <v-combobox
            chips
            multiple
            hint="请填写成员的ID"
            label="邀请项目成员"
            placeholder="201830661298"
          ></v-combobox>
           <v-textarea
          outlined
          name=""
          label="项目描述"
          value=""
        ></v-textarea>
            </v-form>
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
              @click="createProject()"
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
          {projectId:1,name:'项目1',url:require("@/assets/img3.jpg")},
          {projectId:2,name:'项目2',url:require("@/assets/img3.jpg")},
        ],
        show1:true,
        projectList2:[
          {projectId:1,name:'项目3',url:require("@/assets/img3.jpg")},
        ],
        show2:false,
    }),
    mounted:{
      //初始化项目列表projectList和projectList2
    },
    watch:{

    },
    methods:{
        routerto(number){
            this.$router.push({
                name:"MyProject",
                params:{id:number}
            })
        },
        changeProjectList(){
          this.show1=!this.show1
          this.show2=!this.show2
        },
        createProject(){
          this.createDialog = false
          this.projectList.push({projectId:1,name:'项目3',url:require("@/assets/img3.jpg")})
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
