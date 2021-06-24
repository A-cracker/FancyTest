<template>
<v-container>
  <v-card
    class="mx-auto col-md-10" min-width="200px"
  >
        个人信息
  </v-card>
<div>
  <v-card class="mx-auto col-md-10 infomation" height="650px" min-width="300px">
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
        <p>身份：{{role}}</p>
        <p>手机号：{{phoneNumber}}</p>
        <p>邮箱地址：{{email}}</p>
        <p>生日：{{birth}}</p>
        <p>组织：{{location}}</p>
        <p>密码：{{pwd}}</p>
      </div>
      <div class="right">
        <p>性别：{{sexaulity}}</p>
        <p>所在地：{{location}}</p>
        <p>所属院系：{{school}}</p>
        <p>年级：{{grade}}</p>
        <p>所属班级：{{classNum}}</p>
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
      username:"",
      id:"",
      pwd:"",
      email:"",
      phoneNumber:"",
      classNum:"",
      school:"",
      organization:"",
      grade:"",
      birth:"",
      location:"",
      role:"",
      sexaulity:"",
    }),
  mounted(){
   axios.get(`${url}/test`).then(res=>{
     this.username=res.data.username
     this.id=res.data.id
     this.pwd=res.data.pwd
     this.email=res.data.email
     this.phoneNumber=res.data.phoneNumber
     this.classNum=res.data.classNum
     this.organization=res.data.organization
     this.birth=res.data.birth
     this.location=res.data.location
     this.role=res.data.role
     this.grade=res.data.grade
     this.school=res.data.school
     this.sexaulity=res.data.sexaulity
   }).catch(function(error){
     console.log(error)
   })
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