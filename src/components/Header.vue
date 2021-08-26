<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <RouterLink
          :to="nav.href"
          class="nav-link"
          :class="{active: isMatch(nav.path)}"
          active-class="active">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
    <div
      class="user"
      @click="toAbout">
      <img
        :src="image"
        :alt="name" />
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import Logo from "~/components/Logo"
export default {
  components:{
    Logo
  },
  data(){
    return {
      navigations: [
        {
          name: 'Search',
          href: '/'
        },
        {
          name: 'Movie',
          href: '/movie/tt4520988',
          path: /^\/movie/      //  '/movie/
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    }
  },
  methods :{
    isMatch(path){
      if(!path) return false
      return path.test(this.$route.fullPath)
    },
    toAbout(){
      this.$router.push('/about')
    }
  },
  computed: {
    ...mapState('about',[
      'image',
      'name'
    ])
  }
}
</script>


<style lang="scss" scoped>
  header {
    height: 70px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    position: relative;
    .logo {
      margin-right: 40px;
    }
    .user{
      width: 40px;
      height: 40px;
      padding: 6px;
      border-radius: 50%;
      box-sizing: border-box;
      background-color: $gray-200;
      cursor: pointer;
      position: absolute;
      top:0;
      bottom:0;
      right: 40px;
      margin:auto;
      overflow:hidden;
      img{
      position: absolute;
      width:200%;
      left:0;
      right:0;
      top:0;
      bottom:0;
      margin: auto auto;
      }
    }
    @include media-breakpoint-down(sm){
      .nav{
        display:none;
      }
    }
}
</style>