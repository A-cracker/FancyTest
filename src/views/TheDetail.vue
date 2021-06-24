<!--传值类型和id-->
<template>
    <div>
      <v-toolbar
      light
      flat
    >
   
      <v-toolbar-title> <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
    </v-btn>需求1</v-toolbar-title>
      <v-spacer></v-spacer>
      
    </v-toolbar>
        <p>{{id}}</p>
    </div>
</template>
<script>
export default{
    name:'TheDetail',
    props:['id'],
    data:()=>({
        // 名称
        title:"",

    }),
    mounted:{
    }
}
</script>
<style scoped>

</style>
