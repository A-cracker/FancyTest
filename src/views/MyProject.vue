<template>
<div class="d-flex flex-column root" >
    <v-toolbar
      light
      flat
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
            :href="'#tab-' + item.text"
            @click='currentItem=item.util'
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
            placeholder="007"
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
              @click="dialog = false"
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
          <v-subheader>项目成员：</v-subheader>
        <div style="position:relative;overflow:hidden;">
        <div class="list">
          <v-list-item>
              <v-list-item-avatar>
              <v-img
              alt="avatar"
              src="@/assets/img.jpg"
              ></v-img>
              </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>五条悟（管理员）</v-list-item-title>
            <v-list-item-subtitle>ID:001</v-list-item-subtitle>
          </v-list-item-content>
        <v-list-item-icon>
          <v-btn icon>
          <v-icon>mdi-account-minus-outline</v-icon>
          </v-btn>
        </v-list-item-icon>
            </v-list-item>
            <v-list-item>
              <v-list-item-avatar>
              <v-img
              alt="avatar"
              src="@/assets/img.jpg"
              ></v-img>
              </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>五条悟（管理员）</v-list-item-title>
            <v-list-item-subtitle>ID:001</v-list-item-subtitle>
          </v-list-item-content>
        <v-list-item-icon>
          <v-btn icon>
          <v-icon>mdi-account-minus-outline</v-icon>
          </v-btn>
        </v-list-item-icon>
            </v-list-item>
          <v-list-item>
              <v-list-item-avatar>
              <v-img
              alt="avatar"
              src="@/assets/img.jpg"
              ></v-img>
              </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>五条悟（管理员）</v-list-item-title>
            <v-list-item-subtitle>ID:001</v-list-item-subtitle>
          </v-list-item-content>
        <v-list-item-icon>
          <v-btn icon>
          <v-icon>mdi-account-minus-outline</v-icon>
          </v-btn>
        </v-list-item-icon>
            </v-list-item>

          <v-list-item>
              <v-list-item-avatar>
              <v-img
              alt="avatar"
              src="@/assets/img2.jpg"
              ></v-img>
              </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>悠仁（普通成员）</v-list-item-title>
            <v-list-item-subtitle>ID:002</v-list-item-subtitle>
          </v-list-item-content>
        <v-list-item-icon>
          <v-btn icon>
          <v-icon>mdi-account-minus-outline</v-icon>
          </v-btn>
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

        <component :is="currentItem" class="root"
        ></component>

</div>


</template>

<script>
import ThePlan from '@/components/ThePlan';
import TheRequirement from '@/components/TheRequirement';
import TheUseCase from '@/components/TheUseCase';
import TheExecute from '@/components/TheExecute';
import TheBug from '@/components/TheBug';
import TheDoc from '@/components/TheDoc';
import TheChart from '@/components/TheChart';

 export default {
    props:['id'],
    data: () => ({
      project:{
        projectObject:"对项目XXXX进行测试",
        members:[
          {name:"",ID:"",avatar:""}
        ]
      },
      dialog: false,
      dialog2:false,
      dialog3:false,
      currentItem: 'ThePlan',
      inviteResponse:'',//邀请响应,true or false
      items: [
        {text:'计划',util:"ThePlan"}, 
        {text:'需求',util:"TheRequirement"}, 
        {text:'用例',util:"TheUseCase"}, 
        {text:'执行',util:"TheExecute"},
        {text:'缺陷',util:"TheBug"},
        {text:'文档',util:"TheDoc"},
        {text:'报表',util:"TheChart"},
      ],
    }),
    components: {
        ThePlan,
        TheRequirement,
        TheUseCase,
        TheExecute,
        TheBug,
        TheDoc,
        TheChart
    },
  created(){
    
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
  height:200px;
}
</style>
