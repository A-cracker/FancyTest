<template>
<v-container class="d-flex flex-column">
  <v-card
    class="mx-auto col-md-10" min-width="300px"
  >
        个人信息
  </v-card>

<div>
  <v-card class="mx-auto col-md-10 infomation" height="635px" min-width="300px">
    <div class="d-flex justify-center avatar">
  <v-avatar size="100"> <img :src="info.avatar"></v-avatar>
    </div>
    <div class="d-flex justify-center btn">
    <v-btn @click="uploadAvatar" light depressed small :disabled="uneditable">更换头像</v-btn>
    </div>
     <input id="avatar" class="hiddenInput" type="file" accept="image/*" @change="handleFile">
    <span id="username" class="d-flex justify-center">{{info.userName}}</span>
    <div class="d-flex justify-space-around detail">
      <div class="left">
        <v-select label="身份" v-model="info.role" outlined dense :readonly="uneditable" :items="['学生','老师']"></v-select>
        <v-select label="性别" v-model="info.sexuality" outlined dense :readonly="uneditable" :items="['男','女']"></v-select>
        <v-text-field label="手机号" v-model="info.phoneNumber" outlined dense :readonly="uneditable"></v-text-field>
        <v-text-field label="我的院系" v-model="info.school" outlined dense :readonly="uneditable"></v-text-field>
        <v-text-field label="我的邮箱" v-model="info.mail" outlined dense :readonly="uneditable"></v-text-field>
      </div>
      <div class="right">
        <v-text-field label="我的年级" v-model="info.grade" outlined dense :readonly="uneditable"></v-text-field>
        <v-text-field label="我的大学" v-model="info.university" outlined dense :readonly="uneditable"></v-text-field>
        <v-text-field label="所在地" v-model="info.location" outlined dense :readonly="uneditable"></v-text-field>
        <v-text-field label="我的班级" v-model="info.class" outlined dense :readonly="uneditable"></v-text-field>
        <v-text-field label="学号" v-model="info.studentNumber" outlined dense :readonly="uneditable"></v-text-field>
        
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
// import axios from 'axios'
import {getInfo,saveInfo} from '@/request/api'
// const url ="https://www.fastmock.site/mock/df6a9659a720f5eb98239a76d22a627c/userinfo"
 export default {
    data: () => ({
      hidden1:true,
      hidden2:false,
      uneditable:true,

    info:{
      avatar:"",
      userName:"",
      role:"",
      sexuality:"男",
      phoneNumber:"",
      school:"",
      mail:"",
      grade:"",
      university:"",
      location:"",
      class:"",
      studentNumber:"",
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
        saveInfo(this.info).then(res=>{if(res.status==200)alert("保存个人信息成功")}).catch(alert("保存个人信息失败"))
      },
      uploadAvatar: function () {
          this.$el.querySelector('#avatar').click()
        },
        // 将头像显示
        handleFile: function (e) {
          let $target = e.target 
          let file = $target.files[0]
          var reader = new FileReader()
          reader.onload = (data) => {
            let res = data.target
            this.info.avatar = res.result
            console.log(res.result)//文件编码
          }
          reader.readAsDataURL(file)
        }},
  mounted()
  {
    getInfo().then(res => {
    this.info.avatar=res.successInfo.avatar
    this.info.role=res.successInfo.role
    this.info.userName=res.successInfo.userName
    this.info.sexuality=res.successInfo.sexuality
    this.info.phoneNumber=res.successInfo.phoneNumber
    this.info.school=res.successInfo.school
    this.info.mail=res.successInfo.mail
    this.info.grade=res.successInfo.grade
    this.info.university=res.successInfo.university
    this.info.location=res.successInfo.location
    this.info.class=res.successInfo.class
    this.info.studentNumber=res.successInfo.studentNumber
    });
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

.detail{
  margin-top:30px;
}
.avatar{
  margin-top:15px;
  margin-bottom: 10px;
}
.left,.right{
  width:250px
}
.hiddenInput{
      display: none;
    }
</style>