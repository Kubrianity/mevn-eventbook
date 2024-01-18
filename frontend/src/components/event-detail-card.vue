<template lang = 'pug'>
main.columns.is-multiline(:class = "{ disabled: !isActive || isDeleted }")
  section.column.is-three-fifths-tablet.is-two-fifths-desktop
    div.card
      div.header
        div.media
          div.media-content
            p.title.is-4 {{ event.name }}  
            p.subtitle.is-4 {{ formatedDate }}
            p.subtitle.is-4 {{ event.place }}
                   
      div.card-image
        figure.image.is-4by3
          img(:src="`https://picsum.photos/300/200?random=${event._id}`", alt = "Placeholder image")
      div.card-content
        div.level.is-mobile
          div.level-left
            div.level-item.has-text-centered
        div.content
          button.button.is-primary(v-if = "checkAttendStatus && isActive && !isDeleted" @click.prevent = 'handleAttend' type = "button" value = "Attend") Attend
          router-link.has-text-info(v-else-if = "!isAuthenticated" to="/login") Log in to attend this event
          button.button.is-warning(v-if = "checkDeleteUpdateStatus && isActive && !isDeleted" @click.prevent = 'handleDelete' type = "button" value = "Delete") Delete
          router-link.button.is-primary(v-if = "checkDeleteUpdateStatus && isActive && !isDeleted" v-bind:to = "'/' + event._id + '/edit'") Update

  section.column.is-three-fifths-tablet.is-one-fifth-desktop
    h4.title.is-4 Attendees
    attendee-card(v-for = "attendee in event.attendees" :attendee = "attendee")

  section.box.column.is-three-fifths-tablet.is-two-fifths-desktop
    h3.title.is-4 Comments
    comment-card(v-for = "comment in event.comments" :comment = "comment")
    router-link.has-text-info(v-if = "!isAuthenticated" to = "/login") Log in to make a comment
    div.field(v-else)
      p.control
        textarea.textarea(v-model = "comment" name = "comment" placeholder = "Add a comment..." rows = "3" required)
      div.level-item
        input.button.is-info(@click.prevent = 'handleComment' type = "button" value = "Submit")
        
loading(v-model:active = "isLoading" loader = "dots")                               
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import CommentCard from './comment-card.vue'
import AttendeeCard from './attendee-card.vue'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Swal from 'sweetalert2'

export default {
  name: 'event-card',
  data() {
    return {
      comment: '',
      isLoading: false
    }
  },
  components: {
    CommentCard,
    AttendeeCard,
    Loading
  },
  computed: {
    ...mapState(['event','user']),
    ...mapGetters(['isAuthenticated']),
    // Check if the user created this event 
    checkDeleteUpdateStatus() {
      return this.isAuthenticated && this.user.createdEvents.some(event => event._id == this.event._id)
    },
    // Check if the user is already an attendee
    checkAttendStatus() {
      return this.isAuthenticated && !(this.event.attendees.some(user => user._id == this.user._id))
    },
    isActive() {
      return this.event.isActive 
    },
    isDeleted() {
      return this.event.isDeleted
    },
    formatedDate() {
      return new Date(this.event.date).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' })
    }
  },
  methods: {
    ...mapActions(['fetchEvent','attendEvent', 'makeComment', 'deleteEvent']),
    async handleAttend() {
      let attendanceInfo = {
        userId: this.user._id,
        eventId: this.event._id
      }
      await this.attendEvent(attendanceInfo)
      this.$router.push('/user/profile')
    },
    handleComment() {
        const form = {
          commentDetail: {
            body: this.comment,

          },
          eventId: this.event._id,
          userId: this.user._id
        }
        this.makeComment(form)
        this.comment = ''
    },
    handleDelete() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteEvent(this.event._id)
          .then(() => {
            Swal.fire(
            'Deleted!',
            'Your event has been cancelled.',
            'success'
            )
            this.$router.push('/')
          })
        }
        })
    }
  },
  created() {
    // Display loader while the event being fetched
    this.isLoading = true
    this.fetchEvent(this.$route.params.eventId)
  },
  watch: {
    event: function() {
      this.isLoading = false
    }
  }
}
</script>

<style scoped>
main {
  margin-top: 4em;
  text-align: center;
}
p, h {
  margin: 0.5em;
}
button, input, .button {
  margin: 0.75em;
}
section {
  margin: 1em;
}
.disabled {
  opacity: 0.50;
  pointer-events: none
}
@media only screen and (min-width: 769px) {
  main {
    margin-left: 15%;
  }
}
</style>
