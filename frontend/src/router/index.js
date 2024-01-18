import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/login-card.vue'
import Register from '../components/register-card.vue'
import UserProfile from '../views/UserProfile.vue'
import EventForm from '../components/event-creation-form.vue'
import EventDetail from '../components/event-detail-card.vue'
import EditEventForm from '../components/edit-event-form.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/user/profile',
    name: 'userProfile',
    component: UserProfile
  },
  {
    path: '/event-form',
    name: 'EventForm',
    component: EventForm
  },
  {
    path: '/:eventId/detail',
    name: 'EventDetail',
    component: EventDetail,
  },
  {
    path: '/:eventId/edit',
    name: 'EditEventForm',
    component: EditEventForm,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
