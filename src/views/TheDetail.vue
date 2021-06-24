<!--传值类型和id-->
<template>
    <div>
        <div>h</div>
        <p>{{id}}</p>
    </div>
</template>
<script>
export default{
    name:'TheDetail',
    props:['id'],
    data:()=>({
        // 
        c:"msg",
    }),
    mounted:{
    }
}
</script>
<style scoped>

</style>
