<template>
  <div id="app">
    <v-app>
    <the-navigator v-show="!(path ==='/') "></the-navigator>
      <v-main>
        <the-right-page/>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import TheNavigator from '@/components/TheNavigator'
import TheRightPage from '@/components/TheRightPage'

export default{
  name: 'App',

  components: {
    TheNavigator,
    TheRightPage
  },

  data: () =>{
    return{
    path:''
    }
  },
  create(){
  },

  // 判断路由
  mounted() {
    this.path = this.$route.path;
  },
  watch:{
    $route(to){
      this.path = to.path
    }
 }
}
</script>

<style scoped>

</style>
