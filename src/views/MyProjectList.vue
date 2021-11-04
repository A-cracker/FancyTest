<template>
<div class="root">
    <v-toolbar flat>
        <v-toolbar-title>
            我的项目
        </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-tabs>
    <v-tab @click="changeProjectList('todo')">待办项目</v-tab>
    <v-tab @click="changeProjectList('finshed')">完成项目</v-tab>
  </v-tabs>

  <div class="d-flex justify-start flex-wrap flex-row">
            <v-card v-show="show1"
            class="pro"
            min-width="180px"
            max-width="180px"
            v-for="project in projectList"
            :key="project.projectId"
            
            >
            <img src= "@/assets/img3.jpg" class="pic" @click="routerto(project.projectId)">
            <span style="margin-left:5px;float:left;">{{project.projectName}}</span>
            <span style="float:right;">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                <v-btn 
                icon tile x-small 
                @click="deleteConfirm(project.projectId)"
                v-bind="attrs"
                v-on="on">
                <v-icon>mdi-delete</v-icon
                ></v-btn>
                </template>
              <span>删除项目</span>
              </v-tooltip>
            </span>
            </v-card>
          
          <v-card v-show="show2"
          class="pro"
          min-width="180px"
          max-width="180px"
          v-for="project in projectList2"
          :key="project.projectId"
          @click="routerto(project.projectId)"
          >
          <img src= "@/assets/img3.jpg" class="pic">
          <span style="margin-left:5px;">{{project.projectName}}</span>
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
                    <v-card>
          <v-card-title>
            删除项目
          </v-card-title>
          <v-card-text>
            是否确认删除该项目？
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="deleteDialog = false"
            >
              取消
            </v-btn>
            <v-btn
              color="error"
              text
              @click="deleteDialog = false,deleteProject()"
            >
              确认删除
            </v-btn>
          </v-card-actions>
        </v-card>
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
    created(){
      initMyProj().then(res=>{
          this.projectList=res.unfinishedProj
          this.projectList2=res.finishedProj
      });
    },
    computed:{
      projectList:function () {
      return this.projectList}
    },
    methods:{
        routerto(number){
            this.$router.push({
                name:"MyProject",
                params:{id:number}
            })
        },
        changeProjectList(state){
          switch(state){
            case "todo":
              this.show1=true
              this.show2=false
              break;
            case "finshed":
              this.show2=true
              this.show1=false
              break;
            default:
                break;
          }
        },
        createProject(){
          this.createDialog = false;
          addProject(this.newProject).then((res)=>{
            this.projectList=this.projectList.concat(
              {
                detail:this.newProject.Project.detail,
                memberArray:this.newProject.Project.memberArrayInJson,
                projectId:res.projectId,
                projectName:this.newProject.Project.projectName
              }
            )}
          )
        },
        deleteConfirm(id){
          this.deleteDialog=!this.deleteDialog;
          this.wannaDelete=id;
        },
        deleteProject(){
          deleteProject(this.wannaDelete).then((res)=>{
            if(res.isDeleted)
            {
            alert("删除成功");
            for(var i=0;i<this.projectList.length;i++)
            {
              if(this.projectList[i].projectId===this.wannaDelete)
              {
                this.projectList.splice(i,1);
                break;
              }
            }
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
