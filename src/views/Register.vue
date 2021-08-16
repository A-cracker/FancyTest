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
    <v-col cols="1" class="cover">
        <img src="@/assets/cover.png">
    </v-col>
    <!--右侧登录框-->
    <v-col offset="3">
    <v-card class="input-wrap d-flex flex-column" elevation="3" min-width="700px" height="400px" >
        <v-spacer></v-spacer>
        <div>
          <v-text-field
            v-model="message"
            :rules="[rules.required,rules.username_max]"
            counter="10"
            hint="名称限定10个字符内"
            label="您的用户名"
            clearable
            color="purple darken-2"
            name="username"
          ></v-text-field>
        </div>
        <div>
        <v-text-field
            v-model="password1"
            :rules="[rules.required, rules.password_min]"
            :type="'password'"
            name="password1"
            label="您的密码"
            hint="8个字符以上"
            counter
            clearable
            color="green darken-2"
          ></v-text-field>
        </div>
        <div>
        <v-text-field
        aria-setsize=""
            v-model="password2"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.password_match]"
            :type="show ? 'text' : 'password'"
            name="password2"
            label="请重复您的密码"
            counter
            clearable
            @click:append="show = !show"
            color="orange darken-2"
          ></v-text-field>
        </div>
        <v-spacer></v-spacer>
        <v-row>
        <v-col offset="2">
        <v-btn color="primary" x-large>注册</v-btn>
        </v-col>
        <v-col offset="1">
        <v-btn @click="back" color="secondary" x-large>返回</v-btn>
        </v-col>
        </v-row>
    </v-card>
    </v-col>
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
    data () {
      return {
        show: false,
        rules: {
          username_max:v => v.length <= 10 || '最多10个字符',
          required: value => !!value || '不可为空',
          password_min: v => v.length >= 8 || '少于8个字符',
          password_match: value => value===this.password1 || '两次密码不一致'
        }
      }
    },
    methods : {
      back(){
        this.$router.go(-1)//返回上一层
    },
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