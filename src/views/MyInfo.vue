<template>
<v-container>
  <v-card
    class="mx-auto col-md-10" min-width="300px"
  >
        个人信息
  </v-card>
<div>
  <v-card class="mx-auto col-md-10 infomation" height="670px" min-width="300px">
    <div class="d-flex justify-center avatar">
  <v-avatar size="100"><img src="@/assets/img.jpg"></v-avatar>
    </div>
    <div class="d-flex justify-center btn">
    <v-btn light depressed small :readonly="uneditable">更换头像</v-btn>
    </div>
    <span id="username" class="d-flex justify-center">{{info.username}}</span>

    <span id="id" class="d-flex justify-center">{{info.id}}</span>

    <div class="d-flex justify-space-around detail">
      <div class="left">
        <v-text-field label="身份" v-model="info.role" outlined dense :readonly="uneditable"></v-text-field>
        <v-text-field label="手机号" v-model="info.phoneNumber" outlined dense :readonly="uneditable"></v-text-field>
        <v-text-field label="邮箱" v-model="info.email" outlined dense :readonly="uneditable"></v-text-field>
        <v-text-field label="学校" v-model="info.organization" outlined dense :readonly="uneditable"></v-text-field>
        <v-text-field label="所属班级" v-model="info.classNum" outlined dense :readonly="uneditable"></v-text-field>
      </div>
      <div class="right">
        <v-text-field label="性别" v-model="info.sexaulity" outlined dense :readonly="uneditable"></v-text-field>
        <v-text-field label="所属院系" v-model="info.school" outlined dense :readonly="uneditable"></v-text-field>
        <v-text-field label="年级" v-model="info.grade" outlined dense :readonly="uneditable"></v-text-field>
        <v-text-field label="所在地" v-model="info.location" outlined dense :readonly="uneditable"></v-text-field>
        
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

    info:{
      username:"",
      id:"",
      email:"",
      phoneNumber:"",
      classNum:"",
      school:"",
      organization:"",
      grade:"",
      location:"",
      role:"",
      sexaulity:"",
    },

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
        axios.put(`${url}/test2`,this.info).then(res=>
        {
          console.log(res)
        })
      }
    },

  mounted(){
   axios.get(`${url}/test`).then(res=>{
     this.info.username=res.data.username
     this.info.id=res.data.id
     this.info.email=res.data.email
     this.info.phoneNumber=res.data.phoneNumber
     this.info.classNum=res.data.classNum
     this.info.organization=res.data.organization
     this.info.location=res.data.location
     this.info.role=res.data.role
     this.info.grade=res.data.grade
     this.info.school=res.data.school
     this.info.sexaulity=res.data.sexaulity
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
  margin-top:30px;
  margin-bottom:10px;
}
.avatar{
  margin-top:15px;
}
.left,.right{
  width:250px
}
</style>