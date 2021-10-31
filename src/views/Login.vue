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
    <v-card class="input-wrap d-flex flex-column align-center justify-center" elevation="1" min-width="400px" height="400px" shaped>
          <h1 class="font-weight-regular cardTitle" style="font-size:40PX;">LOGIN</h1>
          <div>
          <v-text-field
            filled
            solo
            v-model="studentNumber"
            counter="20"
            hint="名称限定20个字符内"
            prepend-icon="mdi-account"
            label="您的用户名"
            clearable
            name="studentNumber"
          ></v-text-field>
            
        <v-text-field
            filled
            solo
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            name="password"
            label="您的密码"
            prepend-icon="mdi-lock"
            hint="8个字符以上"
            counter
            clearable
            @click:append="show = !show"
          ></v-text-field>
          </div>
          <div class="btn">
          <v-btn @click="login">登录</v-btn> <span style="font-size:5px;margin-left:10px;"><a @click="toRegister">还未注册？</a></span>
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
  import {getToken} from '@/request/api'
  export default {
    data () {
      return {
        show: false,
        studentNumber: '',
        password: '',
        rules: {
          required: value => !!value || '必填',
          min: v => v.length >= 8 || '少于8个字符',
          emailMatch: () => (`用户名或密码错误`),
        },
      }
    },
    methods : {
      login() {
          getToken(this.studentNumber,this.password).then(res=>{
            if(res)
            {  
            var token=res.successInfo.jwt
            var id=res.successInfo.id
             window.sessionStorage.setItem("Token",token)//保存到本地
             window.sessionStorage.setItem("ID",id)//保存到本地
              alert("欢迎你,用户" +window.sessionStorage.ID+ "!");
              console.log(window.sessionStorage.Token); 
              window.location.href = '/mypanel';
            }
          }
          )
          .catch(err=>{alert(err);})
          },
      toRegister() {
          window.location.href = '/register'
          // window.location.href = '/mypanel'//后端未完成前的入口
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
.btn{
  margin-top: 20px;
}
.cardTitle{
  margin-bottom: 20px;
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