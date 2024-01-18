<template lang = 'pug'>
article.media
  div.media-content
    div.content
      p
        strong {{ comment.author }} 
        small wrote on {{ commentCreatedAt }} 
        br 
        span {{ comment.body }}

</template>

<script>
export default {
  name: 'comment-card',
  props: ['comment'],
  data() {
    // Converts date to readable format
    return {
      commentCreatedAt: new Date(this.comment.createdAt).toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' })
    }
  }
}
</script>

<style scoped>
article {
  margin: 0.75em;
}
div.content {
  word-wrap:break-word;
  word-break: break-all;
}
strong {
  margin: 0.5em;
}
</style>
