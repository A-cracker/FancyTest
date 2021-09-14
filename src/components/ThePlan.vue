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
      创建迭代
    </v-btn>
<!--弹窗部分-->
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            创建迭代
          </v-card-title>
          <v-card-text>

        <v-text-field
        style="margin-bottom:10px;"
        label="迭代名"
        :rules="rules"
        hide-details="auto"
        required
        ></v-text-field>  

            <!--选择优先级和严重程度-->
        <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  persistent-hint
                  hint="选择迭代优先级"
                  :items="['未执行','实现中','已实现']"
                  label="优先级*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                persistent-hint
                  hint="选择迭代严重程度"
                  :items="['HIGH', 'MIDDLE', 'LOW']"
                  label="严重程度*"
                  required
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
              v-model="date1"
              label="创建时间"
              hint="MM/DD/YYYY"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              @blur="date1 = parseDate(formatDate(date1))"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date1"
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
              v-model="date2"
              label="结束时间"
              hint="MM/DD/YYYY"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              @blur="date2 = parseDate(formatDate(date2))"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date2"
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
              @click="dialog = false"
            >
              创建
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


    <v-btn dark class="mx-3" v-show="hidden">
      删除迭代
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn icon @click="hidden=!hidden,selectable=!selectable">
        <v-icon>mdi-delete</v-icon>
    </v-btn>
    </v-toolbar>
</div>


<div class="d-flex flex-row root" style="background-color:#ECEFF1;">

 <!--选项卡--> 
<v-card class="tab overflow-y-auto overflow-x-auto" max-height="600px" min-width="100px">
<v-tabs vertical>
      <v-tab 
      v-for="item in 3"
      :key="item">
        <v-checkbox v-show="selectable"></v-checkbox>
        迭代xxx
        <v-btn icon>
        <v-icon small>mdi-chevron-double-right</v-icon>
        </v-btn>
      </v-tab>
</v-tabs>
</v-card>

 <!--迭代内容--> 
<div class="content d-flex flex-column root flex-grow-1" style="height:600px;">

<!--工具栏-->
  <v-card class="nav">
    <v-toolbar 
      flat
      height="45"
    >
      <v-toolbar-title class="font-weight-light" style="font-size:15px;">
        <v-icon left>
          mdi-chart-timeline-variant
        </v-icon>
        迭代1
        <span class="font-weight-light" style="font-size:10px;">2021-05-07 ~ 2021-05-17</span>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>

      
     <v-btn icon
    @click="addListItemDialog=!addListItemDialog">
      <v-icon small>mdi-plus</v-icon>
    </v-btn>

      <v-dialog
        v-model="addListItemDialog"
        max-width="500px"
      >
        <v-card>
        <v-card-title>细化迭代</v-card-title>
        <v-card-text>
        <v-row align="center">
        <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="['需求','用例','缺陷']"
          label="选择添加项类别"
          dense
        ></v-select>
       </v-col>
       <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="['需求1','需求2','需求3']"
          label="选择需要添加的需求"
          dense
        ></v-select>
       </v-col>
        </v-row>
        </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="addListItemDialog = false"
            >
              取消
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="addListItemDialog = false"
            >
              添加
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
         <v-btn icon
          v-bind="attrs"
          v-on="on"><v-icon small>mdi-filter-menu-outline</v-icon></v-btn>
      </template>
      <v-list>
        <v-list-item dense link
          v-for="(item, index) in ['缺陷','执行','用例','需求']"
          :key="index"
          @click="fliter(item)"
        >
          <v-list-item-subtitle>{{ item }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-menu>
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

    <template v-slot:[`item.status`]="{ item }">
      <v-chip small outlined
        :color="getColorS(item.status)"
        dark
      >
        {{ item.status }}
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


export default{
    name:"ThePlan",
    props:['id'],
    data: () => ({
      rules: [
        value => !!value || '迭代名称不能为空',
        value => (value && value.length >= 2) || '至少输入一个字符',
      ],

      selectable:false,
      date1: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
  
      menu1: false,
      menu2:false,
      addListItemDialog:false,
      dialog:false,
      hidden:false,
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
          { text: '状态', value: 'status',align: 'center'},
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
            status:'未执行',
            priority:'LOW',
            processor: '小梁',
            creator: '小王',
            begin: '2021-2-15',
            end:'2021-3-20',
            type:'use'//标注类型
          },
          {
            id: 2,
            title: '需求2',
            status:'实现中',
            priority:'HIGH',
            processor: '小梁',
            creator: '小王',
            begin: '2021-2-15',
            end:'2021-3-20',
            type:'req'
          },
          {
            id: 3,
            title: '需求3',
            status:'未执行',
            priority:'HIGH',
            processor: '小梁',
            creator: '小王',
            begin: '2021-2-15',
            end:'2021-3-20',
            type:'req'
          },
          {
            id: 4,
            title: '用例2',
            status:'未执行',
            priority:'MIDDLE',
            processor: '小梁',
            creator: '小王',
            begin: '2021-2-15',
            end:'2021-3-20',
            type:'use'
          },
          {
            id: 5,
           title: '用例3',
            status:'未执行',
            priority:'HIGH',
            processor: '小梁',
            creator: '小王',
            begin: '2021-2-15',
            end:'2021-3-20',
            type:'use'
          },
          {
            id: 6,
           title: '需求6',
            status:'已实现',
            priority:'MIDDLE',
            processor: '小梁',
            creator: '小王',
            begin: '2021-2-15',
            end:'2021-3-20',
            type:'req'
          },
          {
            id: 7,
         title: '需求7',
            status:'未执行',
            priority:'HIGH',
            processor: '小梁',
            creator: '小王',
            begin: '2021-2-15',
            end:'2021-3-20',
            type:'req'
          },
           {
            id: 8,
            title: '缺陷1',
            status:'已执行',
            priority:'LOW',
            processor: '小梁',
            creator: '小王',
            begin: '2021-2-15',
            end:'2021-3-20',
            type:'bug'
          },
          {
            id: 9,
           title: '缺陷2',
            status:'未执行',
            priority:'HIGH',
            processor: '小梁',
            creator: '小王',
            begin: '2021-2-15',
            end:'2021-3-20',
            type:'bug'
          },
           {
            id: 10,
           title: '需求10',
            status:'未执行',
            priority:'HIGH',
            processor: '小梁',
            creator: '小王',
            begin: '2021-2-15',
            end:'2021-3-20',
            type:'req'
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
