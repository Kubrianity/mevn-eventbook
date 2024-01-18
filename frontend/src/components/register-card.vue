<template lang = 'pug'>
section.hero.is-fullheight
  div.hero-body.is-justify-content-center.is-align-items-center.has-text-centered
    div.box
      h1.title.is-3 Sign up
      form(@submit.prevent = "handleRegister")
        div.column
          label Username
          input.input.is-rounded(type = "text" name = "username" v-model = "username" required autocomplete = "on") 
        div.column
          label Password
          input.input.is-rounded(type = "password" name = "password"  v-model = "password" required autocomplete = "on")
        div.column
          button.button.is-primary.is-fullwidth(type = "submit") Sign up
        div.has-text-centered
          p.is-size-7 Already have an account?
          router-link.has-text-primary(to = "/login") Log in 
</template>                   


<script>

import { mapState, mapActions, mapGetters } from 'vuex'
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();

export default {
  name: 'register-card',
  data() {
    return {
        username: '',
        password: ''
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['register']),
    async handleRegister() {
      let userInfo = {
        username: this.username,
        password: this.password
      }
      await this.register(userInfo)
      if(!this.isAuthenticated) {
        toaster.error('This user/username already exists', {position: 'top'});
      }
    }
  }
}
</script>
