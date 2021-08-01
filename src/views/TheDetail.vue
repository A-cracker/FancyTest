<!--传值类型和id-->
<template>
    <div>
      <v-toolbar-title> 
        <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
        </v-btn>{{title}}
        </v-toolbar-title>
      <v-spacer></v-spacer>

        <p>{{id}}</p>
    </div>
</template>
<script>
export default{
    name:'TheDetail',
    props:['id','title'],
    data:()=>({

    }),
    mounted:{
    }
}
</script>
<style scoped>

</style>
