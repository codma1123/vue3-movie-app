import { createRouter, createWebHashHistory} from 'vue-router'
import Movie from './Movie.vue'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'


export default createRouter({
  // Hash, History
  // https://google.com/#/search
  history: createWebHashHistory(),
  // pages
  // https://google.com
  routes: [
    {
      path: '/',
      component: Home     // vue.js의 component
    },
    {
      path : '/movie/:id',
      component: Movie
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }    
  ]
})