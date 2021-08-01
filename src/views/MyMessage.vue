<template>
<div class="d-flex flex-column root" >
  
    <v-toolbar
      light
      flat
    >
      <v-toolbar-title><v-icon>mdi-bell-outline</v-icon>我的消息</v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="font-weight-light" style="font-size:10px;">(共2条消息)</span>
    </v-toolbar>

    <!--信息块-->
         <v-list width="100%">
          <v-list-item >
              <v-list-item-avatar width="50px" height="50px">
              <v-img
              alt="avatar"
              src="@/assets/img.jpg"
              ></v-img>
              </v-list-item-avatar>
          <v-list-item-content>
            <v-row justify="space-around">
              <v-col lg="2">
            <v-list-item-title>五条悟（管理员）</v-list-item-title>
            <v-list-item-subtitle>ID:001</v-list-item-subtitle>
            </v-col>
              <v-col lg="7">
                <div>更新了您的需求，更新字段为详细描述</div>
                <v-list-item-subtitle>
                  <v-chip color="primary" x-small>Use</v-chip>
                <span style="font-size:12px">&nbsp;注册</span>
                </v-list-item-subtitle>
              </v-col>
              <v-col lg="3">
                <div style="text-align:center;">2021-5-10 11:00:22</div>
                <v-list-item-subtitle style="text-align:center;">来自芒果莲雾大学</v-list-item-subtitle>
              </v-col>
            </v-row>
          </v-list-item-content>
            </v-list-item>

            <v-list-item >
              <v-list-item-avatar width="50px" height="50px">
              <v-img
              alt="avatar"
              src="@/assets/img2.jpg"
              ></v-img>
              </v-list-item-avatar>
          <v-list-item-content>
            <v-row justify="space-around">
              <v-col lg="2" >
            <v-list-item-title>悠仁</v-list-item-title>
            <v-list-item-subtitle>ID:002</v-list-item-subtitle>
              </v-col>
              <v-col lg="7">
                <div>更新了您的需求，更新字段为详细描述</div>
                <v-list-item-subtitle>
                  <v-chip dark x-small>Req</v-chip>
                <span style="font-size:12px">&nbsp;登录</span>
                </v-list-item-subtitle>
              </v-col>
              <v-col lg="3">
                <div style="text-align:center;">2021-5-10 11:00:22</div>
                <v-list-item-subtitle style="text-align:center;">来自芒果莲雾大学</v-list-item-subtitle>
              </v-col>
            </v-row>
          </v-list-item-content>
            </v-list-item>

     
         </v-list>
         <v-divider class="divider"></v-divider>

         <div class="text">仅显示最近一个月内容</div>
            


</div>
</template>
<script>
</script>
<style scoped>
.divider{
  margin-left: 40%;
  margin-right: 40%;
}
.text{
  margin-top: 7px;
  text-align:center;
  font-size:13px
}
</style>