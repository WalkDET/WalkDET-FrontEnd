import Vue from 'vue'
import Router from 'vue-router'
import auth from './auth'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Logout from './views/Logout.vue'
import UserStats from './views/UserStats.vue'
import Itinerary from './views/Itinerary.vue'
import Administrator from './views/Administrator.vue'
import NotFound from './views/NotFound.vue'


Vue.use(Router)

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: true
      }
      
    },
    {
      path: "/stats",
      name: "stats",
      component: UserStats,
      meta: {
        requiresAuth: true
      }
      
    },
    {
      path: "/itinerary",
      name: "itinerary",
      component: Itinerary,
      meta: {
        requiresAuth: true
      }
      
    },
    {
      path: "/administrator",
      name: "administrator",
      component: Administrator,
      meta: {
        requiresAuth: true,
        adminAuth: true
      }
    },
    {
      path: "*",
      name: "404",
      component: NotFound,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const user = auth.getUser();

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && !user) {
    next("/login");
  } 
  else if (to.meta.adminAuth) {
    const role = auth.getUser().rol;
    if (role === "admin") {
      next();
    }
    else {
      next("/");
    }
  }
  else {
    // Else let them go to their next destination
    next();
  }
  
});

export default router;
