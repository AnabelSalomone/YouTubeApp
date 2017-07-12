import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/components/Search/MainSearch'
import VideoCard from '@/components/VideoCard/VideoCard'
import Favorites from '@/components/Favorites/Favorites'
import Stats from '@/components/Stats/Stats'

import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: Search,
      name: 'Search'
    },
    {
      path: '/VideoCard/:id',
      component: VideoCard,
      name: 'VideoCard'
    },
    {
      path: '/Favorites',
      component: Favorites,
      name: 'Favorites'
    },
    {
      path: '/Stats',
      component: Stats,
      name: 'Stats'
    }

  ]
})
