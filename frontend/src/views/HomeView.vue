<template lang = 'pug'>
main
  section.container.has-text-centered
    h1.title.is-3(v-show = "isLoading") Please wait while connecting to the database
    div(v-if = "!isLoading && events.length")
      h1.title.is-3 EVENTS
      div.columns.is-multiline.is-centered
        event-card(v-for = "event in sortedEvents" :event="event")
    div(v-show="!events.length && !isLoading")    
      h1.title.is-4 You don't have any events yet
      router-link.has-text-info(to = "/register" v-show = "!isAuthenticated") Sign up to create one!  
loading(v-model:active = "isLoading" loader = "dots")  
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/event-card.vue'
import { mapState, mapActions, mapGetters } from 'vuex'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'HomeView',
  data() {
    return {
      isLoading: ''
    }
  },
  components: {
    EventCard,
    Loading
  },
  computed: {
    ...mapState(['events']),
    ...mapGetters(['isAuthenticated']),
    sortedEvents() { // Sort events by deleted and active status
      return [...this.events].sort((a, b) => Number(a.isDeleted) - Number(b.isDeleted) || Number(b.isActive) - Number(a.isActive))
    }
  },
  methods: {
    ...mapActions(['fetchEvents'])
  },
  created() {
    // Display loader while events being fetched
    this.isLoading = true
    this.fetchEvents()
    .then(() => {
      this.isLoading = false
    })
  }
}
</script>

<style scoped>
  section.container {
    margin-top: 5em;
  }
</style>