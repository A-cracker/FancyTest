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
      创建用例
    </v-btn>
<!--弹窗部分-->
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            创建用例
          </v-card-title>
          <v-card-text>

        <v-text-field
        style="margin-bottom:10px;"
        label="用例名"
        :rules="rules"
        hide-details="auto"
        required
        v-model="newUseCase.title"
        ></v-text-field>  

            <!--选择优先级和严重程度-->
        <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  persistent-hint
                  hint="选择用例状态"
                  :items="['未执行','实现中','已实现']"
                  label="状态*"
                  required
                  v-model="newUseCase.state"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                persistent-hint
                  hint="选择用例优先级"
                  :items="['HIGH', 'MIDDLE', 'LOW']"
                  label="优先级*"
                  required
                  v-model="newUseCase.priority"
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
              label="创建时间"
              hint="MM/DD/YYYY"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              @blur="newUseCase.preStart = parseDate(formatDate(newUseCase.preStart))"
              v-on="on"
              v-model="newUseCase.preStart"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="newUseCase.preStart"
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
              v-model="newUseCase.preEnd"
              label="结束时间"
              hint="MM/DD/YYYY"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              @blur="newUseCase.preEnd = parseDate(formatDate(newUseCase.preEnd))"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="newUseCase.preEnd"
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
              @click="dialog = false;createUseCase()"
            >
              创建
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


    <v-btn dark class="mx-3" v-show="hidden">
      删除用例
    </v-btn>
    <v-spacer></v-spacer>
    <span class="font-weight-light" style="font-size:10px;">|共10个用例</span>
    <v-btn icon @click="hidden=!hidden;selectable=!selectable">
        <v-icon>mdi-delete</v-icon>
    </v-btn>
    </v-toolbar>
</div>


<div class="d-flex flex-row root" style="background-color:#ECEFF1;">

 <!--选项卡--> 
<v-card class="tab overflow-y-auto overflow-x-auto" max-height="600px" min-width="100px" v-show="hidden2" width="210">
<v-treeview :items="tree" dense hoverable activatable class="font-weight-light" :selectable="selectable"
style="font-size:14px;"></v-treeview>
</v-card>

 <!--用例内容--> 
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
      :show-select="selectable"
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
import {addUseCase} from '@/request/api'

export default{
    name:"TheUseCase",
    props:['id'],
    data: () => ({
      rules: [
        value => !!value || '用例名称不能为空',
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
        newUseCase:{
          title:"",
          priority:"",
          state:"",
          preStart:new Date().toISOString().substr(0, 10),
          preEnd:new Date().toISOString().substr(0, 10)
        },
        useCaseInfo:[],
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
          { text: '预计开始', value: 'begin' ,align: 'center'},
          { text: '预估结束', value: 'end' ,align: 'center'},
        ],
        listItems: [
          {
            id: 1,
            title: '用例1',
            state:'未执行',
            priority:'LOW',
            processor: '小梁',
            creator: '小王',
            begin: '2021-2-15',
            end:'2021-3-20',
            type:'usecase'
          },
        ],

    }),

  computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
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
        if (priority == "HIGH") return 'red'
        else if (priority == "MIDDLE") return 'orange'
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
      createUseCase(){
          this.dialog=!this.dialog
          let usecase = this.newUseCase
          switch(usecase.state){
            case "未执行":usecase.state="0"
              break;
            case "实现中":usecase.state="1"
              break;
            case "已实现":usecase.state="2"
              break;
              default:
              break;
          } 
          switch(usecase.priority){
            case "LOW":usecase.priority="0"
              break;
            case "MIDDLE":usecase.priority="1"
              break;
            case "HIGH":usecase.priority="2"
              break;
              default:
              break;
          }
          addUseCase(this.$route.params.id,
          usecase).then((res)=>{
            this.useCaseInfo=this.useCaseInfo.concat(res.require)
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
