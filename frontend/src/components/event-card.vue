<template lang = 'pug'>
div.column.is-two-thirds-tablet.is-half-desktop.is-one-third-widescreen
  div.box.has-text-centered(:class = "{ disabled: !isActive || isDeleted }")
    h4.title.is-4(:class = "{ hasSpan: !isActive || isDeleted }") {{ event.name }}
    span.tag(v-if = "isDeleted") Cancelled
    span.tag(v-if = "!isActive && !isDeleted") Past
    p.subtitle {{ event.place }}
    p.subtitle {{ formatedDate }} 
    figure.image.is-4by3
      img(:src="`https://picsum.photos/300/200?random=${event._id}`", alt="Placeholder image")
    p.subtitle(v-if = "event.attendees.length > 1") {{ event.attendees.length }} attendees
    p.subtitle(v-else) {{ event.attendees.length }} attendee  
    router-link.button.is-primary(v-bind:to = "'/' + event._id + '/detail'") Detail
      
      
</template>

<script>
export default {
  name: 'event-card',
  props: ['event'],
  computed: {
    // Check if the event is past
    isActive() {
      return this.event.isActive
    },
    // Check if the event is deleted
    isDeleted() {
      return this.event.isDeleted
    },
    formatedDate() {
      return new Date(this.event.date).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hasSpan {
  margin-right: 0.25em;
  display: inline;
}
.disabled {
  opacity: 0.50;
}
</style>