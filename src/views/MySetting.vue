<template>
 <div class="d-flex flex-column root">
     <v-toolbar
      light
      flat
    >
      <v-toolbar-title><v-icon>mdi-cog</v-icon>我的设置</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-divider></v-divider>

    <!--切换选项卡-->
    <div class="d-flex flex-row content2">

      <!--切换选项卡-->
      <v-card class="tab">
      <v-tabs vertical>
      <v-tab
      @click="switchPage(1)">
        <v-icon left>
          mdi-lock-outline
        </v-icon>
        安全保证
      </v-tab>
      <v-tab
      @click="switchPage(2)">
        <v-icon left>
          mdi-account-circle-outline
        </v-icon>
        账号管理
      </v-tab>
      </v-tabs>
      </v-card>

      <!--内容-->
      <v-card class="right flex-grow-1">
        <div class="content">

           <!--密码更改模块-->
          <div style="display:block;" id="security">
          <p class="font-weight-medium title">更改密码</p>
          <v-divider></v-divider>
          <div style="margin-top:15px;">
          <v-text-field :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
          :type="show1 ? 'text' : 'password'"
          :rules="rules.required"
          @click:append="show1 = !show1"
          label="请输入旧密码" outlined rounded dense flat></v-text-field>
          </div>
          <div>
          <v-text-field :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" 
          :type="show2 ? 'text' : 'password'"
          @click:append="show2 = !show2"
          label="请输入新密码" outlined rounded dense flat></v-text-field>
          </div>
          <div>
          <v-text-field :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'" 
          :type="show3 ? 'text' : 'password'"
          @click:append="show3 = !show3"
          label="请再次输入新密码" outlined rounded dense flat></v-text-field>
          </div>
          <v-btn dark class="btn">更新密码</v-btn>
          <span style="font-size:5px;margin-left:10px;"><a>忘记密码？</a></span>
          </div>

          <!--账号管理模块-->
          <div style="display:none;" id="account">
             <p class="font-weight-medium title">账号管理</p>
             <v-divider></v-divider>
            <v-btn dark class="btn" style="margin-top:10px;" @click="Logout">退出登录</v-btn>
          </div>

        </div>
      </v-card>
    </div>
 </div>
</template>
<script>
export default{
  data:()=>({
    show1:false,
    show2:false,
    show3:false,
    rules: {
      required:[value => !!value || '输入不能为空。'],
      
      }
    }),
  mounted:{
    
  },
  methods:{
    switchPage(id){
      var sec = document.getElementById("security");
      var acc = document.getElementById("account");
      switch(id){
        case 1:
          sec.style.display="block";
          acc.style.display="none";
          break;
        case 2:
          //账号管理
          sec.style.display="none";
          acc.style.display="block";
          break;
        default:
          break;
      }
    },
    Logout(){
      window.sessionStorage.removeItem("Token");
      window.location.href = '/';
    }

  }
}

</script>
<style scoped>
.btn{
  margin-bottom:10px;
  margin-left:10px;
}
.subtitle{
  margin-top: 10px;
}
.tab{
  height: 100%;
}
.content{
  margin-left: 10px;
  margin-top: 10px;
  margin-right: 10px;
}
.title{
    font-size: 20px;
}
.right{
  height: 100%;
  margin-left: 10px;
}
.content2{
  margin-right: 100px;
  margin-left: 100px;
  margin-top:10px;
  height:100%;
  margin-bottom:10px;
}
.root{
  height:100%;
}
</style>