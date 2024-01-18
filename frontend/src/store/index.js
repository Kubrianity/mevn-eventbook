import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router'
import createPersistedState from "vuex-persistedstate"

axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.withCredentials = true

export default createStore({
  state: {
    events: [],
    event: {},
    users: [],
    user: {}
  },
  getters: {
    isAuthenticated: state => state.user._id
  },
  mutations: {
    SET_EVENTS(state, data) {
      state.events = data
    },
    SET_EVENT(state, data) {
      state.event = data
    },
    SET_USERS(state, data){
      state.users = data
    },
    SET_USER(state, data) {
      state.user = data
    }
  }, 
  actions: {
    async fetchEvents({ commit }) {
      try {
        const result = await axios.get(`/events/all/json`)
        commit('SET_EVENTS', result.data)
      }
      catch(err) {
        console.log('Error setting events in store', err)
      }
    },
    async fetchEvent({ commit }, id) {
      try {
        const result = await axios.get(`/events/${id}/json`)
        commit('SET_EVENT', result.data)
      }
      catch(err) {
        console.log('Error setting an event in store', err)
      }
    },
    async fetchUsers({ commit }) {
      try {
        const result = await axios.get(`/person/all/json`)
        commit('SET_USERS', result.data)
      }
      catch(err) {
        console.log('Error setting users in store', err)
      }
    },
    async fetchUser({ commit }, id) {
      try {
        const result = await axios.get(`/person/${id}/json`)
        commit("SET_USER", result.data)
      }
      catch(err) {
        console.log('Error setting a user in store', err)
      }
    },
    async register({commit}, user) {
      try {
        const result = await axios.post(`/auth/register`, user)
        commit('SET_USER', result.data)
        router.push('/user/profile')
      }
      catch(err) {
        console.log('Error registering a user', err)
        return
      }
    },
    async logIn({commit}, user) {
      try {
        const result = await axios.post(`/auth/login`, user)
        commit('SET_USER', result.data)
        router.push('/user/profile')
      }
      catch(err) {
        console.log('Error signing in a user', err)
        return
      }
    },
    async logOut({commit}) {
      try {
        await axios.post(`/auth/logout`)
        commit('SET_USER', {})
      }
      catch(err) {
        console.log('Error logging out a user', err)
      }     
    },
    // User updates profile
    async updateProfile(context , payload) {
      try {
        await axios.patch(`/person/${payload.userId}`, { username : payload.username })
        context.dispatch('fetchUser', payload.userId)
      }
      catch(err) {
        console.log('Error updating a profile', err)
      }
    },
    // User creates an event
    async addEvent(context, payload) {
      try {
        const result = await axios.post('/events', { userId: payload.userId, formInfo: payload.formDetail })
        context.dispatch('fetchEvent', result.data._id)
        router.push('/user/profile')
      }
      catch(err) {
        console.log('Error creating an event', err)
      }
    },
    // User attends an event
    async attendEvent(context , payload) {
      try {
        await axios.post(`/person/register/${payload.eventId}`, { userId: payload.userId })
        context.dispatch('fetchUser', payload.userId)
      }
      catch(err) {
        console.log('Error attending an event', err)
      }
    },
    // User updates an event
    async updateEvent(context , payload) {
      try {
        await axios.put(`/events/${payload.eventId}`, payload.form)
        context.dispatch('fetchEvent', payload.eventId)
      }
      catch(err) {
        console.log('Error updating an event', err)
      }
    },
    // User deletes an event
    async deleteEvent(context , id) {
      try {
        await axios.delete(`/events/${id}`)
      }
      catch(err) {
        console.log('Error deleting an event', err)
      }
    },
    // User makes a comment 
    async makeComment(context, payload) {
      try {
        await axios.post(`/person/events/${payload.eventId}/comments`, { userId: payload.userId, comment: payload.commentDetail })
        context.dispatch('fetchEvent', payload.eventId)
      }
      catch(err) {
        console.log('Error making a comment', err)
      }
    },
    // User connects with another user
    async connect(context, payload) {
      try {
        await axios.post(`/person/contacts/${payload.targetId}`, { userId: payload.userId })
        context.dispatch('fetchUser', payload.userId)
      }
      catch(err) {
        console.log('Error connecting with a user', err)
      }  
    }
  },
  modules: {
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })]
})
