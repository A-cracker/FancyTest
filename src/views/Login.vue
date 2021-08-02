<template>
  <div class="login">
    <!--导航栏-->
    <v-app-bar flat height="70%">
        <v-avatar><img src="@/assets/scut.png"></v-avatar>
        <v-toolbar-title class="titleName">FancyTest</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn dark class="translator">English</v-btn>
    </v-app-bar>
    <!--内容-->
    <v-main>
    <v-container fluid>
    <div class="content d-flex flex-row">
    <!--左侧封面图-->
    <div class="left cover">
        <img src="@/assets/cover.png">
    </div>
    <!--右侧登录框-->
    <div class="right flex-grow-1">
    <v-card class="input-wrap d-flex flex-column" elevation="1" min-width="350px" height="400px">
        <input type="text" v-model="name"/>
        <span v-if="error.name" class="err-msg">{{error.name}}</span>
        <input type="password" v-model="pwd"/>
        <span v-if="error.pwd" class="err-msg">{{error.pwd}}</span>
        <div class="d-flex  justify-center">
            <v-btn @click="login">登录</v-btn>
        </div>
        
    </v-card>
    </div>
    </div>
    </v-container>
    </v-main>
    <!--页脚-->
 <v-footer
    light
    padless
    app
    class="d-flex flex-column"
  >
 <div>
      <v-btn text rounded>
        联系我们
      </v-btn>
      <span>|</span>
       <v-btn text rounded>
        了解更多
      </v-btn>
   </div>
    <v-divider></v-divider>
        @Copyright © 2020-2021 FancyTest
   </v-footer>

  </div>
</template>

<script>
export default {
  data() {
      return {
          name: '',
          pwd : '',
          error : {
              name: '',
              pwd : ''
          }
      }
  },
  methods : {
      check(name,pwd) {
          if(!name) {
              this.error.name = '请输入姓名'
              return false
          }
          if(!pwd){
              this.error.pwd = '请输入密码'
              return false
          }
      },
      login() {
          window.location.href = '/mypanel'
          }
      }
  }
</script>

<style scoped>
.titleName{
    margin-left: 10px;
}
.translator{
    margin-right: 40px;
}
.cover{
    margin-top:90px;
    margin-left: 100px;
    margin-right: 50px;
}
.input-wrap{
    padding-top:20px ;
    margin-top: 70px;
    margin-left: 80px;
    margin-right: 200px;
}
@media (max-width:1200px) {
    .cover{
        display: none;
    }
    .input-wrap{
        margin: 10px;
    }
}
</style>