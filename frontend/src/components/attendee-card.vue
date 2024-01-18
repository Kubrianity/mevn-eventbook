<template lang = 'pug'>
article.media
  div.media-content
    div.content
      p
        strong(v-if = "user._id == attendee._id") You
        strong(v-else) {{ attendee.username }}
        button.button.is-primary.is-small(v-show = "checkConnectStatus" @click.prevent = "handleConnect") Connect
        br
        small member since {{ attendeeCreatedAt }}
        br
        router-link.has-text-info(v-show = "!(user._id)" to = "/login") Log in to connect

</template>

<script>

import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'attendee-card',
  props: ['attendee'],
  data() {
    // Converts date to readable format
    return {
      attendeeCreatedAt: new Date(this.attendee.createdAt).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' })
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['isAuthenticated']),
    // Check if the attendee is already in the user's contact list
    checkConnectStatus() {
      return this.isAuthenticated 
        && (this.user._id != this.attendee._id)
        && !(this.user.contacts.some(contact => contact._id == this.attendee._id))
    }
  },
  methods: {
    ...mapActions(['connect']),
    handleConnect() {
        const data = {
            targetId: this.attendee._id,
            userId: this.user._id
        }
        this.connect(data)
        .then(() => this.$router.push('/user/profile') )
    }
  }
}
</script>

<style scoped>
button {
  border-radius: 8px;
  margin-left: 0.50em;
}
</style>