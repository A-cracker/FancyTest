<template>
<div class="d-flex flex-column root" >
    <v-toolbar
      light
      flat
      class="toolbar"
    >
      <v-toolbar-title><v-icon>mdi-file-tree</v-icon>软件项目管理</v-toolbar-title>
    
      <v-spacer></v-spacer>
      <div>
      <v-tabs
          centered
          fixed-tabs
          slider-color="grey"
          color="primary"
        >
          <v-tab
            v-for="item in items"
            :key="item"
            link
            :href="'#tab-' + item.text"
            :to="'/myproject/'+ id +'/'+ item.route"
          >
            <span class="font-weight-light">{{ item.text }}</span>
          </v-tab>
        </v-tabs>
      </div>

        <v-col
          cols="2"
        >
          <v-text-field
            dense
            filled
            rounded
            ref="search"
            v-model="search"
            full-width
            hide-details
            label="搜索.."
            append-icon="mdi-magnify"
            single-line
          ></v-text-field>
        </v-col>


    <!--邀请成员-->
    
      <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
      <v-btn icon
        v-bind="attrs"
        v-on="on"
        @click="dialog = !dialog">
        <v-icon>mdi-account-multiple-plus</v-icon>
      </v-btn>
      </template>
      <span>邀请成员</span>
      </v-tooltip>

      <!--弹窗部分-->
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            邀请成员
          </v-card-title>
          <v-card-text>
            <v-combobox
            chips
            multiple
            hint="请填写成员的ID"
            label="成员ID"
            placeholder="即学号，enter键结束输入"
            v-model="project.addMemArray"
          ></v-combobox>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              取消
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="dialog = false,addMem(project.addMemArray)"
            >
              确认邀请
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    <v-dialog
      v-model="dialog2"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-help-circle-outline</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          项目详情
        </v-card-title>
        <v-card-text>
          <v-list subheader>
            <v-subheader> 项目内容：</v-subheader>
            <v-list-item>{{project.projectObject}}</v-list-item>
            <v-subheader>项目状态：</v-subheader>
            <v-list-item>
              <v-chip-group mandatory active-class="primary--text" v-model="project.projectState">
                <v-chip v-for="tag in ['已完成','未完成']" :key="tag" :value="tag">{{ tag }}</v-chip>
              </v-chip-group>
            </v-list-item>
          <v-subheader>项目成员：</v-subheader>
        <div style="position:relative;overflow:hidden;">
        <div class="list">
          <!-- <v-list-item v-for="(item,index) in project.members" :key="item.id"> -->
            <v-list-item v-for="(item,index) in project.members" :key="item"> 
              <v-list-item-avatar>
              <v-img
              alt="avatar"
              src ="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202101%2F29%2F20210129131644_c2b14.thumb.400_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635302765&t=dc009f11d75b79b7b3337bac622b58c8"
              ></v-img>
              </v-list-item-avatar>
          <v-list-item-content>
            <!-- <v-list-item-title>{{ item.name }}（管理员）</v-list-item-title>
            <v-list-item-subtitle>ID:{{ item.id }}</v-list-item-subtitle> -->
            <v-list-item-title>伏黑惠（管理员）</v-list-item-title>
            <v-list-item-subtitle>ID:{{ item }}</v-list-item-subtitle>
          </v-list-item-content>
        <v-list-item-icon>
      <v-dialog
      v-model="dialog_delete_member"
      v-show="dialog_delete_member"
      width="500"
      >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icons-and-text
          v-bind="attrs"
          icon
          v-on="on"
          @click="dialog_delete_member=true,dialog2=false"
        >
          <v-icon>mdi-account-minus-outline</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          删除成员
        </v-card-title>
        <v-card-text>你将永久删除此成员,确认删除成员吗？</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog2 = true, dialog_delete_member=false"
          >
            取消
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="dialog_delete_member = false; deleteMember(index)"
          >
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
        </v-list-item-icon>
            </v-list-item>
        </div>
        </div>
      </v-list>
        </v-card-text>
    <v-divider></v-divider>
      <v-card-actions>
      <v-spacer></v-spacer>
      <v-dialog
      v-model="dialog3"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text
          v-bind="attrs"
          v-on="on"
          color="error"
          @click="dialog2= false,dialog3= true"
        >
          删除项目
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          删除项目
        </v-card-title>
        <v-card-text>你将永久删除此项目,确认删除项目吗？</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog3=false,dialog2= true"
          >
            取消
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="dialog3= false"
          >
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
          <v-btn
            color="primary"
            text
            @click="dialog2= false"
          >
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-toolbar>

        <router-view :id="id"></router-view>

</div>


</template>

<script>
import {inviteMem} from '@/request/api'
import {initMem} from '@/request/api'
import {deleteMem} from '@/request/api'

 export default {
    props:['id'],
    data: () => ({
      project:{
        projectName:"软件项目管理",
        projectState:"",
        projectObject:"对项目XXXX进行测试",
        members:[
          // {
          //   // id:201830381000,
          //   // avatar:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202101%2F29%2F20210129131644_c2b14.thumb.400_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635302765&t=dc009f11d75b79b7b3337bac622b58c8",
          //   // name:"伏黑惠"
          // }
        ],
        addMemArray:[
          
        ]
      },
      dialog: false,  //邀请成员
      dialog2:false,  //项目细节
      dialog3:false,  //删除项目
      dialog_delete_member:false,   //删除成员
      currentItem: 'ThePlan',
      inviteResponse:'',//邀请响应,true or false
      items: [
        {text:'计划',util:"ThePlan",route:'theplan'}, 
        {text:'需求',util:"TheRequirement",route:'thereq'}, 
        {text:'用例',util:"TheUseCase",route:'theusecase'}, 
        {text:'执行',util:"TheExecute",route:'theexecute'},
        {text:'缺陷',util:"TheBug",route:'thebug'},
        {text:'文档',util:"TheDoc",route:'thedoc'},
        {text:'报表',util:"TheChart",route:'thechart'},
      ],
    }),
    components: {
    },
    methods:{
    addMem(array){
      //判断是否重复，以及学号是否符合要求
      //如果符合则添加到现有的成员数组中
      inviteMem(this.id,array).then(res=>{//res返回新成员数组
        console.log(res);
        if(res.isInvited == true){
        alert("邀请成功！");
        this.project.members=this.project.members.concat(array);
        }
        else
           alert("邀请失败");
        })
        //将addMemArray数组清空
        this.project.addMemArray = [];

    },
    deleteMember(index){
      deleteMem(this.id,this.project.members[index]).then(res=>{
        console.log(this.project.members);
        console.log(res);
        if(res.isDeleted==true){
            alert("删除成员成功");
            console.log(index);
            this.project.members.splice(index,1);
        }
        else{
          alert("删除成员失败");
        }
      })
    }
  },
  created(){
    initMem(this.id).then(res=>{
      this.project.members = res.memInfos;
      // console.log(res);
    }).catch()
  },
  mounted() {
  }
  }
</script>
<style scoped>
.root{
  height: 100%;
}
.list{
  overflow: auto;
  height:150px;
}
.toolbar{
  overflow-x:auto;overflow-y:hidden
}
.toolbar::-webkit-scrollbar
{
    height:4px;
    background-color:white;
}
</style>
