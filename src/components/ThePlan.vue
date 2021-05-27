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
              v-model="dateFormatted"
              label="创建时间"
              hint="MM/DD/YYYY"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              @blur="date = parseDate(dateFormatted)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
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
              v-model="dateFormatted"
              label="结束时间"
              hint="MM/DD/YYYY"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              @blur="date = parseDate(dateFormatted)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
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
    <v-btn icon>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    <v-btn icon @click="hidden=!hidden">
        <v-icon>mdi-delete</v-icon>
    </v-btn>
    </v-toolbar>
</div>


<div class="d-flex flex-row root" style="background-color:#ECEFF1;">

 <!--选项卡--> 
<v-card class="tab">
<v-tabs vertical>
      <v-tab>
        <v-icon left>
          mdi-chart-timeline-variant
        </v-icon>
        迭代1
        <v-btn icon>
        <v-icon small>mdi-chevron-double-right</v-icon>
        </v-btn>
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-chart-timeline-variant
        </v-icon>
        迭代2
         <v-btn icon>
        <v-icon small>mdi-chevron-double-right</v-icon>
        </v-btn>
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-chart-timeline-variant
        </v-icon>
        迭代3
         <v-btn icon>
        <v-icon small>mdi-chevron-double-right</v-icon>
        </v-btn>
      </v-tab>
</v-tabs>
</v-card>

 <!--迭代内容--> 
<div class="content d-flex flex-column root flex-grow-1">

<!--工具栏-->
  <v-card class="nav">
    <v-toolbar 
      flat
      height="45"
    >
      <v-toolbar-title class="font-weight-light" style="font-size:15px;">迭代1
        <span class="font-weight-light" style="font-size:10px;">2021-05-07 ~ 2021-05-17</span>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>

      <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
      <v-btn icon
        v-bind="attrs"
        v-on="on">
        <v-icon small>mdi-plus</v-icon>
      </v-btn>
      </template>
      <span>添加需求</span>
      </v-tooltip>

      <v-btn icon>
        <v-icon small>mdi-chevron-down</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>

  <v-card class="list">
    <v-data-table
    
      :headers="headers"
      :items="desserts"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
    >
    
    <template v-slot:item.priority="{ item }">
      <v-chip small
        :color="getColorP(item.priority)"
        dark
      >
        {{ item.priority }}
      </v-chip>
    </template>

    <template v-slot:item.status="{ item }">
      <v-chip small outlined
        :color="getColorS(item.status)"
        dark
      >
        {{ item.status }}
      </v-chip>
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
    data: vm => ({
      rules: [
        value => !!value || '迭代名不能为空.',
        value => (value && value.length >= 2) || '至少输入一个字符',
      ],

      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      menu2:false,

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
          { text: '需求标题', value: 'requirement', align: 'center'},
          { text: '状态', value: 'status',align: 'center'},
          { text: '优先级', value: 'priority',align: 'center'},
          { text: '处理人', value: 'processor',align: 'center'},
          { text: '创建人', value: 'creator',align: 'center' },
          { text: '预计开始', value: 'begin' ,align: 'center'},
          { text: '预估结束', value: 'end' ,align: 'center'},
        ],
        desserts: [
          {
            id: 1,
            requirement: '用例1',
            status:'未执行',
            priority:'LOW',
            processor: '小梁',
            creator: '小王',
            begin: '2021-2-15',
            end:'2021-3-20'
          },
          {
            id: 2,
            requirement: '需求2',
            status:'实现中',
            priority:'HIGH',
            processor: '小梁',
            creator: '小王',
            begin: '2021-2-15',
            end:'2021-3-20'
          },
          {
            id: 3,
            requirement: '需求3',
            status:'未执行',
            priority:'HIGH',
            processor: '小梁',
            creator: '小王',
            begin: '2021-2-15',
            end:'2021-3-20'
          },
          {
            id: 4,
            requirement: '用例2',
            status:'未执行',
            priority:'MIDDLE',
            processor: '小梁',
            creator: '小王',
            begin: '2021-2-15',
            end:'2021-3-20'
          },
          {
            id: 5,
           requirement: '用例3',
            status:'未执行',
            priority:'HIGH',
            processor: '小梁',
            creator: '小王',
            begin: '2021-2-15',
            end:'2021-3-20'
          },
          {
            id: 6,
           requirement: '需求6',
            status:'已实现',
            priority:'MIDDLE',
            processor: '小梁',
            creator: '小王',
            begin: '2021-2-15',
            end:'2021-3-20'
          },
          {
            id: 7,
         requirement: '需求7',
            status:'未执行',
            priority:'HIGH',
            processor: '小梁',
            creator: '小王',
            begin: '2021-2-15',
            end:'2021-3-20'
          },
           {
            id: 8,
           requirement: '缺陷1',
            status:'已执行',
            priority:'LOW',
            processor: '小梁',
            creator: '小王',
            begin: '2021-2-15',
            end:'2021-3-20'
          },
          {
            id: 9,
           requirement: '缺陷2',
            status:'未执行',
            priority:'HIGH',
            processor: '小梁',
            creator: '小王',
            begin: '2021-2-15',
            end:'2021-3-20'
          },
           {
            id: 10,
           requirement: '需求10',
            status:'未执行',
            priority:'HIGH',
            processor: '小梁',
            creator: '小王',
            begin: '2021-2-15',
            end:'2021-3-20'
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
}
.list{
  margin-top: 7px;
  height:100%;
  margin-bottom: 7px;
}

</style>
