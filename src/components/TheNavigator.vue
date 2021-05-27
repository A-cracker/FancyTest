<template>
<v-navigation-drawer hide-overlay app permanent expand-on-hover mini-variant-width=90 dark>
  <v-list>
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="@/assets/img.jpg"></v-img>
      </v-list-item-avatar>
    </v-list-item>
    <v-list-item link to='/myinfo'>
      <v-list-item-content>
        <v-list-item-title class="title">
          18级软件学院梁沚诺<!--模拟数据，未写mock接口-->
        </v-list-item-title>
        <v-list-item-subtitle>201830661298</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>

  <v-divider></v-divider>

  <v-list nav dense>
    <v-list-item
      v-for="item in items"
      :key="item.title"
      link
      class="py-3"
      :to="item.route"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</v-navigation-drawer>
</template>
<script>
export default{
    name:"TheNavigator",
    data () {
      return {
        items: [
          { title: '仪表盘', icon: 'mdi-view-dashboard',route:'/'},
          { title: '项目', icon: 'mdi-folder',route: '/myproject'},
          { title: '我的', icon: 'mdi-account' ,route:'/mytodo'},
          { title: '消息', icon: 'mdi-comment-multiple',route:'/mymessage' },
          { title: '作业', icon: 'mdi-book-variant',route: '/mytask'},
        ],
        right: null,
      }
    },
}
</script>
<style scoped>
</style>