<template>
  <div id="app">
    <span>hhhhhh</span>
    <router-view/>
  </div>
</template>
<script>
export default {
  created () {
    document.addEventListener('DOMContentLoaded', () => {
      console.log(window.innerWidth)
      const html = document.querySelector('html')
      let fontSize = window.innerWidth / 10
      fontSize = fontSize > 50 ? 50 : fontSize
      html.style.fontSize = fontSize + 'px'
    })
  },
  mounted () {
    this.$store.dispatch('setTest', 1000).then(() => {
      console.log(this.$store.state.book.test)
    })
  }
}

</script>

<style>
p{
  font-size: 1rem
}
</style>
