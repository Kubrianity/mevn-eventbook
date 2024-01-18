<template lang = 'pug'>
section.hero.is-fullheight
  div.hero-body.is-justify-content-center.is-align-items-center
    div.box
      h1.title.is-3 Login
      form(@submit.prevent = "handleLogin")
        div.column
          label Username
          input.input.is-rounded(type = "text" name = "username" v-model = "username" required autocomplete = "on") 
        div.column
          label Password
          input.input.is-rounded(type = "password" name = "password"  v-model = "password" required autocomplete = "on")
        div.column
          button.button.is-primary.is-fullwidth(type = "submit") Log in
        div.has-text-centered
          p.is-size-7 Don't have an account?
          router-link.has-text-primary(to = "/register") Sign up
</template>

<script>

import { mapState, mapActions, mapGetters} from 'vuex'
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();

export default {
  name: 'login-card',
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
    ...mapActions(['logIn']),
    async handleLogin() {
      let userInfo = {
        username: this.username,
        password: this.password
      }
      await this.logIn(userInfo)
      if(!this.isAuthenticated) {
        toaster.error('Your username or password is incorrect', {position: 'top'});
      }
    }
  }
}
</script>
