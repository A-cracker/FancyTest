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
        <v-text-field label="身份" v-model="role" outlined dense :disabled="uneditable"></v-text-field>
        <v-text-field label="手机号" v-model="phoneNumber" outlined dense :disabled="uneditable"></v-text-field>
        <v-text-field label="邮箱" v-model="email" outlined dense :disabled="uneditable"></v-text-field>
        <v-text-field label="组织" v-model="organization" outlined dense :disabled="uneditable"></v-text-field>
        <v-text-field label="密码" v-model="pwd" outlined dense :disabled="uneditable"></v-text-field>
      </div>
      <div class="right">
        <v-text-field label="性别" v-model="sexaulity" outlined dense :disabled="uneditable"></v-text-field>
        <v-text-field label="所属院系" v-model="school" outlined dense :disabled="uneditable"></v-text-field>
        <v-text-field label="年级" v-model="grade" outlined dense :disabled="uneditable"></v-text-field>
        <v-text-field label="所在地" v-model="location" outlined dense :disabled="uneditable"></v-text-field>
        <v-text-field label="所属班级" v-model="classNum" outlined dense :disabled="uneditable"></v-text-field>
      </div>
    </div>
    <div class="d-flex justify-center btn">
    <v-btn dark depressed @click="changeInfo" v-show="hidden1">修改个人信息</v-btn>
    <v-btn dark depressed @click="saveInfo" v-show="hidden2">保存</v-btn>
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
      hidden1:true,
      hidden2:false,
      uneditable:true,
      
      username:"",
      id:"",
      pwd:"",
      email:"",
      phoneNumber:"",
      classNum:"",
      school:"",
      organization:"",
      grade:"",
      location:"",
      role:"",
      sexaulity:"",
    }),
    methods:{
      changeInfo(){
        this.hidden1=!this.hidden1
        this.hidden2=!this.hidden2
        this.uneditable=!this.uneditable
      },
      saveInfo(){
        this.changeInfo()
        alert("保存个人信息成功")
      }
    },
  mounted(){
   axios.get(`${url}/test`).then(res=>{
     this.username=res.data.username
     this.id=res.data.id
     this.pwd=res.data.pwd
     this.email=res.data.email
     this.phoneNumber=res.data.phoneNumber
     this.classNum=res.data.classNum
     this.organization=res.data.organization
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
  margin-top:35px;
  margin-bottom:10px;
}
.avatar{
  margin-top:15px;
}
</style>