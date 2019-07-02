<template>
  <div id="app">
    <span>hhhhhh</span>
    <router-view/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
const getters = {
  a: () => 1,
  b: () => 2
}
function fn (keys) {
  const data = {}
  keys.forEach(key => {
    if (getters.hasOwnProperty(key)) {
      data[key] = getters[key]
    }
  })
  return data
}
export default {
  computed: {
    ...mapGetters(['test']),
    ...fn(['a', 'b'])
  },
  created () {
    document.addEventListener('DOMContentLoaded', () => {
      const html = document.querySelector('html')
      let fontSize = window.innerWidth / 10
      fontSize = fontSize > 50 ? 50 : fontSize
      html.style.fontSize = fontSize + 'px'
    })
  },
  mounted () {
    console.log(this.a)
    this.$store.dispatch('setTest', 1000).then(() => {
      console.log(this.test)
    })
    this.$store.dispatch('setPerson', { name: 'lisi', age: 20 }).then(() => {
      console.log(this.$store.state.demo.person.name)
    })
  }
}

</script>

<style>
p{
  font-size: 1rem
}
</style>
