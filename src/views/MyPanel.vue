<template>
   <div class="d-flex flex-column root" >
   <v-card class="title">
    <v-toolbar
      light
      flat
    >
      <v-toolbar-title><v-icon>mdi-home-thermometer</v-icon>我的仪表盘</v-toolbar-title>
      <span style="font-size:15px;margin-left:20px;">欢迎使用FancyTest!🐻</span>
      <v-spacer></v-spacer>
      
      <v-dialog
      v-model="show"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text @click="show=!show" v-bind="attrs"
          v-on="on">
         <v-icon small>mdi-credit-card-plus-outline</v-icon>
         添加卡片
      </v-btn>
      </template>

      <v-card>
        <v-card-title>
          添加卡片
        </v-card-title>
        <v-card-text>
           <v-select
                  persistent-hint
                  hint="选择添加的卡片"
                  :items="['我的待办','我的消息','我的设置','我的提醒']"
                  label="卡片类型"
                  required
            ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="show=!show">取消</v-btn>
          <v-btn color="primary" text @click="show=!show">确认添加</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-toolbar>
   </v-card>
    <!--信息块-->
    <div class="cards">
    <div v-for="item in cardList" style="width:48%"
    :key="item">
      <div class="card" max-height="450px">
            <div>
                 <v-toolbar
                 flat>
                  <div><span style="font-size:15px">{{item.title}}</span></div>
                     <v-spacer></v-spacer>
                     <v-tooltip bottom>
                     <template v-slot:activator="{ on, attrs }">
                     <v-btn icon
                     v-bind="attrs"
                     v-on="on"
                     @click="removeCard(item.id)">
                     <v-icon>mdi-dots-vertical</v-icon>
                     </v-btn>
                     </template>
                     <span>删除卡片</span>
                     </v-tooltip>
                 </v-toolbar>
               </div>
            <v-divider></v-divider>
            <div class="card-content">
                    <!--卡片内容-->
                    <img  style="width:1000px;" src="@/assets/cover.png"/>
            </div>
      </div>
    </div>
    </div>
</div>
</template>
<script>
export default{
   data: () => ({
      show:false,
      cardList:[
         {id:'1',title:'我的需求'},
         {id:'2',title:'我的消息'},
         {id:'3',title:'我的待办'},
         ]
   }),
}
</script>
<style scoped>
.root{
   height:100%;
}
.title{
   margin:10px;
}
.cards{
   margin:10px;
   height: 100%;
   display: flex;
   flex-wrap: wrap;
   flex-direction:row;
   justify-content: space-between;
}
.card{
   height: 450px;
   margin-bottom: 20px;
   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.04), 0 6px 20px 0 rgba(0, 0, 0, 0.12);
   border-radius:5px;
   display: flex;
   flex-direction:column;
}
.card-content{
   overflow:auto;
   flex-grow:1;
}
</style>