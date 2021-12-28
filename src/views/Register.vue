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
        <img src="@/assets/cover.png"/>
    </div>
    <!--右侧注册框-->
    <div class="right flex-grow-1">
    <v-card class="input-wrap d-flex flex-column align-center justify-center" elevation="1" min-width="400px" height="450px" shaped>
      <h1 class="font-weight-regular cardTitle" style="font-size:40PX;">REGISTER</h1>
        <div>
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation>
        <v-text-field
            v-model="username"
            :rules="[rules.required]"
            counter
            prepend-icon="mdi-account"
            label="请输入您的用户名"
            clearable
            name="username"
          ></v-text-field>
          <v-text-field
            v-model="account"
            :rules="[rules.required,rules.account_islegal,rules.account_count]"
            counter="12"
            prepend-icon="mdi-account"
            label="请输入您的学号"
            clearable
            name="account"
          ></v-text-field>
        <v-text-field
            aria-setsize=""
            v-model="password1"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required,rules.password_min,rules.password_islegal]"
            :type="show ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            name="password1"
            label="请输入您的密码"
            counter
            clearable
            @click:append="show = !show"
          ></v-text-field>
        <v-text-field
            aria-setsize=""
            v-model="password2"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.password_match]"
            :type="show ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            name="password2"
            label="请重复您的密码"
            counter
            clearable
            @click:append="show = !show"
          ></v-text-field>
        </v-form>
        </div>
        <div class="btn">
          <v-btn @click="login()" dark>注册</v-btn> <span style="font-size:5px;margin-left:10px;"><a @click="back">已有账号？</a></span>
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
import {registerInfo} from '@/request/api'
  export default {
    data () {
      return {

        username:'',     //用户名
        account:'',      //账号
        password1:'',    //密码
        password2:'',    //重复密码

        valid:false,
        show1: false,
        show2: false,
        rules: {
          account_count:v => v.trim().length == 12 || '格式不正确',
          account_islegal:v => /^[0-9]+$/.test(v) || '不能包含除数字外的其他字符',
          required: value => !!value || '不可为空',
          password_min: v => v.length >= 8 || '密码不得少于8个字符',
          // password_islegal: v => v.length >= 8 || '少于8个字符',
          password_match: value => value==this.password1 || '两次密码不一致'
        }
      }
    },
    methods : {
      back(){
        this.$router.go(-1)//返回上一层
    },
      login(){
        //1.表单校验
        if(this.$refs.form.validate()==false){        
          alert("填写信息有误");
          this.$refs.form.resetValidation();
        }
        else{
        //2.检测是否该学号被注册
        //3.完成注册
        registerInfo(this.username,this.account,this.password1).then(res=>{
          console.log(res);
          if(res.isRegistered==true){
            alert("注册成功");
            window.location.href = '/';
          } 
          else{
            alert("注册失败");
            //清空表单
            this.$refs.form.reset();
            this.username='';     //用户名
            this.account='';      //账号
            this.password1='';    //密码
            this.password2='';    //重复密码

          }
          })
        }

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
    margin-top: 50px;
    margin-left: 80px;
    margin-right: 200px;
}
.btn{
  margin-top: 15px;
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