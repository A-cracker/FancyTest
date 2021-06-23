<template>
<v-container>
  <v-card
    class="mx-auto col-md-10" min-width="200px"
  >
        个人信息
  </v-card>
<div>
  <v-card class="mx-auto col-md-10 infomation" height="700px" min-width="300px">
    <div class="d-flex justify-center avatar">
  <v-avatar size="100"><img src="@/assets/img.jpg"></v-avatar>
    </div>
    <div class="d-flex justify-center btn">
    <v-btn light depressed small>更换头像</v-btn>
    </div>
    <span id="username" class="d-flex justify-center">{{username}}</span>

    <span id="id" class="d-flex justify-center">{{id}}</span>

    <div class="d-flex justify-space-around detail">
      <div class="left">
        <p>名称：五条</p>
        <p>身份：学生</p>
        <p>手机号：15015546589</p>
        <p>邮箱地址：1281590115@qq.com</p>
        <p>生日：2021-6-7</p>
        <p>组织：华南理工大学</p>
      </div>
      <div class="right">
        <p>性别：男</p>
        <p>所在地：广东省广州市</p>
        <p>所属院系：软件学院</p>
        <p>年级：18级</p>
        <p>所属班级：2班</p>
        <p>密码：*********</p>
      </div>
    </div>
    <div class="d-flex justify-center btn">
    <v-btn dark depressed>修改个人信息</v-btn>
    </div>
  </v-card>
</div>
  </v-container>
</template>
<script>
import axios from 'axios'
const url ="https://www.fastmock.site/mock/df6a9659a720f5eb98239a76d22a627c/userinfo"
 export default {
    data: () => ({
      username:"王春月",
      id:"201830661298",
      pwd:"",
      email:"",
      phoneNumber:"",
      class:"",
      organization:"",
      birth:"",
      location:"",
      role:"",
    }),
  mounted(){
   axios(`${url}/userinfo`).then(res=>{
      this.username=res.data.username
     this.id=res.data.id
     this.pwd=res.data.pwd
     this.email=res.data.email
     this.phoneNumber=res.data.phoneNumber
     this.class=res.data.class
     this.organization=res.data.organization
     this.birth=res.data.birth
     this.location=res.data.location
     this.role=res.data.role
   }).catch(function(error){
     console.log(error)
   })
  //  axios.get("")
  //  .then(res=>{
    //  this.username=res.data.username
    //  this.id=res.data.id
    //  this.pwd=res.data.pwd
    //  this.email=res.data.email
    //  this.phoneNumber=res.data.phoneNumber
    //  this.class=res.data.class
    //  this.organization=res.data.organization
    //  this.birth=res.data.birth
    //  this.location=res.data.location
    //  this.role=res.data.role
  //  })
  //  .catch(function(error){
  //    console.log("message error")
  //  })
 }

  }
</script>
<style scoped>
.infomation{
  margin-top:10px;
}
#username{
  margin-top:10px;
}
.btn{
  margin-top: 10px;
}
.detail{
  margin-top:65px;
  margin-bottom:40px;
}
.avatar{
  margin-top:15px;
}
</style>