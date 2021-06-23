<template>
   <div class="d-flex flex-column root" >
   <v-card class="bar">
    <v-toolbar
      light
      flat
    >
      <v-toolbar-title><v-icon>mdi-home-thermometer</v-icon>我的仪表盘</v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-btn text>
         <v-icon small>mdi-credit-card-plus-outline</v-icon>
         添加卡片
      </v-btn>
    </v-toolbar>
   </v-card>
    <!--信息块-->
    
        <v-row justify="space-between">
           <v-col cols="6" lg="6">
              <v-card class="card" height="360px">

                 <v-card>
                 <v-toolbar
                 flat>
                    <v-toolbar-title><span style="font-size:15px">我的需求</span></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                       <v-icon small>mdi-dots-vertical</v-icon>
                    </v-btn>
                 </v-toolbar>
                 </v-card>

                 <v-card-text>
                    
                 </v-card-text>
                 <v-card-actions></v-card-actions>
              </v-card>
           </v-col>
           
           <v-col cols="6" lg="6">
              <v-card class="card" height="360px">

                 <v-card>
                 <v-toolbar
                 flat>
                    <v-toolbar-title><span style="font-size:15px">我的消息</span></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                       <v-icon small>mdi-dots-vertical</v-icon>
                    </v-btn>
                 </v-toolbar>
                 </v-card>

                 <v-card-text>
                    
                 </v-card-text>
                 <v-card-actions></v-card-actions>
              </v-card>
           </v-col>
        </v-row>
         
</div>
</template>
<script>

</script>
<style scoped>
.bar{
  margin-top:10px;
  margin-left:10px;
  margin-right:10px;
}
.card{
  margin-left:10px;
  margin-right:10px;
  margin-top:10px
}
.part{
   overflow: auto;
   height:100%;
   width:100%;
}
</style>