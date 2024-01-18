<template lang = 'pug'>
div.hero.is-fullheight
  div.hero-body.is-justify-content-center.is-align-items-center
    div.box
      h1.title.is-3 Update an event
      form
        div.column
          label Name 
          input.input.is-rounded(type = "text" name = "name" v-model = "event.name") 
        div.column
          label Location
          input.input.is-rounded(type = "text" name = "place"  v-model = "event.place")
        div.column
          label Date 
          input.input.is-rounded(type = "date" :min = "minDate()" name = "date" v-model = "event.date") 
        div.column
          button.button.is-primary.is-fullwidth(@click.prevent = "handleEventUpdate" type = "submit") Update

loading(v-model:active = "isLoading" loader = "dots")   
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'EditEventForm',
  data() {
    return {
      minDate() {
        let date = new Date();
        date.setDate(date.getDate() + 1);
        return date.toISOString().split('T')[0];
      },
      isLoading: false
    }
  },
  components: {
    Loading
  },
  computed: {
    ...mapState(['event'])
  },
  methods: {
    ...mapActions(['fetchEvent', 'updateEvent']),
    handleEventUpdate() {
      this.isLoading = true
      const data = {
        form: {
          name: this.event.name,
          place: this.event.place,
          date: this.event.date
        },
        eventId: this.event._id
      }
      this.updateEvent(data)
      .then(() => {
        this.isLoading = false
        this.$router.push(`/${this.event._id}/detail`) 
      })
    }
  },  
  created() {
    this.fetchEvent(this.$route.params.eventId)
  }
}
</script>