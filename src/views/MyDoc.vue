<template>
<div class="root">
    <the-document v-if="type=='word'||type=='pdf'"></the-document>
    <div v-else-if="type=='pic'" style="height:100%;" class="d-flex justify-center align-center">
        <img src="@/assets/cover.png"/>
    </div>
    <div v-else-if="type=='folder'" style="height:100%;">
        文件夹没想好怎么跳转
    </div>
</div>
</template>
<script>
import TheDocument from "@/components/TheDocument";
export default{
  name:"MyDoc",
  props:['id','type'],
  data:()=>({
  }),
  components:{
  TheDocument,
}
}
</script>
<style scoped>
.root{
  height: 100%;
}
</style>