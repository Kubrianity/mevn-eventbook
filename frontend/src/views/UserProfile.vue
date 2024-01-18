<template lang = 'pug'>
section.container
  h1.title.is-3 Welcome, {{ user.username }}
  div.columns.is-multiline.is-centered
    div.column.is-9
      span.tag.is-rounded.is-link.is-large contacts
        div.media-right
          span.has-text-grey-light
            i.fa.fa-comments {{ getUserData.numberOfContacts }}
              
      span.tag.is-rounded.is-warning.is-large events
        div.media-right
          span.has-text-grey-light
            i.fa.fa-comments {{ getUserData.numberOfEvents }}
              
    div.column.is-9
      div.box.content
        article.post
          h4.title.is-4 Events
          div.media
            div.media-content
              div.content
                p(v-if = "!(getUserData.numberOfEvents)") You don't have any events yet!
                p(v-show = "getUserData.upcomingEvents" v-for = "event in getUserData.upcomingEvents") 
                  router-link(v-bind:to = "'/' + event._id + '/detail'") {{ event.name }} &nbsp;
                  span.tag {{ event.date }} 	
                p(v-show = "getUserData.createdEvents" v-for = "event in getUserData.createdEvents")
                  router-link(v-bind:to = "'/' + event._id + '/detail'") {{ event.name }} &nbsp;
                  span.tag {{ event.date }} 
                
        article.post
          h4.title.is-4 Contacts
          div.media
            div.media-content
              div.content
                p(v-if = "!(getUserData.numberOfContacts)") You don't have any contacts yet!
                p.contacts(v-else v-for = "contact in getUserData.contacts") {{ contact.username }}
                    
    div.column.is-6.edit
      span.tag.is-light.is-danger.is-large.edit-heading Edit profile
      div.box.content
        label.label Change username
        input.input(type="text" name = "username" v-model = "username" :placeholder="user.username" required)
        button.button.is-rounded.is-light.is-danger(@click.prevent = 'handleProfileUpdate' type = "submit") Submit						 		
                
</template>

<script>
import { mapState, mapActions } from 'vuex'
import EventCard from '@/components/event-card.vue'
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();

export default {
  name: 'UserProfile',
  data() {
    return {
      username: ''
    }
  },
  components: {
    EventCard
  },
  computed: {
    ...mapState(['user', 'users']),
    getUserData () {
      return {
        numberOfContacts: this.user.contacts.length,
        numberOfEvents: this.user.upcomingEvents.length + this.user.createdEvents.length,
        upcomingEvents: this.user.upcomingEvents.length ? this.user.upcomingEvents : null,
        createdEvents: this.user.createdEvents.length ? this.user.createdEvents : null,
        contacts: this.user.contacts.length ? this.user.contacts : null
      }
    }
  },
  methods: {
    ...mapActions(['fetchUser','fetchUsers', 'updateProfile']),
    handleProfileUpdate() {
      const usernames = this.users.map(user => user.username)
      // Check if the username already exists
      if(usernames.some(name => name == this.username.trim())) {
        toaster.error('This username is already taken! Please try another one', {position: 'top'});
        return
      }
      // Validate for whitespaces and length
      else if(!this.username.trim() || this.username.trim().length < 3) {
        toaster.error('Username must contain at least 3 characters', {position: 'top'});
        return
      }
      const data = {
        username: this.username,
        userId: this.user._id
      }
      this.updateProfile(data)
    }
  },
  created() {
    this.fetchUser(this.user._id)
  },
  // Watch for changes in username state to get updated usernames 
  watch: {
    username() {
      this.fetchUsers()
    }
  }
}
</script>

<style scoped>
section.container {
  margin-top: 4em;
}
.tag.is-rounded, button {
  margin: 0.50em;
  width: 7em;
}
article {
  margin: 0.50em;
}
h4 {
  margin: 1em;
}
.edit-heading {
  margin: 1em;
}
.edit {
  margin: 2.5em;
}
</style>
