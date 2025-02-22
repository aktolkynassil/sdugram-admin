import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Management from './components/UserManagement.vue'
import Post from './components/Post.vue'
import MentorsDetail from './components/MentorsDetail.vue'
import ApprovedMentors from './components/ApprovedMentors.vue'
import DeclinedMentors from './components/DeclinedMentors.vue'
import {createRouter, createWebHistory} from 'vue-router'
import ListPosts from "@/components/ListPosts.vue";
import QRScanner from "@/components/QRScanner.vue";

const routes = [
  {
    name: 'Home',
    component: Home,
    path: '/home',
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: 'LoginForm',
    component: Login,
    path: '/',
  },
  {
    name: 'UserManagement',
    component: Management,
    path: '/management',
    meta: {requiresAuth: true}
  },
  {
    name: 'CreatePost',
    component: Post,
    path: '/create-post',
    meta: {requiresAuth: true}
  },
  {
    name: 'MentorsDetail',
    component: MentorsDetail,
    path: '/mentors-detail',
    meta: {requiresAuth: true}
  },
  {
    name: 'ApprovedMentors',
    component: ApprovedMentors,
    path: '/approved-mentors',
    meta: {requiresAuth: true}
  },
  {
    name: 'DeclinedMentors',
    component: DeclinedMentors,
    path: '/declined-mentors',
    meta: {requiresAuth: true}
  },
  {
    name: 'ListPosts',
    component: ListPosts,
    path: '/list-posts',
    meta: {requiresAuth: true}
  },
  {
    name: 'QRScanner',
    component: QRScanner,
    path: '/qr-scanner/:event_id',
    meta: {requiresAuth: true}
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

async function isClientAuthenticated() {
  const userInfo = JSON.parse(localStorage.getItem('user-info'))
  if (userInfo === null) {
    return [false, false];
  }

  return !(userInfo.access === undefined || userInfo.access === null)
}

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await isClientAuthenticated();

  // Check if the route requires authentication and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login page
    next('/');
  } else {
    next();
  }
});

export default router