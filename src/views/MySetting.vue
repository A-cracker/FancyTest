<template>
 <div class="d-flex flex-column">
     <v-toolbar
      light
      flat
    >
      <v-toolbar-title><v-icon>mdi-cog</v-icon>我的设置</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <div class="d-flex flex-row root">
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
      <v-card class="right flex-grow-1">
        <div class="content">
          <div style="display:block;" id="security">
          <p class="font-weight-medium title">更改密码</p>
          <v-divider></v-divider>
          <div style="width:400px;margin-top:15px;">
          <v-text-field label="请输入旧密码" outlined rounded dense flat type="password"></v-text-field>
          </div>
          <div style="width:400px;">
          <v-text-field label="请输入新密码" outlined rounded dense flat type="password"></v-text-field>
          </div>
          <div style="width:400px;">
          <v-text-field label="请再次输入新密码" outlined rounded dense flat type="password"></v-text-field>
          </div>
          <v-btn dark class="btn">更新密码</v-btn>
          <span style="font-size:5px;margin-left:10px;"><a>忘记密码？</a></span>
          </div>

          <div style="display:none;" id="account">
             <p class="font-weight-medium title">账号管理</p>
             <v-divider></v-divider>
            <v-btn dark class="btn" style="margin-top:10px;">退出登录</v-btn>
          </div>

        </div>
      </v-card>
    </div>
 </div>
</template>
<script>
export default{
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
  margin-left: 100px;
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
  margin-left: 10px;
  margin-right: 100px;
}
.root{
  margin-top:20px;
  height:100%;
}
</style>