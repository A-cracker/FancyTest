<template>

<div class="d-flex flex-column"> 

<div>
<v-toolbar
height="50px"
color="#ECEFF1"
      light
      flat
    >
    <v-btn dark
    @click="dialog=!dialog">
      创建需求
    </v-btn>
<!--弹窗部分-->
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            创建需求
          </v-card-title>
          <v-card-text>

        <v-text-field
        style="margin-bottom:10px;"
        label="需求名"
        :rules="rules"
        hide-details="auto"
        required
        v-model="newRequirement.title"
        ></v-text-field>  
                <v-select
                  persistent-hint
                  hint="选择需求类型"
                  :items="['功能','非功能']"
                  label="类型"
                  required
                ></v-select>
                
                <v-select
                persistent-hint
                  hint="选择需求处理人"
                  :items="['201930381000', '201830391000', '201830391000']"
                  label="处理人"
                  required
                ></v-select>

        <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  persistent-hint
                  hint="选择需求状态"
                  :items="['未执行','实现中','已实现']"
                  label="状态*"
                  required
                  v-model="newRequirement.state"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                persistent-hint
                  hint="选择需求优先级"
                  :items="['High', 'Middle', 'Low']"
                  label="优先级*"
                  required
                  v-model="newRequirement.priority"
                ></v-select>
              </v-col>   
    </v-row> 
          
<!--选择日期-->
    <v-row>
      <v-col
        cols="6"
        lg="6"
      >      
      <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              readonly
              v-model="newRequirement.preStart"
              label="创建时间"
              hint="MM/DD/YYYY"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              @blur="newRequirement.preStart = parseDate(formatDate(newRequirement.preStart))"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="newRequirement.preStart"
            no-title
            @input="menu1 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>

      <v-col
        cols="6"
        lg="6"
      >      
      <v-menu
          ref="menu2"
          readonly
          v-model="menu2"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="newRequirement.preEnd"
              label="结束时间"
              hint="MM/DD/YYYY"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              @blur="newRequirement.preEnd = parseDate(formatDate(newRequirement.preEnd))"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="newRequirement.preEnd"
            no-title
            @input="menu2 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

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
              @click="createReq"
            >
              创建
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


    <v-btn dark class="mx-3" v-show="hidden" @click="deleteRequirement">
      删除需求
    </v-btn>
    <v-spacer></v-spacer>
    <span class="font-weight-light" style="font-size:10px;">|共{{count}}个需求</span>
    <v-btn icon @click="hidden=!hidden;selectable=!selectable">
        <v-icon>mdi-delete</v-icon>
    </v-btn>
    </v-toolbar>
</div>


<div class="d-flex flex-row root" style="background-color:#ECEFF1;">

 <!--选项卡--> 
<v-card class="tab overflow-y-auto overflow-x-auto" max-height="600px" min-width="100px" v-show="hidden2" width="210">
<v-treeview :items="tree" dense hoverable activatable class="font-weight-light"
style="font-size:14px;"></v-treeview>
</v-card>

 <!--需求内容--> 
<div class="content d-flex flex-column root flex-grow-1" style="height:600px;">

<!--工具栏-->
  <v-card class="nav">
    <v-toolbar
      flat
      height="45"
    >
    <v-btn icon @click="hidden2=!hidden2"><v-icon small>mdi-menu</v-icon></v-btn>
    <v-spacer></v-spacer>
    </v-toolbar>
  </v-card>

  <v-card class="list overflow-y-auto overflow-x-hidden">
    <v-data-table
       v-model="wannaDelete"
      :show-select="selectable"
      :headers="headers"
      :items="requirementInfo"
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

    <template v-slot:[`item.state`]="{ item }">
      <v-chip small outlined
        :color="getColorS(item.state)"
        dark
      >
        {{ item.state }}
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
<!--列表-->
  </div>

</div>

</div>


</template>
<script>
import {addReq,initRequirement,deleteRequirement} from '@/request/api'
export default{
    name:"TheRequirement",
    props:['id'],
    data: () => ({
      rules: [
        value => !!value || '需求名称不能为空',
        value => (value && value.length >= 2) || '至少输入一个字符',
      ],

      selectable:false,
  
      menu1: false,
      menu2:false,
      addListItemDialog:false,
      tree: [
        {
          id: 1,
          name: '所有的(11)',
          children: [
            { id: 2, name: '未分类(7)' },
            { id: 3, name: '功能用例(3)' },
            { id: 4, name: '质量用例(1)' }
          ],
        }
      ],
      dialog:false,
      hidden:false,
      hidden2:true,
      items: [
          { title: 'Dashboard', icon: 'mdi-chart-timeline-variant' },
          { title: 'Photos', icon: 'mdi-chart-timeline-variant' },
          { title: 'About', icon: 'mdi-chart-timeline-variant' },
        ],
        
        page: 1,
        pageCount: 0,
        itemsPerPage: 9,
          headers: [
          {
            text: 'ID',
            align: 'center',
            sortable: false,
            value: 'id',
          },
          { text: '标题', value: 'title', align: 'center'},
          { text: '状态', value: 'state',align: 'center'},
          { text: '优先级', value: 'priority',align: 'center'},
          { text: '处理人', value: 'processor',align: 'center'},
          { text: '创建人', value: 'creator',align: 'center' },
          { text: '预计开始', value: 'preStart' ,align: 'center'},
          { text: '预估结束', value: 'preEnd' ,align: 'center'},
        ],
        newRequirement:{
          title:"",
          state:"",
          priority:"",
          preStart:new Date().toISOString().substr(0, 10),
          preEnd:new Date().toISOString().substr(0, 10),
        },
        memberArray:[],
        requirementInfo: [],
        wannaDelete: [],
    }),

  mounted(){
    initRequirement(this.$route.params.id).then(res=>{
      this.requirementInfo=res.requirements
    })
  },
  computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
      count: function () {
      return this.requirementInfo.length
    },
    },

    watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date)
      },
    },

 methods: {
   routerto(number,type){
     this.$router.push({
       name:'TheDetail',
       params:{id:number, type:type}
     })
   },
    getColorP (priority) {
        if (priority == "High") return 'red'
        else if (priority == "Middle") return 'orange'
        else return 'green'
    },
    getColorS (priority) {
        if (priority == "未执行") return 'primary'
        else if (priority == "实现中") return 'green'
        else return 'grey'
    },
    //时间选择
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      //规范格式
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      createReq(){
          this.dialog=!this.dialog
          let requirement = this.newRequirement
          switch(requirement.state){
            case "未执行":requirement.state="0"
              break;
            case "实现中":requirement.state="1"
              break;
            case "已实现":requirement.state="2"
              break;
              default:
              break;
          } 
          switch(requirement.priority){
            case "Low":requirement.priority="0"
              break;
            case "Middle":requirement.priority="1"
              break;
            case "High":requirement.priority="2"
              break;
              default:
              break;
          }
          addReq(this.$route.params.id,
          requirement).then((res)=>{
            this.requirementInfo=this.requirementInfo.concat(res.require)
          })
        },
          deleteRequirement(){
          this.hidden=!this.hidden
          this.selectable=!this.selectable
          var request=[];
          for(let i=this.wannaDelete.length-1;i>=0;i--)
          {
            request.push(this.wannaDelete[i].id);
            this.wannaDelete.pop();
          }
          alert(request)
          deleteRequirement(request).then(res=>{
            if(res.isDeleted){
              this.$router.go(0);
            }
            else{
              alert("删除失败")
            }
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
</style>
