<template>
<div>
    <the-ckeditor :editconfig="config"></the-ckeditor>
</div>
</template>
<script>
import TheCkeditor from './TheCkeditor.vue'
export default{
components: { TheCkeditor },
name:"TheChart",
data:()=>({
     config:{
      placeholder:'请输入内容',
      language: 'zh-cn',
      ckfinder: {
        uploadUrl: '/'
      }
     }
}),

}
</script>