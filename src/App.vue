<template>
  <div id="app">
    <v-app>
      <the-navigator/>
      <v-main>
        <the-right-page/>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import TheNavigator from '@/components/TheNavigator';
import TheRightPage from '@/components/TheRightPage'

export default{
  name: 'App',

  components: {
    TheNavigator,
    TheRightPage
  },

  data: () => ({
    //
  }),
  create(){
    
  }
}

</script>

<style scoped>

</style>
