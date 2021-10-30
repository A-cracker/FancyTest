
<template>
<div class="root">
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
            
            >
            <img :src= project.url class="pic" @click="routerto(project.id)">
            <span style="margin-left:5px;">{{project.name}}</span>

            <v-btn icon @click="deleteConfirm(project.id)">
            <v-icon>mdi-delete</v-icon>

            </v-btn>
            </v-card>
          
            <v-card v-show="show2"
            class="pro"
            min-width="180px"
            max-width="180px"
            v-for="project in projectList2"
            :key="project.id"
            @click="routerto(project.id)"
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

          <v-dialog v-model=deleteDialog max-width="500px">
            <v-card-title class="text-h5 grey lighten-2">
            确认删除此项目?
            </v-card-title>
            <v-row justify="space-around">
            <v-col cols="auto">
            <v-btn
              color="primary"
              text
              @click="deleteDialog = false"
            >
              取消
           </v-btn>
           </v-col>
          <v-col cols="auto">
           <v-btn
              color="primary"
              text
              @click="deleteProject()"
            >
              确认
           </v-btn>
           </v-col>
           </v-row>
          </v-dialog>

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
            v-model="newProject.Project.projectName"
          ></v-text-field>
            <v-combobox
            chips
            multiple
            hint="请填写成员的ID"
            label="邀请项目成员"
            placeholder="201830661298"
            v-model="newProject.Project.memberArrayInJson"
          ></v-combobox>
           <v-textarea
          outlined
          name=""
          label="项目描述"
          value=""
          v-model="newProject.Project.detail"
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
import {addProject,initMyProj,deleteProject} from '@/request/api'
export default{
    data:()=>({
        createDialog:false,
        deleteDialog:false,
        wannaDelete:0,
        projectList:[],
        show1:true,
        projectList2:[],
        show2:false,
        newProject:{
          Project:{
            projectName:"",
            memberArrayInJson:[],
            detail:""
          }
        }
    }),
    mounted(){
      initMyProj().then(res=>{
          for(var x=0;x<res.unfinishedProj.length;x++)
          {
            this.projectList.push({id:res.unfinishedProj[x].projectId,name:res.unfinishedProj[x].projectName,url:require("@/assets/img3.jpg")})
          }
          for(var y=0;y<res.finishedProj.length;y++)
          {
            this.projectList2.push({id:res.finishedProj[y].projectId,name:res.finishedProj[y].projectName,url:require("@/assets/img3.jpg")})
          }
      });
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
          this.createDialog = false;
          addProject(this.newProject).then(res=>res(this.projectList.push({id:res.projectId,name:this.newProject.Project.projectName,url:require("@/assets/img3.jpg")})))
        },
        deleteConfirm(id){
          this.deleteDialog=!this.deleteDialog;
          this.wannaDelete=id;
          console.log(id);
        },
        deleteProject(){
          deleteProject(this.wannaDelete).then((res)=>{
            if(res.isDeleted)
            {
            alert("删除成功");
            location.reload();
            }
            else
            alert("删除失败");
          }
          );
          this.deleteDialog=false;
        }
    }
}
</script>
<style scoped>
.root{
  height:100%;
}
.pic{
    width:100%;
}
.pro{
    margin-top: 20px;
    margin-left: 20px;
}
</style>
